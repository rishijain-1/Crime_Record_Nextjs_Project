import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectMongo from '@/libs/db';
import User from '@/model/userModel';
import { GET } from '../../users/route';

export const authOptions :NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectMongo();

        // Find user by email
        const user = await User.findOne({ email: credentials?.email });

        // If no user or password mismatch, return null
        if (!user || !(await bcrypt.compare(credentials?.password || '', user.password))) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/en/login' || '/hi/login', // Ensure you handle localization in your routing setup
  },
};

const handler = NextAuth(authOptions);
export {handler as GET , handler as POST }