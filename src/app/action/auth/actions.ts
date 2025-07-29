"use server";

import AxiosInstance from "@/lib/config/axios";
import { FormState } from "@/lib/models/common.type";
import { loginSchema, registerSchema } from "@/lib/schemas/account.schema";
import axios from "axios";
import { cookies } from "next/headers";

export async function register(formData: FormData): Promise<FormState> {
  try {
    const data = Object.fromEntries(formData.entries());

    const result = registerSchema.safeParse(data);
    if (!result.success) {
      return {
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin!",
        errors: result.error.flatten().fieldErrors,
      };
    }

    await AxiosInstance.post("/accounts/register", data);
    return {
      success: true,
      message: "Đăng ký thành công!",
    };
  } catch (err) {
    let message = "Đã có lỗi xảy ra!";
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message || message;
    }
    return {
      success: false,
      message: message,
    };
  }
}

export async function login(formData: FormData): Promise<FormState> {
  try {
    const data = Object.fromEntries(formData.entries());

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      return {
        success: false,
        message: "Vui lòng nhập đúng thông tin!",
        errors: result.error.flatten().fieldErrors,
      };
    }

    const res = await AxiosInstance.post("/auth/login", data);
    // set cookie
    const cookieStore = await cookies();
    cookieStore.set("Authorization", res.data.accessToken, {
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
  } catch (err) {
    let message = "Đã có lỗi xảy ra!";
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message || message;
    }
    return {
      success: false,
      message: message,
    };
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("Authorization");
    return {
      success: true,
      message: "Đăng xuất thành công!",
    };
  } catch (err) {
    let message = "Đã có lỗi xảy ra!";
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message || message;
    }
    return {
      success: false,
      message: message,
    };
  }
}
