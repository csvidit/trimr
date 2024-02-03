import Link from "next/link";
import GridItem from "./GridItem";
import SecondaryLink from "./SecondaryLink";

const Footer = () => {
  return (
    <GridItem className="*:text-sm text-zinc-400">
      <div className="">
       A Vidit Khandelwal Project
      </div>
      <div className="flex flex-row space-x-2 flex-wrap items-center">
        <SecondaryLink
          href="https://github.com/csvidit/trimr"
        >
          project repo
        </SecondaryLink>
        <SecondaryLink
          href="https://viditkhandelwal.com"
        >
          viditkhandelwal.com
        </SecondaryLink>
      </div>
    </GridItem>
  );
};

export default Footer;
