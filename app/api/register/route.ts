import {prisma} from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"


export async function POST (res: NextResponse) {

    try {
        const {name, email, password} = await res.json();

        if (!email || !password) return NextResponse.json({message: 'Missing feilds'}, {status: 400});

        const existingUser = await prisma.user.findUnique({where: {email}});

        if (existingUser) return NextResponse.json({message: "User alredy exist"}, {status: 409});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });

        return NextResponse.json({user: {id: user.id, email: user.email}}, {status: 201}); // if you're dumb asf return the hashed password

    } catch (error) {
        return NextResponse.json({message: error}, {status: 500})
    }
}