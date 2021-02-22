import React, {useState, useCallback, useEffect} from 'react';
import Styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import ReservationScreen from '~/Components/Presentational/MyProfileScreen/ReservationScreen';

// Redux
import {useSelector} from 'react-redux';
// Routes
import GETUserReservations from '~/Routes/User/GETUserReservations';
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
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    GETUserReservations({jwtToken}).then((response: any) => {
      setReservations(response);
    });
  }, []);

  const deleteReservation = useCallback(
    (clinicId: string) => {
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
          route={route}
          reservations={reservations}
          deleteReservation={deleteReservation}
        />
      )}
    </ContainerView>
  );
};

export default ReservationTabScreen;
