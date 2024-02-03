"use client";

import { AuthDispatchContext } from "@/app/(authenticated)/AuthContext";
import { auth } from "@/firebase.config";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useContext } from "react";
import Button from "./Button";
import { PiShieldWarning } from "react-icons/pi";
import SecondaryLink from "./SecondaryLink";

const Signup = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const dispatch = useContext(AuthDispatchContext);

  const handleSubmit = async () => {
    console.log("submitting");
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await auth.updateCurrentUser(userCredential.user);
        dispatch!({ type: "LOGIN", payload: userCredential.user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (
          errorCode === AuthErrorCodes.INVALID_PASSWORD ||
          errorCode === AuthErrorCodes.INVALID_EMAIL
        ) {
          setError("there was an error creating your account");
        } else if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
          setError("an account already exists with that email");
        }
      });
  };
  return (
    <div className="p-8 h-fit rounded-2xl col-span-4 flex flex-col space-y-4 bg-zinc-900 text-2xl text-zinc-100">
      <span className="font-bold">sign up</span>
      <form className="flex flex-col space-y-4 text-base placeholder:text-zinc-400">
        <input
          content={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="rounded-lg px-4 py-2 bg-zinc-800 text-zinc-100 border-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
          type="text"
          placeholder="username"
        />
        <input
          content={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="rounded-lg px-4 py-2 bg-zinc-800 text-zinc-100 border-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
          type="password"
          placeholder="password"
        />
        {error && (
          <div className="flex flex-row space-x-1 items-center flex-wrap px-4 py-2 bg-red-950 rounded-lg w-fit text-red-500">
            <span className="w-fit">
              <PiShieldWarning />
            </span>
            <span className="">{error}</span>
          </div>
        )}
        <div className="flex flex-row gap-4 items-center">
          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            go
          </Button>
          <SecondaryLink href="/">go back to login</SecondaryLink>
        </div>
      </form>
    </div>
  );
};

export default Signup;
