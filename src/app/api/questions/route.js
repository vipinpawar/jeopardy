// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     const questions = await prisma.question.findMany({
//     });

//     return NextResponse.json(questions);
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }


import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const questions = await prisma.question.findMany();
    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, category, points, question, options, correctAnswer } = body;

    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: {
        category,
        points: Number(points),
        question,
        options,
        correctAnswer,
      },
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json({ error: 'Failed to update question' }, { status: 500 });
  }
}
