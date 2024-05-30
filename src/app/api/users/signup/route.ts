import { connect } from '@../../../src/dbConfig/dbConfig';
import User from '@../../../src/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'

connect();

export const POST = async(request: NextRequest) => {
    try{
        const reqBody = await request.json();
        const { fullname, email, username, password } = reqBody;

        const user = await User.findOne({email});

        if(user) {
            return NextResponse.json({ error: 'User already exist' }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            username,
            password: hashedPassword,
            provider: "local"
        })
        const saveUser = await newUser.save();

        if(saveUser){
            return NextResponse.json({
                message: 'User created successfully',
                success: true,
                result: saveUser
            })
        }
    }
    catch(err: any){
        return NextResponse.json({error: err?.message}, {status: 500})
    }
}
