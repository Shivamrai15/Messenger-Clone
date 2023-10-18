import bcrypt from 'bcrypt';
import client from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';


export const POST = async(request)=>{
    try{
        const {name, email, password} = await request.json();
        if (!email || !name || !password){
            return new NextResponse('Missing Info', {status:500})
        }
        const salt  = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await client.user.create({
        data : {
            email,
            name,
            hashedPassword
        } 
        });

        return NextResponse.json({
            success : true,
            user,
            status : 201
        });
    } catch(error){
        console.log("REGISTRATION ERROR", error);
        return NextResponse.json({
            success : false,
            message : error.message,
            status : 500
        });
    }
};