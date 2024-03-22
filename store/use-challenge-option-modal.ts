import { create } from "zustand";

type DeleteChallengeOptionState = {
  isOpen: boolean;
  open: (id:number) => void;
  close: () => void;
  id: number | null;
};

export const useDeleteChallengeOptions = create<DeleteChallengeOptionState>((set) => ({
  isOpen: false,
  open: (id:number) => set({ isOpen: true ,id}),
  close: () => set({ isOpen: false }),
  id: null,
}));
