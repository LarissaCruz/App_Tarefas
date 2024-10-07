import styled from 'styled-components/native';

export const Label = styled.Text`
  font-family: 'Poppins_600SemiBold';
  color: black;
  font-size: 18;
`;
export const InputContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
  border-radius: 28px;

  color: black;
  border-width: 1px;
  border-color: black;
`;

export const InputButton = styled.TouchableOpacity`
  padding: 16px;
  border-width: 1px;
  border-color: black;
  justify-content: center;
  align-items: center;
  border-radius: 28px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;
