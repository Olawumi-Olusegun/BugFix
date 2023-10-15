import React from 'react'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />
});

interface Props {
    params: {
        issueId: string;
    }
}

const EditIssuePage = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params?.issueId)}
    });

    if(!issue) {
        return notFound();
    }



  return <IssueForm issue={issue} />
}

export default EditIssuePage