import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const sendEmail = async ({email, subject, text}: {email: string, subject: string, text: string}) => {
    try{
        const transporter = nodemailer.createTransport({
            service: process.env.GMAIL_SERVICE,
            host: process.env.GMAIL_HOST,
            port: 587,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: subject,
            text: text
        });
        //console.log('Email send successfully');
        return NextResponse.json({message: 'Email send successfully', success: true})
    }
    catch(err){
        //console.log('Failed to send email');
        return NextResponse.json({message: 'Failed to send email', success: false});
    }
}