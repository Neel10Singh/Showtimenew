'use client'
import { TiTick } from 'react-icons/ti'

import { useState } from 'react'

const colours = [
  '#E74C3C',
  '#8E44AD',
  '#1B4F72',
  '#117A65 ',
  '#F39C12',
  '#2C3E50',
  '#2ECC71',
]
const AddToList = ({
  lists,
  setListAddOpen,
  handleSave,
  selectedlist,
  setSelectedList,
  setListType,
}) => {
  // console.log(lists)

  return (
    <>
      <div className='fixed top-0 left-0 bg-zinc-700 md:bg-black bg-opacity-60 md:bg-opacity-60 z-[80] w-screen h-screen ' />
      <div className='fixed top-[50%] translate-y-[-50%] left-[5%] md:left-[30%]  w-[90%] md:w-[40%] bg-zinc-950 z-[90] flex flex-col border-2 p-5'>
        <h4 className=' text-3xl md:text-xl font-semibold pb-2 border-b w-full'>
          Select a list:{' '}
        </h4>
        <div className='flex gap-3 flex-wrap justify-center mt-3'>
          {lists?.map((list, i) => (
            <button
              className={`relative w-36 h-12 border text-sm`}
              style={{
                backgroundColor: colours[i % colours.length],
                backgroundImage: `linear-gradient(to bottom right, white, 10%, ${
                  colours[i % colours.length]
                }, black)`,
              }}
              onClick={() => {
                setSelectedList(list)
                setListType('old')
              }}
            >
              {selectedlist === list && (
                <div className=' flex justify-center items-center absolute top-[-0.5rem] left-[-0.5rem] bg-green-700 text-white w-6 h-6 text-xl rounded-full'>
                  <TiTick />
                </div>
              )}
              {list}
            </button>
          ))}
        </div>

        <p className='text-xs mt-2'>
          {' '}
          {lists !== undefined && <span>or</span>} create a list:
        </p>
        <input
          type='text'
          placeholder='Enter list name...'
          className='w-full border border-white  py-2 px-4 text-white font-bold bg-white bg-opacity-10 focus:outline-none focus:border-2 '
          onChange={(event) => {
            setSelectedList(event.target.value)
            setListType('new')
          }}
        ></input>
        <span className='text-xs text-gray-400'>
          *New list will be private by default. You can change it later.
        </span>
        <div className='flex mt-2 gap-2 justify-end'>
          <button
            className=' bg-white w-32 text-zinc-950 border border-white p-2 font-bold  hover:bg-transparent hover:text-white transition-all rounded-md'
            onClick={() => setListAddOpen(false)}
          >
            Cancel
          </button>
          <button
            className=' hover:bg-white w-32 hover:text-zinc-950 border border-white p-2 font-bold  bg-transparent text-white transition-all rounded-md'
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default AddToList
