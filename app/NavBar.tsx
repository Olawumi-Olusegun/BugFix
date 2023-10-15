"use client";

import React from 'react'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import classNames from 'classnames';
import { Skeleton } from '@/app/components'
import { Avatar, Box, Container, DropdownMenu, DropdownMenuItem, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {

  return (
    <nav className='border-b mb-5 px-5 py-4'>
        <Container>
            <Flex justify="between">
                <Flex align="center" gap="3">
                    <Link href={"/"}><AiFillBug /></Link>
                    <NavLinks />
                </Flex>
             <AuthStatus /> 
            </Flex>
        </Container>
    </nav>
  )
}


const NavLinks = () => {
    const links = [
        { label: "Dashboard", href: "/", },
        { label: "Issues", href: "/issues/list", },
    ];

    const currentPath = usePathname();

    return (
        <ul className='flex items-center space-x-6'>
            {
                links?.map((link) => (
                    <li key={link?.href}>
                        <Link className={
                            classNames({
                                'nav-link': true,
                                '!text-zinc-900': currentPath === link?.href,
                            })
                        } href={link?.href}>
                            {link?.label}
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}


const AuthStatus = () => {
    const { status, data: session } = useSession();
   
    if(status === "loading") return <Skeleton width="3rem" />;

    if(status === "unauthenticated") {
        return <Link href="/api/auth/signin" className="nav-link">Sign In</Link>
    }

    return <>
            <Box>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Avatar 
                        src={session!.user!.image!} 
                        fallback="?" 
                        size="2" 
                        radius='full' 
                        className='cursor-pointer'
                        referrerPolicy='no-referrer'
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align='end'>
                        <DropdownMenu.Label>
                            <Text size="2">
                                {session!.user!.email}
                            </Text>
                        </DropdownMenu.Label>
                        <DropdownMenuItem>
                            <Link href="/api/auth/signout">Log Out</Link>
                        </DropdownMenuItem>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
        </Box>
    </>
}

export default NavBar