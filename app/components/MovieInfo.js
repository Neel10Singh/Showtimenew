import { IoMdClose } from 'react-icons/io'
import Image from 'next/image'
import imdb from '@public/imdb.png'
import RT from '@public/RT.png'
import meta from '@public/Metacritic.png'
import net from '@public/internet.png'

const MovieInfo = ({ movie, setSelected, setListAddOpen }) => {
  return (
    <>
      <div className='fixed top-0 left-0 bg-zinc-700 md:bg-black bg-opacity-90 md:bg-opacity-90 z-[55] w-screen h-screen' />
      <div className='fixed top-[15%] left-[10%] md:left-[15%] h-[70%] w-[80%] md:w-[70%] bg-zinc-950 z-[60] flex flex-col md:flex-row'>
        <button className=' absolute top-[-2rem] right-[-2rem] md:top-2 md:right-2 w-8 h-8 md:w-6 md:h-6 flex justify-center items-center text-3xl rounded-full bg-white bg-opacity-30 z-[70]'>
          <IoMdClose onClick={() => setSelected(false)} />
        </button>
        <div className=' relative  h-[40%] w-full md:h-full md:w-[40%] overflow-hidden'>
          <Image
            src={movie.Poster}
            width={1000}
            height={1800}
            className='h-full w-full object-cover blur-[2px]'
            alt={movie.Title}
          />
          <Image
            src={movie.Poster}
            width={1000}
            height={1800}
            className='absolute top-2 md:top-[5%]  left-[10%] h-[80%] w-[80%] object-contain'
            alt={movie.Title}
          />
          <button
            className=' bg-white text-zinc-950 border border-white p-2 font-bold absolute bottom-2 left-[50%] translate-x-[-50%] hover:bg-transparent hover:text-white transition-all rounded-md'
            onClick={() => setListAddOpen(true)}
          >
            ADD TO LIST
          </button>
        </div>
        <div className=' relative  h-[60%] w-full md:h-full md:w-[60%] overflow-y-auto p-5 flex flex-col gap-1 justify-between'>
          <div className='flex flex-col gap-1'>
            <h3 className=' text-4xl font-semibold text-white'>
              {movie.Title}
            </h3>
            <div className='flex gap-1 text-xs '>
              <p>{movie.Year} | </p>
              <p>{movie.Rated} | </p>
              <p>{movie.Genre} </p>
            </div>
            <div className='flex gap-1 text-xs text-midorange'>
              <p>{movie.Runtime}</p>
              {movie.Type === 'series' && (
                <p> | {movie.totalSeasons} Seasons</p>
              )}
            </div>
          </div>

          <h4 className='tet-lg font-semibold '>Plot:</h4>
          <p className='text-xs text-justify '>{movie.Plot}</p>
          <div className='flex gap-3 text-xs '>
            {movie.imdbRating !== 'N/A' && (
              <div className='flex gap-1 items-center'>
                <Image src={imdb} height={40} width={40} className='h-5 w-5' />
                <span>{movie.imdbRating}/10</span>
              </div>
            )}
            {movie.Metascore !== 'N/A' && (
              <div className='flex gap-1 items-center'>
                <Image src={meta} height={40} width={40} className='h-5 w-5' />
                <span>{movie.Metascore}/100</span>
              </div>
            )}
            {movie.Ratings?.map((rating) => {
              if (rating.Source === 'Internet Movie Database')
                return (
                  <div className='flex gap-1 items-center'>
                    <Image
                      src={net}
                      height={40}
                      width={40}
                      className='h-5 w-5'
                    />
                    <span>{rating.Value}</span>
                  </div>
                )
              else if (rating.Source === 'Rotten Tomatoes')
                return (
                  <div className='flex gap-1 items-center'>
                    <Image
                      src={RT}
                      height={40}
                      width={40}
                      className='h-5 w-5'
                    />
                    <span>{rating.Value}</span>
                  </div>
                )
            })}
          </div>
          <div className='flex flex-col gap-1'>
            {movie.Actors !== 'N/A' && (
              <div className='mt-5 text-xs'>
                <span className=' text-midorange'>Cast: </span>
                <span>{movie.Actors}</span>
              </div>
            )}
            {movie.Director !== 'N/A' && (
              <div className='text-xs'>
                <span className=' text-midorange'>Director: </span>
                <span>{movie.Director}</span>
              </div>
            )}
            {movie.Writer !== 'N/A' && (
              <div className='text-xs'>
                <span className=' text-midorange'>Writer: </span>
                <span>{movie.Writer}</span>
              </div>
            )}
          </div>

          <div className='w-full  border-b mt-4' />
        </div>
      </div>
    </>
  )
}

export default MovieInfo
