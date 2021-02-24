import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {ActivityIndicator, LayoutAnimation} from 'react-native';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import SavedHospitalScreen from '~/Components/Presentational/MyProfileScreen/SavedHospitalScreen';

// Redux
import {useSelector} from 'react-redux';
// Routes
import GETUserSavedHospitals from '~/Routes/User/GETUserSavedHospitals';
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
  const [hospitals, setHospitals] = useState(null);

  useEffect(() => {
    GETUserSavedHospitals({jwtToken}).then((response: any) => {
      setHospitals(response);
    });
  }, []);

  const deleteSavedHospital = useCallback(
    (dentalId) => {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
      );
      DELETEDentalScrap({jwtToken, dentalId}).then((response) => {
        GETUserSavedHospitals({jwtToken}).then((response: any) => {
          setHospitals(response);
        });
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
        />
      )}
    </ContainerView>
  );
};

export default SavedHospitalTabScreen;
