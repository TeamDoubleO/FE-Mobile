import { createStackNavigator } from '@react-navigation/stack';
import HomeButton from './HomeButton';

const Stack = createStackNavigator();

// HomeButton 노출 제어 컴포넌트
export default function HomeButtonController({ state }) {
  if (!state) return null;
  // 현재 활성화된 화면 이름
  const routeName = state.routes[state.index].name; // state.routes -> 모든 화면 목록, state.index -> 현재 활성화된 화면의 인덱스
  // HomeButton을 보여줄 화면 이름 목록 - 나중에 추가
  const screensWithHomeButton = [
    'MyPage',
    'ChangePasswordPage', // 마이페이지
    'AccessListPage', // 출입 권한 메뉴 페이지
    'MyAccessListPage', // 권한 조회 페이지
    'AccessRequestPage', // 권한 신청 페이지
    'AccessRequestRolePage', // 환자/보호자 선택 페이지
    'AccessDetailPage'  // 권한 상세 페이지
  ];
  // screensWithHomeButton 목록에 포함되어 있으면 보여주기
  const showHomeButton = screensWithHomeButton.includes(routeName);
  if (!showHomeButton) return null;
  return <HomeButton />;
}
