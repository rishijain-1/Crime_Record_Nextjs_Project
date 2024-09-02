import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../libs/db';
import CrimeModel from '../../../model/Crime';

export const GET = async () => {
  await connectMongo(); // Ensure MongoDB connection

  try {
    const crimeRecords = await CrimeModel.find().limit(10000).lean(); 
    return NextResponse.json(crimeRecords);
  } catch (error) {
    console.error('Error fetching data:', error); // Log the error
    return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
  }
};
