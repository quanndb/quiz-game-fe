"use client";

import { useLoadingStore } from "@/store/loadingStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
function LoadingHandler() {
  const pathname = usePathname();
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    // Khi pathname thay đổi nghĩa là route đã xong → tắt loading
    setLoading(false);
  }, [pathname, setLoading]);

  return null;
}

export default LoadingHandler;
