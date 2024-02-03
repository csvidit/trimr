import Link from "next/link";
import Logo from "./Logo";

const Intro = () => {
  return (
    <div className="p-8 h-fit rounded-2xl col-span-4 flex flex-col space-y-4 bg-zinc-900 lg:text-xl text-zinc-100">
      <Link href="/" className="font-bold">
        <Logo />
        <span className="ml-2">trimr</span>
        <span className="ml-2 text-zinc-400 font-normal">
          url shortener service
        </span>
      </Link>
    </div>
  );
};

export default Intro;
