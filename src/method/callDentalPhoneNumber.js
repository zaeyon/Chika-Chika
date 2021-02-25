import {Linking, Alert, Platform} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';

// Routes
import POSTDentalCallReserve from '~/Routes/Reserve/POSTDentalCallReserve';

const callDentalPhoneNumber = (
  phone,
  jwtToken,
  dentalId,
  callback = () => console.log('callDentalPhoneNumber callback'),
) => {
  console.log('callDentalPhoneNumber', phone);
  let phoneNumber = phone;

  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert('유효하지 않은 전화번호입니다.');
      } else {
        Linking.openURL(phoneNumber)
          .then((response) => {
            startCallDetectionListener();
          })
          .catch((error) => {
            console.log('병원 전화 연결 취소 error', error);
          });
      }
    })
    .catch((err) => console.log(err));

  const startCallDetectionListener = () => {
    const callDetector = new CallDetectorManager(
      (event, phoneNumber) => {
        if (event === 'Disconnected') {
          console.log('Call Disconnected');
          callDetector.dispose();
        } else if (event === 'Connected') {
          console.log('Call Connected');
          // Do something call got connected
          // This clause will only be executed for iO
        } else if (event === 'Incoming') {
          console.log('Call Incoming');
          // Do something call got incoming
        } else if (event === 'Dialing') {
          console.log('Call Dialing');
          POSTDentalCallReserve({jwtToken, dentalId})
            .then((response) => {
              console.log('POSTDentalCallReserve response', response);
              callback();
            })
            .catch((error) => {
              console.log('POSTDentalCallReserve error', error);
            });
          // Do something call got dialing
          // This clause will only be executed for iOS
        } else if (event === 'Offhook') {
          console.log('Call Offhook');
          //Device call state: Off-hook.
          // At least one call exists that is dialing,
          // active, or on hold,
          // and no calls are ringing or waiting.
          // This clause will only be executed for Android
        } else if (event === 'Missed') {
          callDetector.dispose();
        }
      },
      false,
      () => {},
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      },
    );
  };
};

export default callDentalPhoneNumber;
