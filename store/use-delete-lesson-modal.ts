import { create } from "zustand";

type DeleteLessonState = {
  isOpen: boolean;
  open: (id:number) => void;
  close: () => void;
  id: number | null;
};

export const useDeleteLesson = create<DeleteLessonState>((set) => ({
  isOpen: false,
  open: (id:number) => set({ isOpen: true ,id}),
  close: () => set({ isOpen: false }),
  id: null,
}));
