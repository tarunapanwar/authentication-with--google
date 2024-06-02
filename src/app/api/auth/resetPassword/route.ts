import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModels";
import bcrypt from 'bcryptjs';
import { sendEmail } from "@/utils/commonUtils";

connect();

export const POST = async (req: NextRequest) => {
    const { newPassword, token } = await req.json(); 
    //const token = req.nextUrl.pathname.split('/').pop();
    const user = await User.findOne({
        forgotPasswordToken: token,
        $or: [
            { forgotPasswordTokenExpiry: { $gt: new Date() } },
            { forgotPasswordTokenExpiry: null }
        ]
    });

    if(user){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        user.password = hashedPassword;
        user.forgotPasswordToken = null;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        const res = await sendEmail({ email: user.email, subject: 'Password reset successfully', text: 'Your password has been reset successfully' });
        return NextResponse.json({ message: 'Your password reset successfully', success: true });
    }else{
        return NextResponse.json({ error: 'User not found' }, { status: 400 })
    }
}