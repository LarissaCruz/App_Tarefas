import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import { useEffect, useState } from 'react';
import { InputAddTask } from '../../components/InputAddTask';
import { CardNumber } from '../../components/CardNumber';
import { Task } from '../../components/Task';
type Task = {
  description: string;
  check: boolean;
};
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tarefa, setTarefa] = useState('');
  const [tasksText, setTasksText] = useState('');
  const [countTask, setCountTask] = useState(0);
  const [countTaskAberta, setCountTaskAberta] = useState(0);
  const [countTaskFinalizada, setCountTaskFinalizada] = useState(0);
  const [status, setStatus] = useState(false);

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

  const handleTaskChangeStatus = (taskToChange: Task) => {
    const updatedTasks = tasks.filter((tasks) => tasks !== taskToChange);
    const newTask = {
      description: taskToChange.description,
      check: !taskToChange.check,
    };
    updatedTasks.push(newTask);
    setTasks(updatedTasks);
  };

  const handleTaskDelete = (taskToDelete: Task) => {
    Alert.alert('Atenção', 'Deseja realmente remover a tarefa?', [
      {
        text: 'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter((tasks) => tasks != taskToDelete);
          setTasks(updatedTasks);
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  useEffect(() => {
    let totalTasks = tasks.length;
    const filterArrayTasksAbertas = tasks.filter((tasks) => tasks.check == false);
    const filterArrayTasksFinalizadas = tasks.filter((tasks) => tasks.check == true);
    if (filterArrayTasksAbertas) setCountTaskAberta(filterArrayTasksAbertas.length);
    if (filterArrayTasksFinalizadas) setCountTaskFinalizada(filterArrayTasksFinalizadas.length);
    setCountTask(totalTasks);
  }, [tasks]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <InputAddTask onChangeText={setTasksText} value={tasksText} onPress={handleTaskAdd} />
      <View style={styles.row}>
        <CardNumber value={countTask} title={'Cadastradas'} color={'#1e1e1e'} />
        <CardNumber value={countTaskAberta} title={'Em aberto'} color={'#e88a1a'} />
        <CardNumber value={countTaskFinalizada} title={'Finalizadas'} color={'#0e9577'} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Task
            title={item.description}
            status={item.check}
            onCheck={() => handleTaskChangeStatus(item)}
            onRemove={() => handleTaskDelete(item)}
            id={0}
          />
        )}
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
