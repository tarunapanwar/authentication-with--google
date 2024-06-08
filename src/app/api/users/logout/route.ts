import { NextRequest, NextResponse } from "next/server";

export const GET = async() => {
    try{
        const response = NextResponse.json({
            message: 'Logout successfully',
            success: true
        });
        response.cookies.set('token', '', {httpOnly: true, expires: new Date(0)});
        return response;
    }
    catch(err){
        return NextResponse.json({error: err ?? "Failed to logout"}, {status: 500});
    }
}