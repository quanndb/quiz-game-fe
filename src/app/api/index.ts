// lib/utils/withErrorHandling.ts
import AxiosIAMInstance from "@/lib/config/axiosIAM";
import { UserAuthorities } from "@/lib/models/account.type";
import { ANONYMOUS, APIResponse } from "@/lib/models/common.type";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function withRequestHandler(
  fn: (data?: Record<string, unknown>) => Promise<NextResponse>,
  request: NextRequest,
  permission?: string,
  schema?: z.ZodSchema
): Promise<NextResponse> {
  return withErrorHandling(async () => {
    let data = null;
    if (permission) {
      if (!(await validatePermission(permission))) {
        return NextResponse.json(
          {
            success: false,
            message: "Permission denied",
          },
          { status: 403 }
        );
      }
    }
    if (schema) {
      const result = await validateRequest(schema, request);
      if (!result.success) {
        return NextResponse.json(
          {
            message: "Invalid request",
            errors: result.error.flatten().fieldErrors,
          },
          { status: 400 }
        );
      }
      data = result.data;
    }
    return fn(data as Record<string, unknown>);
  });
}

export async function validateRequest(schema: z.ZodSchema, req: NextRequest) {
  const body = await req.json();
  return schema.safeParse(body);
}

async function withErrorHandling<T extends Response | NextResponse>(
  fn: () => Promise<T>
): Promise<T> {
  try {
    const result = await fn();
    return result instanceof NextResponse
      ? result
      : (NextResponse.json(await result.json()) as T);
  } catch (error) {
    console.error("API error:", error);

    // Nếu là lỗi Axios
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.error || "Axios call error";
      return NextResponse.json({ error: message }, { status }) as T;
    }

    // Các lỗi khác
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    ) as T;
  }
}

async function validatePermission(permission: string) {
  const userAuthorties: APIResponse<UserAuthorities> =
    await AxiosIAMInstance.get(
      `/accounts/me/authorities`,
      await withAuthCookie()
    );
  return (
    userAuthorties.data.isRoot ||
    userAuthorties.data.grantedPermissions.find((authority) => {
      return authority.toLowerCase() === permission.toLowerCase();
    }) ||
    permission === ANONYMOUS
  );
}

export async function withAuthCookie(otherHeaders?: Record<string, string>) {
  const cookieStore = await cookies();
  return {
    headers: {
      Authorization: cookieStore.get("Authorization")?.value || "",
      ...otherHeaders,
    },
  };
}
