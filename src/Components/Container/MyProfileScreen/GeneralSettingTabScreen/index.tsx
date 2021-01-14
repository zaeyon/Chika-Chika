import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import GeneralSettingScreen from '~/Components/Presentational/MyProfileScreen/GeneralSettingScreen';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const GeneralSettingTabScreen = ({navigation, route}: Props) => {
  const headerLeftAction = () => {
    navigation.goBack();
  };

  return (
    <ContainerView>
      <NavigationHeader
        headerLeftProps={{
          onPress: headerLeftAction,
          type: 'arrow',
        }}
        headerTitle="설정"
      />
      <GeneralSettingScreen navigation={navigation} route={route} />
    </ContainerView>
  );
};

export default GeneralSettingTabScreen;
