import { connect } from '@../../../src/dbConfig/dbConfig';
import User from '@../../../src/models/userModels';
import { NextRequest, NextResponse } from 'next/server';

connect();

export const GET = async(request: NextRequest, context: any) => {
    try{
        const {id} = context?.params;
        if(id){
            const user = await User.findById(id);
            if(!user) return NextResponse.json({ error: 'User not found' }, { status: 400 });
            else {
                const response = NextResponse.json({
                    message: 'success',
                    success: true,
                    result: {
                        fullname: user?.fullname,
                        displayName: user?.displayName,
                        title: user?.title,
                        number: user?.number,
                        email: user?.email,
                        username: user?.username,
                        about: user?.about
                    }
                });
                return response;
            }
        } else return NextResponse.json({ error: 'User not found' }, { status: 400 })
    }
    catch(err: any){
        return NextResponse.json({ error: err?.message }, { status: 500 })
    }
}

export const PUT = async(req: NextRequest, context: any) => {
    try{
        const reqBody = await req.json();
        const { id } = context?.params;
        if(id){
            const updateUser = await User.findByIdAndUpdate(id, reqBody, {new: true});
            return NextResponse.json({
                message: 'User updated successfully',
                success: true,
                result: updateUser
            })
        } 
        else return NextResponse.json({message: 'User not found'}, {status: 400})
    }
    catch(err: any){
        return NextResponse.json({error: err?.message}, {status: 500})
    }
}