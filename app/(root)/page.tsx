'use client'

import React from 'react'
import PodcastCard from '@/components/PodcastCard'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

const Homepage = () => {
  const trendingPodacsts = useQuery(api.podcasts.getTrendingPodcasts)
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-20 text-white-1 font-bold'>
          Trending podcasts
        </h1>
        
        <div className='podcast_grid'>
          {trendingPodacsts && trendingPodacsts.map( ( { _id, podcastTitle, podcastDescription, imageUrl} ) => (
            <PodcastCard 
              key={_id}
              podcastId={_id}
              title={podcastTitle}
              description={podcastDescription}
              imgUrl={imageUrl as string}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage