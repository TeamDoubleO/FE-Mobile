import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // 아이콘 라이브러리
import { styles } from './styles/HomeButton.styles';
import { useNavigation } from '@react-navigation/native';

const HomeButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.homeButton}
      onPress={() => navigation.navigate('MainPage')}
      activeOpacity={0.8}
    >
      <Ionicons name="home" size={24} color="#385E3C" style={styles.icon} />
    </TouchableOpacity>
  );
};

export default HomeButton;
