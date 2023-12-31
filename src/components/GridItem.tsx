const GridItem = (props: {children: React.ReactNode; className?: string}) => {
    return <div className={`p-8 h-fit rounded-2xl col-span-4 flex flex-col space-y-4 bg-zinc-900 text-2xl text-zinc-100 ${props.className}`}>{props.children}</div>
}

export default GridItem;