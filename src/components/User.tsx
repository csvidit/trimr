"use client";

import {
  AuthContext,
  AuthDispatchContext,
} from "@/app/(authenticated)/AuthContext";
import { auth } from "@/firebase.config";
import { signOut } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useContext, useState } from "react";
import { PiCaretCircleDown } from "react-icons/pi";
import OldMenu from "./OldMenu";

const User = () => {
  const user = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);

  const handleSignout = async () => {
    await signOut(auth)
      .then(() => {
        auth.updateCurrentUser(null);
        dispatch!({ type: "LOGOUT", payload: null });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="p-8 h-fit rounded-2xl col-span-4 flex flex-wrap flex-row gap-4 justify-start lg:justify-between items-end bg-zinc-900 text-zinc-100">
      <div className="flex flex-row gap-2 flex-wrap font-bold lg:text-xl w-fit">
        <span className="">welcome</span>
        <p className="text-zinc-400 font-normal flex-wrap">{user?.email}</p>
      </div>
      <div className="self-center relative p-0 m-0">
        <OldMenu />
      </div>
      {/* <button
        onClick={() => {
          handleSignout();
        }}
        className="text-base w-fit rounded-lg bg-zinc-400 text-zinc-900 px-8 py-2 hover:bg-zinc-200 transition-all duration-200 ease-in-out"
      >
        sign out
      </button> */}
    </div>
  );
};

export default User;
