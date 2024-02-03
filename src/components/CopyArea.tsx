"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PiCopySimple } from "react-icons/pi";
// import Toast from "./Toast";
// import { useState } from "react";
import { toast } from "sonner"

const CopyArea = (props: { children: string }) => {

  return (
    <div className="rounded-lg px-4 py-2 bg-zinc-800 text-zinc-100 flex flex-row items-center justify-between border-none focus:outline-none focus:ring-1 focus:ring-indigo-400">
      <div className="text-2xl select-all">{props.children}</div>
      <motion.button
        onClick={() => {
          navigator.clipboard.writeText(props.children);
          toast("Copied to clipboard!")
        }}
        className="text-indigo-400 hover:text-indigo-100 transition-all duration-200 ease-in-out"
      >
        <PiCopySimple />
        <AnimatePresence mode="popLayout">
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default CopyArea;
