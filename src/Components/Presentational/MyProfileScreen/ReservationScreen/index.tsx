import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
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
margin-bottom: 12px;
`;

const ReservationItemImage = Styled.Image`
width: 78px;
height: 78px;
background: #F5F7F9;
border-width: 0.5px;
border-color: #E2E6ED;
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
margin-bottom: 0px;
`;

const ReservationItemNavigationView = Styled.View`
flex-direction: row;
align-items: center;
padding-bottom: 12px;
padding-top: 12px;
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
z-index: 3;
`;

const DeleteIconImage = Styled.Image`
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
width: ${wp('100%')}px;
margin: 8px 0px;
`;

interface Props {
  reservations: any;
  deleteReservation: (clinicId: string) => void;
  moveToDentalDetail: (dentalId: number) => void;
  moveToReviewUpload: (dentalId: number, dentalName: string) => void;
  onPressReservation: (phonenumber: number, dentalId: number) => void;
}

const ReservationScreen = ({
  reservations,
  deleteReservation,
  moveToDentalDetail,
  moveToReviewUpload,
  onPressReservation,
}: Props) => {
  const renderReservationItemView = useCallback(({item, index}: any) => {
    console.log('renderReservationItemView item', item);

    return (
      <ReservationItemContainerView>
        <TouchableWithoutFeedback
          onPress={() => {
            Alert.alert('예약 내역을 삭제하시겠어요?', undefined, [
              {
                text: '아니요',
              },
              {
                text: '예',
                onPress: () => deleteReservation(item.id),
              },
            ]);
          }}>
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
            <ReservationItemImage source={item.dentalClinicProfileImgs.length ? {uri: item.dentalClinicProfileImgs[0]} : require('~/Assets/Images/Dental/default_clinic.png')}/>
            <ReservationItemDetailView>
              <ReservationItemDateText>
                {`${item.time.slice(0, -3)} 전화`}
              </ReservationItemDateText>
              <ReservationItemClinicText>
                {item.originalName}
              </ReservationItemClinicText>
              <TouchableWithoutFeedback
                onPress={() => moveToDentalDetail(item.id)}>
                <ReservationItemNavigationView
                  style={{backgroundColor: '#ffffff'}}>
                  <ReservationItemNavigationText>
                    {'병원상세정보'}
                  </ReservationItemNavigationText>
                  <ArrowIconImage
                    source={require('~/Assets/Images/MyPage/move_clinic_detail.png')}
                  />
                </ReservationItemNavigationView>
              </TouchableWithoutFeedback>
            </ReservationItemDetailView>
          </ReservationItemContentView>
        </TouchableWithoutFeedback>
        <ReservationButtonContainerView>
          <CreateReviewTouchableOpacity
            onPress={() => moveToReviewUpload(item.id, item.originalName)}>
            <CreateReviewText>{'리뷰남기기'}</CreateReviewText>
          </CreateReviewTouchableOpacity>
          <ReReservationTouchableOpacity
            onPress={() => onPressReservation(item.telNumber, item.id)}>
            <ReReservationText>{'재예약'}</ReReservationText>
          </ReReservationTouchableOpacity>
        </ReservationButtonContainerView>
      </ReservationItemContainerView>
    );
  }, []);

  return (
    <ContainerView>
      {reservations.length === 0 ? (
        <>
          <EmptyIndicatorView>
            <EmptyIndicatorImage
              source={require('~/Assets/Images/ic_noData.png')}
            />
            <EmptyIndicatorText>{'예약 내역이 없습니다.'}</EmptyIndicatorText>
          </EmptyIndicatorView>
        </>
      ) : (
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        alwaysBounceVertical={false}
        renderItem={renderReservationItemView}
      />)}
    </ContainerView>
  );
};
export default ReservationScreen;
