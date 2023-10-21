'use client';

import useOtherUsers from "@/app/hooks/useOtherUsers";
import { useMemo, useState } from "react";
import Link from "next/link";
import {HiChevronLeft, HiEllipsisHorizontal} from 'react-icons/hi2'
import Avatar from "@/app/components/Avatar";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

const Header = ({conversation}) => {
    const otherUser = useOtherUsers(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const { members }  =  useActiveList();
    const isActive = members.indexOf(otherUser?.email) !== -1;

    const statusText = useMemo(()=>{
        if (conversation?.isGroup){
            return `${conversation.users.length} Members`
        }
        return isActive ? 'Online' : 'Offline'
    }, [conversation, isActive]);

    return (
        <>
            <ProfileDrawer 
                data = {conversation}
                isOpen = {drawerOpen}
                onClose = {()=>setDrawerOpen(false)}
            />
            <div className="
                bg-white
                w-full
                flex
                border-b-[1px]
                sm:px-4
                py-3
                px-4
                lg:px-6
                justify-between
                items-center
                shadow-sm
            ">
                <div className="flex gap-4 items-center">
                    <Link href = "/conversations"
                        className="lg:hidden block text-purple-600 hover:text-purple-700 transition"
                    >
                        <HiChevronLeft size={32}/>
                    </Link>
                    {conversation.isGroup ? (
                        <AvatarGroup users = {conversation.users}/>
                    ) : (
                        <Avatar user={otherUser} />
                    )}
                    <div className="flex flex-col">
                        <div className="font-medium">
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-xs font-light text-neutral-500">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal
                    size = {32}
                    onClick={()=>setDrawerOpen(true)}
                    className="
                        text-purple-600
                        lg:cursor-pointer
                        hover:text-purple-700
                        transition
                    "
                />
            </div>
        </>
    )
}

export default Header;