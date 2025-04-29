import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/NormalInput.styles';
import { TextInput } from 'react-native';
import { colors } from '../../../constants/colors';

const NormalInput = ({
  placeholder = 'placeholder',
  errorText = '',
  isEditable = true,
  value,
  onChangeTextHandler,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.lightGray}
        value={value}
        editable={isEditable}
        onChangeText={onChangeTextHandler}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          isFocused && styles.focused,
          errorText && styles.error,
          !isEditable && styles.editable,
        ]}
      ></TextInput>
    </View>
  );
};

export default NormalInput;
