import MenuLayout from "@/components/layouts/MenuLayout";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./form";

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) => {
  const { token } = await searchParams;
  if (!token) redirect("/login");
  return (
    <MenuLayout isLoginPage>
      <ResetPasswordForm token={token} />
    </MenuLayout>
  );
};

export default ResetPassword;
