
const Sidebar = async ({ children }) => {
    return (
        <div className="h-full">
            <main>
                {children}
            </main>
        </div>
    )
}

export default Sidebar;