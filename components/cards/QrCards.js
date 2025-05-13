import React from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import QrCard from './QrCard';

const { width } = Dimensions.get('window');

const QrCards = ({ userVC, hasAccessAuthority }) => {
  // 권한 없거나 카드 데이터 없으면 안내 메시지 카드만
  if (!hasAccessAuthority || !userVC || userVC.length === 0) {
    return (
      <View style={{ flex: 0.8, width, alignItems: 'center' }}>
        <QrCard hasAccessAuthority={false} />
      </View>
    );
  }

  // 카드 리스트
  return (
    <View style={{ flex: 0.8 }}>
      <FlatList
        data={userVC}
        keyExtractor={(item) => item.did}
        horizontal //가로 스크롤
        pagingEnabled //한 페이지씩 스크롤
        showsHorizontalScrollIndicator={false} //하단 기본 스크롤바 숨김
        renderItem={({ item }) => (
          <View style={{ width, alignItems: 'center' }}>
            <QrCard
              did={item.did}
              userName={item.userName}
              hospitalName={item.hospitalName}
              hasAccessAuthority={true}
            />
          </View>
        )}
      />
    </View>
  );
};

export default QrCards;
