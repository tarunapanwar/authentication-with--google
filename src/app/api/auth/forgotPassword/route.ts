import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from '../../../../models/userModels';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from "@/utils/commonUtils";

connect()

export const POST = async (request: NextRequest) => {
    const { email } = await request.json();

    // check user exists or not
    const user = await User.findOne({email});
    if(user){
        const passwordResetToken = uuidv4();
        user.forgotPasswordToken = passwordResetToken;
        await user.save();
        const resetPasswordUrl = `${process.env.domain}/resetPassword/${passwordResetToken}`;
        const res = await sendEmail({
            email: email, 
            subject: "Password Reset Request", 
            text: `We received a request to reset your password for our app. Please click on the following link to reset your password: <a href="${resetPasswordUrl}">Reset Password</a>. If you did not request a password reset, please ignore this email.`,
        });
        return NextResponse.json({message: 'A password reset link has been sent to your email.', success: true})
    }
    else{
        return NextResponse.json({error: 'User not found'}, {status: 400});
    }
}