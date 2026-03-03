import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; //to use email+password
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs"
import clientPromise from "@/lib/mongodb";







//nextauth config

export const authOptions = {
    debug: process.env.NODE_ENV === "development",
    // using jwt session 
    session: {
        strategy: "jwt"
    },
    // for now using Credentialsproviders for email and password, later wil OAuth(goggle,github)
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", "type": "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                //check credentials existence
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password")
                }
                // get mongodb client
                const client = await clientPromise;
                const db = client.db()
                const email = credentials.email.toLowerCase()

                //find user
                const user = await db.collection("users").findOne({ email })

                if (!user || !user.password) {
                    throw new Error("Invalid email or password")
                }
                //compare password with hashed
                const isPasswordValid = await bcrypt.compare(
                    credentials.password, user.password
                )
                if (!isPasswordValid) {
                    throw new Error("Invalid email or password")
                }
                return {
                    id: user._id.toString(), //for session
                    email: user.email
                }
            }
        }),
        // Google Auth
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
        // Github Auth
    ],

    // callbacks
    callbacks: {
        // jwt callbacks runs when user logs in or token is created or updated
      async signIn({ user, account }) {
  if (account.provider === "google") {
    const client = await clientPromise
    const db = client.db("Linktree")

    let existingUser = await db
      .collection("users")
      .findOne({ email: user.email })

    if (!existingUser) {
      const result = await db.collection("users").insertOne({
        email: user.email.toLowerCase(),
        provider: "google",
        createdAt: new Date()
      })

      user.id = result.insertedId.toString()
    } else {
      user.id = existingUser._id.toString()
    }
  }

  return true
},

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        //session callback runs when useSession() is called
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id
            }
            return session
        }

    },
    //telling nextauth to use my login page
    pages: {
        signIn: "/login",
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }