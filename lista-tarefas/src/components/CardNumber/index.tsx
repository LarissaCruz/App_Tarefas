import { Text, View } from 'react-native';
import { CardTitle, CardValue, Container } from './styles';

export function CardNumber({ value }: any) {
  return (
    <Container>
      <CardTitle>Tarefas:</CardTitle>
      <CardValue>{value}</CardValue>
    </Container>
  );
}
