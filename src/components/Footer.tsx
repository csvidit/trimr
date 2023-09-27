import Link from "next/link";
import GridItem from "./GridItem";

const Footer = () => {
  return (
    <GridItem className="text-sm text-zinc-400">
      <div className="">
       A Vidit Khandelwal Project
      </div>
      <div className="flex flex-row space-x-2 flex-wrap items-center">
        <Link
          className="text-zinc-400 hover:text-indigo-400 border-b border-b-indigo-400 w-fit transition-all duration-200 ease-in-out"
          href="https://github.com/csvidit/trimr"
        >
          project repo
        </Link>
        <Link
          className="text-zinc-400 hover:text-indigo-400 border-b border-b-indigo-400 w-fit transition-all duration-200 ease-in-out"
          href="https://viditkhandelwal.com"
        >
          viditkhandelwal.com
        </Link>
      </div>
    </GridItem>
  );
};

export default Footer;
