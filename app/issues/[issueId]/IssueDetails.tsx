import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import React from 'react'

const IssueDetails = ({ issue }: { issue: Issue}) => {

  return (
    <>
        <Heading>{issue?.title}</Heading>
        <Flex className='space-x-3 mt-2'>
            <IssueStatusBadge status={issue?.status} />
            <Text>{issue?.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose max-w-full' mt="4">
            <p>{issue?.description}</p>            
        </Card>
    </>
  )
}

export default IssueDetails