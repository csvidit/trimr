import Link from "next/link";
import CopyArea from "./CopyArea";
import GridItem from "./GridItem";

const HistoryItem = (props: { clickCount: number; dateString: string; originalUrl: string; trimmedUrl: string }) => {
  return (
    <GridItem>
      <Link href={props.originalUrl} className="text-zinc-400 text-base text-wrap text-clip">{props.originalUrl}</Link>
      <CopyArea>{props.trimmedUrl}</CopyArea>
      <div className="text-zinc-400 text-base">Number of clicks: {props.clickCount}</div>
    </GridItem>
  );
};

export default HistoryItem;
