import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SettingsState = {
  isShowing: boolean;
  soundVolume: number;
  musicVolume: number;
  quality: "low" | "medium" | "high";
};

export type SettingsActions = {
  setIsShowing: (isShowing: boolean) => void;
  setSoundVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  setQuality: (quality: "low" | "medium" | "high") => void;
};

export const useSettingStore = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      isShowing: false,
      setIsShowing: (isShowing: boolean) => set({ isShowing }),
      soundVolume: 0.5,
      setSoundVolume: (volume: number) => set({ soundVolume: volume }),
      musicVolume: 0.5,
      setMusicVolume: (volume: number) => set({ musicVolume: volume }),
      quality: "medium",
      setQuality: (quality: "low" | "medium" | "high") => set({ quality }),
    }),
    {
      name: "settings-store",
    }
  )
);
