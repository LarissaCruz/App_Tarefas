import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { InputAddTask } from '../../components/InputAddTask';
import { CardNumber } from '../../components/CardNumber';
import { Task } from '../../components/Task';
import { TaskContext } from '../../context/TaskContext';
import { TaskProps } from '../../utils/types';

export default function Home() {
  const { tasks, createTask, setTasks } = useContext(TaskContext);

  const [countTask, setCountTask] = useState(0);
  const [countTaskAberta, setCountTaskAberta] = useState(0);
  const [countTaskFinalizada, setCountTaskFinalizada] = useState(0);

  const TaskScheme = Yup.object().shape({
    tasksText: Yup.string().min(4, 'No mínimo 4 caracteres').max(16, 'No máximo 16 caracteres').required('Título da tarefa não pode ser vazio'),
  });

  function handleTaskAdd(tasksText: string) {
    if (tasks.some((task) => task.title === tasksText)) {
      return Alert.alert('Erro', 'Tarefa já existe');
    }
    createTask(tasksText);
  }

  const handleTaskChangeStatus = (taskToChange: TaskProps) => {
    const updatedTasks = tasks.filter((task) => task.title !== taskToChange.title);
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
      <Formik
        initialValues={{ tasksText: '' }}
        validationSchema={TaskScheme}
        onSubmit={(values, { resetForm }) => {
          handleTaskAdd(values.tasksText);
          resetForm({ values: { tasksText: '' } });
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
          <View>
            <InputAddTask onChangeText={handleChange('tasksText')} value={values.tasksText} onPress={handleSubmit} onBlur={handleBlur('tasksText')} />
            {touched.tasksText && errors.tasksText && <Text style={{ color: '#ff8477' }}>{errors.tasksText}</Text>}
          </View>
        )}
      </Formik>

      <View style={styles.row}>
        <CardNumber value={countTask} title="Cadastradas" color="#1e1e1e" />
        <CardNumber value={countTaskAberta} title="Em aberto" color="#e88a1a" />
        <CardNumber value={countTaskFinalizada} title="Finalizadas" color="#0e9577" />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Task title={item.title} status={item.status} onCheck={() => handleTaskChangeStatus(item)} onRemove={() => handleTaskDelete(item)} id={0} />
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
