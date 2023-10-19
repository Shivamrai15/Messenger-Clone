'use client';

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import useOtherUsers from "@/app/hooks/useOtherUsers";
import Avatar from "@/app/components/Avatar";

const ConversationBox = ({data, selected}) => {

    const otherUser = useOtherUsers(data);
    const session  = useSession();
    const router = useRouter();

    const handleClick = useCallback(()=>{
        router.push(`/conversations/${data.id}`)
    }, [data.id, router]);

    const lastMessage = useMemo(()=>{
        const messages = data.messages || [];
        return messages[messages.length-1]
    }, [data.messages]);

    const userEmail  = useMemo(()=>{
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    const hasSeen = useMemo(()=>{
        if(!lastMessage){
            return false;
        }
        const seenArray = lastMessage.seen || [];
        if (!userEmail){
            return false;
        }
        return seenArray.filter((user)=>user.email === userEmail).length !== 0;
    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo(()=>{
        if(lastMessage?.image){
            return "Image";
        }
        if (lastMessage?.body){
            return lastMessage.body;
        }
        return "Started a conversation";
    }, [lastMessage]);


    return (
        <div
            onClick={handleClick}
            className={clsx(`
                w-full
                relative
                flex
                items-center
                space-x-3
                hover:bg-neutral-300
                rounded-lg
                transition
                cursor-pointer
                p-3
            `, selected ? 'bg-neutral-100' : 'bg-white')}
        >
            <Avatar user={otherUser}/>
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-md text-gray-900 font-medium">
                            {data.name||otherUser.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p
                                className="
                                    text-xs
                                    text-gray-400
                                    font-light
                                "    
                            >
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className={clsx(`
                            truncate
                            text-xs
                        `, hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
                            {lastMessageText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox