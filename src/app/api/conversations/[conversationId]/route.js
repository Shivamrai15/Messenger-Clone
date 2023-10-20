import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(request, {params}){
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id){
            return new NextResponse("Unauthorized", {status : 401});

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

        return NextResponse.json(deletedConversation);

    } catch (error) {
        console.error(error, "Error Conversation Delete")
        return new NextResponse("Internal server error", {status : 500});
    }
}