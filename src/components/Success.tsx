import { motion } from "framer-motion";
import { PiCopySimple } from "react-icons/pi";
import GridItem from "./GridItem";

const Success = (props: { url: string }) => {
  return (
    <GridItem>
      <span className="font-bold">
        <span className="ml-2 text-emerald-400">success!</span>
        <span className="ml-2 text-zinc-400 font-normal">here is your url</span>
      </span>
      <div className="rounded-lg p-2 bg-zinc-800 text-zinc-100 flex flex-row items-center justify-between border-none focus:outline-none focus:ring-1 focus:ring-indigo-400">
        <div className="select-all">{props.url}</div>
        <motion.button
          onClick={() => {
            navigator.clipboard.writeText(props.url);
          }}
          className="text-indigo-400 hover:"
        >
          <PiCopySimple />
        </motion.button>
      </div>
    </GridItem>
  );
};

export default Success;
