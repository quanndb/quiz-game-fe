import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import INTERNAL_SERVER_ERROR from "@/lib/exceptions/serverError";
import { IFormState } from "@/lib/types/common.type";
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
      let message = INTERNAL_SERVER_ERROR.internalServerError.message;
      if (axios.isAxiosError(err)) {
        console.error("API call error:", err.response?.data);
        if (err.response?.status === 401) {
          return {
            success: false,
            message: BAD_REQUEST_ERROR.unauthorized.message,
          } as IFormState;
        }
        if (err.response?.status === 403) {
          return {
            success: false,
            message: BAD_REQUEST_ERROR.forbidden.message,
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
            message: BAD_REQUEST_ERROR.invalidRequest.message,
            errors: result.error.flatten().fieldErrors,
          };
        }
        return await action(result.data);
      }
      return await action();
    }
  );
}
