'use client';

import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import LoaderSpinner from './LoaderSpinner';
import { useAudio } from '@/providers/AudioProvider';
import { cn } from '@/lib/utils';
import { Ellipsis, X } from 'lucide-react';


const RightSidebar = () => {
  const { user } = useUser();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);
  const router = useRouter();

  const { audio } = useAudio();
  console.log(audio);
  

  return (
    <section className={cn('right_sidebar h-[100vh]')}>
      { audio && 
      <div className='flex w-full flex-col gap-y-4'>
        <div className='flex-between w-full'>
          <h1 className='text-16 font-bold text-white-1'>{audio.author}</h1>
          <div className='flex text-white-1 gap-4'>
            <Ellipsis width={24} height={24} />
            <X />
          </div>
        </div>
        <Image
          src={audio.imageUrl}
          alt=''
          width={285}
          height={285}
          quality={100}
        />
        <div>
          <h1 className='text-20 font-bold text-white-1'>{audio.title}</h1>
          <Link href={`/profile/${audio.authorId}`} className='text-16 font-semibold text-white-3 hover:underline'>
            {audio.author}
          </Link>
        </div>
      </div>}
      <section className='flex w-full flex-col relative'>
        
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <div className="flex flex-col gap-6">
          {topPodcasters?.slice(0, 3).map((podcaster) => (
            <div key={podcaster._id} className="flex cursor-pointer justify-between" onClick={() => router.push(`/profile/${podcaster.clerkId}`)}>
              <figure className="flex items-center gap-2">
                <Image
                  src={podcaster.imageUrl}
                  alt={podcaster.name}
                  width={44}
                  height={44}
                  className="aspect-square rounded-lg"
                />
                <h2 className="text-14 font-semibold text-white-1">{podcaster.name}</h2>
              </figure>
              <div className="flex items-center">
                <p className="text-12 font-normal text-white-1">{podcaster.totalPodcasts} podcasts</p>
              </div> 
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

export default RightSidebar