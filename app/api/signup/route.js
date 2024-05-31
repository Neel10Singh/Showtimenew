import { connectMongoDB } from '@lib/mongodb'
import User from '@models/user'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    await connectMongoDB()
    const us = await User.create({ name, email, password: hashedPassword })
    console.log(us)
    return NextResponse.json({ message: 'User signed up' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while signing up' },
      { status: 500 }
    )
  }
}
