import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import client from "@/app/libs/prismadb";


export async function POST(request){
    try {
        const currentUser = await getCurrentUser();
        const {userId, isGroup, members, name} = await request.json();
        if (!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized', {status : 401});
        }

        if(isGroup && (!members || members.length < 2 || !name)){
            return new NextResponse('Invalid data', {status : 400});
        }

        if (isGroup){
            const newConversation = await client.conversation.create({
                data : {
                    name,
                    isGroup,
                    users : {
                        connect : [
                            ...members.map((member)=>({
                                id : member.value
                            })),
                            {
                                id : currentUser.id
                                
                            }
                        ]
                    }
                },
                include : {
                    users : true
                }
            });

            return NextResponse.json(newConversation);
        }

        const existingConversations = await client.conversation.findMany({
            where : {
                OR : [
                    {
                        userIds : {
                            equals : [currentUser.id, userId]
                        }
                    },
                    {
                        userIds : {
                            equals : [userId, currentUser.id]
                        }
                    }
                ]
            }
        });

        const singleConversation = existingConversations[0];
        if(singleConversation){
            return NextResponse.json(singleConversation);
        }

        const newConversation = await client.conversation.create({
            data : {
                users : {
                    connect : [
                        {
                            id : currentUser.id
                        }, 
                        {
                            id : userId
                        }
                    ]
                }
            }, 
            include : {
                users : true
            }
        })

        return NextResponse.json(newConversation);
        
    } catch (error) {
        return new NextResponse('Internal Error', {status:500})
    }
}
