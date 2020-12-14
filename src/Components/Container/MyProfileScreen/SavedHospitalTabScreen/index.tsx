import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import SavedHospitalScreen from '~/Components/Presentational/MyProfileScreen/SavedHospitalScreen';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const SavedHospitalTabScreen = ({navigation, route}: Props) => {
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
        headerTitle="예약"
      />
      <SavedHospitalScreen
        navigation={navigation}
        route={route}
        hospitals={[{id: '1'}]}
      />
    </ContainerView>
  );
};

export default SavedHospitalTabScreen;
