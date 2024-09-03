// app/api/updateCrimeRecord/route.ts

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import CrimeModel from '@/model/Crime';
import connectMongo from '@/libs/db';

export async function PUT(req: Request) {
    await connectMongo();

    try {
        const { _id, ...updatedRecord } = await req.json();

        const result = await CrimeModel.updateOne(
            { _id: new mongoose.Types.ObjectId(_id) },
            { $set: updatedRecord }
        );

        if (result.modifiedCount > 0) {
            return NextResponse.json({ message: 'Record updated successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Record not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
