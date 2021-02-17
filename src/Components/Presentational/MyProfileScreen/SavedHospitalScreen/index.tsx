import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  FlatList,
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
margin-bottom: 16px;
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
margin-bottom: 12px;
`;

const ContentHighlightView = Styled.View`
flex-direction: row;
align-items: center;
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

interface Props {
  hospitals: any;
}

const SavedHospitalScreen = ({hospitals}: Props) => {
  const renderSavedHospitalItemView = ({item, index}: any) => {
    return (
      <ContentContainerView>
        <ContentHorizontalView>
          <ContentImage />
          <ContentDescriptionView>
            <ContentTitleText>광교E편한치과의원</ContentTitleText>
            <ContentText>경기도 수원시 영통구 이의동</ContentText>
            <TouchableWithoutFeedback>
              <ContentHighlightView>
                <ContentHighlightText>{'병원상세정보'}</ContentHighlightText>
                <RightArrowImage
                  source={require('~/Assets/Images/MyPage/move_clinic_detail.png')}
                />
              </ContentHighlightView>
            </TouchableWithoutFeedback>
          </ContentDescriptionView>
        </ContentHorizontalView>
        <TouchableHighlight
          style={{borderRadius: 4}}
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() => console.log('reservation button pressed')}>
          <ContentButtonView>
            <ContentButtonText>{'바로예약'}</ContentButtonText>
          </ContentButtonView>
        </TouchableHighlight>
        <TouchableWithoutFeedback>
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
      <FlatList
        data={hospitals}
        keyExtractor={(item) => item.id}
        alwaysBounceVertical={false}
        renderItem={renderSavedHospitalItemView}
      />
    </ContainerView>
  );
};
export default SavedHospitalScreen;
