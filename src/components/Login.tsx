"use client";

import { AuthDispatchContext } from "@/app/AuthContext";
import { auth } from "@/firebase.config";
import {
    browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useContext } from "react";

const Login = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const dispatch = useContext(AuthDispatchContext);

  const handleSubmit = async () => {
    console.log("submitting");
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await auth.updateCurrentUser(userCredential.user);
        dispatch!({ type: "LOGIN", payload: userCredential.user });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="p-8 h-fit rounded-2xl col-span-4 flex flex-col space-y-4 bg-zinc-900 text-2xl text-zinc-100">
      <span className="font-bold">login</span>
      <form className="flex flex-col space-y-4 text-base placeholder:text-zinc-400">
        <input
          content={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="rounded-lg p-2 bg-zinc-800 text-zinc-100 border-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
          type="text"
          placeholder="username"
        />
        <input
          content={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="rounded-lg p-2 bg-zinc-800 text-zinc-100 border-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
          type="password"
          placeholder="password"
        />
        <button
          onClick={() => {
            handleSubmit();
          }}
          type="button"
          className="w-fit rounded-lg px-8 py-2 hover:border-indigo-400 bg-indigo-400 hover:bg-zinc-800 text-zinc-900 hover:text-zinc-100 transition-all duration-200 ease-in-out"
        >
          go
        </button>
      </form>
    </div>
  );
};

export default Login;
