import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/model/userModel';
import connectMongo from '@/libs/db';
import { generateToken } from '@/libs/jwt';

export async function POST(request: NextRequest) {
  try {
    await connectMongo(); // Connect to MongoDB

    const { email, password }: { email: string; password: string } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = await User.findOne({ email });


    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    console.log(user.id)
    const token = generateToken(user.id); 
    const role = user.role;
    

    return NextResponse.json({ message: `${role} login successful`,userData:token,userType:role}, { status: 200 });

  } catch (error: any) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
