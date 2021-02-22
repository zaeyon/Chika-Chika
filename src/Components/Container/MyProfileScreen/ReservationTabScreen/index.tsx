import React, {useState, useCallback, useEffect} from 'react';
import Styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import ReservationScreen from '~/Components/Presentational/MyProfileScreen/ReservationScreen';

// Redux
import allActions from '~/actions';
import {useSelector, useDispatch} from 'react-redux';
// Routes
import DELETEDentalCallReserve from '~/Routes/Reserve/DELETEDentalCallReserve';
const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

const ActivityIndicatorContainerView = Styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;

interface Props {
  navigation: any;
  route: any;
}

const ReservationTabScreen = ({navigation, route}: Props) => {
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const reservations = useSelector(
    (state: any) => state.currentUser.reservations,
  );

  const dispatch = useDispatch();

  const deleteReservation = useCallback(
    (clinicId: string) => {
      dispatch(allActions.userActions.deleteReservation(clinicId));
      DELETEDentalCallReserve({jwtToken, clinicId}).then((response: any) => {
        console.log(
          'delete reservation id: ',
          clinicId,
          'response: ',
          response,
        );
      });
    },
    [jwtToken],
  );
  const moveToDentalDetail = useCallback((dentalId) => {
    navigation.navigate('DentalClinicStackScreen', {
      screen: 'DentalDetailScreen',
      params: {
        dentalId,
      },
    });
  }, []);

  return (
    <ContainerView>
      <NavigationHeader
        headerLeftProps={{
          onPress: () => navigation.goBack(),
          type: 'arrow',
        }}
        headerTitle="예약피드"
      />
      {reservations === null ? (
        <ActivityIndicatorContainerView>
          <ActivityIndicator />
        </ActivityIndicatorContainerView>
      ) : (
        <ReservationScreen
          navigation={navigation}
          reservations={reservations}
          deleteReservation={deleteReservation}
          moveToDentalDetail={moveToDentalDetail}
        />
      )}
    </ContainerView>
  );
};

export default ReservationTabScreen;
