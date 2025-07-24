"use client";

import { useLoadingStore } from "@/store/loadingStore";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function SmartLink({
  href,
  children,
  delay = 1000,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setLoading } = useLoadingStore();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setLoading(true);

    startTransition(() => {
      setTimeout(() => {
        router.push(href);
      }, delay);
    });
  };

  return (
    <a
      href={href}
      onClick={onClick}
      style={{ opacity: isPending ? 0.5 : 1 }}
      className={className}
    >
      {children}
    </a>
  );
}
