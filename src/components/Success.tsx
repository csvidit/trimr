import { motion } from "framer-motion";
import { PiCopySimple } from "react-icons/pi";
import GridItem from "./GridItem";
import CopyArea from "./CopyArea";

const Success = (props: { url: string }) => {
  return (
    <GridItem>
      <span className="font-bold">
        <span className="text-emerald-400">success!</span>
        <span className="ml-2 text-zinc-400 font-normal">here is your url</span>
      </span>
     <CopyArea>{props.url}</CopyArea>
    </GridItem>
  );
};

export default Success;
