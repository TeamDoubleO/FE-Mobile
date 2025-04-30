import { View, Image, Text, StatusBar } from 'react-native';
import React from 'react';
import { styles } from './styles/WelcomePage.styles';
import NormalButton from '../components/common/buttons/NormalButton';
import { useNavigation } from '@react-navigation/native';

const WelcomePage = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('LoginPage');
  };

  const navigateToSignupVerfication = () => {
    navigation.navigate('SignUpVerificationPage');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        style={styles.logoTextImage}
        source={require('../assets/images/logoText.png')}
        resizeMode="contain" // 이미지 비율 유지
      />
      <Text style={styles.text}>당신의 출입 파트너, KeyWe</Text>
      <Image
        style={styles.logoIconImage}
        source={require('../assets/images/logoIcon.png')}
        resizeMode="contain" // 이미지 비율 유지
      />
      <View style={styles.buttonContainer}>
        <NormalButton title={'로그인'} length="short" onPressHandler={navigateToLogin} />
        <NormalButton
          title={'회원가입'}
          length="short"
          onPressHandler={navigateToSignupVerfication}
        />
      </View>
    </View>
  );
};

export default WelcomePage;
