"use client";
import { login } from "@/app/action/auth/actions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouteLoader } from "@/hooks";
import { loginSchema, LoginSchema } from "@/lib/schemas/account.schema";
import { useToastStore } from "@/store/toastStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";

const LoginForm = () => {
  const router = useRouteLoader();
  const { showToastSuccess, showToastError } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const res = await login(formData);
    if (!res.success) return showToastError(res.message);
    showToastSuccess(res.message);
    reset();
  };

  const onInvalid = (errors: FieldErrors<LoginSchema>) => {
    const firstErrorKey = Object.keys(errors)[0] as keyof LoginSchema;
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
        autoComplete="off"
        className="w-[300px] md:w-[500px]"
      />
      <Input
        placeholder="Password"
        type="password"
        {...register("password")}
        className="w-[300px] md:w-[500px]"
      />
      <div className="mx-auto flex gap-2">
        <Button
          className="w-[140px] md:w-[200px]"
          type="submit"
          disabled={isSubmitting}
        >
          Login
        </Button>
        <Button
          onClick={() => router.push("/register")}
          className="w-[140px] md:w-[200px]"
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
