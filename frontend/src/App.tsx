import './App.css';
import { BackgroundBeamsDemo } from './components/BackgroundBeamsDemo';
import { SpotlightTypewriterDemo } from './components/SpotlightTypewriter';
import { TodoInput } from './components/TodoInput';
import { useState, useEffect } from 'react';

// Define an interface for the Todo object to match your backend model
interface ITodo {
  _id: string;
  task: string;
  completed: boolean;
  createdAt: string;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const API_URL = 'http://localhost:8080/todos';

  // 1. Fetch todos from the backend when the component loads
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.success) {
          setTodos(data.data);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []); // Empty array ensures this runs only once on mount

  // 2. Update handleAddTodo to send the new task to the backend
  const handleAddTodo = async (task: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
      const data = await response.json();
      if (data.success) {
        // Add the new todo from the backend response to our state
        setTodos((prev) => [...prev, data.data]);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    // Add `relative` to make this the positioning parent for the Spotlight
    <div className="overflow-x-hidden overflow-y-hidden bg-black text-white min-h-screen w-full relative">
      <BackgroundBeamsDemo />
      {/* Wrap all content in a div to place it above the spotlight */}
      <div className="relative z-10">
        <SpotlightTypewriterDemo />
        <TodoInput onAddTodo={handleAddTodo} />

        <div className="max-w-xl mx-auto mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">My Tasks</h2>
          <ul className="list-disc pl-5 space-y-2">
            {todos.map((todo) => (
              <li key={todo._id} className="text-lg">
                {todo.task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;