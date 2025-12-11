// lib/firestoreActions.js
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Get all items
export async function getItems() {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Add item
export async function addItem(name, password) {
  return await addDoc(collection(db, "users"), {
    name,
    password,
  });
}

// Delete item
export async function deleteItem(id) {
  return await deleteDoc(doc(db, "users", id));
}
