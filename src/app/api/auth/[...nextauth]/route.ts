// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: '이메일', type: 'text', placeholder: '이메일 주소를 입력해 주세요.' },
                password: { label: '비밀번호', type: 'password' },
            },
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                })
                const user = await res.json()
                console.log('$$$user: ', user)

                if (user) {
                    // 반환된 모든 객체는 JWT의 '사용자' 속성에 저장됩니다.
                    return {
                        id: user.id, // ✅ 이건 있어야 하고
                        name: user.name, // ✅ 필요하다면 name도 추가
                        email: user.email,
                        role: user.role, // ✅ 핵심!
                    };
                } else {
                    // null을 반환하면 사용자에게 세부 정보를 확인하라는 오류가 표시됩니다. null 반환
                    return null

                    // 이 콜백은 오류로 거부할 수도 있으므로 사용자는 오류 메시지를 쿼리 매개변수로 사용하여 오류 페이지로 전송됩니다.
                }

            },
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
            console.log('$$$ token: ', token)
            session.user = {
                name: token.name,
                email: token.email,
                role: token.role,
            };
            console.log('$$$ session: ', session)
            return session;
        },
    },
    pages:{
        signIn: '/ko/auth/signin',
        signOut: '/ko/auth/signout',
        error: '/ko/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/ko/auth/verify-request', // (used for check email message)
        newUser: '/ko/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
})

export { handler as GET, handler as POST }