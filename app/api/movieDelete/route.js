import { connectMongoDB } from '@lib/mongodb'
import { NextResponse } from 'next/server'
import List from '@models/list'
import User from '@models/user'

export async function POST(request) {
  try {
    const { l, Title } = await request.json()

    await connectMongoDB()
    let list = await List.findOne({ _id: l }).select('movies')
    console.log(list)
    list = list.movies
    list = list.filter((li) => li.Title !== Title)

    const result = await List.findOneAndUpdate(
      { _id: l },
      { movies: list },
      { new: true }
    )
    console.log(result)

    return NextResponse.json({ message: 'Movie Deleted' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
