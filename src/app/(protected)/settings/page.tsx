"use client";
import { logout } from "@/app/action/auth/actions";
import MenuLayout from "@/components/layouts/MenuLayout";
import Button from "@/components/ui/Button";
import useRouteLoader from "@/hooks/useRouteLoader";

const Settings = () => {
  const router = useRouteLoader();
  return (
    <MenuLayout>
      <h1>Settings</h1>
      <p>Manage your preferences here.</p>
      <Button
        onClick={() => {
          router.push("/login");
          logout();
        }}
      >
        Logout
      </Button>
    </MenuLayout>
  );
};

export default Settings;
