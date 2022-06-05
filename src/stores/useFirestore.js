import { defineStore } from 'pinia';
import { getLocalStorage } from '@/utils/expiryLocalStorage';

export const useFirestore = defineStore({
  id: 'firestoreStore',
  state: () => ({
    _user: getLocalStorage('user') || null,
  }),
  getters: {
    user: (state) => state._user,
  },
  actions: {
    setUser(user) {
      this._user = user;
    },
  },
});
