import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import HomeButtonController from './components/common/buttons/HomeButtonController'
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [navState, setNavState] = useState();

  return (
    <NavigationContainer onStateChange={setNavState}>
      <HomeButtonController state={navState}/>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: { backgroundColor: '#19461A', height: 120 },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
          headerTitleAlign: 'center',
          animationEnabled: false,
          gestureEnabled: true,
          headerBackImage: () => <Ionicons name="chevron-back" size={24} color="#ffffff" />,
        }}>
        <Stack.Screen name="Login" component={Login} options={{ title: '한글 타이틀' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
