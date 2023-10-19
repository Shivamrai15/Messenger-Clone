import client from "../libs/prismadb";
import getSession from "./getSessions";

const getUsers = async()=>{
    const session = await getSession();

    if(!session?.user.email){
        return [];
    }

    try {
        const users = await client.user.findMany({
            orderBy : {
                createdAt : 'desc',
            },
            where : {
                NOT : {
                    email : session.user.email
                }
            } 
        });
        return users;
    } catch (error) {
        return []
    }
}

export default getUsers;