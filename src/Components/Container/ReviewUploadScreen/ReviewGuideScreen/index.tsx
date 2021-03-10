import React, {useState, useEffect, createRef} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {NavigationContainer} from '@react-navigation/native';
import ActionSheet from 'react-native-actionsheet';

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
 padding-top: ${getStatusBarHeight()};
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
padding: 12px 16px 16px 16px;
flex-direction: row;
`;

const HeaderBackContainer = Styled.View`
width: ${wp('8.53%')}px;
height: ${wp('8.53%')}px;
background-color: #9AA2A9;
align-items: center;
justify-content: center;
border-radius: 100px;
`;
const HeaderBackIcon = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const HeaderTitleText = Styled.Text`
margin-top: 5px;
font-weight: bold;
font-size: 18px; 
`;

const HeaderRightContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const BodyContainer = Styled.View`
flex: 1;
`;

const TakePhotoText = Styled.Text`
`;

const GalleryText = Styled.Text`
margin-top: 30px;
`;

const ReceiptPromotionContainer = Styled.View`
flex: 2;
`;

const PostReviewContainer = Styled.View`
border-top-width: 1px;
border-color: #E2E6ED;
width: ${wp('100%')}px;
height: ${hp('10.59%')}px;
background-color: #ffffff;
`;


const PostReviewButtonContainer = Styled.View`
padding-top: 16px;
align-items: center;
`;

const PostReviewText = Styled.Text`
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #131F3C;
`;

const SkipText = Styled.Text`
font-size: 18px;
color: #000000;
`;

const GuideContainer = Styled.View`
background-color: #F5F7F9;
padding: 24px 16px 64px 16px;
`;

const GuideHeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const GuideInfoIcon = Styled.Image`
width: ${wp('3.73%')}px;
height: ${wp('3.73%')}px;
`;

const GuideLabelText = Styled.Text`
margin-left: 4px;
`;

const GuideDescripContainer = Styled.View`
padding-top: 16px;
`;

const GuideDescripText = Styled.Text`
font-weight: 400;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
`;

const EventSpeechBubbleContainer = Styled.View`
width: ${wp('100%')}px;
align-items: center;
position: absolute;
bottom: -3px;
`;

const EventSpeechBubbleImage = Styled.Image`
width: ${wp('20.6%')}px;
height: ${wp('14.2%')}px;
`;

interface Props {
  navigation: any;
  route: any;
}

const ReviewGuideScreen = ({navigation, route}: Props) => {
  const actionSheetRef = createRef();

  const goBack = () => {
    navigation.goBack();
  };

  const onPressReceiptButton = () => {
    actionSheetRef.current.show();
  };

  const onPressActionSheet = (index: number) => {
    if (index === 1) {
      navigation.navigate('ReceiptCamera');
    } else if (index === 2) {
      navigation.navigate('GallerySelectOne', {});
    }
  };

  const moveToReviewMetaData = () => {
    navigation.navigate('ReviewMetaDataScreen', {
      requestType: 'post',
    });
  };

  return (
    <Container>
      <HeaderBar>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderLeftContainer>
            <HeaderBackContainer>
            <HeaderBackIcon
              source={require('~/Assets/Images/Upload/ic_back_guide.png')}
            />
            </HeaderBackContainer>
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
        <HeaderRightContainer>
          <HeaderEmptyContainer></HeaderEmptyContainer>
        </HeaderRightContainer>
      </HeaderBar>
      <BodyContainer>
        <ReceiptPromotionContainer></ReceiptPromotionContainer>
        <GuideContainer>
          <GuideHeaderContainer>
            <GuideInfoIcon
            source={require('~/Assets/Images/Upload/ic_info.png')}/>
            <GuideLabelText>{"안내사항"}</GuideLabelText>
          </GuideHeaderContainer>
          <GuideDescripContainer>
            <GuideDescripText>{"1인이 여러 병･의원에 대해 횟수 제한 없이 이벤트에 참여할 수 있습니다. 단 동일 병･의원에 대한 리뷰는 상품 중복 지급이 불가합니다."}</GuideDescripText>
            <GuideDescripText
            style={{marginTop: 16}}>{"상품은 작성해주신 리뷰 검수 후, 7일(영업일 기준) 이내에 문자로 발송드립니다."}</GuideDescripText>
            <GuideDescripText
            style={{marginTop: 16}}>{"본 이벤트는 당사의 사정에 따라 사전고지 없이 변경 또는 종료될 수 있습니다."}</GuideDescripText>
          </GuideDescripContainer>
          <EventSpeechBubbleContainer>
          <EventSpeechBubbleImage
          source={require('~/Assets/Images/Upload/sb_event.png')}/>
          </EventSpeechBubbleContainer>
        </GuideContainer>
        <PostReviewContainer>
          <TouchableWithoutFeedback onPress={() => moveToReviewMetaData()}>
            <PostReviewButtonContainer>
              <PostReviewText>리뷰 작성</PostReviewText>
            </PostReviewButtonContainer>
          </TouchableWithoutFeedback>
        </PostReviewContainer>
      </BodyContainer>
    </Container>
  );
};

export default ReviewGuideScreen;
