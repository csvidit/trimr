"use client";

import { AuthDispatchContext } from "@/app/(authenticated)/AuthContext";
import { auth } from "@/firebase.config";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useContext } from "react";
import Button from "./Button";
import { PiShieldWarning } from "react-icons/pi";
import SecondaryLink from "./SecondaryLink";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const dispatch = useContext(AuthDispatchContext);

  const handleSubmit = async () => {
    console.log("submitting");
    await sendPasswordResetEmail(auth, email)
      .then(async (userCredential) => {
        toast.success("password reset email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === AuthErrorCodes.INVALID_EMAIL) {
          toast.error("invalid email address");
        } else if (errorCode === AuthErrorCodes.INTERNAL_ERROR) {
          toast.error("internal server error, please try again later");
        }
      });
  };
  return (
    <div className="p-8 h-fit rounded-2xl col-span-4 flex flex-col space-y-4 bg-zinc-900 text-2xl text-zinc-100">
      <span className="font-bold">reset password</span>
      <form className="flex flex-col space-y-4 text-base placeholder:text-zinc-400">
        <input
          content={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="rounded-lg px-4 py-2 bg-zinc-800 text-zinc-100 border-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
          type="text"
          placeholder="email address"
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
            send email
          </Button>
          <SecondaryLink href="/">go back to login</SecondaryLink>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
