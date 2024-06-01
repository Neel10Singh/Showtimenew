'use client'
import Image from 'next/image'
import profile from '@public/profile.jpg'
import { RiSearch2Fill } from 'react-icons/ri'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

import { toast } from 'react-toastify'
import { useState, useContext, useEffect } from 'react'
import MovieInfo from './MovieInfo'
import AddToList from './AddToList'
import { UserContext } from '../../contexts/UserContext'
import { SelectContext } from '../../contexts/SelectContext'
import { useRouter } from 'next/navigation'

const Nav = () => {
  // console.log(SelectedContext)
  // console.log('User: ', UserContext)
  const { data: session } = useSession()
  const [search, setSearch] = useState('')
  const [searchResults, setSerchResults] = useState([])
  // const [selected, setSelected] = useState(null)
  const [listAddOpen, setListAddOpen] = useState(false)
  const [selectedlist, setSelectedList] = useState('')
  const [dropOpen, setDropOpen] = useState(false)
  const [listType, setListType] = useState('')
  const { user, updateUser } = useContext(UserContext)
  const { select, updateSelect } = useContext(SelectContext)

  const router = useRouter()
  // console.log(session?.user)
  const handleSubmit = async (event) => {
    event.preventDefault()
    let results = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=bc35981c`
    )
    results = await results.json()
    setSerchResults(results.Search)
    console.log(results.Search)
  }
  const openResult = async (movieName) => {
    let results = await fetch(
      `https://www.omdbapi.com/?t=${movieName}&plot=full&apikey=bc35981c`
    )
    results = await results.json()
    updateSelect(results)
  }

  const handleSave = async () => {
    try {
      const email = session?.user?.email
      const check = await fetch('/api/addMovie', {
        method: 'POST',
        headers: {
          'Content-Type': 'applicion/json',
        },
        body: JSON.stringify({
          email,
          selectedlist,
          selected: select,
          listType,
        }),
      })
      const out = await check.json()
      console.log(out)
      setListAddOpen(false)
      setListType('')
      setSelectedList('')
      fetchData()
      toast.success('Sucessfully added')
    } catch (error) {
      console.log('Error during adding movie: ', error)
    }
  }
  const fetchData = async () => {
    console.log('TRYING...', session)
    try {
      const email = session?.user?.email
      const check = await fetch('/api/fetchUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      const out = await check.json()
      updateUser(out.response)
      console.log(out.response)
    } catch (error) {
      console.log('Error during fetching data ', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [session?.user])

  return (
    <>
      {session?.user && (
        <div className=' fixed top-0 left-0 z-40 w-screen h-16 px-6 md:px-10 py-2 mt-2 md:mt-0 flex gap-6 md:gap-10'>
          <form
            onSubmit={handleSubmit}
            className=' relative w-full h-full flex'
          >
            <input
              type='text'
              placeholder='Enter the title...'
              className=' w-full h-full border border-white  py-2 px-4 text-white font-bold bg-white bg-opacity-10 focus:outline-none focus:border-2 '
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            {searchResults ? (
              <>
                {searchResults.length > 0 && (
                  <div className='z-50 absolute top-12 left-0 w-full flex flex-row flex-wrap  bg-zinc-900 justify-center'>
                    {searchResults.map((res) => {
                      return (
                        <div
                          className='w-[48%] flex gap-2 h-20 py-2 px-2 border-b items-center justify-start hover:bg-zinc-800 cursor-pointer transition-all'
                          onClick={() => openResult(res.Title)}
                        >
                          {res.Poster != 'N/A' && (
                            <Image
                              src={res.Poster}
                              height={200}
                              width={200}
                              className='h-full w-12 object-contain'
                            ></Image>
                          )}
                          <p className=' text-lg font-semibold'>{res.Title}</p>
                          <p className=' text-sm text-end'>{res.Year}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
                {searchResults.length > 0 && (
                  <div
                    className='bg-white bg-opacity-0 fixed h-screen w-screen z-[35] '
                    onClick={() => setSerchResults([])}
                  />
                )}
              </>
            ) : (
              <>
                <div className='absolute top-12 left-0 w-full flex flex-row flex-wrap  bg-zinc-900 h-20 lex justify-center items-center'>
                  No matching results
                </div>
                <div
                  className='bg-white bg-opacity-0 fixed h-screen w-screen z-[35] '
                  onClick={() => setSerchResults([])}
                />
              </>
            )}
            <button
              type='submit'
              className=' h-full w-20 border-r border-y border-white bg-white bg-opacity-20 text-white  text-lg flex justify-center items-center hover:bg-opacity-30 hover:border-r-2 hover:border-y-2 transition-all'
            >
              <RiSearch2Fill />
            </button>
          </form>
          <div className=' relative h-full flex items-center gap-1'>
            <span
              className='h-full w-16 md:w-14 rounded-full bg-midorange text-2xl font-bold flex justify-center items-center cursor-pointer'
              onClick={() => setDropOpen((val) => !val)}
            >
              {session?.user?.name[0]}
            </span>

            <button
              className={` absolute right-0 bottom-[-3.5rem] px-4 py-2 bg-gradient-to-t from-black via-black to-transparent bg-opacity-25 font-bold md:font-normal hover:to-black transition-all origin-top text-xl w-32 ${
                dropOpen ? ' scale-y-100' : ' scale-y-0'
              }`}
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.push('/') // Redirect to the dashboard page after signing out
                })
              }}
            >
              Log Out
            </button>
          </div>
          {select && <MovieInfo setListAddOpen={setListAddOpen} />}
          {listAddOpen && (
            <AddToList
              lists={session?.user?.lists}
              setListAddOpen={setListAddOpen}
              handleSave={handleSave}
              selectedlist={selectedlist}
              setSelectedList={setSelectedList}
              setListType={setListType}
            />
          )}
        </div>
      )}
    </>
  )
}

export default Nav
