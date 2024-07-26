import { connect } from '@../../../src/dbConfig/dbConfig';
import Workspace from '@/models/Workspace';
import User from '@/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/utils/commonUtils';

connect();

export const POST = async(req: NextRequest) => {
    try{
        const reqBody = await req.json();
        if(reqBody){
            const { name, logo, projectName, allTeamMembers, isAdmin, email } = reqBody;
            const newWorkspace = new Workspace ({
                name,
                logo,
                projectName,
                isAdmin
            });
            const emails = allTeamMembers?.split(',')?.map((e: any) => e?.trim());
            const users = await User.find({ email: { $in: emails }}).select('email');
            const existingEmails = new Set(users?.map(user => user?.email));
            const notExistingEmails = emails?.filter((email: any) => !existingEmails?.has(email));
            const documents = notExistingEmails?.map((newUser: any) => {
                return new User({ email: newUser, username: newUser?.split('@')[0], provider: 'workspace' });
            });
            const workspaces = await User.insertMany(documents);
            if(workspaces && workspaces?.length > 0){
                const existingEmailList = Array.from(existingEmails)
                if(existingEmails){
                    const slackOpenUrl = `${process.env.domain}/login`;
                    sendEmail({
                        email: existingEmailList as any, 
                        subject: `Welcome to your new workspace!`, 
                        text: `Here are the details for your new Slack workspace, ${projectName}. open slack ${slackOpenUrl}.`
                    })
                }
                if(notExistingEmails && notExistingEmails?.length > 0){
                    const createAccUrl = `${process.env.domain}/signup`;
                    sendEmail({
                        email: notExistingEmails, 
                        subject: `Accept ${projectName} invitation`, 
                        text: `${name} (${email}) has invited you to use Slack with them, in a workspace called ${projectName}. Join slack ${createAccUrl}.`
                    })
                }
                const saveWorkspace = await newWorkspace.save();
                if(saveWorkspace){
                    const response =  NextResponse.json({
                        message: 'Workspace created successfully and mail sent successfully',
                        success: true,
                        result: {
                            id: saveWorkspace?._id,
                            name: saveWorkspace?.name
                        }
                    });
                    if(response) return response;
                    else return NextResponse.json({message: 'Something went wrong'}, {status: 400})
                } else NextResponse.json({ error: "Failed to save " })
            }
        }
    }
    catch(err: any){
        return NextResponse.json({ error: err?.message }, { status: 500 })
    }
}