import client from "../libs/prismadb";


const getMessages = async(conversationId)=>{
    try {
        const messages = await client.message.findMany({
            where : {
                conversationId : conversationId
            },
            include : {
                sender : true,
                seen : true
            },
            orderBy : {
                createdAt : 'asc'
            }
        });
        return messages;
    } catch (error) {
        return [];
    }
}

export default getMessages;