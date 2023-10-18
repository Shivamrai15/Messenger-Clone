import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import client from '@/app/libs/prismadb';

export const authOptions = {
    adapter : PrismaAdapter(client),
    providers : [
        GithubProvider({
            clientId : process.env.GITHUB_CLIENT_ID,
            clientSecret : process.env.GITHUB_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name : 'credentials',
            credentials : {
                email : { label : 'email', type : 'text'},
                password : {label : 'password', type : 'password'}
            },
            async authorize(credentials){
                if (!credentials ?. email || !credentials ?. password ){
                    throw new Error('Invalid Credentials');
                }
                const user = await client.user.findUnique({
                    where : {
                        email : credentials.email
                    }
                })

                if (!user || !user.hashedPassword){
                    throw new Error('Invalid Credentials');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if (!isCorrectPassword){
                    throw new Error('Invalid Credentials');
                }

                return user;
            }
             
        })
    ],
    debug : process.env.NODE_ENV === 'development',
    session : {
        strategy : 'jwt',
    },
    secret : process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export {handler as GET , handler as POST};