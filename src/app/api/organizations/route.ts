import { connect } from '@../../../src/dbConfig/dbConfig';
import Organization from '@/models/Organization';
import { NextRequest, NextResponse } from 'next/server';

connect();

export const POST = async(req: NextRequest) => {
    try{
        const reqBody = await req.json();
        if(reqBody){
            const { teamName, logo, projectName, teamMembers, isAdmin } = reqBody;
            const newOrganization = new Organization ({
                teamName,
                logo,
                projectName,
                // teamMembers,
                isAdmin
            });
            console.log(newOrganization);
            const saveOrganization = await newOrganization.save();
            if(saveOrganization){
                const response =  NextResponse.json({
                    message: 'Workspace created successfully and mail sent successfully',
                    success: true,
                    result: {
                        id: saveOrganization?._id,
                        name: saveOrganization?.name
                    }
                });
                if(response) return response;
                else return NextResponse.json({message: 'Something went wrong'}, {status: 400})
            }
        }
    }
    catch(err: any){
        return NextResponse.json({ error: err?.message }, { status: 500 })
    }
}