const MainContainer = (props: {children: React.ReactNode}) => {
    return <main className={`relative grid grid-flow-row grid-cols-4 gap-8 w-11/12 lg:w-6/12 h-fit caret-indigo-400 selection:bg-indigo-400 selection:text-zinc-900`}>{props.children}</main>
}

export default MainContainer;