import Link from "next/link";

const SecondaryLink = (props: { href: string; children: React.ReactNode}) => {
  return (
    <Link
      className="text-zinc-400 hover:text-indigo-400 border-b border-b-indigo-400 w-fit transition-all duration-200 ease-in-out"
      href={props.href}
      target={props.href.startsWith("https") ? "_blank" : "_self"}
    >
      {props.children}
    </Link>
  );
};

export default SecondaryLink;