import { Linking, Alert, Platform } from 'react-native';

export const callPhoneNumber = phone => {
  console.log('callPhoneNumber', phone);
  let phoneNumber = phone;

  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  }
  else  {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
  .then(supported => {
    if (!supported) {
      Alert.alert('유효하지 않은 전화번호입니다.');
    } else {
      return Linking.openURL(phoneNumber);
    }
  })
  .catch(err => console.log(err));
};