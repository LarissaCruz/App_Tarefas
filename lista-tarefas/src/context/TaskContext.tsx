import { createContext, ReactNode, useEffect, useState } from 'react';
import { TaskProps } from '../utils/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TaskContextProps {
  task: TaskProps;
  tasks: TaskProps[];
  selectTask: (task: TaskProps) => void;
  clearTask: () => void;
  createTask: (title: string) => void;
  setTasks: (tasks: TaskProps[]) => void;
}

interface TaskProviderPros {
  children: ReactNode;
}

export const TaskContext = createContext<TaskContextProps>({
  task: {
    id: 0,
    title: '',
    status: false,
  },
  tasks: [],
  selectTask: () => {},
  clearTask: () => {},
  createTask: () => {},
  setTasks: () => {},
});

function TaskProvider({ children }: TaskProviderPros) {
  const [task, setTask] = useState<TaskProps>({ id: 0, title: '', status: false });
  const [tasks, setTasks] = useState<TaskProps[]>([] as TaskProps[]);

  async function storeTasks(tasks: TaskProps[]) {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    } catch (error) {
      console.log('error', error);
    }
  }
  async function loadTasks() {
    try {
      const tasks = await AsyncStorage.getItem('@tasks');
      if (tasks) {
        setTasks(JSON.parse(tasks));
      }
    } catch (error) {
      console.log('error', error);
    }
  }
  function createTask(title: string) {
    const newTask = {
      id: tasks.length + 1,
      title: title,
      status: false,
    };
    setTasks([...tasks, newTask]);
  }
  function selectTask(task: TaskProps) {
    setTask(task);
  }

  function clearTask() {
    setTask({ id: 0, title: '', status: false });
  }

  useEffect(() => {
    loadTasks();
  }, []);
  useEffect(() => {
    storeTasks(tasks);
  }, [tasks]);

  return <TaskContext.Provider value={{ task, selectTask, clearTask, tasks, setTasks, createTask }}>{children}</TaskContext.Provider>;
}

export default TaskProvider;
