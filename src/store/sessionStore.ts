import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SessionState = {
  session: {
    token: string;
    username: string;
    fullName: string;
  } | null;
};

const initialState: SessionState = {
  session: {
    token: "abc",
    username: "quizmaster",
    fullName: "Quiz Master",
  },
};

export type SessionActions = {
  setSession: (session: SessionState["session"]) => void;
  clearSession: () => void;
  setInitialSession: () => void;
};

export const useSessionStore = create<SessionState & SessionActions>()(
  persist(
    (set) => ({
      session: initialState.session,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
      setInitialSession: () => {
        const initialSession = initialState.session;
        if (initialSession) {
          set({ session: initialSession });
        }
      },
    }),
    {
      name: "session-store",
    }
  )
);
