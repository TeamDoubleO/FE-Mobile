import React from 'react';
import { View } from 'react-native';
import MenuList from '../components/lists/MenuList';

const alertlist = [
  { label: '알림 제목 1', message: '알림 내용 1' },
  { label: '알림 재목 2', message: '알림 내용 2' },
];

export default function AlertList() {
  return (
    <View>
      <MenuList items={alertlist} />
    </View>
  );
}
