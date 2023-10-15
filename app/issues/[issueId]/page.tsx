import React from 'react';;
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueBotton from './DeleteIssueBotton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import IssueFilter from '../list/IssueStatusFilter';

interface Props {
    params: {
        issueId: string;
    }
}

const IssueDetailPage = async ({ params}: Props ) => {

    const session = await getServerSession(authOptions);

    const issueId = parseInt(params?.issueId)

    if(typeof issueId !== 'number') {
        return notFound();
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params?.issueId) }
    });

    if(!issue) {
        return notFound();
    }


  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className='md:col-span-4'>
            <IssueDetails issue={issue} />
        </Box>
        {
            session && (
            <Box>
                <Flex direction="column" gap="4">
                    <AssigneeSelect issue={issue} />
                    <EditIssueButton issueId={issue?.id} />
                    <DeleteIssueBotton issueId={issue?.id} />
                </Flex>
            </Box>

            )
        }
    </Grid>
  )
}

export async function generateMetadata({params}: Props) {
    const issue = await prisma.issue.findUnique({where: {id: parseInt(params?.issueId)}});
    return {
        title: issue?.title,
        description: `Details of bug fix - ${issue?.id}`
    }
}

export default IssueDetailPage