"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PiCopySimple } from "react-icons/pi";
// import Toast from "./Toast";
import { useState } from "react";
import { toast } from "sonner";

const CopyArea = (props: { children: string }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="rounded-lg px-4 py-2 bg-zinc-800 text-zinc-100 flex flex-row items-center justify-between border-none focus:outline-none focus:ring-1 focus:ring-indigo-400">
      <div className="lg:text-xl select-all">{props.children}</div>
      <motion.button
        onClick={() => {
          navigator.clipboard.writeText(props.children);
          toast("Copied to clipboard!");
        }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        className="relative text-indigo-400 hover:text-indigo-100 transition-all duration-200 ease-in-out"
      >
        <PiCopySimple className="" />
        <AnimatePresence mode="popLayout">
          {hover && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              layout
              className="text-xs text-zinc-900 bg-zinc-100 rounded-md absolute p-1 bottom-[200%] w-max font-bold"
            >
              Copy
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default CopyArea;
