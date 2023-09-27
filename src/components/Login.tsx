"use client";

import { AuthDispatchContext } from "@/app/AuthContext";
import { auth } from "@/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext } from "react";
import Button from "./Button";

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
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          go
        </Button>
      </form>
    </div>
  );
};

export default Login;
