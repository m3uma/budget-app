import { createUserWithEmailAndPassword as createUser, signInWithEmailAndPassword as loginUser } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore/lite';
import { auth, app } from '@/firebase/config';
import { setLocalStorage } from '@/utils/expiryLocalStorage';
import { useFirestore } from '@/stores/useFirestore';

async function createEmptyDBForUser(userId) {
  return setDoc(doc(getFirestore(app), 'users', userId), {});
}

function updateUserInState(userId) {
  const piniaFire = useFirestore();
  setLocalStorage('user', userId);
  piniaFire.setUser(userId);
}

async function signUp({ email, password }) {
  const res = await createUser(auth, email, password);
  await createEmptyDBForUser(res.user.uid);
  updateUserInState(res.user.uid);
}

async function login({ email, password }) {
  const res = await loginUser(auth, email, password);
  updateUserInState(res.user.uid);
}

async function logout() {
  await auth.signOut();
  updateUserInState(null);
}

export { signUp, login, logout };
