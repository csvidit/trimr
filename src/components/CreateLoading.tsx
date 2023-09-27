import GridItem from "./GridItem";

const CreateLoading = () => {
  return (
    <GridItem>
      <span className="font-bold">
        <span className="ml-2">creating...</span>
        <span className="ml-2 text-zinc-400 font-normal">
          be patient
        </span>
      </span>
    </GridItem>
  );
};
export default CreateLoading;