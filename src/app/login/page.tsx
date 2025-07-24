"use client";
import MenuLayout from "@/components/layouts/MenuLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useSessionStore } from "@/store/sessionStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum TABS {
  LOGIN,
  REGISTER,
}

const Login = () => {
  const { session, setInitialSession } = useSessionStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <MenuLayout isLoginPage>
      <div className="flex flex-col gap-4 p-3 items-center">
        <Input
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[300px] md:w-[500px]"
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[300px] md:w-[500px]"
        />
        <div className="mx-auto flex gap-2">
          <Button
            disabled={!name || !password}
            onClick={setInitialSession}
            className="w-[140px] md:w-[200px]"
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
      </div>
    </MenuLayout>
  );
};

export default Login;
