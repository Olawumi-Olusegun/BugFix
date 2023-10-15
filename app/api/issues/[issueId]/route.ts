import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: {
        issueId: string;
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { issueId: string }}) {
    
    try {
        
        const session = await getServerSession(authOptions);

        if(!session) {
            return NextResponse.json({}, {status: 401});
        }

        const body = await request.json() as Issue;
        const validation = patchIssueSchema.safeParse(body);

        if(!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400})
        }

        const { title, description, assignToUserId } = body;

        if(assignToUserId) {
           const user = await prisma.user.findUnique({
                where: { id: assignToUserId}
            });

            if(!user) {
                return NextResponse.json({ error: "Invalid user"}, { status: 400})
            }
        }

        const issue = await prisma.issue.findUnique({
            where: { id: parseInt(params?.issueId)}
        });

        if(!issue) {
            return NextResponse.json({ error: "Invalid issue"}, { status: 404})
        }

        const updatedIssue = await prisma.issue.update({
            where: { id: issue?.id},
            data: { title, description, assignToUserId }
        });

        if(!updatedIssue) {
            return NextResponse.json({ error: "Invalid issue"}, { status: 404}) 
        }

        return NextResponse.json(updatedIssue, { status: 200})

        
    } catch (error) {
        return NextResponse.json({ error: (error as any)?.message }, { status: 500})
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { issueId: string }}) {
    
    try {

        
        const session = await getServerSession(authOptions);

        if(!session) {
            return NextResponse.json({}, {status: 401});
        }
        
        const issue = await prisma.issue.findUnique({
            where: { id: parseInt(params?.issueId)}
        });

        if(!issue) {
            return NextResponse.json({ error: "Invalid issue"}, { status: 400})
        }

        const deletedIssue = await prisma.issue.delete({
            where: { id: parseInt(params?.issueId)}
        });

        if(!deletedIssue) {
            return NextResponse.json({ error: "Invalid issue"}, { status: 400})
        }

        return NextResponse.json({status: 200})

        
    } catch (error) {
        return NextResponse.json({ error: (error as any)?.message }, { status: 500})
    }
}