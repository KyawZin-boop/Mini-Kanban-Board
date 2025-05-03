import { StateCreator } from 'zustand';

export interface DialogSlice {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  isAlert: boolean;
  openAlert: () => void;
  closeAlert: () => void;
}

export const createDialogSlice: StateCreator<
  DialogSlice,
  [],
  [],
  DialogSlice
> = (set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
  isAlert: false,
  openAlert: () => set({ isAlert: true }),
  closeAlert: () => set({ isAlert: false }),
});