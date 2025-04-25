import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import WaveHeader from '../components/common/headers/WaveHeader';
import NormalInput from '../components/common/textinput/NormalInput';
import NormalButton from '../components/common/buttons/NormalButton';
import GrayButton from '../components/common/buttons/GrayButton';
import { styles } from './styles/SignUpPage.styles';
import { useNavigation } from '@react-navigation/native';

const SignUpPage = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => { //로그인 페이지로 이동하는 함수
    navigation.navigate('LoginPage');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.center}
        keyboardShouldPersistTaps="handled" //입력 도중 입력창 외 다른 부분을 터치 했을 때 내려감
      >
        <WaveHeader/>
        <Text style={styles.title}>회원가입</Text>
        <NormalInput placeholder="이름" errorText="이름을 입력하세요" isEditable={true} value="" onChangeTextHandler={() => {}} />
        <NormalInput placeholder="주민등록번호" errorText="" isEditable={true} value="" onChangeTextHandler={() => {}} />
        <NormalInput placeholder="전화번호" errorText="" isEditable={true} value="" onChangeTextHandler={() => {}} />
        <NormalInput placeholder="아이디" errorText="" isEditable={true} value="" onChangeTextHandler={() => {}} />
        <NormalInput placeholder="비밀번호" errorText="" isEditable={true} value="" onChangeTextHandler={() => {}} />
        <NormalInput placeholder="비밀번호 확인" errorText="" isEditable={true} value="" onChangeTextHandler={() => {}} />
        <NormalButton title="회원가입" onPressHandler={() => {}} />
        <GrayButton title="로그인 하러 가기" onPressHandler={navigateToLogin} />
        <View style={styles.gongback}></View> 
      </ScrollView>
    </View>
  );
};

export default SignUpPage;
