import { Input, InputButton, InputContainer } from './styles';
import Feather from '@expo/vector-icons/Feather';

export function InputAddTask() {
  return (
    <InputContainer>
      <Input placeholder="Digite Tarefa" placeholderTextColor={'white'} keyboardType="default" />
      <InputButton>
        <Feather name="square" size={24} color="white" />
      </InputButton>
    </InputContainer>
  );
}
