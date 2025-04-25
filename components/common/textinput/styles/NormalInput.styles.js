import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    minWidth: '80%',
    height: 50,
    marginVertical: '1.5%',
    paddingHorizontal: '5%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#BCCBBE',
    fontSize: 17,
  },
  focused: { borderColor: '#385E3C' },
  error: { borderColor: '#FF4943' },
  errorText: {
    marginLeft: '2%',
    marginTop: '1%',
    fontSize: 15,
    color: '#FF4943',
  },
  editable: { backgroundColor: '#E7E7E7' },
});
