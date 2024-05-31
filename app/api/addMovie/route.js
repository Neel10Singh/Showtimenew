import { connectMongoDB } from '@lib/mongodb'
import User from '@models/user'
import { NextResponse } from 'next/server'
import List from '@models/list'

export async function POST(request) {
  try {
    const { email, selectedlist, selected, listType } = await request.json()

    await connectMongoDB()
    const user = await User.findOne({ email }).select('lists')
    let list
    if (listType == 'new') {
      list = await List.create({
        Name: selectedlist,
        Owner: user._id,
        private: true,
      })
      const result = await User.findOneAndUpdate(
        { email: email },
        { $addToSet: { lists: list._id } },
        { new: true }
      )
    } else {
      list = await List.findOne({ Name: selectedlist, Owner: user._id })
    }
    const result = await List.findOneAndUpdate(
      { _id: list._id },
      { $addToSet: { movies: selected } },
      { new: true }
    )

    console.log('Result:', result)

    return NextResponse.json({ message: 'Movie added' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
