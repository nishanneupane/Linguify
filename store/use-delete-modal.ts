import { create } from "zustand";

type DeleteModalState = {
  isOpen: boolean;
  open: (id:number) => void;
  close: () => void;
  id: number | null;
};

export const useDeleteModal = create<DeleteModalState>((set) => ({
  isOpen: false,
  open: (id:number) => set({ isOpen: true ,id}),
  close: () => set({ isOpen: false }),
  id: null,
}));
