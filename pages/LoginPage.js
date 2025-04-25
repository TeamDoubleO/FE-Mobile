import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import WaveHeader from '../components/common/headers/WaveHeader';
import NormalInput from '../components/common/textinput/NormalInput';
import NormalButton from '../components/common/buttons/NormalButton';
import { styles } from './styles/LoginPage.styles';
import GrayUnderlineButton from '../components/common/buttons/GrayButton';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const navigation = useNavigation();

  const navigateToSignUp = () => { //회원가입 페이지로 이동하는 함수
    navigation.navigate('SignUpPage');
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.center}
        keyboardShouldPersistTaps="handled" //입력 도중 입력창 외 다른 부분을 터치 했을 때 내려감
      >
        <WaveHeader/> {/*헤더*/}
        <Text style={styles.title}>로그인</Text>
        <NormalInput placeholder="아이디" errorText="" isEditable={true} value="" onChangeTextHandler={() => {}} />
        <NormalInput placeholder="비밀번호" errorText="" isEditable={true} value="" onChangeTextHandler={() => {}} />
        <NormalButton title="로그인" onPressHandler={() => {}} />
        <GrayUnderlineButton title="계정 만들기" onPressHandler={navigateToSignUp} />
        <View style={styles.gongback}></View> 
        
      </ScrollView>
    </View>
  );
};

export default LoginPage;