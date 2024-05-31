import PosterCarosuel from '@app/components/PosterCarosuel'
import banner from '@public/banner4.png'
import Image from 'next/image'
import { Ruslan_Display } from 'next/font/google'
import ListSmallCard from '@app/components/ListSmallCard'
import MovieInfo from '@app/components/MovieInfo'
import AddToList from '@app/components/AddToList'

const movie = {
  Title: 'Guardians of the Galaxy Vol. 2',
  Year: '2017',
  Rated: 'PG-13',
  Released: '05 May 2017',
  Runtime: '136 min',
  Genre: 'Action, Adventure, Comedy',
  Director: 'James Gunn',
  Writer: 'James Gunn, Dan Abnett, Andy Lanning',
  Actors: 'Chris Pratt, Zoe Saldana, Dave Bautista',
  Plot: "In a small town where everyone knows everyone, a peculiar incident starts a chain of events that leads to the disappearance of a child, which begins to tear at the fabric of an otherwise peaceful community. Dark government agencies and seemingly malevolent supernatural forces converge on the town, while a few of the locals begin to understand that there's more going on than meets the eye.",
  Language: 'English',
  Country: 'United States',
  Awards: 'Nominated for 1 Oscar. 15 wins & 60 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '7.6/10' },
    { Source: 'Rotten Tomatoes', Value: '85%' },
    { Source: 'Metacritic', Value: '67/100' },
  ],
  Metascore: '67',
  imdbRating: '7.6',
  imdbVotes: '757,026',
  imdbID: 'tt3896198',
  Type: 'movie',
  DVD: '10 Jul 2017',
  BoxOffice: '$389,813,101',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
}
const series = {
  Title: 'Stranger Things',
  Year: '2016–2025',
  Rated: 'TV-14',
  Released: '15 Jul 2016',
  Runtime: '51 min',
  Genre: 'Drama, Fantasy, Horror',
  Director: 'N/A',
  Writer: 'Matt Duffer, Ross Duffer',
  Actors: 'Millie Bobby Brown, Finn Wolfhard, Winona Ryder',
  Plot: "In a small town where everyone knows everyone, a peculiar incident starts a chain of events that leads to the disappearance of a child, which begins to tear at the fabric of an otherwise peaceful community. Dark government agencies and seemingly malevolent supernatural forces converge on the town, while a few of the locals begin to understand that there's more going on than meets the eye.",
  Language: 'English',
  Country: 'United States',
  Awards: 'Won 12 Primetime Emmys. 112 wins & 311 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
  Ratings: [{ Source: 'Internet Movie Database', Value: '8.7/10' }],
  Metascore: 'N/A',
  imdbRating: '8.7',
  imdbVotes: '1,338,514',
  imdbID: 'tt4574334',
  Type: 'series',
  totalSeasons: '5',
  Response: 'True',
}

const ruslan = Ruslan_Display({ weight: '400', subsets: ['latin'] })
const page = () => {
  return (
    <div className=' relative '>
      <Image
        src={banner}
        className='fixed top-0 left-0 h-full w-full object-cover'
      ></Image>
      {/* <MovieInfo movie={movie} /> */}
      {/* <AddToList /> */}
      <div className='fixed  top-0 left-0 h-full w-full bg-black bg-opacity-60' />
      <div className=' mt-24  '>
        <div className='relative z-10 flex flex-col '>
          <h1
            className={` ${ruslan.className} title z-20 ml-6  text-7xl font-bold`}
          >
            Showtime
          </h1>
          <h2 className=' z-20 text-xl font-bold ml-8 mt-[-1rem]'>
            Your own custom entertainment stop!
          </h2>
          <div className=' bg-gradient-to-b from-black via-black to-transparent w-full h-40 absolute top-[40%] left-0'>
            <PosterCarosuel />
          </div>
        </div>
      </div>
      <div className=' z-20 relative mt-32 sm:mt-10 text-white w-full'>
        <h3 className=' ml-9 text-3xl '>My lists</h3>
        <div className='flex flex-col md:flex-row gap-10 px-10 pt-5 pb-2 mt-5 overflow-x-auto w-full'>
          <div className='flex flex-col gap-3 p-3 border border-white bg-white bg-opacity-15 h-[19rem]  min-w-80 hover:scale-110 transition-all cursor-pointer'>
            <h4 className='font-bold text-lg border-b'>List Name</h4>
            <div className='flex flex-col gap-3 overflow-y-auto'>
              <ListSmallCard movie={movie} />
              <ListSmallCard movie={series} />
              <ListSmallCard movie={movie} />
              <ListSmallCard movie={movie} />
              <ListSmallCard movie={movie} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
