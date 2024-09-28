import { useContext, useState } from 'react';
import { RootStackParmList, TaskProps } from '../../utils/types';
import { Container, TaskDelete, TaskDone, TaskText } from './styles';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskContext } from '../../context/TaskContext';

type Props = NativeStackScreenProps<RootStackParmList>;
export function Task(props: TaskProps) {
  const navigation = useNavigation<Props['navigation']>();
  const { selectTask } = useContext(TaskContext);
  function handlePress() {
    navigation.navigate('Details');
    selectTask(props);
  }
  return (
    <Container onPress={() => handlePress()}>
      <TaskDone onPress={props.onCheck} style={props.status ? { backgroundColor: '#0e9577' } : {}}>
        {props.status ? <Feather name="check-square" size={24} color="white" /> : <Feather name="square" size={24} color="white" />}
      </TaskDone>
      <TaskText>{props.title}</TaskText>
      <TaskDelete onPress={props.onRemove}>
        <Feather name="trash-2" size={24} color="white" />
      </TaskDelete>
    </Container>
  );
}
