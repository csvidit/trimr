import { BarLoader } from "react-spinners";
import Logo from "./Logo";

const Loading = () => {
  return (
    <main className="flex flex-col space-y-8 w-screen h-screen justify-center items-center">
      <span className="font-bold">
        <Logo />
        <span className="lg:text-xl ml-2 text-zinc-100">welcome to trimr</span>
      </span>
      <BarLoader className="lg:text-xl" color="#818cf8" />
    </main>
  );
};

export default Loading;
