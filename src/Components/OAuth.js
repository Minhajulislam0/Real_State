import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../FireBase";

export default function OAuth() {
  const navigate = useNavigate();

  async function googleAuth() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // check user
      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      toast.success("SuccessFully Signed In");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <button
      type="button"
      onClick={googleAuth}
      className="flex justify-center items-center w-full bg-red-600 hover:bg-red-800 text-white py-3 rounded font-semibold uppercase transition duration-150 ease-in-out shadow-md active:bg-red-800 "
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-1" />
      Continue With Google
    </button>
  );
}
