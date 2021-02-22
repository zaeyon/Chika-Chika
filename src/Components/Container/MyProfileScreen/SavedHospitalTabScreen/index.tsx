import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {ActivityIndicator, LayoutAnimation} from 'react-native';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import SavedHospitalScreen from '~/Components/Presentational/MyProfileScreen/SavedHospitalScreen';

// Redux
import allActions from '~/actions';
import {useSelector, useDispatch} from 'react-redux';
// Routes
import DELETEDentalScrap from '~/Routes/Dental/DELETEDentalScrap';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #F5F7F9;
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

const SavedHospitalTabScreen = ({navigation, route}: Props) => {
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const hospitals = useSelector(
    (state: any) => state.currentUser.savedHospitals,
  );

  const dispatch = useDispatch();

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
          hospitals={hospitals}
          deleteSavedHospital={deleteSavedHospital}
        />
      )}
    </ContainerView>
  );
};

export default SavedHospitalTabScreen;
