import React from 'react'

const PodcastDetails = (
    { params }: { params: { podcastId: string}}
) => {
  return (
    <p>Podcast's details for {params.podcastId}</p>
  )
}

export default PodcastDetails