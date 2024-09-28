import { Input, InputButton, InputContainer } from './styles';
import Feather from '@expo/vector-icons/Feather';

export function InputAddTask({ onChangeText, value, handleTaskAdd }: any) {
  return (
    <InputContainer>
      <Input placeholder="Digite Tarefa" placeholderTextColor={'white'} keyboardType="default" onChangeText={onChangeText} value={value} />
      <InputButton onPress={handleTaskAdd}>
        <Feather name="plus-square" size={24} color="white" />
      </InputButton>
    </InputContainer>
  );
}
