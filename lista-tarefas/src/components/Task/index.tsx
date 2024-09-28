import { Container, TaskDelete, TaskDone, TaskText } from './styles';
import Feather from '@expo/vector-icons/Feather';

export function Task() {
  return (
    <Container>
      <TaskDone>
        <Feather name="square" size={24} color="white" />
      </TaskDone>
      <TaskText>Tarefa</TaskText>
      <TaskDelete>
        <Feather name="trash-2" size={24} color="white" />
      </TaskDelete>
    </Container>
  );
}
