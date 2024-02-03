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

const User = () => {
  const user = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);

  const [openMenu, setOpenMenu] = useState<boolean>(false);

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
    <div className="p-8 h-fit rounded-2xl col-span-4 flex flex-wrap flex-col lg:flex-row space-y-4 lg:space-y-0 justify-start lg:justify-between  items-end bg-zinc-900 text-zinc-100">
      <div className="flex flex-row lg:space-x-1 flex-wrap font-bold lg:text-xl w-fit">
        <span className="">welcome</span>
        <p className="text-zinc-400 font-normal flex-wrap">{user?.email}</p>
      </div>
      <div className="self-center relative p-0 m-0">
        <motion.button
          transition={{ duration: 0.2 }}
          layout
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          whileFocus={{ scale: 0.8 }}
          style={{ rotate: openMenu ? "180deg" : "0deg" }}
          className="text-indigo-400 lg:text-xl"
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        >
          <PiCaretCircleDown />
        </motion.button>
        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center p-2 absolute right-0 min-w-max rounded-lg rounded-tr-none bg-zinc-100 text-zinc-900"
            >
              <Link
                href="/"
                className="rounded-lg p-2 w-full hover:bg-indigo-200 transition-all duration-200 ease-in-out"
              >
                home
              </Link>

              <Link
                href="/history"
                className="rounded-lg p-2 w-full hover:bg-indigo-200 transition-all duration-200 ease-in-out"
              >
                history
              </Link>
              <motion.button
                onClick={() => {
                  handleSignout();
                }}
                className="rounded-lg p-2 w-full hover:bg-indigo-200 transition-all duration-200 ease-in-out"
              >
                sign out
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
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
