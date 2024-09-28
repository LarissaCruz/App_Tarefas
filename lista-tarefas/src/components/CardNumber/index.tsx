import { Text, View } from 'react-native';
import { CardTitle, CardValue, Container } from './styles';

export function CardNumber() {
  return (
    <Container>
      <CardTitle>Tarefas:</CardTitle>
      <CardValue>4</CardValue>
    </Container>
  );
}
