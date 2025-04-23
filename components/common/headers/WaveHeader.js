import { View, Image } from 'react-native'
import { styles } from './styles/WaveHeader.styles';

const WaveHeader = () => (
    <View style={styles.headerContainer}>
        <Image
            source={require('../../../assets/images/headerWave.png')} // 물결 이미지 경로
            style={styles.waveImage}
            resizeMode="cover"
        />
        <View style={styles.headerContent}>
            <Image
                source={require('../../../assets/images/logoWhite.png')} // 로고 이미지 경로
                style={styles.logoImage}
                resizeMode="cover"
            />
        </View>
    </View>
);

export default WaveHeader;