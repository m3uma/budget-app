import { defineStore } from 'pinia';
import { getLocalStorage } from '@/utils/expiryLocalStorage';
import { getBaseCategories } from '@/composable/firesbase';

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
    setCategories(categories) {
      this._categories = categories;
    },
  },
});

export const updateStore = async () => {
  const store = useFirestore();
  store.setUser(getLocalStorage('user'));
  const categories = await getBaseCategories(store.user);
  store.setCategories(categories);
};
