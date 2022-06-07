import { defineStore } from 'pinia';
import { getLocalStorage, setLocalStorage } from '@/utils/expiryLocalStorage';
import { getBaseCategories, getUserCategories, getExpansesByDate } from '@/composable/firesbase';
import dayjs from 'dayjs';

export const useFirestore = defineStore({
  id: 'firestoreStore',
  state: () => ({
    _user: getLocalStorage('user') || null,
    _date: dayjs(),
    _categories: [],
    _userCategories: [],
    _expenses: [],
  }),
  getters: {
    user: (state) => state._user,
    date: (state) => state._date,
    categories: (state) => state._userCategories.concat(...state._categories),
    expenses: (state) => state._expenses,
    expansesGroupedByCategory: (state) => {
      const expanses = {};
      state._categories.forEach((category) => {
        expanses[category] = state._expenses.filter((expanse) => expanse.category === category);
      });
      return expanses;
    },
    expansesGroupedByDate: (state) => {
      const uniqueDates = [...new Set(state._expenses.map(({ date }) => date.get('date')))];
      let key = state._date;
      const expanses = {};
      uniqueDates.forEach((date) => {
        key.set('date', date);
        expanses[key.format('DD/MM/YYYY')] = state._expenses.filter((expanse) => expanse.date.get('date') === date);
      });
      return expanses;
    },
  },
  actions: {
    setUser(user) {
      this._user = user;
      setLocalStorage('user', user);
    },
    setDate(date) {
      this._date = date;
      this.getExpanses();
    },
    // categories
    async getCategories() {
      this._categories = await getBaseCategories();
    },
    async getUserCategories() {
      this._userCategories = await getUserCategories();
    },
    // expenses
    async getExpanses(date = this.date) {
      if (date.get('month') !== this.date.get('month') && date.get('year') !== this.date.get('year')) return;
      this._expenses = await getExpansesByDate(date);
    },
  },
});
