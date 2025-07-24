import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  onToggle,
  onDelete,
}: {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  if (todos.length === 0)
    return (
      <p className="space-y-3 max-h-[400px] overflow-y-auto text-black">
        No tasks added yet.
      </p>
    );

  return (
    <ul className="space-y-3 max-h-[400px] overflow-y-auto text-black">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
