import GridItem from "./GridItem";

const Error = () => {
  return (
    <GridItem>
      <span className="font-bold">
        <span className="ml-2 text-emerald-400">error</span>
        <span className="ml-2 text-zinc-400 font-normal">
          something went wrong; please try again
        </span>
      </span>
    </GridItem>
  );
};

export default Error;
