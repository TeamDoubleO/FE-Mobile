import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/NormalInput.styles';
import { TextInput } from 'react-native';
import { colors } from '../../constants/colors';

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

  const handleFocus = () => {
    setIsFocused(true);
    onFocusHandler && onFocusHandler(); // 부모 컴포넌트가 prop을 넘겨주었을 때만 실행
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlurHandler && onBlurHandler(); // 부모 컴포넌트가 prop을 넘겨주었을 때만 실행
  };

  return (
    <View>
      {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.darkGray}
        value={value}
        editable={isEditable}
        onChangeText={onChangeTextHandler}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.input,
          isFocused && styles.focused,
          errorText && styles.error,
          !isEditable && styles.editable,
        ]}
        secureTextEntry={isSecureTextEntry}
        maxLength={maxLengthNum}
      ></TextInput>
    </View>
  );
};

export default NormalInput;
