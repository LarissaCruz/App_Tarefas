import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 4px;
  overflow: hidden;
`;

export const TaskText = styled.Text`
  color: #414141;
  font-family: 'Poppins_400Regular';
  font-size: 16px;
  font-weight: 500;
`;

export const TaskDone = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
export const TaskDelete = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
export const TaskEdit = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
