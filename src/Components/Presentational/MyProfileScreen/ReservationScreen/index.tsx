import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//Local Components
import PlaceholderContent from '~/Components/Container/PlaceholderContent';

const ContainerView = Styled.View`
flex: 1;
background: #F8F8F8;
`;

const ReservationItemContainerView = Styled.View`
width: auto;
margin-bottom: 8px;
padding: 16px 0px;
background: #FFFFFF;
`;

const ReservationItemTitleView = Styled.View`
width: 100%;
height: auto;
padding: 0px 16px;
flex-direction: row;
align-items: center;
margin-bottom: 16px;
`;

const ReservationItemTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
color: #4E525D;
`;

const ReservationItemContentView = Styled.View`
width: 100%
flex-direction: row;
padding: 0px 16px;
margin-bottom: 24px;
`;

const ReservationItemImage = Styled.Image`
width: 78px;
height: 78px;
background: #F5F7F9;
border: 0.5px #E2E6ED;
border-radius: 8px;
margin-right: 16px;
`;
const ReservationItemDetailView = Styled.View`
width: auto
height: auto;
`;

const ReservationItemDateText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
color: #9AA2A9;
margin-bottom: 6px;
`;

const ReservationItemClinicText = Styled.Text`
font-style: normal;
font-weight: 800;
font-size: 18px;
line-height: 24px;
color: #131F3C;
margin-bottom: 12px;
`;

const ReservationItemNavigationView = Styled.View`
flex-direction: row;
align-items: center;
`;
const ReservationItemNavigationText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
color: #00D1FF;
`;

const ReservationButtonContainerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
flex-direction: row;
padding: 0px 12px;
`;

const CreateReviewTouchableOpacity = Styled.TouchableOpacity`
flex: 1;
padding: 12px 0px;
margin: 0px 4px;
border: 1px #00D1FF;
border-radius: 4px;
justify-content: center;
align-items: center;
`;
const CreateReviewText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
color: #00D1FF;
`;
const ReReservationTouchableOpacity = Styled.TouchableOpacity`
flex: 1;
padding: 12px 0px;
margin: 0px 4px;
border: 1px #E2E6ED;
border-radius: 4px;
justify-content: center;
align-items: center;
`;
const ReReservationText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
color: #131F3C;
`;

const ArrowIconImage = Styled.Image`
margin-left: 4px;
`;

const DeleteIconView = Styled.View`
position: absolute;
top: 12px;
right: 8px;
padding: 8px;
`;

const DeleteIconImage = Styled.Image`
`;

const BannerImage = Styled.Image`
width: ${wp('100%')}px;
margin: 8px 0px;
`;

interface Props {
  navigation: any;
  route: any;
  reservations: any;
}

const ReservationScreen = ({navigation, route, reservations}: Props) => {
  const renderReservationItemView = useCallback(({item, index}: any) => {
    return (
      <ReservationItemContainerView>
        <TouchableWithoutFeedback>
          <DeleteIconView>
            <DeleteIconImage
              source={require('~/Assets/Images/MyPage/delete_reservation.png')}
            />
          </DeleteIconView>
        </TouchableWithoutFeedback>
        <ReservationItemTitleView>
          <ReservationItemTitleText>
            {`${item.date.replace(/-/gi, '.')} (${item.day})`}
          </ReservationItemTitleText>
        </ReservationItemTitleView>
        <TouchableWithoutFeedback>
          <ReservationItemContentView>
            <ReservationItemImage />
            <ReservationItemDetailView>
              <ReservationItemDateText>
                {`${item.time.slice(0, -3)} 전화`}
              </ReservationItemDateText>
              <ReservationItemClinicText>
                {item.originalName}
              </ReservationItemClinicText>
              <ReservationItemNavigationView>
                <ReservationItemNavigationText>
                  {'병원상세정보'}
                </ReservationItemNavigationText>
                <ArrowIconImage
                  source={require('~/Assets/Images/MyPage/move_clinic_detail.png')}
                />
              </ReservationItemNavigationView>
            </ReservationItemDetailView>
          </ReservationItemContentView>
        </TouchableWithoutFeedback>
        <ReservationButtonContainerView>
          <CreateReviewTouchableOpacity>
            <CreateReviewText>{'리뷰남기기'}</CreateReviewText>
          </CreateReviewTouchableOpacity>
          <ReReservationTouchableOpacity>
            <ReReservationText>{'재예약'}</ReReservationText>
          </ReReservationTouchableOpacity>
        </ReservationButtonContainerView>
      </ReservationItemContainerView>
    );
  }, []);

  const renderListHeader = useCallback(
    () =>
      reservations.length === 0 ? (
        <PlaceholderContent
          navigation={navigation}
          title={'아직 병원 예약 내역이 없습니다.'}
        />
      ) : (
        <BannerImage
          source={require('~/Assets/Images/Banner/banner_review_starbucks.png')}
        />
      ),
    [navigation, reservations],
  );
  return (
    <ContainerView>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        alwaysBounceVertical={false}
        renderItem={renderReservationItemView}
        ListHeaderComponent={renderListHeader}
      />
    </ContainerView>
  );
};
export default ReservationScreen;
