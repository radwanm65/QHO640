import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "ENTER YOUR API-KEY HERE",
  authDomain: "cwa-a4a09.firebaseapp.com",
  projectId: "cwa-a4a09",
  storageBucket: "cwa-a4a09.firebasestorage.app",
  messagingSenderId: "916265310996",
  appId: "1:916265310996:web:fcae257ea11b390e094001",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Login user
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout user
export function logout() {
  return signOut(auth);
}

const googleProvider = new GoogleAuthProvider();

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

// ----- CRUD OPERATIONS -----

// CREATE
export async function createItem(data) {
  return await addDoc(collection(db, "items"), data);
}

// READ ALL (One-time Fetch)
export async function getAllItems() {
  const snapshot = await getDocs(collection(db, "items"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// READ REALTIME LISTENER
export function subscribeToItems(callback) {
  return onSnapshot(collection(db, "items"), (snapshot) => {
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(items);
  });
}

// READ SINGLE ITEM
export async function getItem(id) {
  const docRef = doc(db, "items", id);
  const snapshot = await getDoc(docRef);
  return { id: snapshot.id, ...snapshot.data() };
}

// UPDATE
export async function updateItem(id, data) {
  const docRef = doc(db, "items", id);
  return await updateDoc(docRef, data);
}

// DELETE
export async function deleteItem(id) {
  const docRef = doc(db, "items", id);
  return await deleteDoc(docRef);
}
