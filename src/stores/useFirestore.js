import { defineStore } from 'pinia';
import { getLocalStorage, setLocalStorage } from '@/utils/expiryLocalStorage';
import { getCategories, getExpensesByDate } from '@/composable/firesbase';
import dayjs from 'dayjs';

export const useFirestore = defineStore({
  id: 'firestoreStore',
  state: () => ({
    _user: getLocalStorage('user') || null,
    _date: dayjs(),
    _categories: [],
    _expenses: [],
  }),
  getters: {
    user: (state) => state._user,
    date: (state) => state._date,
    categories: (state) => state._categories,
    expenses: (state) =>
      state._expenses.filter((expense) => state._categories.some((category) => category.name === expense.category)),
    expensesGroupedByCategory: (state) => {
      const expanses = {};
      state._categories.forEach((category) => {
        expanses[category.name] = state._expenses.filter((expanse) => expanse.category === category.name);
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
      this.getExpensesFromDB();
    },
    getExpanseById(id) {
      return this._expenses.find((expanse) => expanse.id === id);
    },
    async getCategoriesFromDB() {
      this._categories = await getCategories();
    },
    async getExpensesFromDB(date = this.date) {
      if (date.get('month') !== this.date.get('month') && date.get('year') !== this.date.get('year')) return;
      this._expenses = await getExpensesByDate(date);
    },
  },
});
