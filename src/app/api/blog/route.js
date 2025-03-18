import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

// POST: Create a new blog post
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, image, content, categoryId } = body;

    // Basic validation
    if (!title || !image || !content || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Create the blog post
    const blog = await prisma.blog.create({
      data: {
        title,
        image,
        content,
        categoryId, 
      },
    });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
