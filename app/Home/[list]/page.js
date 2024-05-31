// 'use client'
import banner from '@public/banner4.png'
import Image from 'next/image'
import ListBigCard from '@app/components/ListBigCard'

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

const page = ({ params: { list } }) => {
  return (
    <div className='relative'>
      <Image
        src={banner}
        className='fixed top-0 left-0 h-full w-full object-cover'
      ></Image>
      <div className='fixed  top-0 left-0 h-full w-full bg-black bg-opacity-60' />
      <div className=' relative z-20 mt-24 px-10'>
        <p className='text-5xl font-semibold'>{list}</p>
        <div className=' flex flex-wrap gap-5 justify-center items-center w-full h-[70%] overflow-y-auto mt-10 pb-10'>
          <ListBigCard movie={movie} />
          <ListBigCard movie={series} />
          <ListBigCard movie={movie} />
          <ListBigCard movie={series} />
          <ListBigCard movie={movie} />
          <ListBigCard movie={series} />
          <ListBigCard movie={movie} />
          <ListBigCard movie={series} />
        </div>
      </div>
    </div>
  )
}

export default page
