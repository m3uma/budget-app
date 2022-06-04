import { createUserWithEmailAndPassword as createUser, signInWithEmailAndPassword as loginUser } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore/lite';
import { auth, app } from '@/firebase/config';
import { setLocalStorage } from '@/utils/expiryLocalStorage';

async function addUser(userId) {
  return setDoc(doc(getFirestore(app), 'users', userId), {});
}

async function signUp({ email, password }) {
  const res = await createUser(auth, email, password);
  await addUser(res.user.uid);
  setLocalStorage('user', res.user.uid);
}

async function login({ email, password }) {
  const res = await loginUser(auth, email, password);
  setLocalStorage('user', res.user.uid);
}

export { signUp, login };
