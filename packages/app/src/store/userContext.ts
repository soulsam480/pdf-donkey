import { AxiosResponse } from 'axios';
import { DonkeyApi } from 'src/utils/helpers';
import create, { State } from 'zustand';

export interface User {
  name?: string;
  email?: string;
  username?: string;
  templates?: string[];
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  api_key?: string;
}

export interface UserState extends State {
  isLoggedIn: boolean;
  user: User;
  setLogin: (load: boolean) => void;
  setUser: (load: User) => void;
  fetchUser: () => Promise<any>;
}

export const useUser = create<UserState>((set, get) => ({
  isLoggedIn: false,
  user: {},
  setLogin: (load) => set(() => ({ isLoggedIn: load })),
  setUser: (load) => set(() => ({ user: { ...load } })),
  fetchUser: async () => {
    await DonkeyApi.get('/user').then((res: AxiosResponse<User>) =>
      set(() => ({ user: { ...res.data } })),
    );
  },
}));
