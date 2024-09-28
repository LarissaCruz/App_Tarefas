import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import { useContext, useEffect, useState } from 'react';
import { InputAddTask } from '../../components/InputAddTask';
import { CardNumber } from '../../components/CardNumber';
import { Task } from '../../components/Task';
import { TaskContext } from '../../context/TaskContext';
import { TaskProps } from '../../utils/types';
type Task = {
  description: string;
  check: boolean;
};
export default function Home() {
  const { tasks, createTask, setTasks } = useContext(TaskContext);

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
    if (tasks.some((tasks) => tasks.title === tasksText)) {
      return Alert.alert('Erro', 'Tarefa já existe');
    }

    createTask(tasksText);
    setTasksText('');
  }

  const handleTaskChangeStatus = (taskToChange: TaskProps) => {
    const updatedTasks = tasks.filter((tasks) => tasks.title !== taskToChange.title);
    const newTask = {
      id: taskToChange.id,
      title: taskToChange.title,
      status: !taskToChange.status,
    };
    updatedTasks.push(newTask);
    setTasks(updatedTasks);
  };

  const handleTaskDelete = (taskToDelete: TaskProps) => {
    Alert.alert('Atenção', 'Deseja realmente remover a tarefa?', [
      {
        text: 'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter((tasks) => tasks.title != taskToDelete.title);
          setTasks(updatedTasks);
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  useEffect(() => {
    let totalTasks = tasks.length;
    const filterArrayTasksAbertas = tasks.filter((tasks) => tasks.status == false);
    const filterArrayTasksFinalizadas = tasks.filter((tasks) => tasks.status == true);
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
          <Task title={item.title} status={item.status} onCheck={() => handleTaskChangeStatus(item)} onRemove={() => handleTaskDelete(item)} id={0} />
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
