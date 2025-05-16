import React, { useMemo, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import Dot from './Dot';
import { styles } from './styles/DotPagination.styles';

// 한번에 보이는 최대 DOT 개수
const MAX_DOTS = 8;

const DotPagination = ({ total, currentIndex, onPress }) => {
  const groupCount = Math.ceil(total / MAX_DOTS); //전체 도트 수를 MAX_DOTS로 나눈 그룹 개수
  const currentGroup = Math.floor(currentIndex / MAX_DOTS); //현재 인덱스가 속한 그룹 번호
  const start = currentGroup * MAX_DOTS; // 현재 그룹에서 첫번째 도트 인덱스
  const end = Math.min(start + MAX_DOTS, total); // 현재 그룹에서 마지막 도트 다음 인덱스
  // 현재 그룹에서 보여줄 도트 인덱스
  // useMemo를 통해 최적화(start, end가 변하지 않으면 이전에 만든 배열을 재사용)
  const dotIndexes = useMemo(
    () => Array.from({ length: end - start }, (_, i) => start + i), // 각 요소의 인덱스 i에 start를 더함
    [start, end],
  );

  // 왼쪽/오른쪽 화살표의 애니메이션 위치값 (초기값: 첫그룹이면 왼쪽은 숨김, 마지막그룹이면 오른쪽은 숨김)
  const leftArrowTranslate = useRef(new Animated.Value(currentGroup > 0 ? 0 : -30)).current;
  const rightArrowTranslate = useRef(
    new Animated.Value(currentGroup < groupCount - 1 ? 0 : 30),
  ).current;

  // 그룹이 바뀔 때마다 왼쪽 화살표 애니메이션
  useEffect(() => {
    Animated.timing(leftArrowTranslate, {
      toValue: currentGroup > 0 ? 0 : -30, // 첫그룹이면 숨김(-30), 아니면 보임(0)
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [currentGroup, leftArrowTranslate]);

  // 그룹이 바뀔 때마다 오른쪽 화살표 애니메이션
  useEffect(() => {
    Animated.timing(rightArrowTranslate, {
      toValue: currentGroup < groupCount - 1 ? 0 : 30, // 마지막그룹이면 숨김(30), 아니면 보임(0)
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [currentGroup, rightArrowTranslate, groupCount]);

  // 왼쪽 화살표 클릭: 첫 그룹으로 이동
  const goToFirstGroup = () => onPress(0);
  // 오른쪽 화살표 클릭: 마지막 그룹의 첫 도트로 이동
  const goToLastGroup = () => onPress((groupCount - 1) * MAX_DOTS);

  return (
    <View style={styles.container}>
      <View style={styles.arrowContainer}>
        <Animated.View style={{ transform: [{ translateX: leftArrowTranslate }] }}>
          {currentGroup > 0 && (
            <TouchableOpacity onPress={goToFirstGroup} style={styles.arrow}>
              <Text style={styles.arrowText}>{'<'}</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
      <View style={styles.dotsWrapper}>
        {dotIndexes.map((idx) => (
          <TouchableOpacity key={idx} onPress={() => onPress(idx)}>
            <Dot active={currentIndex === idx} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.arrowContainer}>
        <Animated.View style={{ transform: [{ translateX: rightArrowTranslate }] }}>
          {currentGroup < groupCount - 1 && (
            <TouchableOpacity onPress={goToLastGroup} style={styles.arrow}>
              <Text style={styles.arrowText}>{'>'}</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

export default DotPagination;
