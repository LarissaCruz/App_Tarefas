import { Formik } from 'formik';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { InputAddTask } from '../../components/InputAddTask';
import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Yup from 'yup';
import { RootStackParmList } from '../../utils/types';

type Props = NativeStackScreenProps<RootStackParmList>;

export default function Create() {
  const { tasks, createTask } = useContext(TaskContext);

  const TaskSchema = Yup.object().shape({
    tasksText: Yup.string().min(4, 'No mínimo 4 caracteres').max(16, 'No máximo 16 caracteres').required('Título da tarefa não pode ser vazio'),
    descricao: Yup.string().min(15, 'No mínimo 15 caracteres').max(22, 'No máximo 22 caracteres').required('Descrição da tarefa não pode ser vazia'),
  });

  function handleTaskAdd(tasksText: string, descricao: string) {
    if (tasks.some((task) => task.title === tasksText)) {
      return Alert.alert('Erro', 'Tarefa já existe');
    }
    createTask(tasksText, descricao);
  }

  const navigation = useNavigation<Props['navigation']>();

  function handlePress() {
    navigation.navigate('Lista de Tarefas');
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: 'white' }}>
      <Formik
        initialValues={{ tasksText: '', descricao: '' }}
        validationSchema={TaskSchema}
        onSubmit={(values, { resetForm }) => {
          handleTaskAdd(values.tasksText, values.descricao);
          handlePress();
          resetForm();
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
          <View style={{ gap: 20 }}>
            <InputAddTask
              label="Título"
              placeholder="Digite o Título"
              onChangeText={handleChange('tasksText')}
              value={values.tasksText}
              onBlur={handleBlur('tasksText')}
            />
            {touched.tasksText && errors.tasksText && <Text style={{ color: '#ff8477' }}>{errors.tasksText}</Text>}

            <InputAddTask
              label="Descrição"
              placeholder="Digite a Descrição"
              onChangeText={handleChange('descricao')}
              value={values.descricao}
              onBlur={handleBlur('descricao')}
            />
            {touched.descricao && errors.descricao && <Text style={{ color: '#ff8477' }}>{errors.descricao}</Text>}

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => handleSubmit()} style={{ backgroundColor: '#006EFF', padding: 11, width: '35%', borderRadius: 30 }}>
                <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
