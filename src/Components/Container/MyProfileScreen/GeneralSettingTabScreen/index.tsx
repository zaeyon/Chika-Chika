import React, {useCallback, useState} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import GeneralSettingScreen from '~/Components/Presentational/MyProfileScreen/GeneralSettingScreen';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
// Routes
import PUTUserNotifications, {
  Config,
} from '~/Routes/Notification/PUTUserNotifications';
import DELETEUserAccount from '~/Routes/User/DELETEUserAccount';

const ContainerView = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const GeneralSettingTabScreen = ({navigation, route}: Props) => {
  const [loading, setLoading] = useState(false);
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const profile = useSelector((state: any) => state.currentUser.profile);

  const headerLeftAction = () => {
    navigation.goBack();
  };

  const changeNotificationSetting = useCallback(
    (config: Config) => {
      PUTUserNotifications(jwtToken, config).then((response: any) => {
        console.log(response);
      });
    },
    [jwtToken],
  );

  const logout = useCallback(
    (callback = () => console.log('log out complete')) => {
      setLoading(true);
      switch (profile.provider) {
        case 'kakao':
          KakaoLogins.logout().then((result) => {
            console.log(result);
            callback();
            setLoading(false);
          });
          return;
        case 'google':
          callback();
          setLoading(false);
          return;
        case 'apple':
          callback();
          setLoading(false);
          return;
      }
    },
    [profile],
  );
  const signout = useCallback(
    (callback = () => console.log('sign out complete')) => {
      console.log(profile.provider);
      setLoading(true);
      switch (profile.provider) {
        case 'kakao':
          KakaoLogins.unlink().then((result) => {
            DELETEUserAccount({jwtToken}).then((response: any) => {
              console.log('delete user account', response);
              setLoading(false);
              callback();
            });
          });
          return;
        case 'google':
          DELETEUserAccount({jwtToken}).then((response: any) => {
            console.log('delete user account', response);
            setLoading(false);
            callback();
          });
          return;
        case 'apple':
          DELETEUserAccount({jwtToken}).then((response: any) => {
            console.log('delete user account', response);
            setLoading(false);
            callback();
          });
          return;
        default:
          DELETEUserAccount({jwtToken}).then((response: any) => {
            console.log('delete user account', response);
            setLoading(false);
            callback();
          });
      }
    },
    [jwtToken, profile],
  );

  return (
    <ContainerView as={SafeAreaView}>
      <NavigationHeader
        headerLeftProps={{
          onPress: headerLeftAction,
          type: 'arrow',
        }}
        headerTitle="설정"
      />
      <GeneralSettingScreen
        jwtToken={jwtToken}
        changeNotificationSetting={changeNotificationSetting}
        logout={logout}
        signout={signout}
        profile={profile}
      />
      <TouchBlockIndicatorCover loading={loading} />
    </ContainerView>
  );
};

export default GeneralSettingTabScreen;
