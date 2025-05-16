import React, { useRef, useEffect } from 'react';
import { Animated, Easing, View } from 'react-native';
import { styles } from './styles/KiwiSpinner.styles';

const KiwiSpinner = () => {
  // useRef를 이용해서 Animated.Value(0)를 생성하고 .current로 값을 꺼냄
  // 0~1로 값이 변하면서 이미지 회전에 사용
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1200, // 1.2초에 한바퀴
        easing: Easing.linear, //일정한 속도 (선형으로)
        useNativeDriver: true, //성능 향상 용도
      }),
    ).start(); // 애니메이션 시작
  }, [spinValue]);

  // spinValue(0~1)를 0도~'360도'로 변환
  const spin = spinValue.interpolate({
    inputRange: [0, 1], // 입력 범위 : 0 ~ 1
    outputRange: ['0deg', '360deg'], // 출력 : 0도 ~ 360도
  });

  return (
    <View style={styles.contentContainer}>
      <Animated.Image //이미지를 애니메이션 처리
        source={require('../../assets/images/logoLoading.png')}
        style={[styles.animationImage, { transform: [{ rotate: spin }] }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default KiwiSpinner;
