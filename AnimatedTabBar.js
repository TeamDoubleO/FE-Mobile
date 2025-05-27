import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from './constants/colors';
import { styles } from './AnimatedTabBar.styles';

const TAB_ICONS = {
  MainPage: 'home',
  AccessStack: 'list',
  MyPageStack: 'person-sharp',
  AlertStack: 'notifications',
};

const TAB_LABELS = {
  MainPage: '홈',
  AccessStack: '출입 권한',
  MyPageStack: '마이페이지',
  AlertStack: '알림',
};

export default function AnimatedTabBar({ state, descriptors, navigation }) {
  const scales = useRef(state.routes.map(() => new Animated.Value(1))).current;
  const tilts = useRef(state.routes.map(() => new Animated.Value(0))).current;

  const onPress = (route, index, isFocused) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    // 포커스된 탭이 아니고, 이벤트가 취소되지 않았으면 해당 route로 이동
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
    Animated.parallel([
      // 크기 변화
      Animated.sequence([
        Animated.timing(scales[index], { toValue: 1.2, duration: 120, useNativeDriver: true }),
        Animated.spring(scales[index], { toValue: 1, friction: 3, useNativeDriver: true }),
      ]),
      // 기울기 변화
      Animated.sequence([
        Animated.timing(tilts[index], { toValue: 1, duration: 150, useNativeDriver: true }), // 느리게(150ms)
        Animated.timing(tilts[index], { toValue: -1, duration: 150, useNativeDriver: true }), // 느리게(150ms)
        Animated.timing(tilts[index], { toValue: 0, duration: 100, useNativeDriver: true }), // 중앙으로 복귀
      ]),
    ]).start();
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        // 현재 탭이 포커스된 상태인지 확인
        const isFocused = state.index === index;
        // 현재 탭의 아이콘과 레이블 설정
        const iconName = TAB_ICONS[route.name] || 'ellipse-outline';
        const label = TAB_LABELS[route.name] || route.name;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => onPress(route, index, isFocused)}
            style={styles.tab}
            activeOpacity={0.8}
          >
            <Animated.View
              style={[
                styles.iconWrapper,
                isFocused && styles.iconWrapperActive,
                {
                  transform: [
                    { scale: scales[index] },
                    {
                      rotate: tilts[index].interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: ['-8deg', '0deg', '8deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Ionicons
                name={iconName}
                size={25}
                style={isFocused ? styles.iconActive : styles.icon}
              />
            </Animated.View>
            <Text style={[styles.label, isFocused && styles.labelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
