'use client'
import ListSmallCard from './ListSmallCard'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useRouter } from 'next/navigation'

const Lists = () => {
  const { user } = useContext(UserContext)
  const router = useRouter()

  const handleredirect = (list) => {
    router.push(`Home/${list._id}`)
  }

  console.log(user)
  return (
    <div className='flex flex-col md:flex-row gap-10 pt-5 pb-2 mt-5 px-20 md:px-10 overflow-x-auto w-full'>
      {user?.map((list) => {
        return (
          <div
            className='flex flex-col gap-3 p-3 border border-white bg-white bg-opacity-15 h-[19rem]  min-w-80 hover:scale-110 transition-all cursor-pointer '
            onClick={() => handleredirect(list)}
          >
            <h4 className='font-bold text-lg border-b'>{list.Name}</h4>
            <div className='flex flex-col gap-3 overflow-y-auto '>
              {list.movies.map((movie) => {
                return <ListSmallCard movie={movie} />
              })}
              {/* <ListSmallCard movie={movie} />
          <ListSmallCard movie={series} />
          <ListSmallCard movie={movie} />
          <ListSmallCard movie={movie} />
          <ListSmallCard movie={movie} /> */}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Lists
