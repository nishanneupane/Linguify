import { create } from "zustand";

type DeleteChallengeState = {
  isOpen: boolean;
  open: (id:any) => void;
  close: () => void;
  id: any | null;
};

export const useDeleteChallenge = create<DeleteChallengeState>((set) => ({
  isOpen: false,
  open: (id:any) => set({ isOpen: true ,id}),
  close: () => set({ isOpen: false }),
  id: null,
}));
