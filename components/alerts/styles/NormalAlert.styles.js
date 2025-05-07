// components/alerts/NormalAlert.styles.js
import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  alert: {
    width: 300,
    height: 'auto',
    padding: 20,
    borderRadius: 10,
  },
  alertTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 5,
  },
  alertMessage: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.darkGray,
    marginBottom: 10,
    lineHeight: 30,
    textAlign: 'center',
  },
  alertMessageLeft: {
    textAlign: 'left',
  },
  alertConfirm: {
    width: 'auto',
    height: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  alertCancel: {
    width: 'auto',
    height: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGreen,
  },
  alertButtonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
