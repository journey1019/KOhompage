// app/api/auth/[...nextauth]/route.ts
import { RequestInternal } from 'next-auth'
import NextAuth from 'next-auth/next'
import { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import KakaoProvider from "next-auth/providers/kakao";
import prisma from '@/app/lib/prisma'
import * as bcrypt from 'bcrypt'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: '이메일', type: 'text' },
                password: { label: '비밀번호', type: 'password' },
            },
            async authorize(
                credentials: Record<'username' | 'password', string> | undefined,
                req: Pick<RequestInternal, 'method' | 'body' | 'headers' | 'query'>
            ): Promise<User | null> {
                if (!credentials?.username || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.username },
                });

                if (!user || !user.password) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;

                return {
                    id: String(user.id),
                    name: user.name ?? '관리자',
                    email: user.email,
                    role: user.role,
                };
            }
        }),
        // 카카오 프로바이더
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!
        })
    ],
    callbacks:{
        // token 정보와 user 정보를 하나의 object로 return
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },

        async session({ session, token }) {
            // console.log('$$$ token: ', token)
            session.user = {
                name: token.name,
                email: token.email,
                role: token.role,
            };
            // console.log('$$$ session: ', session)
            return session;
        },
    },
    debug: true,
    pages:{
        signIn: '/ko/auth/signin',
        signOut: '/ko/auth/signout',
        error: '/ko/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/ko/auth/verify-request', // (used for check email message)
        newUser: '/ko/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
})

export { handler as GET, handler as POST }