"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { loadTasks, saveTasks } from "@/lib/storage";
import { createNewTask, updateTask } from "@/lib/types";
import type { Priority, Task } from "@/lib/types";

type TaskInput = {
  title: string;
  category: string;
  priority: Priority;
  isCompleted?: boolean;
};

type TasksContextValue = {
  tasks: Task[];
  addTask: (input: TaskInput) => void;
  editTask: (id: string, patch: Partial<Omit<Task, "id" | "createdAt">>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
};

export const TasksContext = createContext<TasksContextValue | undefined>(
  undefined
);

type TasksProviderProps = {
  children: ReactNode;
};

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((input: TaskInput) => {
    setTasks((prev) => [...prev, createNewTask(input)]);
  }, []);

  const editTask = useCallback(
    (id: string, patch: Partial<Omit<Task, "id" | "createdAt">>) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updateTask(task, patch) : task))
      );
    },
    []
  );

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? updateTask(task, { isCompleted: !task.isCompleted })
          : task
      )
    );
  }, []);

  const value = useMemo(
    () => ({ tasks, addTask, editTask, deleteTask, toggleComplete }),
    [tasks, addTask, editTask, deleteTask, toggleComplete]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
