import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  FlatList,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
flex: 1;
background: #F5F7F9;
`;

const ContentContainerView = Styled.View`
width: ${wp('100%')}px;
padding: 20px 16px;
background: #FFFFFF;
justify-content: space-between;
margin-top: 8px;
`;

const ContentHorizontalView = Styled.View`
flex-direction: row;
margin-bottom: 10px;
`;

const ContentImage = Styled.Image`
width: 78px;
height: 78px;
background: #F5F7F9;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 8px;
`;

const ContentDescriptionView = Styled.View`
margin-left: 16px;
`;

const ContentTitleText = Styled.Text`
font-weight: 800;
font-size: 18px;
line-height: 24px;
color: #131F3C;
margin-bottom: 6px;
`;

const ContentText = Styled.Text`
font-weight: normal;
font-size: 14px;
line-height: 16px;
color: #9AA2A9;
`;

const ContentHighlightView = Styled.View`
flex-direction: row;
align-items: center;
padding-bottom: 12px;
padding-top: 12px;
`;

const ContentHighlightText = Styled.Text`
font-weight: 800;
font-size: 14px;
line-height: 16px;
color: #00D1FF;
`;

const ContentButtonView = Styled.View`
width: 100%;
padding: 12px 0px;
align-items: center;
border-width: 1px; 
border-color: #E2E6ED;
border-radius: 4px;
background: #FFFFFF
`;

const ContentButtonText = Styled.Text`
font-weight: 800;
font-size: 14px;
line-height: 16px;
color: #131F3C;
`;

const RightArrowImage = Styled.Image`
margin-left: 2px;
`;

const DeleteImageView = Styled.View`
position: absolute;
top: 11px;
right: 9px;
padding: 9px;
`;

const DeleteImage = Styled.Image`
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
  jwtToken: string;
  deleteSavedHospital: (dentalId: string) => void;
  hospitals: any;
  moveToDentalDetail: (dentalId: any) => void;
  clickDentalCallReservation: (
    dentalPhoneNumber: number,
    jwtToken: string,
    dentalId: number,
  ) => void;
}

const SavedHospitalScreen = ({
  jwtToken,
  deleteSavedHospital,
  hospitals,
  navigation,
  route,
  clickDentalCallReservation,
}: Props) => {
  const moveToDentalDetail = (dentalId: number) => {
    navigation.navigate('DentalClinicStackScreen', {
      screen: 'DentalDetailScreen',
      params: {
        dentalId: dentalId,
      },
    });
  };

  const renderSavedHospitalItemView = ({item, index}: any) => {
    console.log('renderSavedHospitalItemView item', item);
    return (
      <ContentContainerView>
        <ContentHorizontalView>
          <ContentImage
            source={{
              uri: item.dentalClinicProfileImgs[0],
            }}
          />
          <ContentDescriptionView>
            <ContentTitleText>{item.originalName}</ContentTitleText>
            <ContentText>{item.local}</ContentText>
            <TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => moveToDentalDetail(item.id)}>
                <ContentHighlightView>
                  <ContentHighlightText>{'병원상세정보'}</ContentHighlightText>
                  <RightArrowImage
                    source={require('~/Assets/Images/MyPage/move_clinic_detail.png')}
                  />
                </ContentHighlightView>
              </TouchableWithoutFeedback>
            </TouchableWithoutFeedback>
          </ContentDescriptionView>
        </ContentHorizontalView>
        <TouchableHighlight
          style={{borderRadius: 4}}
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() =>
            clickDentalCallReservation(item.telNumber, jwtToken, item.id)
          }>
          <ContentButtonView>
            <ContentButtonText>{'바로예약'}</ContentButtonText>
          </ContentButtonView>
        </TouchableHighlight>
        <TouchableWithoutFeedback
          onPress={() => {
            Alert.alert('찜한 병원을 삭제하시겠어요?', undefined, [
              {
                text: '아니요',
              },
              {
                text: '예',
                onPress: () => deleteSavedHospital(item.id),
              },
            ]);
          }}>
          <DeleteImageView>
            <DeleteImage
              source={require('~/Assets/Images/MyPage/delete_reservation.png')}
            />
          </DeleteImageView>
        </TouchableWithoutFeedback>
      </ContentContainerView>
    );
  };

  return (
    <ContainerView>
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
        <FlatList
          data={hospitals}
          keyExtractor={(item) => item.id}
          alwaysBounceVertical={false}
          renderItem={renderSavedHospitalItemView}
        />
      )}
    </ContainerView>
  );
};
export default SavedHospitalScreen;
