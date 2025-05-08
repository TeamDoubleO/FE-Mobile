import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Image, View } from 'react-native';

const KiwiSpinner = () => {
  // 1. Animated 값 준비
  const spinValue = useRef(new Animated.Value(0)).current;

  // 2. 무한 회전 애니메이션
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1200, // 1.2초에 한바퀴
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  // 3. 회전값 변환
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.Image
        source={require('../assets/images/logoIcon.png')}
        style={{
          width: 60,
          height: 60,
          transform: [{ rotate: spin }],
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default KiwiSpinner;
