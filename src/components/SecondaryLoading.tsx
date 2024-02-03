import { BarLoader } from "react-spinners";
import Logo from "./Logo";
import GridItem from "./GridItem";

const SecondaryLoading = (props: {children: React.ReactNode}) => {
  return (
    <GridItem>
      <Logo />
      <span className="text-2xl ml-2 text-zinc-100">{props.children}</span>
      <BarLoader className="text-2xl " color="#818cf8" />
    </GridItem>
  );
};

export default SecondaryLoading;
