import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Poppins_800ExtraBold, Poppins_500Medium, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

import Home from './src/screens/Home';
import Details from './src/screens/Details';
import CustomHeader from './src/components/Header';
import TaskProvider from './src/context/TaskContext';
import Create from './src/screens/Create';
import Editar from './src/screens/Editar';

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_800ExtraBold,
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <TaskProvider>
        <Stack.Navigator
          screenOptions={({ route }) => ({
            headerShadowVisible: false,
            header: () => <CustomHeader title={route.name} />,
            headerStyle: { backgroundColor: 'transparent' },
          })}
        >
          <Stack.Screen name="Lista de Tarefas" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Criar Tarefa" component={Create} />
          <Stack.Screen name="Editar Tarefa" component={Editar} />
        </Stack.Navigator>
      </TaskProvider>
    </NavigationContainer>
  );
};

export default App;
