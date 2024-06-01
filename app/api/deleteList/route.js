import { connectMongoDB } from '@lib/mongodb'
import { NextResponse } from 'next/server'
import List from '@models/list'
import User from '@models/user'

export async function POST(request) {
  try {
    const { l } = await request.json()

    await connectMongoDB()
    const list = await List.findOne({ _id: l })
    console.log(list)
    let listdata = await User.findOne({ email: list.Owner }).select('lists')
    listdata = listdata.lists
    console.log(listdata)
    listdata = listdata.filter((li) => li !== l)
    console.log(listdata)
    const result = await User.findOneAndUpdate(
      { email: list.Owner },
      { lists: listdata },
      { new: true }
    )
    console.log(result)
    await List.findOneAndDelete({ _id: l })

    return NextResponse.json({ message: 'List Deleted' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
