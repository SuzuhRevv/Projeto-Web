import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database Connection Unsucessfull")
  }
}

const prisma = new PrismaClient();

export async function GET(req: Request, res: NextResponse) {
  try {
    await main();
    const posts = await prisma.row.findMany()
    return NextResponse.json({ message: "Sucess", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err}, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
export async function POST(req: Request, res: NextResponse) {
  try {
    const { name, bread } = await req.json();
    await main();
    const row = await prisma.row.create({
      data: {
        name,
        bread,
        value: bread * 0.5,
      },
    });
    return NextResponse.json({ message: "Sucess", row}, { status: 201 });

  } catch (err) {
    return NextResponse.json({ message: "Error", err}, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
