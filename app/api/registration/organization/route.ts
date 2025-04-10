import { NextResponse } from 'next/server';
import {connectDB} from '@/lib/mongodb';
import Organization from '@/models/Organization';

export async function POST(req: Request) {
  try {
    const { name, description, ownerId } = await req.json();

    if (!name || !ownerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    const organization = await Organization.create({
      name,
      description,
      ownerId,
      members: [ownerId], // Add owner as first member
    });

    return NextResponse.json(organization, { status: 201 });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: 'Organization already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 