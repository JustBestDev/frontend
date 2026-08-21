import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mainApi } from "../api/mainApi";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      login: async (data) => {
        const resp = await mainApi.post("/auth/login", data);
        // console.log("resp", resp);
        set({
          user: resp.data.user,
          token: resp.data.token,
        });
        return resp;
      },
      fetchCurrentUser: async () => {
        const token = get().token;
        const resp = await mainApi.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ user: resp.data });
        return resp;
      },
      logout: () => {
        set({
          user: null,
          token: "",
        });
      },
    }),
    {
      name: "authState",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
