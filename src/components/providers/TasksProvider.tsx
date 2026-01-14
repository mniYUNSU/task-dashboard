'use client';

import {
  createContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
  type ReactNode
} from 'react';

import { CheckCircle2, PencilLine, RotateCcw, Trash2 } from 'lucide-react';

import { toast } from '@/components/ui/use-toast';
import { loadTasks, saveTasks } from '@/lib/storage';
import { createNewTask, updateTask } from '@/lib/types';
import type { Priority, Task } from '@/lib/types';

type TaskInput = {
  title: string;
  category: string;
  priority: Priority;
  isCompleted?: boolean;
  description?: string;
  dueDate?: number | null;
};

type TasksContextValue = {
  tasks: Task[];
  isHydrated: boolean;
  addTask: (input: TaskInput) => void;
  editTask: (
    id: string,
    patch: Partial<Omit<Task, 'id' | 'createdAt'>>
  ) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
};

export const TasksContext = createContext<TasksContextValue | undefined>(
  undefined
);

type TasksProviderProps = {
  children: ReactNode;
};

const listeners = new Set<() => void>();
const emptyTasks: Task[] = [];
let taskCache: Task[] = emptyTasks;
let isHydrated = false;
const hydrationListeners = new Set<() => void>();

if (typeof window !== 'undefined') {
  taskCache = loadTasks();
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function emitHydrationChange() {
  for (const listener of hydrationListeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function subscribeHydration(listener: () => void) {
  hydrationListeners.add(listener);
  if (!isHydrated && typeof window !== 'undefined') {
    isHydrated = true;
    queueMicrotask(emitHydrationChange);
  }
  return () => {
    hydrationListeners.delete(listener);
  };
}

function getSnapshot() {
  return taskCache;
}

function getServerSnapshot() {
  return emptyTasks;
}

function getHydrationSnapshot() {
  return isHydrated;
}

function getHydrationServerSnapshot() {
  return false;
}

function setTaskCache(next: Task[]) {
  taskCache = next;
  saveTasks(next);
  emitChange();
}

export function TasksProvider({ children }: TasksProviderProps) {
  const tasks = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    getHydrationSnapshot,
    getHydrationServerSnapshot
  );

  const addTask = useCallback((input: TaskInput) => {
    const next = [...getSnapshot(), createNewTask(input)];
    setTaskCache(next);
    toast({
      title: 'タスクを追加しました。',
      icon: <CheckCircle2 className='size-4 text-emerald-600' />
    });
  }, []);

  const editTask = useCallback(
    (id: string, patch: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
      const next = getSnapshot().map((task) =>
        task.id === id ? updateTask(task, patch) : task
      );
      setTaskCache(next);
      toast({
        title: 'タスクを更新しました。',
        icon: <PencilLine className='size-4 text-sky-600' />
      });
    },
    []
  );

  const deleteTask = useCallback((id: string) => {
    const next = getSnapshot().filter((task) => task.id !== id);
    setTaskCache(next);
    toast({
      title: 'タスクを削除しました。',
      variant: 'destructive',
      icon: <Trash2 className='size-4 text-white' />
    });
  }, []);

  const toggleComplete = useCallback((id: string) => {
    const current = getSnapshot().find((task) => task.id === id);
    const next = getSnapshot().map((task) =>
      task.id === id
        ? updateTask(task, { isCompleted: !task.isCompleted })
        : task
    );
    setTaskCache(next);
    if (current) {
      toast({
        title: current.isCompleted
          ? '未完了に戻しました。'
          : '完了にしました。',
        icon: current.isCompleted ? (
          <RotateCcw className='size-4 text-amber-600' />
        ) : (
          <CheckCircle2 className='size-4 text-emerald-600' />
        )
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      isHydrated: hydrated,
      addTask,
      editTask,
      deleteTask,
      toggleComplete
    }),
    [tasks, hydrated, addTask, editTask, deleteTask, toggleComplete]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
