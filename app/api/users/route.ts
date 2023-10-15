import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const users = await prisma.user.findMany({orderBy: {name: "asc"}});

        return NextResponse.json(users, {status: 200});
    } catch (error) {
        return NextResponse.json({error: (error as any)?.message});
    }
}