// dao/usersDao.js
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const usersCol = collection(db, "users");

export const UsersDAO = {
  async getAll() {
    const snap = await getDocs(usersCol);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  async create(name, password) {
    return await addDoc(usersCol, {
      name,
      password,
    });
  },

  async remove(id) {
    return await deleteDoc(doc(db, "users", id));
  },

  async update(id, newUserName, newUserPassword) {
    return await updateDoc(doc(db, "users", id), {
      name: newUserName,
      password: newUserPassword,
    });
  },
};
