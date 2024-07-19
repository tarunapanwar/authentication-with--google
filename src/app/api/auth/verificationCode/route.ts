import { sendEmail } from '@/utils/commonUtils';
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

export const POST = async(req: NextRequest) => {
    try{
        const { email } = await req.json();
        if(!email) return NextResponse.json({error: 'email is required'}, {status: 400});

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const token = jwt.sign({email, code}, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = await sendEmail({
            email: email, 
            subject: "Confirm your email address", 
            text: `Your confirmation code is ${code}, enter it in the browser window where you’ve started signing up for Slack.`,
        });

        if(response && response?.ok) return NextResponse.json({message: 'Verification code send successfully', success: true, result: token});
        else return NextResponse.json({error: 'Verification failed', sucess: false});
    }
    catch(err: any){
        return NextResponse.json({ error: err?.message }, { status: 500 })
    }
}

interface DecodedToken {
    email: string;
    code: string;
}

export const GET = async(req: NextRequest) => {
    try{
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');
        const code = searchParams.get('code');
        if(!token || !code) return NextResponse.json({message: 'Verification token and code is required'});
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        if(decoded?.code === code.toString()) return NextResponse.json({message: 'Code verified successfully', success: true}, {status: 200});
        else return NextResponse.json({error: 'Invalid token'}, {status: 400})
    }
    catch(err: any){
        return NextResponse.json({ error: err?.message }, { status: 500 })
    }
}