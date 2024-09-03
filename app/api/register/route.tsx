import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../model/userModel'; // Ensure this is Mongoose model if you use Mongoose
import connectMongo from '@/libs/db';

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectMongo();
    
    // Parse request data
    const data = await request.json();
    const { password, email, name, role} = data;
    console.log(data);

    // Validate input fields
    if (!password || !email || !name || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT!, 10));
    const hash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      email,
      password: hash, 
      name,
      role,
    });
      const usertype = newUser.role;
    return NextResponse.json(
      { message: `${usertype}Register successfully!`},
      { status: 200 }
    );

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
