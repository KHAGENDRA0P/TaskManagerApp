import { LoadingState } from "@/components/common";
import { TASKS } from "@/data/tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Task {
  id: string;
  title: string;
  project: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
}

interface TasksContextType {
  tasks: Task[];
  addTask: (newTask: Task) => void;
}

const STORAGE_KEY = "@task_manager_tasks";

const TasksContext = createContext<TasksContextType>({
  tasks: TASKS,
  addTask: () => {},
});

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTasks(parsed);
          }
        }
      } catch (error) {
        console.error("Failed to load tasks from storage", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => {
      const currentList = Array.isArray(prevTasks) ? prevTasks : TASKS;
      const updated = [newTask, ...currentList];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(
        (error) => {
          console.error("Failed to save tasks to storage", error);
        },
      );
      return updated;
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
