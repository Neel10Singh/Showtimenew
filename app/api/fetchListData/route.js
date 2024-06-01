import { connectMongoDB } from '@lib/mongodb'
import { NextResponse } from 'next/server'
import List from '@models/list'

export async function POST(request) {
  console.log(request)
  try {
    const { l } = await request.json()
    console.log(l)
    await connectMongoDB()
    const listItems = await List.findById(l)
    console.log(listItems)
    if (!listItems) {
      return NextResponse.json({ message: 'List not found' }, { status: 404 })
    }
    return NextResponse.json(listItems, { status: 200 })
  } catch (error) {
    // return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
