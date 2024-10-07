import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { CardNumber } from '../../components/CardNumber';
import { Task } from '../../components/Task';
import { TaskContext } from '../../context/TaskContext';
import { RootStackParmList, TaskProps } from '../../utils/types';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParmList>;

export default function Home() {
  const { tasks, createTask, setTasks } = useContext(TaskContext);
  const [countTask, setCountTask] = useState(0);
  const [countTaskAberta, setCountTaskAberta] = useState(0);
  const [countTaskFinalizada, setCountTaskFinalizada] = useState(0);
  const navigation = useNavigation<Props['navigation']>();
  function handleCreatePress() {
    navigation.navigate('Criar Tarefa');
  }
  function getDayOfWeek() {
    const daysOfWeek = [
      'Domingo', // 0
      'Segunda-feira', // 1
      'Terça-feira', // 2
      'Quarta-feira', // 3
      'Quinta-feira', // 4
      'Sexta-feira', // 5
      'Sábado', // 6
    ];

    const date = new Date(); // Cria uma nova instância de Date com a data e hora atuais
    const dayIndex = date.getDay(); // Obtém o número do dia da semana (0-6)

    return daysOfWeek[dayIndex]; // Retorna o nome do dia correspondente
  }

  const handleTaskChangeStatus = (taskToChange: TaskProps) => {
    const updatedTasks = tasks.filter((task) => task.title !== taskToChange.title);
    const newTask = {
      id: taskToChange.id,
      title: taskToChange.title,
      status: !taskToChange.status,
      descricao: taskToChange.descricao,
    };
    updatedTasks.push(newTask);
    setTasks(updatedTasks);
  };

  const handleTaskDelete = (taskToDelete: TaskProps) => {
    Alert.alert('Atenção', 'Deseja realmente remover a tarefa?', [
      {
        text: 'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter((task) => task.title !== taskToDelete.title);
          setTasks(updatedTasks);
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  useEffect(() => {
    let totalTasks = tasks.length;
    const filterArrayTasksAbertas = tasks.filter((task) => task.status === false);
    const filterArrayTasksFinalizadas = tasks.filter((task) => task.status === true);
    setCountTaskAberta(filterArrayTasksAbertas.length);
    setCountTaskFinalizada(filterArrayTasksFinalizadas.length);
    setCountTask(totalTasks);
  }, [tasks]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.dia}>{getDayOfWeek()}</Text>
        <TouchableOpacity onPress={handleCreatePress}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.row}>
          <CardNumber value={countTask} title="Cadastradas" color="#1e1e1e" />
          <CardNumber value={countTaskAberta} title="Em aberto" color="#e88a1a" />
          <CardNumber value={countTaskFinalizada} title="Finalizadas" color="#0e9577" />
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Task
            title={item.title}
            status={item.status}
            descricao={item.descricao}
            onCheck={() => handleTaskChangeStatus(item)}
            onRemove={() => handleTaskDelete(item)}
            id={0}
          />
        )}
        ListEmptyComponent={() => (
          <View>
            <Text>Você ainda não cadastrou Tarefas</Text>
            <Text>Crie uma Tarefa para começar</Text>
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
    backgroundColor: 'white',

    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  dia: { fontFamily: 'Poppins_500Medium', fontSize: 18, color: '#666' },
});
