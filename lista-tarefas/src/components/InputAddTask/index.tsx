import { Input, InputButton, InputContainer } from './styles';
import Feather from '@expo/vector-icons/Feather';
type Props = {
  onPress: () => void;
  onChangeText: (text: string) => void;
  value: string;
};
export function InputAddTask({ onChangeText, value, onPress }: Props) {
  return (
    <InputContainer>
      <Input placeholder="Digite Tarefa" placeholderTextColor={'white'} keyboardType="default" onChangeText={onChangeText} value={value} />
      <InputButton onPress={onPress}>
        <Feather name="plus-square" size={24} color="white" />
      </InputButton>
    </InputContainer>
  );
}
