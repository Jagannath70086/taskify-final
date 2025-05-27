import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import TodoDashboard from "./dashboard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const formattedTodos = todos.map(todo => ({
    ...todo,
    createdAt: todo.createdAt.toISOString().split('T')[0],
    expectedCompletionDate: todo.expectedCompletionDate?.toISOString().split('T')[0] || null,
    completedAt: todo.completedAt?.toISOString().split('T')[0] || null,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <TodoDashboard user={session.user} todos={formattedTodos} />
    </div>
  );
}