import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SessionState = {
  session: {
    token: string;
    username: string;
    fullName: string;
  } | null;
};

export type SessionActions = {
  setSession: (session: SessionState["session"]) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState & SessionActions>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: "session-store",
    }
  )
);
