"use server";

import { AxiosIAMInstance } from "@/lib/config";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/lib/schemas/account.schema";
import { IFormState } from "@/lib/types/common.type";
import { cookies } from "next/headers";
import { createValidatedAction } from "..";

export async function register(formData: FormData): Promise<IFormState> {
  return createValidatedAction(registerSchema)(formData, async (data) => {
    await AxiosIAMInstance.post("/accounts/register", data);
    return {
      success: true,
      message: "Đăng ký thành công!",
    };
  });
}

export async function login(formData: FormData): Promise<IFormState> {
  return createValidatedAction(loginSchema)(formData, async (data) => {
    const res = await AxiosIAMInstance.post("/auth/login", data);
    // set cookie
    const cookieStore = await cookies();
    cookieStore.set("Authorization", "Bearer " + res.data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return {
      success: true,
      message: "Đăng nhập thành công!",
    };
  });
}

// forgot password
export async function forgotPassword(formData: FormData): Promise<IFormState> {
  return createValidatedAction(forgotPasswordSchema)(formData, async (data) => {
    await AxiosIAMInstance.post(
      "/accounts/forgot-password?email=" + data?.email
    );
    return {
      success: true,
      message: "Gửi yêu cầu thành công, vui lòng kiểm tra email!",
    };
  });
}

// set password after forgot password
export async function setPassword(formData: FormData): Promise<IFormState> {
  return createValidatedAction(resetPasswordSchema)(formData, async (data) => {
    await AxiosIAMInstance.post(
      "/accounts/action/password-verification",
      data,
      {
        headers: {
          Authorization: "Bearer " + formData.get("token"),
        },
      }
    );
    return {
      success: true,
      message: "Đặt mật khẩu thành công!",
    };
  });
}

export async function logout(): Promise<IFormState> {
  return createValidatedAction()(undefined, async () => {
    const cookieStore = await cookies();
    cookieStore.delete("Authorization");
    return {
      success: true,
      message: "Đăng xuất thành công!",
    };
  });
}
