import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

  // Convert normal YouTube URL → embed URL
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[900px]">Trailer</p>

      {/* Video Player */}
      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />

        <iframe
          width="960"
          height="540"
          src={getEmbedUrl(currentTrailer.videoUrl)}
          title="YouTube trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="mx-auto max-w-full rounded-lg shadow-lg"
        ></iframe>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer) => {
          const isActive = currentTrailer.videoUrl === trailer.videoUrl
          return (
            <div
              key={trailer.image}
              onClick={() => setCurrentTrailer(trailer)}
              className={`
                relative cursor-pointer rounded-lg overflow-hidden transition duration-300
                ${isActive 
                  ? "opacity-100 brightness-100 scale-105 shadow-lg ring-4 ring-rose-500" 
                  : "opacity-60 brightness-75 hover:opacity-100 hover:brightness-100 hover:-translate-y-1"
                }
              `}
            >
              <img
                src={trailer.image}
                alt="trailer"
                className="w-full h-full object-cover"
              />
              <PlayCircleIcon
                strokeWidth={1.6}
                className="absolute top-1/2 left-1/2 w-8 md:w-12 h-8 md:h-12 text-white transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TrailerSection
