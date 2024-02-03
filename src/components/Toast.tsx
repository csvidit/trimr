import { AnimatePresence, motion } from "framer-motion";

const Toast = (props: { children: React.ReactNode }) => {
  return (
    // <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // transition={{ duration: 4 }}
        className="absolute w-max self-center right-0 bottom-16 rounded-lg bg-indigo-400 text-neutral-950 border border-indigo-400 px-4 py-2"
      >
        {props.children}
      </motion.div>
    // </AnimatePresence>
  );
};

export default Toast;
