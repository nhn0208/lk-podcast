'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants'

const LeftSidebar = () => {
    const pathname = usePathname()
    //const router = useRouter()
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
                            "flex-center gap-3 py-4 max-lg:px-4 lg:justify-start",
                            isActive && "bg-nav-focus border-r-4 border-orange-1"
                        ])} 
                    >
                        <Image src={imgURL} alt={label} width={24} height={24}/>
                        <p>{label}</p>
                    </Link>
                )
            })}
        </nav>
    </div>
  )
}

export default LeftSidebar