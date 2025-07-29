"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouteLoader } from "@/hooks";
import { RegisterSchema, registerSchema } from "@/lib/schemas/account.schema";
import { useToastStore } from "@/store/toastStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { register as registerAction } from "../../action/auth/actions";

const RegisterForm = () => {
  const router = useRouteLoader();
  const { showToastSuccess, showToastError } = useToastStore();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    if (data.password !== data.confirmPassword) {
      return showToastError("Mật khẩu không khớp!");
    }
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    const res = await registerAction(formData);
    console.log(res);
    if (!res.success) return showToastError(res.message);
    showToastSuccess(res.message);
    reset();
    router.push("/login");
  };

  const onInvalid = (errors: FieldErrors<RegisterSchema>) => {
    const firstErrorKey = Object.keys(errors)[0] as keyof RegisterSchema;
    const firstError = errors[firstErrorKey];
    showToastError(firstError?.message);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="flex flex-col gap-4 p-3 items-center"
    >
      <Input
        placeholder="Email"
        {...register("email")}
        className="w-[300px] md:w-[500px]"
      />
      <Input
        placeholder="Password"
        {...register("password")}
        type="password"
        className="w-[300px] md:w-[500px]"
      />
      <Input
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        type="password"
        className="w-[300px] md:w-[500px]"
      />
      <div className="mx-auto">
        <Button
          className="w-[140px] md:w-[200px]"
          type="submit"
          disabled={isSubmitting}
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
