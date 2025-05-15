import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    width: 300,
    height: 'auto',
    padding: '5%',
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: colors.black,
    marginTop: '7%',
    alignSelf: 'center',
  },
  modalContentTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.black,
    marginTop: '5%',
    alignSelf: 'center',
  },
  textContainer: {
    marginTop: '3%',
    marginBottom: '7%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.darkGray,
    marginTop: 10,
    lineHeight: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginVertical: '7%',
    gap: '5%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '10%',
    borderRadius: 8,
  },
  QRButton: {
    width: 'auto',
    height: 'auto',
    backgroundColor: colors.primary,
  },
  cancelButton: {
    width: 'auto',
    height: 'auto',
    backgroundColor: colors.lightGreen,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.white,
  },
});
