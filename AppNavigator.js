import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';
import HomeButtonController from './components/common/buttons/HomeButtonController';

import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [navState, setNavState] = useState();

  return (
    <NavigationContainer onStateChange={setNavState}>
      <StatusBar hidden />
      <HomeButtonController state={navState} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#19461A', height: 120 },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: '600', fontSize: 24 },
          headerTitleAlign: 'center',
          animationEnabled: false,
          gestureEnabled: true,
          headerBackImage: () => <Ionicons name="chevron-back" size={24} color="#ffffff" />,
        }}
      >
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ headerShown: false }} />

        {/* 기본 헤더 필요한 페이지는 아래 형식으로 추가 
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ title: '한글 타이틀' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
