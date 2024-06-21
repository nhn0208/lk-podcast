import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PodcastCard = (
    { id, title, description, imgURL }:  { id: number, title: string, description: string, imgURL: string}
) => {
  return (
    <Link href={`/podcast/${id}`}>
        <div className='cursor-pointer flex flex-col gap-2'>
            <Image src={imgURL} alt={title} width={174} height={174} className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px]'/>
            <div className='flex flex-col '>
                <h1 className='text-16 truncate font-bold text-white-1'>{title}</h1>
                <h2 className='text-12 truncate capitalize text-white-4'>{description}</h2>
            </div>
        </div>
    </Link>
  )
}

export default PodcastCard