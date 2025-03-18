import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log("hit")
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        category: true, // Include category details (optional)
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
