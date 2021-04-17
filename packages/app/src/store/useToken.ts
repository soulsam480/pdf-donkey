import create, { State } from 'zustand';

export interface TokenState extends State {
  token: string;
  setToken: (load: string) => void;
}

export const useToken = create<TokenState>((set, get) => ({
  token: '',
  setToken: (load) => set(() => ({ token: load })),
}));
