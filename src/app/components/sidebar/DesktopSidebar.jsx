'use client';
import useRoutes from "@/app/hooks/useRoute";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";
import SettingModal from "./SettingModal";

const DesktopSidebar = ({currentUser}) => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <SettingModal
                isOpen = {isOpen}
                onClose = {()=>setIsOpen(false)}
                currentUser = {currentUser}
            />     
            <div 
                className="
                    hidden
                    lg:fixed
                    lg:inset-y-0
                    lg:left-0
                    lg:z-40
                    lg:w-20
                    xl:px-6
                    lg:overflow-y-auto
                    lg:bg-white
                    lg:border-r-[1px]
                    lg:pb-4
                    lg:flex
                    lg:flex-col
                    justify-between
                "
            >
                <nav className="
                    mt-4
                    flex
                    flex-col
                    justify-between
                ">
                    <ul
                        role="list"
                        className="flex flex-col items-center space-y-1"
                    >
                        {routes.map((item)=>(
                            <DesktopItem
                                key = {item.label}
                                href = {item.href}
                                label = {item.label}
                                icon = {item.icon}
                                active = {item.active}
                                onClick = {item.onClick}
                            />
                        ))}
                    </ul>
                </nav>
                <nav className="
                    mt-4
                    flex
                    flex-col
                    justify-center
                    items-center
                ">
                    <div
                        onClick={()=>setIsOpen(true)}
                        className="
                            cursor-pointer
                            hover:opacity-75
                            transition
                        "
                    >
                        <Avatar user = {currentUser} />
                    </div>
                </nav>
            </div>
        </>
    )
}

export default DesktopSidebar;