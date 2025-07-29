import SmartLink from "@/components/common/SmartLink";
import Button from "@/components/ui/Button";
import { MAIN_MENU } from "@/resource/mainMenu";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-5">
      {MAIN_MENU.menu.map((item, index) => (
        <SmartLink key={index} href={item.url}>
          <Button
            backgroundImage={item.image}
            width={300}
            height={100}
            className="max-w-[300px] w-[200px] md:w-[300px]"
          />
        </SmartLink>
      ))}
    </div>
  );
}
