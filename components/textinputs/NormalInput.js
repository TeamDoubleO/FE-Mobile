import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/NormalInput.styles';
import { TextInput } from 'react-native';
import { colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const NormalInput = ({
  placeholder = 'placeholder',
  errorText = '',
  isEditable = true,
  value,
  onChangeTextHandler,
  isSecureTextEntry,
  maxLengthNum,
  onFocusHandler,
  onBlurHandler,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 여부

  const handleFocus = () => {
    setIsFocused(true);
    onFocusHandler?.(); // 부모 컴포넌트가 prop을 넘겨주었을 때만 실행
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlurHandler?.(); // 부모 컴포넌트가 prop을 넘겨주었을 때만 실행
  };

  return (
    <View>
      {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.darkGray}
          value={value}
          editable={isEditable}
          onChangeText={(text) => {
            // 입력 텍스트 공백 제거
            const trimmedText = text.replace(/\s/g, '');
            // props로 받은 메소드 존재하면, 공백 제거 텍스트 전달
            onChangeTextHandler?.(trimmedText);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.input,
            isFocused && styles.focused,
            errorText && styles.error,
            !isEditable && styles.editable,
            isSecureTextEntry && { paddingRight: '3%' }, // 눈 아이콘 공간 확보
          ]}
          secureTextEntry={isSecureTextEntry && !showPassword}
          maxLength={maxLengthNum}
        />

        {/* isSecureTextEntry==true일 때만 눈 아이콘 표시 */}
        {isSecureTextEntry && (
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color={colors.darkGray} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default NormalInput;
