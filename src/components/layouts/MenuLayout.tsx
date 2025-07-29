"use client";
import ImageBackgroundLayout from "@/components/layouts/ImageBackgroundLayout";
import useRouteLoader from "@/hooks/useRouteLoader";
import { MAIN_MENU } from "@/resource/mainMenu";
import UI from "@/resource/ui";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";

const MenuLayout = ({
  children,
  isShowLogo = true,
  isLoginPage = false,
}: Readonly<{
  children: React.ReactNode;
  isShowLogo?: boolean;
  isLoginPage?: boolean;
}>) => {
  const path = usePathname();
  const router = useRouteLoader();

  return (
    <div>
      <ImageBackgroundLayout imageURL={MAIN_MENU.backgroundImage}>
        {isShowLogo && (
          <Image
            src={MAIN_MENU.bannerImage}
            alt="Quiz Game Banner"
            width={750}
            height={412}
            priority
            className="mb-8 transform translate-x-[-5%] z-10 w-[350px] md:w-[750px]"
          />
        )}
        <div className="z-10">{children}</div>
      </ImageBackgroundLayout>

      {/* Back layer */}
      {path !== "/" && (
        <div>
          {!isLoginPage && (
            <div className="fixed top-4 left-4 z-10">
              <Button
                backgroundImage={UI.BUTTON.backButtonImage}
                width={50}
                height={50}
                onClick={() => router.back()}
              ></Button>
            </div>
          )}
          <div className="fixed inset-0 bg-black opacity-50"></div>
        </div>
      )}
    </div>
  );
};

export default MenuLayout;
