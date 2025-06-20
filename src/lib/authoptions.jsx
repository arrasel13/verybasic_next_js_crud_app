import dbConnect, { collectionNames } from "@/lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch(
        //   `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/login`,
        //   {
        //     method: "POST",
        //     body: JSON.stringify(credentials),
        //     headers: { "Content-Type": "application/json" },
        //   }
        // );
        // const user = await res.json();
        const { username, password } = credentials;

        const user = await dbConnect(collectionNames.TEST_USER).findOne({
          username,
        });
        const isPasswordOK = password === user.password;
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        // If no error and we have user data, return it
        // if (res.ok && user) {
        if (isPasswordOK) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account) {
        try {
          // console.log(
          //   "From sign in callback: ",
          //   user,
          //   account,
          //   profile,
          //   email,
          //   credentials
          // );
          const { providerAccountId, provider } = account;
          const { email: user_email, image, name } = user;

          const payload = {
            providerAccountId,
            provider,
            user_email,
            image,
            name,
            role: "user",
          };

          const userCollection = dbConnect(collectionNames.TEST_USER);
          const isUserExist = await userCollection.findOne({
            providerAccountId,
          });

          if (!isUserExist) {
            await userCollection.insertOne(payload);
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }

      return true;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
  },
};
