import React, { useRef, useState } from 'react';
import { FlatList, View, Dimensions, TouchableOpacity } from 'react-native';
import QrCard from './QrCard';
import styles from './styles/QrCards.styles';
import Dot from './Dot';

// 화면의 가로 길이 가져오기
const { width } = Dimensions.get('window');
const CARD_WIDTH = width;
const SIDE_PADDING = (width - CARD_WIDTH) / 2; // 좌우 패딩 계산
const OVERLAP = 80; // 카드가 겹치는 정도

const QrCards = ({ userVC, hasAccessAuthority }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const flatListRef = useRef(null);

  // 권한 없거나 카드 데이터 없으면 안내 메시지 카드만
  if (!hasAccessAuthority || !userVC || userVC.length === 0) {
    return (
      <View style={{ flex: 0.8, width, alignItems: 'center' }}>
        <QrCard hasAccessAuthority={false} />
      </View>
    );
  }

  // 스크롤이 끝났을 때 현재 페이지 인덱스 계산
  const onMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (CARD_WIDTH - OVERLAP));
    setPageIndex(newIndex);
  };

  // dot(인디케이터) 클릭 시 해당 카드로 이동
  const handleDotPress = (index) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  // 카드 리스트
  return (
    <View style={{ flex: 0.8 }}>
      <FlatList
        ref={flatListRef}
        data={userVC}
        keyExtractor={(item) => item.did}
        horizontal //가로 스크롤
        showsHorizontalScrollIndicator={false} //하단 기본 스크롤바 숨김
        pagingEnabled={false} // snapToInterval을 사용하므로 false
        snapToInterval={CARD_WIDTH - OVERLAP} // 카드 단위로 스냅
        decelerationRate="fast" // 빠른 스냅 효과
        contentContainerStyle={{
          paddingHorizontal: SIDE_PADDING, // 양쪽에 패딩 추가로 옆 카드 살짝 보이게
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: CARD_WIDTH,
              marginLeft: index === 0 ? 0 : -OVERLAP, // 첫 카드는 겹치지 않게
              alignItems: 'center',
              zIndex: pageIndex === index ? 1 : 0, // 선택된 카드가 위로 오게
            }}
          >
            <QrCard
              did={item.did}
              userName={item.userName}
              hospitalName={item.hospitalName}
              hasAccessAuthority={true}
            />
          </View>
        )}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
      <View style={styles.dotContainer}>
        {userVC.map((_, i) => (
          <TouchableOpacity key={`dot-${i}`} onPress={() => handleDotPress(i)}>
            <Dot active={pageIndex === i} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QrCards;
