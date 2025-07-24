import { MAIN_MENU } from "@/resource/mainMenu";
import Link from "next/link";
import Button from "../ui/Button";

const ImageBackgroundLayout = ({
  children,
  imageURL,
}: Readonly<{ children: React.ReactNode; imageURL: string }>) => {
  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center bg-no-repeat bg-cover`}
      style={{
        backgroundImage: `url(${imageURL})`,
      }}
    >
      {children}
      {/* Settings button */}
      <Link href="/settings" className="fixed bottom-4 right-4 z-10">
        <Button
          backgroundImage={MAIN_MENU.settingsImage}
          width={50}
          height={50}
        />
      </Link>
    </div>
  );
};

export default ImageBackgroundLayout;
