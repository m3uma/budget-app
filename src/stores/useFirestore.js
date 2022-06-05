import { defineStore } from 'pinia';
import { getLocalStorage } from '@/utils/expiryLocalStorage';
import { getBaseCategories, getUserCategories } from '@/composable/firesbase';
import dayjs from 'dayjs';

export const useFirestore = defineStore({
  id: 'firestoreStore',
  state: () => ({
    _user: getLocalStorage('user') || null,
    _date: dayjs(),
    _categories: [],
    _userCategories: [],
  }),
  getters: {
    user: (state) => state._user,
    date: (state) => state._date,
    categories: (state) => state._userCategories.concat(...state._categories),
  },
  actions: {
    setUser(user) {
      this._user = user;
    },
    setDate(date) {
      this._date = date;
    },
    // categories
    setCategories(categories) {
      this._categories = categories;
    },
    setUserCategories(categories) {
      this._userCategories = categories;
    },
    addCategory(category) {
      this._userCategories.push(category);
    },
    deleteCategory(category) {
      this._userCategories = this._userCategories.filter((_category) => _category !== category);
    },
    // expenses
  },
});

export const updateStore = async () => {
  const store = useFirestore();
  store.setUser(getLocalStorage('user'));
  const categories = await getBaseCategories(store.user);
  store.setCategories(categories);
  const userCategories = await getUserCategories(store.user);
  store.setUserCategories(userCategories);
};
