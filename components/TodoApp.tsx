"use client";
import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTodos(data);
      }
    };
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("/api/tasks");
    if (res.ok) {
      const data = await res.json();
      setTodos(data);
    }
  };

  const addTodo = async (text: string) => {
    if (!text.trim()) return;

    const newTodo = { text, completed: false };
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    await fetchTodos();
  };

  const toggleTodo = async (id: string | number) => {
    const todo = todos.find((t) => t.id.toString() === id.toString());
    if (!todo) return;
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });
    await fetchTodos();
  };

  const deleteTodo = async (text: string | number) => {
    await fetch(`/api/tasks/${text}`, {
      method: "DELETE",
    });
    await fetchTodos();
  };

  return (
    <div className="max-w-md p-6 rounded-lg bg-white shadow-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4 text-black">Todo List</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
