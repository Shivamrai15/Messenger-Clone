import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {HiChat} from 'react-icons/hi';
import {HiArrowLeftOnRectangle, HiUsers} from 'react-icons/hi2';
import { signOut} from "next-auth/react";
import useConversation from "./useConversation";
import { useRouter } from "next/navigation";




const useRoutes = ()=>{
    const navRoutes = useRouter();
    const pathname = usePathname();
    const {conversationId} = useConversation();

    const routes = useMemo(()=>[{
        label : 'Chat',
        href : '/conversations',
        icon : <HiChat className="h-6 w-6 shrink-0"/>,
        active : pathname === '/conversations' || !!conversationId
    },
    {
        label : 'Users',
        href : '/users',
        icon : <HiUsers className="h-6 w-6 shrink-0"/>,
        active : pathname === '/users'
    },
    {
        label : 'Logout',
        href : '#',
        onClick : ()=>{
            signOut()
            navRoutes.refresh();
            navRoutes.push('/');
        },
        icon : <HiArrowLeftOnRectangle className="h-6 w-6 shrink-0"/>
    }
    ], [pathname, conversationId]);

    return routes;
}

export default useRoutes;