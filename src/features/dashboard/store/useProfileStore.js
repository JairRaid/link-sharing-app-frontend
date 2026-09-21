import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useProfileStore = create(
  devtools((set) => ({
    profile: { firstName: "", lastName: "", email: "", profilePicture: "" },

    setProfile: (profile) => set({ profile }),
  })),
);
