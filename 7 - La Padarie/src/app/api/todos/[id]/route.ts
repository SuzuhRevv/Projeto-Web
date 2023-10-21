import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { main } from '../route';

const prisma = new PrismaClient();

export async function GET(req: Request, res: NextResponse) {
    try {
        const id = parseInt(req.url.split("/todos/")[1]);

        await main();
        const row = await prisma.row.findUnique({ where: { id }})
        if (!row) {
            return NextResponse.json({ message: "Not Found"}, { status: 404 })
        }
        return NextResponse.json({ message: "Sucess", row }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: "Error", err}, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
}

export async function DELETE(req: Request, res: NextResponse) {
    try {
        const id = parseInt(req.url.split("/todos/")[1]);

        await main();
        const row = await prisma.row.delete({ where: { id }})
        return NextResponse.json({ message: "Sucess", row }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: "Error", err}, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
}
