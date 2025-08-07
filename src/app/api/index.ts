import { ANONYMOUS } from "./../../lib/models/common.type";
// lib/utils/withErrorHandling.ts
import AxiosIAMInstance from "@/lib/config/axiosIAM";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import INTERNAL_SERVER_ERROR from "@/lib/exceptions/serverError";
import { IUserAuthorities } from "@/lib/models/account.type";
import { IAPIResponse } from "@/lib/models/common.type";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export type options = {
  request?: NextRequest;
  permission?: string | typeof ANONYMOUS;
  schema?: z.ZodSchema;
};

export type FnArgs<T> = {
  body?: T;
  currentUser?: IUserAuthorities;
};

export async function withRequestHandler<T>(
  fn: (args: FnArgs<T>) => Promise<NextResponse>,
  options?: options
): Promise<NextResponse> {
  return withErrorHandling(async () => {
    let body: T = {} as T;
    let currentUser = undefined;
    if (options?.permission) {
      const { hasPermission, userAuthorties } = await validatePermission(
        options.permission
      );
      if (!hasPermission) {
        return NextResponse.json(BAD_REQUEST_ERROR.forbidden, { status: 403 });
      }
      currentUser = userAuthorties;
    }
    console.log("currentUser:", currentUser, "has valid permission");
    if (options?.schema) {
      const result = await validateRequest(options.schema, options.request!);
      if (!result.success) {
        return NextResponse.json(result.error.flatten().fieldErrors, {
          status: 400,
        });
      }
      body = result.data as T;
    }
    return fn({ body, currentUser });
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
      if (status === 401) {
        return NextResponse.json(BAD_REQUEST_ERROR.unauthorized, {
          status,
        }) as T;
      }
      const message =
        error.response?.data?.error ||
        INTERNAL_SERVER_ERROR.apiCallError.message;
      return NextResponse.json({ error: message }, { status }) as T;
    }

    // Các lỗi khác
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : INTERNAL_SERVER_ERROR.internalServerError.message,
      },
      { status: 500 }
    ) as T;
  }
}

export async function validatePermission(permission: string) {
  const userAuthorties: IAPIResponse<IUserAuthorities> =
    await AxiosIAMInstance.get(
      `/accounts/me/authorities`,
      await withAuthCookie()
    );
  return {
    hasPermission:
      userAuthorties.data.isRoot ||
      userAuthorties.data.grantedPermissions.find((authority) => {
        return authority.toLowerCase() === permission.toLowerCase();
      }) ||
      permission === ANONYMOUS,
    userAuthorties: userAuthorties.data,
  };
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
