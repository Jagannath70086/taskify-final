import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import ActivitiesView from "./ActivitiesView";

const prisma = new PrismaClient();

export default async function ActivitiesPage() {
  const session = await getServerSession(authOptions);

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const formattedTodos = todos.map(todo => ({
    ...todo,
    createdAt: todo.createdAt.toISOString(),
    expectedCompletionDate: todo.expectedCompletionDate?.toISOString() || null,
    completedAt: todo.completedAt?.toISOString() || null,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ActivitiesView user={session.user} todos={formattedTodos} />
    </div>
  );
}