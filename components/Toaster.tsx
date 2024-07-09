'use client'

import Link from 'next/link'
import React from 'react'

import { Bell, BellRing } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const Toaster = () => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <div>
      <div className={cn(pathname === '/content-feed' && 'hidden', 
          'text-white-1 bg-black-0 rounded-full p-[6px] max-lg:hidden')}>
        <Link href={'/content-feed'}>
          <Bell width={18} height={18} />
        </Link>
      </div>
      <div className={cn(pathname !== '/content-feed' && 'hidden', 
          'text-white-1 bg-black-0 rounded-full p-[6px] max-lg:hidden')}
      >
        <BellRing 
          width={18} height={18} 
          onClick={()=> {
            router.back()
          }}
        />
      </div>
    </div>
    
  )
}

export default Toaster