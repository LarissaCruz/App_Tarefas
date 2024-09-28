import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Task } from './src/components/Task';
import { CardNumber } from './src/components/CardNumber';
import { InputAddTask } from './src/components/InputAddTask';
import { useEffect, useState } from 'react';
interface Task {
  description: string;
  check: boolean;
}
export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tarefa, setTarefa] = useState('');
  const [tasksText, setTasksText] = useState('');
  const [countTask, setCountTask] = useState(0);
  function handleTaskAdd() {
    if (tasksText === '') {
      return Alert.alert('Erro', 'Tarefa sem descrição');
    }
    if (tasks.some((tasks) => tasks.description === tasksText)) {
      return Alert.alert('Erro', 'Tarefa já existe');
    }

    const newTask = { description: tasksText, check: false };
    setTasks([...tasks, newTask]);
    setTasksText('');
  }

  useEffect(() => {
    let totalTasks = tasks.length;
    setCountTask(totalTasks);
  }, [tasks]);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <InputAddTask onChangeText={setTasksText} value={tasksText} handleTaskAdd={handleTaskAdd} />
      <View style={styles.row}>
        <CardNumber value={countTask} />
        <CardNumber value={countTask} />
        <CardNumber value={countTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Task description={item.description} />}
        ListEmptyComponent={() => (
          <View>
            <Text>Você ainda não cadastrou Tarefas </Text>
            <Text>Crie uma Tarefa para começar </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#28385e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
});
