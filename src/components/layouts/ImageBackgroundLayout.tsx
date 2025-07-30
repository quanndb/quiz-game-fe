import SettingButton from "../common/SettingButton";

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
      <div className="fixed bottom-4 right-4 z-10 max-w-[50px]">
        <SettingButton />
      </div>
    </div>
  );
};

export default ImageBackgroundLayout;
