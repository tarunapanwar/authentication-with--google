import { connect } from '@../../../src/dbConfig/dbConfig';
import User from '@../../../src/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { sendEmail } from '@/utils/commonUtils';

connect();

export const POST = async(request: NextRequest) => {
    try{
        const reqBody = await request.json();
        const { email, username, password } = reqBody;

        const user = await User.findOne({email});

        if(user) {
            return NextResponse.json({ error: 'User already exist' }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            provider: "local"
        })
        const saveUser = await newUser.save();

        if(saveUser){
            const tokenData = {
                id: saveUser?._id,
                username: saveUser?.username,
                email: saveUser?.email
            }

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

            const res = sendEmail({email: email, subject: 'test subject', text: 'test text'});

            const response =  NextResponse.json({
                message: 'User created successfully and mail sent successfully',
                success: true,
                result: saveUser
            })
            response.cookies.set("token", token, { httpOnly: true });
            response.cookies.set("userId", saveUser._id);
            return response;
        }
    }
    catch(err: any){
        return NextResponse.json({error: err?.message}, {status: 500})
    }
}
