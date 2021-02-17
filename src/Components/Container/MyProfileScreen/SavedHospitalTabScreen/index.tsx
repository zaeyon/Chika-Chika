import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import SavedHospitalScreen from '~/Components/Presentational/MyProfileScreen/SavedHospitalScreen';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #F5F7F9;
`;

const EmptyIndicatorView = Styled.View`
position: absolute;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
background: #F5F7F9;
z-index: -1;
`;

const EmptyIndicatorImage = Styled.Image`
margin-bottom: 12px;
`;

const EmptyIndicatorText = Styled.Text`
font-weight: normal;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
`;

const BannerImage = Styled.Image`
width: 100%;
margin: 8px 0px;
`;

interface Props {
  navigation: any;
  route: any;
}

const SavedHospitalTabScreen = ({navigation, route}: Props) => {
  const [hospitals, setHospitals] = useState([{id: 1}]);
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
        headerTitle="찜한 병원"
      />
      {hospitals.length === 0 ? (
        <>
          <BannerImage
            source={require('~/Assets/Images/Banner/banner_review_starbucks.png')}
          />
          <EmptyIndicatorView>
            <EmptyIndicatorImage
              source={require('~/Assets/Images/ic_noData.png')}
            />
            <EmptyIndicatorText>{'찜한 내역이 없습니다.'}</EmptyIndicatorText>
          </EmptyIndicatorView>
        </>
      ) : (
        <SavedHospitalScreen hospitals={hospitals} />
      )}
    </ContainerView>
  );
};

export default SavedHospitalTabScreen;
