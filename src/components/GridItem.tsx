import { twMerge } from "tailwind-merge";

const GridItem = (props: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={twMerge(
        "p-8 h-fit rounded-2xl col-span-4 flex flex-col space-y-4 bg-zinc-900 lg:text-xl text-zinc-100 *:text-wrap",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default GridItem;
