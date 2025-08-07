import Image from "next/image";

const ResourcePicture = ({ assetUrl }: { assetUrl: string }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-block">
        {/* Nền giấy và góc gập */}
        <div className="relative">
          <Image
            src="/assets/picturePaper.svg"
            alt="paper background"
            width={600}
            height={400}
          />
          <Image
            src="/assets/paperSplitup.svg"
            alt="folded corner"
            width={100}
            height={100}
            className="absolute bottom-0 right-0 z-10 w-[25%] h-[25%] translate-x-[17%]"
          />
        </div>

        {/* Ảnh nội dung căn giữa nền giấy */}
        <div className="absolute w-[88%] h-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] z-9   overflow-hidden">
          <Image
            src={assetUrl}
            alt="resource"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};
// shadow-[10px_5px_5px_rgba(0,0,0,0.25)] rounded-br-2xl
export default ResourcePicture;
