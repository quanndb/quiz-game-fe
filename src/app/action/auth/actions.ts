"use server";

import { AxiosIAMInstance } from "@/lib/config";
import { FormState } from "@/lib/models/common.type";
import { loginSchema, registerSchema } from "@/lib/schemas/account.schema";
import { cookies } from "next/headers";
import { createValidatedAction } from "..";

export async function register(formData: FormData): Promise<FormState> {
  return createValidatedAction(registerSchema)(formData, async (data) => {
    await AxiosIAMInstance.post("/accounts/register", data);
    return {
      success: true,
      message: "Đăng ký thành công!",
    };
  });
}

export async function login(formData: FormData): Promise<FormState> {
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

export async function logout(): Promise<FormState> {
  return createValidatedAction()(undefined, async () => {
    const cookieStore = await cookies();
    cookieStore.delete("Authorization");
    return {
      success: true,
      message: "Đăng xuất thành công!",
    };
  });
}
