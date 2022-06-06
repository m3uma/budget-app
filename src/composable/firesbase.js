import { createUserWithEmailAndPassword as createUser, signInWithEmailAndPassword as loginUser } from 'firebase/auth';
import {
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  orderBy,
  where,
  getDocs,
} from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useFirestore } from '@/stores/useFirestore';
import dayjs from 'dayjs';

///////////////////    AUTH functions    ///////////////////
async function signUp({ email, password }) {
  const res = await createUser(auth, email, password);
  await createInitialDBForUser(res.user.uid);
}

async function login({ email, password }) {
  await loginUser(auth, email, password);
}

async function logout() {
  await auth.signOut();
}

onAuthStateChanged(auth, (user) => {
  const userId = user?.uid || null;
  const store = useFirestore();
  store.setUser(userId);
  store.getCategories();
  store.getUserCategories();
  store.getExpanses();
});
///////////////////  END AUTH functions  ///////////////////

///////////////////    DB functions    ///////////////////
async function createInitialDBForUser(userId) {
  try {
    await setDoc(doc(db, 'users', userId, 'categories', 'base'), {
      categories: ['groceries', 'entertainment', 'car & transport', 'education', 'clothing', 'finances', 'other'],
    });
  } catch (error) {
    console.error(error);
  }
}

////    CATEGORIES    ////
async function getBaseCategories() {
  const store = useFirestore();
  const userId = store.user;
  if (!userId) return [];
  try {
    const res = await getDoc(doc(db, 'users', userId, 'categories', 'base'));
    return res.data().categories;
  } catch (error) {
    console.error(error);
  }
}

async function addUserCategory(category) {
  const store = useFirestore();
  const userId = store.user;
  await updateDoc(doc(db, 'users', userId, 'categories', 'user'), {
    categories: arrayUnion(category),
  });
  store.getUserCategories();
}

async function deleteUserCategory(category) {
  const store = useFirestore();
  const userId = store.user;
  await updateDoc(doc(db, 'users', userId, 'categories', 'user'), {
    categories: arrayRemove(category),
  });
  store.getUserCategories();
}

async function getUserCategories() {
  const store = useFirestore();
  const userId = store.user;
  if (!userId) return [];
  try {
    const res = await getDoc(doc(db, 'users', userId, 'categories', 'user'));
    return res.data()?.categories || [];
  } catch (error) {
    console.error(error);
  }
}
////    END CATEGORIES    ////
async function addExpense({ title, date, amount, category, description = '' }) {
  const store = useFirestore();
  const userId = store.user;
  const date1 = dayjs(date);
  try {
    const docRef = await addDoc(collection(db, 'users', userId, 'expenses'), {
      year: date1.get('year'),
      month: date1.get('month'),
      day: date1.get('date'),
      title,
      amount,
      category,
      description,
    });
    return docRef.id;
  } catch (error) {
    console.error(error);
  }
}

async function getExpansesByDate(date) {
  const store = useFirestore();
  const userId = store.user;
  if (!userId) return [];
  const expanseQuery = query(
    collection(db, 'users', userId, 'expenses'),
    where('year', '==', date.get('year')),
    where('month', '==', date.get('month')),
    orderBy('day', 'desc')
  );
  const snapshot = await getDocs(expanseQuery);
  return snapshot.docs.map((doc) => {
    const { title, category, amount, description, day, month, year } = doc.data();
    const date = dayjs();
    date.set('date', day);
    date.set('month', month);
    date.set('second', year);
    return { id: doc.id, date, title, category, amount, description };
  });
}
///////////////////  END DB functions  ///////////////////

export {
  signUp,
  login,
  logout,
  getBaseCategories,
  getUserCategories,
  addUserCategory,
  deleteUserCategory,
  addExpense,
  getExpansesByDate,
};
