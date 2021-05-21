import create, { State } from 'zustand';

export interface Alert {
  message: string;
  type: 'success' | 'error';
}

export interface LoaderState extends State {
  alerts: Alert[];
  setAlerts: (payload: Alert) => void;
}

export const useAlert = create<LoaderState>((set, get) => ({
  alerts: [],
  setAlerts: (load) => {
    const isAlert = get().alerts.filter((el) => el.message === load.message)[0];
    if (isAlert) return;
    set({ alerts: [...get().alerts, load] });
    setTimeout(() => {
      set({ alerts: get().alerts.filter((el) => el.message !== load.message) });
    }, 5000);
  },
}));
