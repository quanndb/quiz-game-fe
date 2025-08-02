import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .email("Email không hợp lệ")
    .min(5, "Email là bắt buộc và có ít nhất 5 ký tự"),
  password: z.string().min(8, "Mật khẩu có ít nhất 8 ký tự"),
  confirmPassword: z.string().min(8, "Mật khẩu có ít nhất 8 ký tự"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().min(5, "Email là bắt buộc và có ít nhất 5 ký tự"),
  password: z.string().min(8, "Mật khẩu có ít nhất 8 ký tự"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(8, "Mật khẩu có ít nhất 8 ký tự"),
  newPassword: z.string().min(8, "Mật khẩu có ít nhất 8 ký tự"),
  confirmPassword: z.string().min(8, "Mật khẩu có ít nhất 8 ký tự"),
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .email("Email không hợp lệ")
    .min(5, "Email là bắt buộc và có ít nhất 5 ký tự"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Mật khẩu có ít nhất 8 ký tự"),
  confirmPassword: z.string().min(8, "Mật khẩu có ít nhất 8 ký tự"),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
