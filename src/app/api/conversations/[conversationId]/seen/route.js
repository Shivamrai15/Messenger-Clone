import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST (request, {params} ){
    try {
        const currentUser = await getCurrentUser();
        const {conversationId} = params;

        if (!currentUser?.id || !currentUser?.email){
            return new NextResponse("Unauthorized", {status : 401});
        }

        // Finding the existing conversation

        const conversation = await client.conversation.findUnique({
            where : {
                id : conversationId,
            },
            include : {
                messages : {
                    include : {
                        seen : true
                    }
                },
                users : true
            }
        });

        if (!conversation){
            return new NextResponse('Invalid Id', {status : 400});
        }

        // finding the last message

        const lastMessage = conversation.messages[conversation.messages.length-1];

        if (!lastMessage){
            return NextResponse.json(conversation);
        }

        // Update seen last message

        const updateMessage  = await client.message.update({
            where : {
                id : lastMessage.id
            },
            include :{
                sender : true,
                seen : true
            },
            data : {
                seen : {
                    connect  : {
                        id : currentUser.id
                    }
                }
            }
        });

        await pusherServer.trigger(currentUser.email, 'conversation:update', {
            id : conversationId,
            messages : [updateMessage]
        });

        if (lastMessage.seenIds.indexOf(currentUser.id) !== -1){
            return NextResponse.json(conversation);
        }

        await pusherServer.trigger(conversationId, 'message:update', updateMessage);

        return new NextResponse('Success');

        
    } catch (error) {
        console.error(error , "Error Messages Seen");
        return new NextResponse("Internal Error", {status : 500})
    }
}
