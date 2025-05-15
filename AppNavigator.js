import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';
import HomeButtonController from './components/buttons/HomeButtonController';
import LoadingOverlay from './components/loadings/LoadingOverlay';
import { getMyInfo } from './apis/MyPageApi';
import { useAuthStore } from './stores/authStore';

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
  const {
    isLoggedIn,
    setIsLoggedIn,
    accessToken,
    setLoading,
    loading,
    setAccessToken,
    clearAccessToken,
  } = useAuthStore();
  const [navState, setNavState] = useState(null);

  // 앱 시작 시 토큰 유효성 확인
  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (accessToken) {
          // 회원 정보 조회로 토큰 유효성 검증
          try {
            await getMyInfo();
            setAccessToken(accessToken); // 토큰 유효
          } catch (err) {
            //에러 발생 시
            clearAccessToken();
          }
        } else {
          setIsLoggedIn(false);
        }
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

  return (
    <NavigationContainer onStateChange={setNavState} theme={navTheme}>
      <LoadingOverlay visible={loading} /*로딩*/ />
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
            <Stack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }} />
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
            <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
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
