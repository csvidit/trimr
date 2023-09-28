"use client";

import { motion } from "framer-motion";
import { PiCopySimple } from "react-icons/pi";

const CopyArea = (props: { children: string }) => {
  return (
    <div className="rounded-lg p-2 bg-zinc-800 text-zinc-100 flex flex-row items-center justify-between border-none focus:outline-none focus:ring-1 focus:ring-indigo-400">
      <div className="text-2xl select-all">{props.children}</div>
      <motion.button
        onClick={() => {
          navigator.clipboard.writeText(props.children);
        }}
        className="text-indigo-400 hover:"
      >
        <PiCopySimple />
      </motion.button>
    </div>
  );
};

export default CopyArea;
