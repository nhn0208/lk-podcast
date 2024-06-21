'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants'
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs'
import { Button } from './ui/button'

const LeftSidebar = () => {
    const pathname = usePathname()
    const { signOut } = useClerk();
    const router = useRouter()
  return (
    <div className='left_sidebar'>
        <nav className='flex flex-col gap-6'>
            <Link href="/" className='flex items-center cursor-pointer gap-1 pb-10 max-lg:justify-center'>
                <Image 
                    src={"/icons/logo.svg"} 
                    alt='logo'
                    width={23}
                    height={27} 
                />
                <h1 className='text-24 font-extrabold text-white max-lg:hidden'>LK PODCAST</h1>
            </Link>

            {sidebarLinks.map( ({ route, label, imgURL }) => {
                const isActive = pathname === route || pathname.startsWith(`${route}/`)

                return (
                    <Link 
                        key={label}
                        href={route}
                        className={cn([
                            "flex items-center gap-3 py-4 max-lg:px-4 justify-start",
                            isActive && "bg-nav-focus border-r-4 border-orange-1"
                        ])} 
                    >
                        <Image src={imgURL} alt={label} width={24} height={24}/>
                        <p>{label}</p>
                    </Link>
                )
            })}
        </nav>
        <SignedOut>
            <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
                <Button asChild className="text-16 w-full bg-orange-1 font-extrabold">
                    <Link href="/sign-in">Sign in</Link>
                </Button>
            </div>
        </SignedOut>
        <SignedIn>
            <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
                <Button className="text-16 w-full bg-orange-1 font-extrabold" onClick={() => signOut(() => router.push('/'))}>
                    Log Out
                </Button>
            </div>
        </SignedIn>v
    </div>
  )
}

export default LeftSidebar