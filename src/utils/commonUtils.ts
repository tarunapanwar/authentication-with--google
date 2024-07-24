import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Readable } from 'stream';

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
        return NextResponse.json({message: 'Email send successfully', success: true})
    }
    catch(err){
        return NextResponse.json({message: 'Failed to send email', success: false});
    }
}

export const StreamToBuffer = async (readableStream: Readable): Promise<Buffer> => {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
        readableStream.on('data', chunk => chunks.push(chunk));
        readableStream.on('end', () => resolve(Buffer.concat(chunks)));
        readableStream.on('error', reject);
    });
};