import { useState } from "react";
import Button from "./Button";

export default function TodoInput({
  addTodo,
}: {
  addTodo: (text: string) => void;
}) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    addTodo(input);
    setInput("");
  };
  return (
    <div className="flex gap-3 mb-6">
      <input
        className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Add a new todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <Button onClick={handleAdd} disabled={!input.trim()}>
        Add Todo
      </Button>
    </div>
  );
}
