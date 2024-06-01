'use client'
import banner from '@public/banner2.jpg'
import Image from 'next/image'
import { Ruslan_Display } from 'next/font/google'
import google from '@public/google.jpg'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const ruslan = Ruslan_Display({ weight: '400', subsets: ['latin'] })

const page = () => {
  const [login, setLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const router = useRouter()

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      setError('All fields necessary')
      return
    }
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (res.error) {
        setError('Invalid credenials')
        return
      }
      console.log('Loggingin...')
      if (res.ok) router.replace('/Home')
    } catch (error) {
      console.log('Error with siging in:', error)
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    if (!name || !email || !password) {
      setError('All fields necessary')
      return
    }

    try {
      const check = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'applicion/json',
        },
        body: JSON.stringify({ email }),
      })
      const { user } = await check.json()
      if (user) {
        setError('User already exists')
        setSuccess('')
        return
      }
      const res = await fetch('api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'applicion/json',
        },
        body: JSON.stringify({ name, email, password }),
      })
      if (res.ok) {
        setSuccess('User signed up')
        setError('')
        const mail = document.getElementById('email')
        mail.value = ''
        const pass = document.getElementById('pass')
        pass.value = ''
        setLogin(true)
      } else {
        setError('User signup failed')
        setSuccess('')
      }
    } catch (error) {
      console.log('Error during signup: ', error)
    }
  }

  return (
    <div className='relative flex flex-col md:flex-row w-screen h-screen bg-zinc-900'>
      <Image
        src={banner}
        className=' w-full h-[30%] md:w-[50%] md:h-full object-cover rounded-b-[4rem] md:rounded-r-[4rem]'
      />
      <div className=' bg-zinc-900 w-full h-[70%] md:w-[50%] md:h-full flex flex-col justify-between items-center p-5'>
        <h1 className={` ${ruslan.className} title z-20  text-5xl font-bold`}>
          Showtime
        </h1>
        <div className='flex flex-col gap-4 w-[80%] md:w-[60%] items-center'>
          <div className='flex flex-col gap-1 items-center w-full'>
            {login ? (
              <span className='text-3xl md:text-2xl font-semibold'>
                Welcome Back
              </span>
            ) : (
              <span className='text-3xl md:text-2xl font-semibold'>
                Welcome to Showtime
              </span>
            )}
            <span className='text-sm md:text-xs'>Enter your Details</span>
          </div>
          <form className='flex flex-col w-full gap-1'>
            {!login && (
              <input
                className='bg-white  text-gray-800 w-full h-16 md:h-10 rounded-md px-4 focus:outline-white'
                placeholder='Name'
                name='Name'
                onChange={(event) => setName(event.target.value)}
              />
            )}
            <input
              className='bg-white  text-gray-800 w-full h-16 md:h-10 rounded-md px-4 focus:outline-white'
              placeholder='Email'
              name='Email'
              onChange={(event) => setEmail(event.target.value)}
              id='email'
            />
            <input
              type='password'
              className='bg-white  text-gray-800 px-4 w-full h-16 md:h-10 rounded-md focus:outline-white'
              placeholder='Password'
              name='Password'
              onChange={(event) => setPassword(event.target.value)}
              id='pass'
            />
            {login ? (
              <button
                type='submit'
                onClick={handleLogin}
                className='w-full bg-midorange font-bold hover:border h-16 md:h-10 rounded-md'
              >
                Log In
              </button>
            ) : (
              <button
                type='submit'
                onClick={handleSignUp}
                className='w-full bg-midorange font-bold hover:border h-16 md:h-10 rounded-md'
              >
                Sign Up
              </button>
            )}
          </form>
          {/* <div className='h-0 w-full relative border-b'>
            <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-900 tt-sm md:text-xs'>
              or
            </span>
          </div>
          <button className='w-full bg-white text-black font-bold hover:border h-16 md:h-10 rounded-md flex justify-center items-center text-lg md:text-sm'>
            <Image src={google} className='h-8 w-8 md:h-6 md:w-6'></Image>
            Continue with Google
          </button> */}
          {login ? (
            <span className='text-sm md:text-xs'>
              Don't have an account?{' '}
              <span
                className=' text-midorange cursor-pointer'
                onClick={() => setLogin(false)}
              >
                Sign Up
              </span>
            </span>
          ) : (
            <span className='text-sm md:text-xs'>
              Already have an account?{' '}
              <span
                className=' text-midorange cursor-pointer'
                onClick={() => setLogin(true)}
              >
                Log in
              </span>
            </span>
          )}
          {error && <span className=' bg-red-500 p-1 rounded-sm'>{error}</span>}
          {success && (
            <span className=' bg-green-500 p-1 rounded-sm'>{success}</span>
          )}
        </div>
        <div></div>
        <div className='md:hidden'></div>
      </div>
    </div>
  )
}

export default page
