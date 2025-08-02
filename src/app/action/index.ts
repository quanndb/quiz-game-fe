import { IFormState } from "@/lib/models/common.type";
import axios from "axios";
import z from "zod";

export function withErrorHandling<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<IFormState | R> => {
    try {
      const result = await fn(...args);
      return result;
    } catch (err) {
      let message = "Đã có lỗi xảy ra!";
      if (axios.isAxiosError(err)) {
        console.error("API call error:", err.response?.data);
        if (err.response?.status === 401) {
          return {
            success: false,
            message: "Chưa xác thực!",
          } as IFormState;
        }
        if (err.response?.status === 403) {
          return {
            success: false,
            message: "Không có quyền!",
          } as IFormState;
        }
        message = err.response?.data?.message || message;
      }
      return {
        success: false,
        message: message,
      } as IFormState;
    }
  };
}

export function createValidatedAction<T>(schema?: z.ZodSchema<T>) {
  return withErrorHandling(
    async (
      formData: FormData | undefined,
      action: (data?: T) => Promise<IFormState>
    ): Promise<IFormState> => {
      if (schema && formData) {
        const result = schema.safeParse(Object.fromEntries(formData.entries()));
        if (!result.success) {
          console.error(
            "Validation error:",
            result.error.flatten().fieldErrors
          );
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
