import { connectMongoDB } from '@lib/mongodb'
import User from '@models/user'
import { NextResponse } from 'next/server'
import List from '@models/list'

export async function POST(request) {
  try {
    const { email } = await request.json()

    await connectMongoDB()
    const user = await User.findOne({ email }).select('lists')
    const list = user.lists
    console.log(list)
    let response = []
    for (const element of list) {
      const l = await List.findById(element)
      //   console.log(l)
      response.push(l)
    }

    // console.log('Result:', response)

    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
    console.log(error)
  }
}
