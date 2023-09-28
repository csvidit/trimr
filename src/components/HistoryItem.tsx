import CopyArea from "./CopyArea";
import GridItem from "./GridItem";

const HistoryItem = (props: { originalUrl: string; trimmedUrl: string }) => {
  return (
    <GridItem>
      <div className="text-zinc-400 text-base">{props.originalUrl}</div>
      <CopyArea>{props.trimmedUrl}</CopyArea>
    </GridItem>
  );
};

export default HistoryItem;
