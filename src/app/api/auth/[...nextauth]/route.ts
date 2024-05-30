import { connect } from '../../../../dbConfig/dbConfig';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../../models/userModels'; 

connect();

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
    })
],
session: {
    strategy: 'jwt',
    // maxAge: 100000, // 30 seconds
},
callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try{
        const isExistingUser = await User.findOne({ email: user.email });
        if(!isExistingUser){
          const newUser = new User({
            fullname: user.name,
            email: user.email,
            username: user.email?.split('@')[0],
            authId: profile?.sub,
            provider: "google"
          });
          await newUser.save();
        }
      }
      catch(err){
        console.log(err ?? 'something went wrong');
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  }
})

export { handler as GET, handler as POST }
