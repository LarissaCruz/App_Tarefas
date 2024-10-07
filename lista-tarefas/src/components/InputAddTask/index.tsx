import { View } from 'react-native';
import { Input, InputButton, InputContainer, Label } from './styles';

type Props = {
  label: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  value: string;
};
export function InputAddTask({ onChangeText, value, onBlur, label, placeholder }: Props) {
  return (
    <View>
      <Label>{label}</Label>
      <InputContainer>
        <Input
          placeholder={placeholder}
          placeholderTextColor={'black'}
          onBlur={onBlur}
          keyboardType="default"
          onChangeText={onChangeText}
          value={value}
        />
      </InputContainer>
    </View>
  );
}
