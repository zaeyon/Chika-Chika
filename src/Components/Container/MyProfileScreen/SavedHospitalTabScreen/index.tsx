import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import SavedHospitalScreen from '~/Components/Presentational/MyProfileScreen/SavedHospitalScreen';

// Redux
import allActions from '~/actions';
import {useSelector, useDispatch} from 'react-redux';
// Routes
import DELETEDentalScrap from '~/Routes/Dental/DELETEDentalScrap';
import callDentalPhoneNumber from '~/method/callDentalPhoneNumber';
import GETUserReservations from '~/Routes/User/GETUserReservations';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #F5F7F9;
`;

const ActivityIndicatorContainerView = Styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  navigation: any;
  route: any;
}

const SavedHospitalTabScreen = ({navigation, route}: Props) => {
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const hospitals = useSelector(
    (state: any) => state.currentUser.savedHospitals,
  );

  const dispatch = useDispatch();

  const clickDentalCallReservation = useCallback(
    (dentalPhoneNumber: number, jwtToken: string, dentalId: number) => {
      callDentalPhoneNumber(dentalPhoneNumber, jwtToken, dentalId, () => {
        GETUserReservations({jwtToken}).then((response: any) => {
          dispatch(allActions.userActions.setReservations(response));
        });
      });
    },
    [],
  );

  const deleteSavedHospital = useCallback(
    (dentalId) => {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
      );
      dispatch(allActions.userActions.deleteSavedHospital(dentalId));
      DELETEDentalScrap({jwtToken, dentalId}).then((response) => {});
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
        headerTitle="찜한 병원"
      />
      {hospitals === null ? (
        <ActivityIndicatorContainerView>
          <ActivityIndicator />
        </ActivityIndicatorContainerView>
      ) : (
        <SavedHospitalScreen
          jwtToken={jwtToken}
          navigation={navigation}
          route={route}
          hospitals={hospitals}
          deleteSavedHospital={deleteSavedHospital}
          moveToDentalDetail={moveToDentalDetail}
          clickDentalCallReservation={clickDentalCallReservation}
        />
      )}
    </ContainerView>
  );
};

export default SavedHospitalTabScreen;
