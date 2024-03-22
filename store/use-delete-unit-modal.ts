import { create } from "zustand";

type DeleteUnitModalState = {
  isOpen: boolean;
  open: (id:number) => void;
  close: () => void;
  id: number | null;
};

export const useDeleteUnitModal = create<DeleteUnitModalState>((set) => ({
  isOpen: false,
  open: (id:number) => set({ isOpen: true ,id}),
  close: () => set({ isOpen: false }),
  id: null,
}));
