import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";

export default async function ConversationLayout({children}){
    const conversations = await getConversations();
    const users = await getUsers();

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList 
                    users = {users}
                    initialItems = {conversations}
                />
                {children}
            </div>
        </Sidebar>
    );
}