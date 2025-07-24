import Button from "@/components/ui/Button";
import { MAIN_MENU } from "@/resource/mainMenu";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-3">
      {MAIN_MENU.menu.map((item, index) => (
        <Link key={index} href={item.url}>
          <Button
            backgroundImage={item.image}
            width={300}
            height={100}
            className="w-[200px] md:w-[300px]"
          />
        </Link>
      ))}
    </div>
  );
}
