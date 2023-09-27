const MainContainer = (props: {children: React.ReactNode}) => {
    return <main className={`grid grid-flow-row grid-cols-4 gap-8 w-11/12 lg:w-6/12 h-full`}>{props.children}</main>
}

export default MainContainer;