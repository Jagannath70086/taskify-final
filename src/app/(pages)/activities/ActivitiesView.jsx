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
          }`
        );
      } else {
        setTodos(previousTodos);
        toast.error(
          `Failed to mark task "${todo.title}" as ${
            !todo.completed ? "completed" : "pending"
          }`
        );
      }
    } catch (error) {
      setTodos(previousTodos);
      toast.error(`Error toggling task "${todo.title}": ${error.message}`);
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
        toast.success("Task deleted successfully");
      } else {
        setTodos(previousTodos);
        toast.error("Failed to delete task");
      }
    } catch (error) {
      setTodos(previousTodos);
      toast.error(`Error deleting task: ${error.message}`);
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
        toast.success("Task updated successfully");
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      toast.error("Something went wrong while updating the task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header - Improved mobile layout */}
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

          {/* Stats Overview - Enhanced mobile grid */}
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

          {/* Timeline - Completely redesigned for mobile */}
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
                  {/* Timeline line - adjusted for mobile */}
                  <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent"></div>

                  {Object.entries(groupedTodos).map(
                    ([date, dayTodos], dateIndex) => (
                      <div key={date} className="relative">
                        {/* Date header - mobile optimized with enhanced blur */}
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

                        {/* Tasks for this date - mobile optimized */}
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

      {/* Modal for Edit Task - Enhanced styling */}
      <Modal show={!!editingTodo} onClose={() => setEditingTodo(null)}>
        <div className="backdrop-blur-xl bg-slate-900/95 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Edit Task
            </h2>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={editingTodo?.title || ""}
                onChange={(e) =>
                  setEditingTodo({ ...editingTodo, title: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
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
                className="w-full px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 resize-none text-sm sm:text-base"
                placeholder="Enter task description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Priority
                </label>
                <select
                  value={editingTodo?.priority ?? 0}
                  onChange={(e) =>
                    setEditingTodo({
                      ...editingTodo,
                      priority: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm sm:text-base"
                >
                  <option value={0} className="bg-slate-800">
                    Low
                  </option>
                  <option value={1} className="bg-slate-800">
                    Medium
                  </option>
                  <option value={2} className="bg-slate-800">
                    High
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Due Date
                </label>
                <DatePicker
                  selected={
                    editingTodo?.expectedCompletionDate
                      ? new Date(editingTodo.expectedCompletionDate)
                      : null
                  }
                  onChange={(date) =>
                    setEditingTodo({
                      ...editingTodo,
                      expectedCompletionDate: date,
                    })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm sm:text-base"
                  placeholderText="Select due date"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                onClick={() => handleUpdateTodo(editingTodo)}
                disabled={loading || !editingTodo?.title.trim()}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Update Task
              </button>
              <button
                onClick={() => setEditingTodo(null)}
                disabled={loading}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-slate-300 rounded-lg sm:rounded-xl font-medium hover:bg-white/20 hover:text-white transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
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
        <div className="backdrop-blur-xl bg-slate-900/95 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Confirm Deletion
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <p className="text-slate-300 text-sm sm:text-base">
              Are you sure you want to delete the task{" "}
              <span className="text-white font-semibold">
                {selectedTodo?.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  deleteTodo(selectedTodo.id);
                  setDeleteConfirmation(false);
                  setSelectedTodo(null);
                }}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg sm:rounded-xl font-medium hover:bg-red-700 transition-all duration-300"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setDeleteConfirmation(false);
                  setSelectedTodo(null);
                }}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-slate-300 rounded-lg sm:rounded-xl font-medium hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="h-20"></div>
    </div>
  );
}
