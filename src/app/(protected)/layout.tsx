"use client";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { useSessionStore } from "@/store/sessionStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { session } = useSessionStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !session) {
      router.replace("/login");
    }
  }, [hydrated, session, router]);

  if (!hydrated) return <LoadingIndicator />;
  if (!session) return null;

  return <>{children}</>;
}
