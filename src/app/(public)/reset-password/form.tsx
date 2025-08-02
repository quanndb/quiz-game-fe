"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouteLoader } from "@/hooks";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/lib/schemas/account.schema";
import { useToastStore } from "@/store/toastStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { setPassword } from "../../action/auth/actions";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouteLoader();
  const { showToastSuccess, showToastError } = useToastStore();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    if (data.newPassword !== data.confirmPassword) {
      return showToastError("Mật khẩu không khớp!");
    }
    const formData = new FormData();
    formData.append("newPassword", data.newPassword);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("token", token);

    const res = await setPassword(formData);
    if (!res.success) return showToastError(res.message);
    showToastSuccess(res.message);
    reset();
    router.push("/login");
  };

  const onInvalid = (errors: FieldErrors) => {
    const firstErrorKey = Object.keys(errors)[0];
    showToastError(errors[firstErrorKey]?.message as string);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="flex flex-col gap-4 p-3 items-center"
    >
      <Input
        placeholder="Mật khẩu"
        {...register("newPassword")}
        type="password"
        className="w-[300px] md:w-[500px]"
      />
      <Input
        placeholder="Xác nhận"
        {...register("confirmPassword")}
        type="password"
        className="w-[300px] md:w-[500px]"
      />
      <div className="mx-auto">
        <Button
          className="w-[140px] text-sm md:w-[200px]"
          type="submit"
          disabled={isSubmitting}
        >
          Cập nhật
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
