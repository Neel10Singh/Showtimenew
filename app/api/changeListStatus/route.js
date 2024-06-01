import { connectMongoDB } from '@lib/mongodb'
import { NextResponse } from 'next/server'
import List from '@models/list'

export async function POST(request) {
  try {
    const { l } = await request.json()

    await connectMongoDB()
    let status = await List.findOne({ _id: l }).select('private')
    status = status.private
    console.log(status)
    const result = await List.findOneAndUpdate(
      { _id: l },
      { private: !status },
      { new: true }
    )
    console.log(result)

    return NextResponse.json({ message: 'List Updated' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
