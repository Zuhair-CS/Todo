import { useState } from "react";
import { motion } from "motion/react";
import type { JSX } from "react";

import { Checkbox } from "@ark-ui/react/checkbox";
import { CheckIcon } from "lucide-react";

interface ITodo {
  _id: string;
  task: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: ITodo;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: { task?: string; completed?: boolean }) => void;
}

export function TodoItem({ todo, onDelete, onUpdate }: TodoItemProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.task);

  const handleSave = () => {
    onUpdate(todo._id, { task: editText });
    setIsEditing(false);
  };

  const baseButtonStyles = "px-3 py-1 text-sm font-medium text-white rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-800";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className="w-full bg-zinc-800 rounded-lg p-4 flex items-center justify-between gap-4 border-3 border-transparent hover:border-blue-400 transition-colors duration-200 ease-in-out"
    >
      <div className="flex items-center gap-4 flex-grow">
        <Checkbox.Root
          className="flex items-center gap-3 cursor-pointer"
          checked={todo.completed}
          onCheckedChange={(details) => onUpdate(todo._id, { completed: !!details.checked })}
        >
          <Checkbox.Control 
            className="w-5 h-5 bg-zinc-900 border-2 border-zinc-600 rounded data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-hover:border-zinc-500 transition-all duration-200 flex items-center justify-center"
          >
            <Checkbox.Indicator>
              <CheckIcon className="w-3.5 h-3.5 text-white" />
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="w-full bg-zinc-700 text-white rounded-md border-zinc-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
          />
        ) : (
          <p className={`flex-grow ${ todo.completed ? "line-through text-zinc-500" : "text-white" }`}>
            {todo.task}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {isEditing ? (
          <button
            onClick={handleSave}
            className={`${baseButtonStyles} bg-blue-500 hover:bg-blue-600 focus-visible:ring-blue-500`}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className={`${baseButtonStyles} cursor-pointer bg-zinc-700 hover:bg-zinc-600 focus-visible:ring-zinc-400`}
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo._id)}
          className={`${baseButtonStyles} cursor-pointer bg-rose-600 hover:bg-rose-700 focus-visible:ring-rose-500`}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}