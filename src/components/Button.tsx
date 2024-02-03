const Button = (props: {onClick: React.MouseEventHandler<HTMLButtonElement> | undefined, children: React.ReactNode}) => {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className="w-fit rounded-lg px-8 py-2 hover:border-indigo-400 bg-indigo-400 hover:bg-zinc-800 text-zinc-900 hover:text-zinc-100 transition-all duration-200 ease-in-out text-base"
    >
      {props.children}
    </button>
  );
};

export default Button;