import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const res = await userLogIn(credentials.email, credentials.password);
          const data = (res as { data?: { token?: string; user?: { _id?: string; name?: string; email?: string; role?: string } } }).data;
          const token = res.token ?? data?.token;
          const user = data?.user;
          const email = res.email ?? user?.email ?? credentials.email;
          const name = res.name ?? user?.name ?? email;
          const _id = user?._id ?? "";
          const role = user?.role ?? "user";
          if (!token) return null;
          return { id: _id, _id, name, email, role, token };
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = (user as { _id?: string })._id;
        token.role = (user as { role?: string }).role;
        token.accessToken = (user as { token?: string }).token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { _id?: string })._id = token._id as string;
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { token?: string }).token = token.accessToken as string;
      }
      return session;
    },
  },
  pages: { signIn: "/api/auth/signin" },
};
