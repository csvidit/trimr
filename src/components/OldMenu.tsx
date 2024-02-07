"use client";

import { AuthDispatchContext } from "@/app/(authenticated)/AuthContext";
import { auth } from "@/firebase.config";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useContext, useState } from "react";
import { PiCaretCircleDown } from "react-icons/pi";

const OldMenu = () => {
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

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <>
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
    </>
  );
};
