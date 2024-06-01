import PosterCarosuel from '@app/components/PosterCarosuel'
import banner from '@public/banner4.png'
import Image from 'next/image'
import { Ruslan_Display } from 'next/font/google'
import ListSmallCard from '@app/components/ListSmallCard'
import MovieInfo from '@app/components/MovieInfo'
import AddToList from '@app/components/AddToList'
import Lists from '@app/components/Lists'

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
        <Lists />
      </div>
    </div>
  )
}

export default page
