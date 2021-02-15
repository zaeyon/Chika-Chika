import React, {useCallback, useEffect} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import GeneralSettingScreen from '~/Components/Presentational/MyProfileScreen/GeneralSettingScreen';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
// Routes
import PUTUserNotifications, {
  Config,
} from '~/Routes/Notification/PUTUserNotifications';

const ContainerView = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const GeneralSettingTabScreen = ({navigation, route}: Props) => {
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
        changeNotificationSetting={changeNotificationSetting}
        profile={profile}
      />
    </ContainerView>
  );
};

export default GeneralSettingTabScreen;
