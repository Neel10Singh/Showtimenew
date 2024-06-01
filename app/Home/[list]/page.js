'use client'
import banner from '@public/banner4.png'
import Image from 'next/image'
import ListBigCard from '@app/components/ListBigCard'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

const page = ({ params: { list } }) => {
  const { data: session } = useSession()
  const [listData, setListData] = useState()
  const router = useRouter()
  const fetchLData = async () => {
    try {
      // console.log('list:', typeof list)
      const l = list
      const check = await fetch('/api/fetchListData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ l }),
      })
      // console.log('CHCK:', check)
      if (!check.ok) {
        // Handle non-2xx responses
        const errorText = await response.text()
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        )
      }
      const out = await check.json()

      console.log(out, session?.user)
      if (out?.private && session?.user?.email !== out?.Owner) {
        setListData('Unaouthorized')
      } else {
        setListData(out)
      }
    } catch (error) {
      console.log('Error during fetching data ', error)
    }
  }

  const deleteList = async () => {
    try {
      // console.log('list:', typeof list)
      const l = list
      console.log('Deleting...')
      const check = await fetch('/api/deleteList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ l }),
      })
      // console.log('CHCK:', check)
      if (!check.ok) {
        // Handle non-2xx responses
        const errorText = await response.text()
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        )
      }
      const out = await check.json()
      if (out.message == 'List Deleted') {
        router.push('/Home')
        toast.info('Please refresh once!!')
      }
      console.log(out)
    } catch (error) {
      console.log('Error during fetching data ', error)
    }
  }

  const changestatus = async () => {
    try {
      // console.log('list:', typeof list)
      const l = list
      const check = await fetch('/api/changeListStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ l }),
      })
      // console.log('CHCK:', check)
      if (!check.ok) {
        // Handle non-2xx responses
        const errorText = await response.text()
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        )
      }
      const out = await check.json()
      if (out.message == 'List Updated') {
        fetchLData()
        toast.success('List status updated')
      }
      console.log(out)
    } catch (error) {
      console.log('Error during fetching data ', error)
    }
  }
  useEffect(() => {
    fetchLData()
  }, [session])

  return (
    <>
      {listData === 'Unaouthorized' ? (
        <div className='flex flex-col text-3xl justify-center items-center font-bold z-20 bg-transparent h-screen'>
          Unauthorized
          <button
            className='bg-white px-4 py-2 border hover:bg-transparent text-zinc-950 hover:text-white transition-all flex justify-center items-center text-lg font-bold rounded-md'
            onClick={() => {
              router.push('/')
            }}
          >
            Go to Login Page
          </button>
        </div>
      ) : (
        <div className='relative'>
          <Image
            src={banner}
            className='fixed top-0 left-0 h-full w-full object-cover'
          ></Image>
          <div className='fixed  top-0 left-0 h-full w-full bg-black bg-opacity-60' />
          <div className=' relative z-20 mt-24 px-10'>
            <button
              className='bg-white h-10 w-10 border hover:bg-transparent text-zinc-950 hover:text-white transition-all flex justify-center items-center text-2xl font-bold rounded-full mb-5 pb-2'
              onClick={() => {
                router.push('/Home')
              }}
            >
              <span>&#8592;</span>
            </button>
            <p className='text-5xl font-semibold'>{listData?.Name}</p>
            {listData && session?.user?.email === listData.Owner && (
              <div className='flex gap-2'>
                <button
                  className='bg-white px-4 py-2 border hover:bg-transparent text-zinc-950 hover:text-white transition-all flex justify-center items-center text-lg font-bold rounded-md'
                  onClick={deleteList}
                >
                  Delete List
                </button>
                <button
                  className='hover:bg-white px-4 py-2 border bg-transparent hover:text-zinc-950 text-white transition-all flex justify-center items-center text-lg font-bold rounded-md'
                  onClick={changestatus}
                >
                  {listData.private ? (
                    <span>Make List Public</span>
                  ) : (
                    <span>Make List Private</span>
                  )}
                </button>
              </div>
            )}
            {!listData?.private && session?.user?.email == undefined && (
              <button
                className='bg-white px-4 py-2 border hover:bg-transparent text-zinc-950 hover:text-white transition-all flex justify-center items-center text-lg font-bold rounded-md'
                onClick={() => {
                  router.push('/')
                }}
              >
                Go to Login Page
              </button>
            )}
            <div className=' flex flex-wrap gap-5 justify-center items-center w-full h-[70%] overflow-y-auto mt-10 pb-10 '>
              {listData?.movies?.map((movie) => (
                <ListBigCard movie={movie} list={list} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default page
