import create, { State } from 'zustand';

export interface LoaderState extends State {
  isLader: boolean;
  setLoader: (payload: boolean) => void;
}

export const useLoader = create<LoaderState>((set, get) => ({
  isLader: false,
  setLoader: (load) => set(() => ({ isLader: load })),
}));
