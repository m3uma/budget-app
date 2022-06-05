import { createUserWithEmailAndPassword as createUser, signInWithEmailAndPassword as loginUser } from 'firebase/auth';
import { setDoc, updateDoc, arrayUnion, arrayRemove, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { updateStore, useFirestore } from '@/stores/useFirestore';
import { setLocalStorage } from '@/utils/expiryLocalStorage';

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
  setLocalStorage('user', userId);
  updateStore();
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
async function getBaseCategories(userId) {
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
  store.addCategory(category);
}

async function deleteUserCategory(category) {
  const store = useFirestore();
  const userId = store.user;
  await updateDoc(doc(db, 'users', userId, 'categories', 'user'), {
    categories: arrayRemove(category),
  });
  store.deleteCategory(category);
}

async function getUserCategories(userId) {
  if (!userId) return [];
  try {
    const res = await getDoc(doc(db, 'users', userId, 'categories', 'user'));
    return res.data()?.categories || [];
  } catch (error) {
    console.error(error);
  }
}
////    END CATEGORIES    ////

///////////////////  END DB functions  ///////////////////

export { signUp, login, logout, getBaseCategories, getUserCategories, addUserCategory, deleteUserCategory };
