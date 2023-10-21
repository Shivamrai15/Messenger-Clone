import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function DELETE(request, {params}){
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id){
            return NextResponse.json(null);

        }
        
        const existingConverstaion = await client.conversation.findUnique({
            where : {
                id : conversationId
            },
            include : {
                users : true
            }
        });

        if (!existingConverstaion){
            return new NextResponse("Invalid Id", {status : 400});
        }

        const deletedConversation = await client.conversation.deleteMany({
            where : {
                id : conversationId,
                userIds : {
                    hasSome : [currentUser.id]
                }
            }
        });

        existingConverstaion.users.forEach((user)=>{
            pusherServer.trigger(user.email, 'conversation:remove', existingConverstaion);
        });

        return NextResponse.json(deletedConversation);

    } catch (error) {
        console.error(error, "Error Conversation Delete")
        return new NextResponse("Internal server error", {status : 500});
    }
}