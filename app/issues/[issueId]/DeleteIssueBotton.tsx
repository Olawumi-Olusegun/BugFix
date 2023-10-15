'use client';
import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const DeleteIssueBotton = ({ issueId}: { issueId: number}) => {

  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState(false);

  const router = useRouter();

  const deleteIssue = async () => {


    try {
      setIsDeleting(true);
       const deleteResponse = axios.delete(`/api/issues/${issueId}`);
       setIsDeleting(false);
       router.push("/issues/list");
       router.refresh();
    } catch (error) {
      setError(true)
      setIsDeleting(false);
    }
  }
  return (
  <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button  disabled={isDeleting} color='red'>
          Delete Issue {" "}
          {isDeleting && <Spinner />}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be undone.
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
           <Button color='red' onClick={deleteIssue}>Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error:</AlertDialog.Title>
        <AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
        <Button color='gray' variant='soft' mt="2" onClick={() => setError(false)}>Ok</Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
  </>
  )
}

export default DeleteIssueBotton