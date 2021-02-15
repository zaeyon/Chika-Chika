import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import ReservationScreen from '~/Components/Presentational/MyProfileScreen/ReservationScreen';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const ReservationTabScreen = ({navigation, route}: Props) => {
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
        headerTitle="예약피드"
      />
      <ReservationScreen
        navigation={navigation}
        route={route}
        reservations={[]}
      />
    </ContainerView>
  );
};

export default ReservationTabScreen;
