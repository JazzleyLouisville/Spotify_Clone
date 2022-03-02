import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/github"
import { refreshAccessToken } from "spotify-web-api-node/src/server-methods"
import { LOGIN_URL } from "../../../lib/spotify"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages:{
    signIn: '/login'
  },
  callbacks:{
    async jwt({ token, account, user}){
      //initial sign in
      if(account && user){
        return{
          ...token,
          accesToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accesTokenExpires: account.expires_at * 1000, // handling the expiration times in milliseconds hence * 1000

        }
      }

      //refresh token, return the previous token if access token has not expired yet
      if( Date.now() < token.accesTokenExpires){
        console.log("Existing acces token is valid");
        return token;
      }

      // if access token has expired, refresh it
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
      return await refreshAccessToken(token);
    }
  }
})