import { StateCreator } from 'zustand';

export interface LoaderSlice {
  isLoading: boolean;
  openLoader: () => void;
  hideLoader: () => void;
}

export const createLoaderSlice: StateCreator<
  LoaderSlice,
  [],
  [],
  LoaderSlice
> = (set) => ({
  isLoading: false,
  openLoader: () => set({ isLoading: true }),
  hideLoader: () => set({ isLoading: false }),
});