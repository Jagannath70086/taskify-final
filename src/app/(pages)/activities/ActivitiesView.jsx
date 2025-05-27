"use client";

import React, { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Flag,
  Clock,
  BarChart3,
  TrendingUp,
  Activity,
  Edit3,
  Trash2,
  Loader2,
} from "lucide-react";

import Modal from "@/components/ui/modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

function groupTodosByDate(todos) {
  const grouped = {};

  todos.forEach((todo) => {
    const date = new Date(todo.createdAt).toDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(todo);
  });

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const sortedGrouped = {};
  sortedDates.forEach((date) => {
    sortedGrouped[date] = grouped[date].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  });

  return sortedGrouped;
}

function getRelativeTime(date) {
  const now = new Date();
  const todoDate = new Date(date);
  const diffInHours = Math.floor(
    (now.getTime() - todoDate.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) return "1 week ago";
  if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;

  return todoDate.toLocaleDateString();
}

function isOverdue(date) {
  if (!date) return false;
  return new Date(date) < new Date();
}

export default function ActivitiesView({
  user = {},
  todos: initialTodos = [],
}) {
  const [todos, setTodos] = useState(initialTodos);
  const [loading, setLoading] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const groupedTodos = groupTodosByDate(todos);
  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const overdueTodos = todos.filter(
    (t) => !t.completed && isOverdue(t.expectedCompletionDate)
  ).length;

  const priorityColors = {
    0: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    1: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    2: "bg-red-500/20 text-red-300 border-red-500/30",
  };

  const priorityLabels = {
    0: "Low",
    1: "Medium",
    2: "High",
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const previousTodos = [...todos];

    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);

    try {
      const response = await fetch(`/api/user/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (response.ok) {
        toast.success(
          `Task "${todo.title}" marked as ${
            !todo.completed ? "completed" : "pending"
          }`, {
          duration: 3000,
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
          },
        });
      } else {
        setTodos(previousTodos);
        toast.error(
          `Failed to mark task "${todo.title}" as ${
            !todo.completed ? "completed" : "pending"
          }`, {
          duration: 3000,
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      setTodos(previousTodos);
      toast.error(`Error toggling task "${todo.title}"`, {
        duration: 3000,
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
        },
      });
    }
  };

  const deleteTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    const previousTodos = [...todos];

    setTodos(todos.filter((todo) => todo.id !== id));

    try {
      const response = await fetch(`/api/user/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Task deleted successfully", {
          duration: 3000,
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
          },
        });
      } else {
        setTodos(previousTodos);
        toast.error("Failed to delete task", {
          duration: 3000,
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      setTodos(previousTodos);
      toast.error(`Error deleting task`, {
        duration: 3000,
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
        },
      });
    }
  };

  const handleUpdateTodo = async (updatedTodo) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/todos/${updatedTodo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTodo.title,
          description: updatedTodo.description,
          priority: updatedTodo.priority,
          expectedCompletionDate: updatedTodo.expectedCompletionDate
            ? new Date(updatedTodo.expectedCompletionDate).toISOString()
            : null,
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        setTodos(todos.map((t) => (t.id === updatedTodo.id ? updated : t)));
        setEditingTodo(null);
        toast.success("Task updated successfully", {
          duration: 3000,
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed to update task", {
          duration: 3000,
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error("Something went wrong while updating the task", {
        duration: 3000,
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8 backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border border-blue-500/30 shadow-lg">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Activity Timeline
                </h1>
                <p className="text-slate-300 text-sm sm:text-base lg:text-lg mt-1">
                  Track your productivity journey
                  {user?.name ? `, ${user.name}` : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {[
              {
                label: "Total Tasks",
                value: totalTodos,
                color: "blue",
                icon: BarChart3,
                gradient: "from-blue-500 to-blue-600",
              },
              {
                label: "Completed",
                value: completedTodos,
                color: "emerald",
                icon: CheckCircle2,
                gradient: "from-emerald-500 to-emerald-600",
                percentage:
                  totalTodos > 0
                    ? Math.round((completedTodos / totalTodos) * 100)
                    : 0,
              },
              {
                label: "In Progress",
                value: pendingTodos,
                color: "amber",
                icon: Clock,
                gradient: "from-amber-500 to-orange-500",
              },
              {
                label: "Overdue",
                value: overdueTodos,
                color: "red",
                icon: TrendingUp,
                gradient: "from-red-500 to-rose-600",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium text-slate-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                        {stat.value}
                      </p>
                      {stat.percentage !== undefined && (
                        <p className="text-xs text-slate-400 mt-1">
                          {stat.percentage}% complete
                        </p>
                      )}
                    </div>
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg self-end sm:self-auto`}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                Activity Timeline
              </h2>
              <p className="text-slate-400 mt-1 text-sm sm:text-base">
                All your tasks organized by creation date
              </p>
            </div>

            <div className="max-h-[70vh] overflow-y-auto">
              {Object.keys(groupedTodos).length === 0 ? (
                <div className="text-center py-12 sm:py-16 px-4">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-slate-500/20 flex items-center justify-center">
                    <Activity className="h-8 w-8 sm:h-10 sm:w-10 text-slate-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                    No activities found
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-base">
                    Create your first task to see your activity timeline
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent"></div>

                  {Object.entries(groupedTodos).map(
                    ([date, dayTodos], dateIndex) => (
                      <div key={date} className="relative">
                        <div className="sticky top-0 z-10 backdrop-blur-2xl bg-slate-900/80 border-b border-white/10 p-3 sm:p-4">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="relative z-20 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-2 border-white/20 shadow-sm"></div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                                {new Date(date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-400">
                                {dayTodos.length} task
                                {dayTodos.length !== 1 ? "s" : ""} created
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="pl-8 sm:pl-16 pr-3 sm:pr-6 pb-4 sm:pb-6">
                          <div className="space-y-3 sm:space-y-4">
                            {dayTodos.map((todo, todoIndex) => (
                              <div
                                key={todo.id}
                                className={`backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] ${
                                  todo.completed
                                    ? "bg-emerald-500/10 border-emerald-500/30 shadow-emerald-500/5"
                                    : isOverdue(todo.expectedCompletionDate)
                                    ? "bg-red-500/10 border-red-500/30 shadow-red-500/5"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                } shadow-lg`}
                              >
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <button
                                    onClick={() => toggleTodo(todo.id)}
                                    className="mt-0.5 flex-shrink-0"
                                  >
                                    {todo.completed ? (
                                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                                    ) : (
                                      <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 hover:text-blue-400 transition-colors" />
                                    )}
                                  </button>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                                      <div className="flex-1 min-w-0">
                                        <h4
                                          className={`font-medium mb-1 text-sm sm:text-base leading-tight ${
                                            todo.completed
                                              ? "line-through text-slate-400"
                                              : "text-white"
                                          }`}
                                        >
                                          {todo.title}
                                        </h4>

                                        {todo.description && (
                                          <p
                                            className={`text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed ${
                                              todo.completed
                                                ? "line-through text-slate-500"
                                                : "text-slate-300"
                                            }`}
                                          >
                                            {todo.description}
                                          </p>
                                        )}

                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                          <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border w-fit ${
                                              priorityColors[todo.priority]
                                            }`}
                                          >
                                            <Flag className="inline h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                                            {priorityLabels[todo.priority]}
                                          </span>

                                          {todo.expectedCompletionDate && (
                                            <span
                                              className={`inline-flex items-center text-xs px-2 py-1 rounded-full border w-fit ${
                                                isOverdue(
                                                  todo.expectedCompletionDate
                                                ) && !todo.completed
                                                  ? "text-red-300 border-red-500/30 bg-red-500/10"
                                                  : "text-slate-400 border-slate-500/30 bg-slate-500/10"
                                              }`}
                                            >
                                              <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                                              Due:{" "}
                                              {new Date(
                                                todo.expectedCompletionDate
                                              ).toLocaleDateString()}
                                              {isOverdue(
                                                todo.expectedCompletionDate
                                              ) &&
                                                !todo.completed && (
                                                  <span className="ml-1 font-medium text-red-400">
                                                    (Overdue)
                                                  </span>
                                                )}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2 self-start">
                                        <div className="text-right flex-shrink-0 mr-2">
                                          <span className="text-xs text-slate-400 block">
                                            {getRelativeTime(todo.createdAt)}
                                          </span>
                                          <div className="text-xs text-slate-500 mt-0.5">
                                            {new Date(
                                              todo.createdAt
                                            ).toLocaleTimeString("en-US", {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            })}
                                          </div>
                                        </div>

                                        <button
                                          onClick={() => setEditingTodo(todo)}
                                          className="p-2 hover:bg-white/10 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110"
                                        >
                                          <Edit3 className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 hover:text-white" />
                                        </button>

                                        <button
                                          onClick={() => {
                                            setSelectedTodo(todo);
                                            setDeleteConfirmation(true);
                                          }}
                                          className="p-2 hover:bg-red-500/20 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110"
                                        >
                                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-400 hover:text-red-300" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={!!editingTodo} onClose={() => setEditingTodo(null)}>
        <div className="backdrop-blur-xl bg-slate-900/95 rounded-2xl border border-white/10 shadow-2xl max-w-md mx-auto w-full">
          <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Edit Task</h2>
              </div>
              <button
                onClick={() => setEditingTodo(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-1 text-sm font-medium text-slate-300">
                Title
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={editingTodo?.title || ""}
                onChange={(e) =>
                  setEditingTodo({ ...editingTodo, title: e.target.value })
                }
                className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all duration-300 hover:bg-white/10"
                placeholder="What needs to be done?"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Description
              </label>
              <textarea
                value={editingTodo?.description || ""}
                onChange={(e) =>
                  setEditingTodo({
                    ...editingTodo,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all duration-300 resize-none hover:bg-white/10"
                placeholder="Add more details..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Priority
                </label>
                <div className="relative">
                  <select
                    value={editingTodo?.priority ?? 0}
                    onChange={(e) =>
                      setEditingTodo({
                        ...editingTodo,
                        priority: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all duration-300 appearance-none cursor-pointer hover:bg-white/10"
                  >
                    <option value={0} className="bg-slate-800 text-slate-300">
                      Low
                    </option>
                    <option value={1} className="bg-slate-800 text-yellow-300">
                      Medium
                    </option>
                    <option value={2} className="bg-slate-800 text-red-300">
                      High
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Due Date
                </label>
                <DatePicker
                  selected={editingTodo?.expectedCompletionDate}
                  onChange={(date) =>
                    setEditingTodo({
                      ...editingTodo,
                      expectedCompletionDate: date,
                    })
                  }
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all duration-300 hover:bg-white/10"
                  placeholderText="Select date"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => handleUpdateTodo(editingTodo)}
                disabled={loading || !editingTodo?.title.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-violet-500/25 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                Update Task
              </button>
              <button
                onClick={() => setEditingTodo(null)}
                disabled={loading}
                className="px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 text-slate-300 rounded-xl font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
      >
        <div className="backdrop-blur-xl bg-slate-900/95 rounded-2xl border border-white/10 shadow-2xl max-w-sm mx-auto w-full">
          <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Delete Task</h2>
              </div>
              <button
                onClick={() => setDeleteConfirmation(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="text-white font-semibold bg-white/10 px-2 py-1 rounded-lg">
                  {selectedTodo?.title}
                </span>
                ?
              </p>
              <p className="text-slate-400 text-sm">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  deleteTodo(selectedTodo.id);
                  setDeleteConfirmation(false);
                  setSelectedTodo(null);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/25 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
              <button
                onClick={() => {
                  setDeleteConfirmation(false);
                  setSelectedTodo(null);
                }}
                className="flex-1 px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 text-slate-300 rounded-xl font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                Keep
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="h-20"></div>
    </div>
  );
}
