import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest) => {
    try{
        const token = request.cookies.get('token')?.value ?? '';
        var decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken;
    }
    catch(err){
        console.log(err ?? 'Error in getting data from token');
        return null;
    }
}