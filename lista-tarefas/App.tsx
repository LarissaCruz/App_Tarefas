import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import TaskProvider from './src/context/TaskContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name={'Home'} component={Home}></Stack.Screen>
          <Stack.Screen name={'Details'} component={Details}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
