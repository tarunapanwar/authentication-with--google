import {connect} from '@/../../src/dbConfig/dbConfig';
import User from '@/../../src/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export const POST = async(request: NextRequest) => {
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;

        const user = await User.findOne(email);

        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 400});
        }

        const varifyToken = await bcryptjs.compare(password, user?.password);

        if(!varifyToken){
            return NextResponse.json({error: "Invalid password!"}, {status: 400});
        }

        const tokenData = {
            id: user?._id,
            username: user?.username,
            email: user?.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, { httpOnly: true })

        return response;
    }
    catch(err: any){
        return NextResponse.json({error: err?.message}, {status: 500})
    }
}