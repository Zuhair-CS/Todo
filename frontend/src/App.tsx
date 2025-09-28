import './App.css';
import { SpotlightTypewriterDemo } from './components/SpotlightTypewriter';
import { TodoInput } from './components/TodoInput';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { TodoItem } from './components/TodoItem';
import { BackgroundBeamsDemo } from './components/BackgroundBeamsDemo';

interface ITodo {
  _id: string;
  task: string;
  completed: boolean;
  createdAt: string;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const API_URL = 'http://localhost:8080/todos';

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
  }, []);

  const handleAddTodo = async (task: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
      });
      const data = await response.json();
      if (data.success) {
        setTodos((prev) => [...prev, data.data]);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodo = async (id: string, updatedData: { task?: string; completed?: boolean }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      if (data.success) {
        setTodos(
          todos.map((todo) => (todo._id === id ? data.data : todo))
        );
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen w-full relative overflow-x-hidden flex flex-col justify-center items-center">
      <BackgroundBeamsDemo />
      <div className="relative z-10">
        <SpotlightTypewriterDemo />
        <TodoInput onAddTodo={handleAddTodo} />
        
        <div className="max-w-xl mx-auto mt-8 p-4">
          <h2 className="text-2xl font-bold text-center mb-6">My Tasks</h2>
          <div className="space-y-4">
            <AnimatePresence>
              {todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onDelete={handleDeleteTodo}
                  onUpdate={handleUpdateTodo}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;