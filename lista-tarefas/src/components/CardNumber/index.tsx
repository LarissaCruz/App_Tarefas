import { Text, View } from 'react-native';
import { CardTitle, CardValue, Container } from './styles';
import { colors } from 'react-select/dist/declarations/src/theme';

type Props = {
  title: string;
  value: number;
  color: string;
};
export function CardNumber({ title, value, color }: Props) {
  return (
    <Container>
      <CardTitle>{title}:</CardTitle>
      <CardValue style={color ? { color: color } : {}}>{value}</CardValue>
    </Container>
  );
}
