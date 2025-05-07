import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // 아이콘 라이브러리
import { styles } from './styles/HomeButton.styles';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/colors';

const HomeButton = () => {
  const navigation = useNavigation();

  // 기존 스택 삭제되도록 설정
  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainPage' }],
    });
  };

  return (
    <TouchableOpacity style={styles.homeButton} onPress={navigateToHome} activeOpacity={0.8}>
      <Ionicons name="home" size={24} color={colors.tertiary} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default HomeButton;
