import { defineStore } from 'pinia';
import { getLocalStorage } from '@/utils/expiryLocalStorage';

export const useFirestore = defineStore({
  id: 'firestoreStore',
  state: () => ({
    _user: getLocalStorage('user') || null,
    _categories: [],
  }),
  getters: {
    user: (state) => state._user,
    categories: (state) => state._categories,
  },
  actions: {
    setUser(user) {
      this._user = user;
    },
  },
});
