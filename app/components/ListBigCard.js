'use client'
import Image from 'next/image'
import imdb from '@public/imdb.png'
import meta from '@public/Metacritic.png'
import { useState } from 'react'
const ListBigCard = ({ movie }) => {
  const [mi, setMi] = useState(false)
  return (
    <div
      className=' w-56 h-80 sm:w-48 sm:h-72 relative cursor-pointer transition-all overflow-hidden'
      onMouseEnter={() => setMi(true)}
      onMouseLeave={() => setMi(false)}
    >
      <Image
        src={movie.Poster}
        height={1500}
        width={1000}
        className={`${
          mi ? 'blur-[2px] translate-y-[-0.5rem]' : ''
        } h-full w-full object-cover transition-all duration-500`}
      />
      <div
        className={`px-2 absolute ${
          mi ? 'bottom-0' : 'bottom-[-4.3rem] sm:bottom-[-4.1rem]'
        } left-0 h-full w-full flex flex-col gap-1 justify-end pb-3 transition-all duration-500`}
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3),rgba(0, 0,0,0.1))',
        }}
      >
        <h3 className='text-md sm:text-xs font-semibold'>{movie.Title}</h3>
        <p className='text-xs sm:text-[0.5rem]'>{movie.Year}</p>
        <div className='flex gap-1 text-xs sm:text-[0.5rem]'>
          {movie.imdbRating !== 'N/A' && (
            <div className='flex gap-1 items-center'>
              <Image src={imdb} height={40} width={40} className='h-3 w-3' />
              <span>{movie.imdbRating}/10</span>
            </div>
          )}
          {movie.Metascore !== 'N/A' && (
            <div className='flex gap-1 items-center'>
              <Image src={meta} height={40} width={40} className='h-3 w-3' />
              <span>{movie.Metascore}/100</span>
            </div>
          )}
        </div>

        <p className='text-sm sm:text-xs text-midorange'>{movie.Genre}</p>
        <p className='text-xs sm:text-[0.5rem] text-midorange'>{movie.Rated}</p>
        <p className='text-xs sm:text-[0.5rem]'>{movie.Runtime}</p>
      </div>
    </div>
  )
}

export default ListBigCard
