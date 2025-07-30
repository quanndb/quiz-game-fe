import UI from "@/resource/ui";
import { useSettingStore } from "@/store/settingStore";
import Button from "../ui/Button";

const SettingButton = () => {
  const { setIsShowing } = useSettingStore();
  return (
    <Button
      backgroundImage={UI.BUTTON.settingsImage}
      width={10}
      height={10}
      onClick={() => setIsShowing(true)}
    />
  );
};

export default SettingButton;
