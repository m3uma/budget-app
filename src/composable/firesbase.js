import { createUserWithEmailAndPassword as createUser, signInWithEmailAndPassword as loginUser } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

// auth functions
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

// DB functions
async function createInitialDBForUser(userId) {
  try {
    await setDoc(doc(db, 'users', userId, 'categories', 'base'), {
      categories: ['groceries', 'entertainment', 'car & transport', 'education', 'clothing', 'finances', 'other'],
    });
  } catch (error) {
    console.error(error);
  }
}

async function getBaseCategories(userId) {
  if (!userId) return [];
  try {
    const res = await getDoc(doc(db, 'users', userId, 'categories', 'base'));
    return res.data().categories;
  } catch (error) {
    console.error(error);
  }
}

export { signUp, login, logout, getBaseCategories };
