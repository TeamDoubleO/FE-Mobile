import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../constants/colors';

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
    // 이미 포커스된 탭이 아니고, 이벤트가 취소되지 않았으면 해당 route로 이동
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scales[index], { toValue: 1.2, duration: 120, useNativeDriver: true }),
        Animated.spring(scales[index], { toValue: 1, friction: 3, useNativeDriver: true }),
      ]),
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
                color={isFocused ? colors.primary : colors.lightGray}
                style={isFocused ? styles.iconActive : undefined}
              />
            </Animated.View>
            <Text style={[styles.label, isFocused && styles.labelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 80, // 높이 조절
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    backgroundColor: colors.white,
    padding: 3,
    borderRadius: 16,
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: colors.white,
    padding: 3,
    borderRadius: 8,
    // shadowColor: colors.darkGray,
    // shadowOpacity: 0.7,
    // shadowRadius: 8,
    // elevation: 8,
  },
  label: {
    fontSize: 13,
    color: colors.lightGray,
    fontWeight: '500',
    marginTop: 2,
  },
  labelActive: {
    color: colors.darkGray,
    fontWeight: 'bold',
    // textShadowOffset: { width: 0, height: 1 },
    // textShadowRadius: 4,
  },
});
