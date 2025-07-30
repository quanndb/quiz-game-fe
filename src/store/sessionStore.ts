import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SessionState = {};

export type SessionActions = {};

export const useSessionStore = create<SessionState & SessionActions>()(
  persist((set) => ({}), {
    name: "session-store",
  })
);
