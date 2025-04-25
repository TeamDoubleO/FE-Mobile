import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    width: 316,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#BCCBBE',
    fontSize: 17,
  },
  focused: { borderColor: '#385E3C' },
  error: { borderColor: '#FF4943' },
  errorText: { margin: 10, marginTop: 0, fontSize: 15, color: '#FF4943' },
  editable: {
    backgroundColor: '#F1F1F1',
  },
});
