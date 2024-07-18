import { sendEmail } from '@/utils/commonUtils';
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

export const POST = async(req: NextRequest) => {
    try{
        const { email } = await req.json();
        if(!email) return NextResponse.json({error: 'email is required'}, {status: 400});

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const token = jwt.sign({email, code}, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        await sendEmail({
            email: email, 
            subject: "Confirm your email address", 
            text: `Your confirmation code is ${code}, enter it in the browser window where you’ve started signing up for Slack.`,
        }).then((res: any) => {
            if(res && res?.success) return NextResponse.json({message: 'Verification code send successfully', success: true, result: token});
            else return NextResponse.json({error: 'Verification failed', sucess: false});
        }).catch((err) => {
            return NextResponse.json({error: err?.message ?? 'Verification failed', sucess: false});
        });
    }
    catch(err: any){
        return NextResponse.json({ error: err?.message }, { status: 500 })
    }
}