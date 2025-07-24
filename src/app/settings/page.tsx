"use client";
import MenuLayout from "@/components/layouts/MenuLayout";
import Button from "@/components/ui/Button";
import useRouteLoader from "@/hooks/useRouteLoad";
import { useSessionStore } from "@/store/sessionStore";

const Settings = () => {
  const { clearSession } = useSessionStore();
  const router = useRouteLoader();
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
