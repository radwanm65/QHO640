"use server";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { redirect } from "next/navigation";

export default async function page(formData) {
  let errorCode = null;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.get("email"),
      formData.get("password")
    );
  } catch (error) {
    console.log("Error");
    console.log(error);
    errorCode = error.code;
  }
  // Note that '/' is the top-level route of our app
  redirect(errorCode === null ? "/" : `/?error=${errorCode}`);
}
