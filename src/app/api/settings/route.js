import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const currentUser = await getCurrentUser();
        const {name, image} = await request.json();

        if (!currentUser?.id){
            return new NextResponse('Unauthorized', {status : 401});
        }

        const updatedUser = await client.user.update({
            where : {
                id : currentUser.id
            },
            data : {
                image,
                name
            }
        });

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.error(error, "Settings Error");
        return new NextResponse('Internal Error', {status : 500});
    }
}