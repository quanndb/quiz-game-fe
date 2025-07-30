"use client";
import UI from "@/resource/ui";
import { useToastStore } from "@/store/toastStore";
import "@/style/SignToast.css";
import Image from "next/image";
import { useEffect, useRef } from "react";

const SignToast = () => {
  const { show, delay, success, message, hideToast } = useToastStore();

  const signRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;

    const sign = signRef.current;
    if (!sign) return;

    const timeouts: NodeJS.Timeout[] = [];

    const handleDropEnd = (e: AnimationEvent) => {
      // Chỉ xử lý khi animation kết thúc là "dropAndSwing"
      if (e.animationName !== "dropAndSwing") return;

      const flyTimeout = setTimeout(() => {
        sign.classList.add("fly-up");

        const hideTimeout = setTimeout(() => {
          hideToast();
          sign.classList.remove("fly-up");
        }, 1000); // thời gian animation bay lên

        timeouts.push(hideTimeout);
      }, delay); // thời gian chờ trước khi bay lên

      timeouts.push(flyTimeout);
    };

    sign.addEventListener("animationend", handleDropEnd);

    return () => {
      sign.removeEventListener("animationend", handleDropEnd);
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [show, delay, hideToast]);

  return (
    <>
      {show && (
        <div
          ref={signRef}
          className="fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2  md:right-0 md:translate-x-0 z-50 swing-sign"
        >
          <Image
            src={UI.SIGN_TOAST.robImage}
            alt="robToast"
            width={200}
            height={70}
            className="h-auto w-[200px] md:w-auto"
          />
          <div className="relative">
            <Image
              src={UI.SIGN_TOAST.signImage}
              alt="signToast"
              width={200}
              height={70}
              className="h-auto w-[200px] md:w-auto"
            />
            <p
              className={`absolute top-[50%] right-1/2 transform translate-x-1/2 -translate-y-1/2 text-md md:text-lg font-bold sign-text w-[88%] p-x-2 ${
                success ? "text-green-500" : "text-red-500"
              } text-center`}
            >
              {message}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignToast;
