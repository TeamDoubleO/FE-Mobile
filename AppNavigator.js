import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeButtonController from './components/buttons/HomeButtonController';

// 로그인 전 페이지
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SignUpVerificationPage from './pages/SignUpVerificationPage';

// 로그인 후 페이지
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import AccessListPage from './pages/AccessListPage';
import MyAccessListPage from './pages/MyAccessListPage';
import AccessRequestPage from './pages/AccessRequestPage';
import AccessRequestRolePage from './pages/AccessRequestRolePage';

import { colors } from './constants/colors';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [navState, setNavState] = useState(null);
  const [loading, setLoading] = useState(true); // 토큰 확인 중 상태

  // 앱 시작 시 토큰 확인
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        setIsLoggedIn(!!token); // 토큰 있으면 true
      } catch (e) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.white,
    },
  };

  if (loading) return null;

  return (
    <NavigationContainer onStateChange={setNavState} theme={navTheme}>
      <StatusBar hidden />
      <HomeButtonController state={navState} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.secondary, height: 120 },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '600', fontSize: 26 },
          headerTitleAlign: 'center',
          animationEnabled: false,
          gestureEnabled: true,
          headerBackImage: () => <Ionicons name="chevron-back" size={24} color={colors.white} />,
          headerBackTitle: '',
        }}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="MainPage"
              component={MainPage}
              options={{ headerShown: false, title: '홈' }}
            />
            <Stack.Screen name="MyPage" options={{ headerShown: false }}>
              {(props) => <MyPage {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen
              name="ChangePasswordPage"
              component={ChangePasswordPage}
              options={{ headerShown: false }}
            />
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
          </>
        ) : (
          <>
            <Stack.Screen
              name="WelcomePage"
              component={WelcomePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="LoginPage" options={{ headerShown: false }}>
              {(props) => <LoginPage {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen
              name="SignUpPage"
              component={SignUpPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpVerificationPage"
              component={SignUpVerificationPage}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
