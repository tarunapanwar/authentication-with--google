import { connect } from '@../../../src/dbConfig/dbConfig';
import User from '@../../../src/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
import { BlobServiceClient } from "@azure/storage-blob";
import { StreamToBuffer } from '@/utils/commonUtils';

connect();

export const GET = async(request: NextRequest, context: any) => {
    try{
        const {id} = context?.params;
        if(!id) return NextResponse.json({ error: 'User not found' }, { status: 400 });

        const user = await User.findById(id);
        if(!user) return NextResponse.json({ error: 'User not found' }, { status: 400 });

        if(user?.pic){
            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING!);
            const containerClient = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME!);
            const blockBlobClient = containerClient.getBlockBlobClient(user?.pic);

            // download profile picture
            const downloadResponse = await blockBlobClient.download(0);
            const downloadedData = await StreamToBuffer(downloadResponse.readableStreamBody as any);

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
                    about: user?.about,
                    profilePicture: downloadedData?.toString('base64')
                }
            });
            return response;
        }
        else{
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
    }
    catch(err: any){
        console.log('error', err);
        return NextResponse.json({ error: err?.message }, { status: 500 })
    }
}

export const PUT = async(req: NextRequest, context: any) => {
    try{
        const formData = await req.formData();
        const { id } = context?.params;
        if(!id) return NextResponse.json({message: 'Invalid id'}, {status: 400});
        if(formData){
            const otherFormdata: any = { };
            formData.forEach((val, key) => {
                if(key != 'file') otherFormdata[key] = val;
            });
            const file = formData.get('file') as File;
            if(file){
                const allowedFileTypes = ["image/jpeg", "image/png"];
                if(!allowedFileTypes.includes(file?.type)) return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
                const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING!);
                const containerClient = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME!);
                const folderPath = 'user-uploads'; 
                const fileName = `${folderPath}/${id}/profile`; 
                const blockBlobClient = containerClient.getBlockBlobClient(fileName);
                const buffer = await file.arrayBuffer();
                await blockBlobClient.uploadData(new Uint8Array(buffer));
                const updateUser = await User.findByIdAndUpdate(id, {...otherFormdata, pic: fileName}, {new: true});
                if(updateUser){
                    return NextResponse.json({
                        message: 'User updated successfully',
                        success: true,
                        result: updateUser
                    })
                } else return NextResponse.json({ error: 'Failed to update user' }, { status: 400 });
            } else {
                const updateUser = await User.findByIdAndUpdate(id, otherFormdata, {new: true});
                if(updateUser){
                    return NextResponse.json({
                        message: 'User updated successfully',
                        success: true,
                        result: updateUser
                    })
                } else return NextResponse.json({ error: 'Failed to update user' }, { status: 400 });
            }
        } 
        else return NextResponse.json({message: 'No data found to update'}, {status: 400})
    }
    catch(err: any){
        return NextResponse.json({error: err?.message}, {status: 500})
    }
}

export const DELETE = async(req: NextRequest, context: any) => {
    try{
        // if(!id)
    } 
    catch(err: any){
        return NextResponse.json({error: err?.message}, {status: 500})
    }
}