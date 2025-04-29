import { View, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles/WaveHeader.styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../constants/colors';

const WaveHeader = () => {
  const navigation = useNavigation();

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../../assets/images/headerWave.png')} // 물결 이미지 경로
        style={styles.waveImage}
        resizeMode="cover"
      />
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
          <Ionicons name="chevron-back" size={30} color={colors.white} />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/images/logoWhite.png')} // 로고 이미지 경로
          style={styles.logoImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default WaveHeader;
