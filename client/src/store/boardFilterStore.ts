import { create } from "zustand";

type BoardFilterState = {
  hideDone: boolean;
  toggleHideDone: () => void;
};

export const useBoardFilterStore = create<BoardFilterState>((set) => ({
  hideDone: false,
  toggleHideDone: () => set((state) => ({ hideDone: !state.hideDone })),
}));
