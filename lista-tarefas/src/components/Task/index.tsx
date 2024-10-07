import { useContext, useState } from 'react';
import { RootStackParmList, TaskProps } from '../../utils/types';
import { Container, TaskDelete, TaskDone, TaskEdit, TaskText } from './styles';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskContext } from '../../context/TaskContext';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParmList>;
export function Task(props: TaskProps) {
  const navigation = useNavigation<Props['navigation']>();
  const { selectTask } = useContext(TaskContext);
  function handlePress() {
    navigation.navigate('Details');
    console.log('oiii', props);
    selectTask(props);
  }
  return (
    <Container onPress={() => handlePress()}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <TaskDone onPress={props.onCheck}>
          {props.status ? <Feather name="check-square" size={24} color="#0e9577 " /> : <Feather name="square" size={24} color="#414141" />}
        </TaskDone>
        <TaskText>{props.title}</TaskText>
      </View>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TaskDelete onPress={props.onRemove}>
          <Feather name="trash-2" size={24} color="#414141" />
        </TaskDelete>
        <TaskEdit onPress={() => navigation.navigate('Editar Tarefa', { taskId: props.title })}>
          <Ionicons name="create-outline" size={24} color="black" />
        </TaskEdit>
      </View>
    </Container>
  );
}
