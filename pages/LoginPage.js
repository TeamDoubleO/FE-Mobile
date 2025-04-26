import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import WaveHeader from '../components/common/headers/WaveHeader';
import NormalInput from '../components/common/textinput/NormalInput';
import NormalButton from '../components/common/buttons/NormalButton';
import { styles } from './styles/LoginPage.styles';
import GrayUnderlineButton from '../components/common/buttons/GrayButton';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginPage = () => {
  const navigation = useNavigation();

  const navigateToSignUp = () => {
    //회원가입 페이지로 이동하는 함수
    navigation.navigate('SignUpPage');
  };

  return (
    <>
      <WaveHeader />
      <Text style={styles.title}>로그인</Text>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled" //입력 도중 입력창 외 다른 부분을 터치 했을 때 내려감
        extraScrollHeight={30} // 키보드와 입력창 사이 간격
        enableOnAndroid={true} // 안드로이드 자동 스크롤 설정
      >
        <NormalInput
          placeholder="아이디"
          isEditable={true}
          value=""
          onChangeTextHandler={() => {}}
        />
        <NormalInput
          placeholder="비밀번호"
          isEditable={true}
          value=""
          onChangeTextHandler={() => {}}
        />
        <NormalButton title="로그인" onPressHandler={() => {}} style={styles.button} />
        <GrayUnderlineButton title="계정 만들기" onPressHandler={navigateToSignUp} />
        <View style={styles.gongback}></View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default LoginPage;
