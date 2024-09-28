import styled from 'styled-components/native';

export const InputContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const Input = styled.TextInput`
  background-color: #252627;
  flex: 1;
  padding: 16px;
  border-radius: 4px;
  color: #fff;
`;

export const InputButton = styled.TouchableOpacity`
  padding: 16px;
  background: #1e1e1e;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;
