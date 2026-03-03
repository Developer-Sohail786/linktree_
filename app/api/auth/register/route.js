import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import clientPromise from "@/lib/mongodb";


export async function POST(req) {
    try {

        const client = await clientPromise
        const db = client.db()
        const body = await req.json()
        const { email, password } = body

        // Basic validation
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            )
        }


        // password rule from the frontend
        if (password.length < 8) {
            return NextResponse.json(

                { message: "Password must be atleat 8 characters" },
                { status: 400 }

            )
        }
        const normalizedEmail = email.toLowerCase()

        // if user already exist
        const existingUsr = await db.collection("users").findOne({ email: normalizedEmail })
        if (existingUsr) {
            return NextResponse.json(
                { message: "User already exist" },
                { status: 409 }
            )
        }
        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create user if not exist
        await db.collection("users").insertOne({
            email:normalizedEmail,
            password:hashedPassword,
            createdAt: new Date(),
        
        })


        return new NextResponse(
            JSON.stringify({ message: "user registered Succesfully" }),
            { status: 201,
                headers:{"Content-Type":"application/json"}
             }
        )
    } catch (error) {
        console.error("REGISTER ERROR", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )

    }
}