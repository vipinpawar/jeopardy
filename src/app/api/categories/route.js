import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== 'string') {
      return new Response(JSON.stringify({ error: 'Category name is required and must be a string' }), {
        status: 400,
      });
    }

    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return new Response(JSON.stringify({ error: 'Category already exists' }), {
        status: 409,
      });
    }

    const category = await prisma.category.create({
      data: { name },
    });

    return new Response(JSON.stringify(category), {
      status: 201,
    });

  } catch (error) {
    console.error('Error creating category:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return new Response(JSON.stringify(categories), {
      status: 200,
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
