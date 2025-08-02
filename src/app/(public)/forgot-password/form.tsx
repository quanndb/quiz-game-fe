"use client";
import { forgotPassword } from "@/app/action/auth/actions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouteLoader } from "@/hooks";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/lib/schemas/account.schema";
import { useToastStore } from "@/store/toastStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";

const ForgotPasswordForm = () => {
  const router = useRouteLoader();
  const { showToastSuccess, showToastError } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    const formData = new FormData();
    formData.append("email", data.email);

    const res = await forgotPassword(formData);
    if (!res.success) return showToastError(res.message);
    showToastSuccess(res.message);
    reset();
    router.push("/");
  };

  const onInvalid = (errors: FieldErrors<ForgotPasswordSchema>) => {
    const firstErrorKey = Object.keys(errors)[0] as keyof ForgotPasswordSchema;
    const firstError = errors[firstErrorKey];
    showToastError(firstError?.message);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex flex-col gap-4 p-3 items-center"
      >
        <Input
          placeholder="Email"
          {...register("email")}
          autoComplete="off"
          className="w-[300px] md:w-[500px]"
        />
        <div className="mx-auto flex gap-2">
          <Button
            className="w-[140px] md:w-[200px]"
            type="submit"
            disabled={isSubmitting}
          >
            Send
          </Button>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
