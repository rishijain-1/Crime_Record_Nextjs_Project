// app/api/crime/[caseNumber]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../libs/db'; // Adjust the path if needed
import CrimeModel from '../../../model/Crime';

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  if (!body || !body.query) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const { query } = body;

  try {
    await connectMongo();
    const searchPattern = new RegExp(query, 'i');

    console.log(searchPattern);
    // Create the query to search across multiple fields
    const records = {
      $or: [
        { CaseNumber: searchPattern },
        { Date: searchPattern },
        { PrimaryType: searchPattern },
        { Description: searchPattern },
        { LocationDescription: searchPattern },
        { Block: searchPattern },
      ],
    };

    const crime = await CrimeModel.find(records);

    if (!crime || crime.length === 0) {
      return NextResponse.json({ message: 'No crime found matching the search criteria' }, { status: 404 });
    }

    return NextResponse.json(crime);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
  }
};
