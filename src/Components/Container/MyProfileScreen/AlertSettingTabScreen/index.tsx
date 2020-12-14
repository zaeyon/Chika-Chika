import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import AlertSettingScreen from '~/Components/Presentational/MyProfileScreen/AlertSettingScreen';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const AlertSettingTabScreen = ({navigation, route}: Props) => {
  const headerLeftAction = () => {
    navigation.goBack();
  };

  return (
    <ContainerView>
      <NavigationHeader
        headerLeftProps={{
          onPress: headerLeftAction,
          text: 'arrow',
        }}
        headerTitle="알림"
      />
      <AlertSettingScreen navigation={navigation} route={route} />
    </ContainerView>
  );
};

export default AlertSettingTabScreen;
