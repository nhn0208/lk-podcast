'use client'

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { SignOutButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const User = () => {
  const { user } = useUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='bg-black-0 rounded-full p-1'>
          <Image
            src={user?.imageUrl || '/icons/avatar.svg'}
            alt={user?.firstName || ''}
            width={24}
            height={24}
            className='rounded-full'
          /> 
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-black-5'>
        <div className='min-w-[196px] flex flex-col'>
          <Link href={`/profile/${user?.id}`}
            className='rounded-sm hover:bg-white-5/10 p-2'
          >
            <p className='text-white-1 text-sm font-semibold'>Profile</p>
          </Link>
          <Link href={`/preferences`} className='rounded-sm hover:bg-white-5/10 p-2'>
            <p className='text-white-1 text-sm font-semibold'>Settings</p>
          </Link>
          <SignOutButton >
            <div className='rounded-sm hover:bg-white-5/10 p-2'>
              <p className='text-white-1 text-sm font-semibold'>
                Log out
              </p>
            </div>
          </SignOutButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default User