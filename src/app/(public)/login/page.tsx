import MenuLayout from "@/components/layouts/MenuLayout";
import LoginForm from "./form";

const Login = () => {
  return (
    <MenuLayout isLoginPage>
      <LoginForm />
    </MenuLayout>
  );
};

export default Login;
