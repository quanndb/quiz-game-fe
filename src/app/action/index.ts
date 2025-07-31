import { FormState } from "@/lib/models/common.type";
import axios from "axios";
import z from "zod";

export function withErrorHandling<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<FormState | R> => {
    try {
      const result = await fn(...args);
      return result;
    } catch (err) {
      let message = "Đã có lỗi xảy ra!";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }
      return {
        success: false,
        message: message,
      } as FormState;
    }
  };
}

export function createValidatedAction<T>(schema?: z.ZodSchema<T>) {
  return withErrorHandling(
    async (
      formData: FormData | undefined,
      action: (data?: T) => Promise<FormState>
    ): Promise<FormState> => {
      if (schema && formData) {
        const data = Object.fromEntries(formData.entries());
        const result = schema.safeParse(data);
        if (!result.success) {
          return {
            success: false,
            message: "Vui lòng nhập đúng thông tin!",
            errors: result.error.flatten().fieldErrors,
          };
        }
        return await action(result.data);
      }
      return await action();
    }
  );
}
