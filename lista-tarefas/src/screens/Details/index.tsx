import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParmList } from '../../utils/types';
import {
  Container,
  Label,
  StatusButtoDel,
  StatusCard,
  StatusContainer,
  StatusIcon,
  StatusText,
  StatusTextContainer,
  TextStatus,
  Title,
  TitleContainer,
  TopButton,
  TopContainer,
  TopText,
} from './styles';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { Text } from 'react-native';
type Props = NativeStackScreenProps<RootStackParmList>;

export default function Details() {
  const { task } = useContext(TaskContext);
  console.log(task);
  const navigation = useNavigation<Props['navigation']>();

  return (
    <Container>
      <Label>Titulo:</Label>
      <TitleContainer>
        <Text>{task.title}</Text>
      </TitleContainer>
      <Label>Descrição:</Label>
      <TitleContainer>
        <Text>{task.descricao}</Text>
      </TitleContainer>

      <TextStatus>Status da Tarefa</TextStatus>
      <StatusContainer>
        <StatusCard>
          <StatusIcon style={task.status ? { backgroundColor: '#0e9577' } : {}}>
            {task.status ? <Feather name="check-square" size={24} color="white" /> : <Feather name="square" size={24} color="white" />}
          </StatusIcon>
          <StatusTextContainer>
            <StatusText>{task.status ? 'Realizada' : 'Em aberto'}</StatusText>
          </StatusTextContainer>
        </StatusCard>
        <StatusButtoDel>
          <Feather name="trash-2" size={24} color="white" />
        </StatusButtoDel>
      </StatusContainer>
    </Container>
  );
}
