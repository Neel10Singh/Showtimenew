import Image from 'next/image'

const ListSmallCard = ({ movie }) => {
  return (
    <div className='flex p-2 gap-1 border-b text-white '>
      <Image
        src={movie.Poster}
        alt={movie.Title}
        width={40}
        height={55}
        className='h-full  object-contain'
      />
      <div className='flex flex-col gap-1 w-full justify-center'>
        <p className=' font-bold  text-2xl md:text-xl'>{movie.Title}</p>
        <div className='flex gap-2 text-md w-full justify-end'>
          <p>{movie.Genre} |</p>
          <p>{movie.Rated}</p>
        </div>
      </div>
    </div>
  )
}

export default ListSmallCard
