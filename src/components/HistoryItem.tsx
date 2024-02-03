import CopyArea from "./CopyArea";
import GridItem from "./GridItem";

const HistoryItem = (props: { clickCount: number; dateString: string; originalUrl: string; trimmedUrl: string }) => {
  return (
    <GridItem>
      <div className="text-zinc-400 text-base">{props.originalUrl}</div>
      <CopyArea>{props.trimmedUrl}</CopyArea>
      <div className="text-zinc-400 text-base">Number of clicks: {props.clickCount}</div>
    </GridItem>
  );
};

export default HistoryItem;
