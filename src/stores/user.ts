import { create } from "zustand";
import type { User } from "../models/user";

interface UserStoreState {
  user?: User;

  reset(): void;
  set(user: User): void;
}

const useUserStore = create<UserStoreState>()((set) => ({
  reset: () => {
    set({
      user: undefined,
    });
  },
  set: (user) => {
    set({
      user,
    });
  },
}));

export default useUserStore;
