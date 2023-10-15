'use client'
import React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from './IssueStatusFilter'

const IssueActions = () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
    <Button>
      <Link href={"/issues/new"}>Create New Isue</Link>
    </Button>
  </Flex>
  )
}

export default IssueActions