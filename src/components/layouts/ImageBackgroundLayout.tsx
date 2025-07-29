import UI from "@/resource/ui";
import SmartLink from "../common/SmartLink";
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
      <SmartLink
        href="/settings"
        className="fixed bottom-4 right-4 z-10 max-w-[50px]"
      >
        <Button
          backgroundImage={UI.BUTTON.settingsImage}
          width={10}
          height={10}
        />
      </SmartLink>
    </div>
  );
};

export default ImageBackgroundLayout;
