import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';
import HomeButtonController from './components/common/buttons/HomeButtonController';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/MyPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import MainPage from './pages/MainPage';
import AccessListPage from './pages/AccessListPage';
import MyAccessListPage from './pages/MyAccessListPage';
import AccessRequestPage from './pages/AccessRequestPage';
import AccessRequestRolePage from './pages/AccessRequestRolePage';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [navState, setNavState] = useState();

  return (
    <NavigationContainer onStateChange={setNavState}>
      <StatusBar hidden />
      <HomeButtonController state={navState} />
      <Stack.Navigator
        initialRouteName="MainPage" //진입점 임시로 메인페이지로 지정
        screenOptions={{
          headerStyle: { backgroundColor: '#19461A', height: 120 },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: '600', fontSize: 26 },
          headerTitleAlign: 'center',
          animationEnabled: false,
          gestureEnabled: true,
          headerBackImage: () => <Ionicons name="chevron-back" size={24} color="#ffffff" />,
          //headerBackTitleVisible: false,
          headerBackTitle: '', //ios 헤더 뒤로가기 옆 타이틀 제거
        }}
      >
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ headerShown: false }} />
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ headerShown: false, title: '홈' }}
        />
        <Stack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }} />
        <Stack.Screen
          name="AccessListPage"
          component={AccessListPage}
          options={{ title: '출입 권한' }}
        />
        <Stack.Screen
          name="MyAccessListPage"
          component={MyAccessListPage}
          options={{ title: '권한 목록 조회' }}
        />
        <Stack.Screen
          name="AccessRequestPage"
          component={AccessRequestPage}
          options={{ title: '출입 권한 신청' }}
        />
        <Stack.Screen
          name="AccessRequestRolePage"
          component={AccessRequestRolePage}
          options={{ title: '출입 권한 신청' }}
        />
        <Stack.Screen
          name="ChangePasswordPage"
          component={ChangePasswordPage}
          options={{ headerShown: false }}
        />
        {/* 기본 헤더 필요한 페이지는 아래 형식으로 추가 
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ title: '한글 타이틀' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
