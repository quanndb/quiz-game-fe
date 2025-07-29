"use client";

import UI from "@/resource/ui";
import { useLoadingStore } from "@/store/loadingStore";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const useRouteLoader = (delay = UI.LOADING.loadDelay) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setLoading } = useLoadingStore();

  const push = (href: string) => {
    setLoading(true);
    startTransition(() => {
      setTimeout(() => {
        router.push(href);
      }, delay);
    });
  };

  const replace = (href: string) => {
    setLoading(true);
    startTransition(() => {
      setTimeout(() => {
        router.replace(href);
      }, delay);
    });
  };

  const back = () => {
    setLoading(true);
    startTransition(() => {
      setTimeout(() => {
        router.back();
      }, delay);
    });
  };

  return {
    push,
    replace,
    isPending,
    back,
  };
};

export default useRouteLoader;
