import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
const Tab = createBottomTabNavigator();

// Tab 네비게이터 옵션
const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;
    if (route.name === 'MainPage') iconName = 'home-outline';
    else if (route.name === 'MyPageStack') iconName = 'person-outline';
    else if (route.name === 'AccessStack') iconName = 'list-outline';
    else iconName = 'ellipse-outline';
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: colors.secondary,
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
});

// Stack 네비게이터 옵션
const screenOptions = {
  headerStyle: { backgroundColor: colors.secondary, height: 100 },
  headerTintColor: colors.white,
  headerTitleStyle: { fontWeight: '600', fontSize: 26 },
  headerTitleAlign: 'center',
  gestureEnabled: true,
  headerBackImage: () => <Ionicons name="chevron-back" size={24} color={colors.white} />,
  headerBackTitle: '',
};

// 마이페이지 스택 네비게이터
function MyPageStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }} />
      <Stack.Screen
        name="ChangePasswordPage"
        component={ChangePasswordPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// 출입 권한 스택 네비게이터
function AccessStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
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
    </Stack.Navigator>
  );
}

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
      <LoadingOverlay visible={loading} />
      <StatusBar hidden />
      <HomeButtonController state={navState} />
      {isLoggedIn ? (
        <Tab.Navigator screenOptions={tabScreenOptions}>
          <Tab.Screen name="MainPage" component={MainPage} options={{ title: '홈' }} />
          <Tab.Screen
            name="MyPageStack"
            component={MyPageStack}
            options={{ title: '마이페이지' }}
          />
          <Tab.Screen name="AccessStack" component={AccessStack} options={{ title: '출입 권한' }} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name="WelcomePage"
            component={WelcomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ headerShown: false }} />
          <Stack.Screen
            name="SignUpVerificationPage"
            component={SignUpVerificationPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
