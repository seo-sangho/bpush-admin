import { NextAuthConfig } from 'next-auth';
// import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/prisma/client';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    // 사용자 credentials은 사용하지 않음
    // CredentialProvider({
    //   credentials: {
    //     email: {
    //       type: 'email',
    //     },
    //     password: {
    //       type: 'password',
    //     },
    //   },
    //   async authorize(credentials, req) {
    //     const user = {
    //       id: '1',
    //       name: 'John',
    //       email: credentials?.email as string,
    //     };
    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user;
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null;

    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   },
    // }),
  ],
  pages: {
    signIn: '/', //sigin page
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(`signIn: user`, user);
      // console.log(`signIn: account`, account);
      // console.log(`signIn: profile`, profile);

      let isAllowedToSignIn = false;

      try {
        const getUser: Object | null = await prisma.user.findUnique({
          where: {
            LOGIN_ID: user.email!,
          },
        });
        // console.debug('New User:', user);

        if (!getUser) {
          // await prisma.users.create({
          //   data: {
          //     LOGIN_ID: user.email!,
          //     NAME: user.name,
          //     COMPANY_CODE: '',
          //     PROVIDER: account!.provider,
          //     UUID: user.id!,
          //     EMAIL: user.email!,
          //   },
          // });

          return '/user/join';
          // return true;
        } else {
          isAllowedToSignIn = true;
        }
      } catch (err) {
        console.error(err);
        return '/not-found';
      }

      if (isAllowedToSignIn) {
        // return true;
        return true;
      } else {
        // Return false to display a default error message
        // return false;
        // return '/not-found';
        // Or you can return a URL to redirect to:
        return '/unauthorized';
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(`jwt:`, token, user, account, profile);
      return token;
    },
    async session({ session, user, token }) {
      console.log(
        `session: ${JSON.stringify(session)} user: ${JSON.stringify(
          user,
        )} token: ${JSON.stringify(token)}`,
      );
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export default authConfig;
