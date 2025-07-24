"use client";
import MenuLayout from "@/components/layouts/MenuLayout";
import Button from "@/components/ui/Button";
import { useSessionStore } from "@/store/sessionStore";
import { useRouter } from "next/navigation";

const Settings = () => {
  const { clearSession } = useSessionStore();
  const router = useRouter();
  return (
    <MenuLayout>
      <h1>Settings</h1>
      <p>Manage your preferences here.</p>
      <Button
        onClick={() => {
          clearSession();
          router.push("/login");
        }}
      >
        Logout
      </Button>
    </MenuLayout>
  );
};

export default Settings;
