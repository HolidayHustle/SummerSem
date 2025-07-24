import { Todo } from "../types/todo";
import { CheckCircle, Trash2 } from "lucide-react";
import Button from "./Button";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between bg-gray-50 p-3 rounded-xl shadow-sm">
      <Button
        onClick={() => onToggle(Number(todo.id))}
        className={`flex items-center gap-2 bg-transparent hover:bg-transparent px-0 py-0 cursor-pointer ${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
      >
        <CheckCircle
          className={`w-5 h-5 ${
            todo.completed ? "text-green-500" : "text-gray-300"
          }`}
        />
        <span className="text-lg">{todo.text}</span>
      </Button>

      <Button
        onClick={() => onDelete(Number(todo.id))}
        className="bg-transparent hover:bg-transparent px-0 py-0"
      >
        <Trash2 className="w-5 h-5 text-red-400 hover:text-red-600 cursor-pointer" />
      </Button>
    </li>
  );
}
