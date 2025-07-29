import { create } from "zustand";

export type ToastState = {
  message?: string;
  delay: number;
  success: boolean;
  show: boolean;
};

export type ToastActions = {
  showToastSuccess: (message?: string, delay?: number) => void;
  showToastError: (message?: string, delay?: number) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState & ToastActions>()((set) => ({
  message: "",
  delay: 1000,
  success: true,
  show: false,
  showToastSuccess: (message, delay = 1000) =>
    set({ message, delay, success: true, show: true }),
  showToastError: (message, delay = 1000) =>
    set({ message, delay, success: false, show: true }),
  hideToast: () => set({ message: "", success: true, show: false }),
}));
