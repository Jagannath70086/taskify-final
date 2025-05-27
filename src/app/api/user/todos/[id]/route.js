import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request,
  { params }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existingTodo = await prisma.todo.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!existingTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const updateData = {};

    if (body.hasOwnProperty('completed')) {
      updateData.completed = body.completed;
      updateData.completedAt = body.completed ? new Date() : null;
    }

    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.description !== undefined) updateData.description = body.description?.trim() || "";
    if (body.priority !== undefined) updateData.priority = parseInt(body.priority) || 0;
    if (body.expectedCompletionDate !== undefined) {
      updateData.expectedCompletionDate = body.expectedCompletionDate || null;
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: id },
      data: updateData,
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request,
  { params }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existingTodo = await prisma.todo.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!existingTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    await prisma.todo.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}