"use client";
import React from 'react'
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {Skeleton} from '@/app/components'
import toast, { Toaster} from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const {data: users, error, isLoading} = useUsers();

    if(isLoading) return <Skeleton /> 

    if(error) return null

    const assignIssue = async (userId: string) => {
        try {
            await axios.patch(`/api/issues/${issue?.id}`, { assignedToUserId: userId || null})
        } catch (error) {
            toast.error("Changes could not be saved")
        }
    }

  return (
    <>
        <Select.Root 
        defaultValue={issue?.assignToUserId || ""}
        onValueChange={assignIssue}>
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value=''>Unassigned</Select.Item>
                    {
                        users ? users?.map((user) => (
                            <Select.Item key={user?.id} value={`${user?.id}`}>{user?.name}</Select.Item>
                        )) : null
                    }
                    
                </Select.Group>
            </Select.Content>
        </Select.Root>
        <Toaster />
    </>
  )
}

const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: async () => await axios.get<User[]>("/api/users").then((response) => response.data ),
    staleTime: 60 * 1000, // 60 seconds
    retry: 3,
});

export default AssigneeSelect