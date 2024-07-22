import { connect } from '@../../../src/dbConfig/dbConfig';
import Organization from '@/models/Organization';
import User from '@/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/utils/commonUtils';

connect();

export const POST = async(req: NextRequest) => {
    try{
        const reqBody = await req.json();
        if(reqBody){
            const { teamName, logo, projectName, allTeamMembers, isAdmin, email } = reqBody;
            const newOrganization = new Organization ({
                teamName,
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
            const workspaceOrganizations = await User.insertMany(documents);
            if(workspaceOrganizations && workspaceOrganizations?.length > 0){
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
                        subject: `Accept ${teamName} invitation to Slack`, 
                        text: `${teamName} (${email}) has invited you to use Slack with them, in a workspace called ${projectName}. Join slack ${createAccUrl}.`
                    })
                }
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
    }
    catch(err: any){
        return NextResponse.json({ error: err?.message }, { status: 500 })
    }
}