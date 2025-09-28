"use client";

import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import type { JSX } from "react";

interface TodoInputProps {
  onAddTodo: (task: string) => void;
}

export function TodoInput({ onAddTodo }: TodoInputProps): JSX.Element {
  const [task, setTask] = useState("");

  const placeholders = [
    "Add a new task...",
    "Add one more task to your day...",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task.trim()) return; // prevent empty todos
    onAddTodo(task.trim());
    setTask(""); // reset after submit
  };

  return (
    <div className="flex flex-col justify-center items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
