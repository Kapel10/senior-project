/*{
import React from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Token {
  accessToken: string;
  setToken: (token: string) => void;
  refreshToken: () => void;
}

export const useTokenStore = create<Token>()(
  persist(
    (set, get) => ({
      accessToken: " ",
      setToken: (token: string) => {
        set({ accessToken: token });
      },
      refreshToken: () => {
        const timeout = 30 * 60 * 1000;
        setTimeout(() => {
          set({ accessToken: " " });
        }, timeout);
      },
    }),
    { name: "jwt-storage" }
  )
);
} */
