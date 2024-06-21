import React from 'react'
import { podcastData } from '@/constants'
import PodcastCard from '@/components/PodcastCard'

const Homepage = () => {
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-20 text-white-1 font-bold'>
          Trending podcasts
        </h1>
        
        <div className='podcast_grid'>
          {podcastData.map( ( { id, title, description, imgURL} ) => (
            <PodcastCard 
              key={id}
              id={id}
              title={title}
              description={description}
              imgURL={imgURL}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage