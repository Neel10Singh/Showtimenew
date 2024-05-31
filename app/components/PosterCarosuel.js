'use client'
import post1 from '@public/posters/post1.jpg'
import post2 from '@public/posters/post2.jpg'
import post3 from '@public/posters/post3.jpg'
import post4 from '@public/posters/post4.jpg'
import post5 from '@public/posters/post5.jpg'
import post6 from '@public/posters/post6.jpg'
import post7 from '@public/posters/post7.jpg'
import post8 from '@public/posters/post8.png'
import post9 from '@public/posters/post9.jpg'
import post10 from '@public/posters/post10.jpg'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const posters = [
  post1,
  post2,
  post3,
  post4,
  post5,
  post6,
  post7,
  post8,
  post9,
  post10,
]

const PosterCarosuel = () => {
  const [index, setIndex] = useState(0)

  const opennext = () => {
    if (index !== posters.length - 1) {
      setIndex(index + 1)
    } else {
      setIndex(0)
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      opennext()
    }, 5000)
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
    // return clearInterval(autoscroll)
  }, [index])
  return (
    <div className='absolute right-10 sm:right-0 bottom-[-3rem] sm:bottom-0 w-[65%] sm:w-[50%] h-[80%] overflow-hidden'>
      {posters.map((poster, i) => {
        return (
          <Image
            src={poster}
            key={i}
            alt='poster'
            className={`${
              i === index
                ? '  h-full w-24 translate-x-0'
                : i == index - 1 || (index === 0 && i === posters.length - 1)
                ? 'translate-x-[-110%] w-20 h-[90%] '
                : i == index - 2 ||
                  (index === 1 && i === posters.length - 1) ||
                  (index === 0 && i === posters.length - 2)
                ? 'translate-x-[-250%] w-16 h-[80%]'
                : i == index + 1 || (index === posters.length - 1 && i === 0)
                ? 'translate-x-[130%] w-20 h-[90%]'
                : i == index + 2 ||
                  (index === posters.length - 1 && i === 1) ||
                  (index === posters.length - 2 && i === 0)
                ? 'translate-x-[300%] w-16 h-[80%]'
                : 'opacity-0 h-0 w-0'
            } absolute bottom-0 left-[38%] sm:left-[45%]  transition-all z-30 `}
          />
        )
      })}
      {/* <div className=' bg-white h-full w-32 absolute bottom-0 left-[44%]' /> */}
    </div>
  )
}

export default PosterCarosuel
