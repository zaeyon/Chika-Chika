import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Presentational Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import SafeAreaView from 'react-native-safe-area-view';
const Container = Styled.View`
flex: 1;
background: #FFFFFF;
`;

const BodyContainer = Styled.ScrollView`
flex: 1;
background-color: #F5F7F9;
`;

const PosterImage = Styled.Image`
width: ${wp('100%')}px;
height: ${wp('152%')}px;
`;

const InfoContainer = Styled.View`
padding: 16px 16px 100px 16px;
`;

const InfoHeaderContainer = Styled.View`
flex-direction: row;
justify-content: center;
align-items: center;
`;

const InfoIcon = Styled.Image`
width: ${wp('3.73%')}px;
height: ${wp('3.73%')}px;
tint-color: #9AA2A9;
`;

const InfoLabelText = Styled.Text`
margin-left: 4px;
font-weight: 800;
font-size: 14px;
line-height: 24px;
color: #9AA2A9;
`;

const InfoDescripContainer = Styled.View`
margin-top: 16px;
`;

const InfoDescripText = Styled.Text`
font-weight: 400;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
`;

const FloatingButtonView = Styled.View`
width: ${wp('100%')}px;
padding: 16px 0px;
background: #FFFFFF;
position: absolute;
bottom: 0px;
left: 0px;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
`;

const FloatingButtonContentView = Styled.View`
flex-direction: row;
align-items: center;
margin: auto;
`;
const FloatingButtonText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 20px;
color: #1CBFFC;
`;
const FloatingButtonImage = Styled.Image`
margin-left: 8px;
`;

interface Props {
  navigation: any;
  route: {
    params: {
      showRedirectButton: boolean;
    };
  };
}

const ProofImageEventScreen = ({navigation, route}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };

  const moveToReviewUpload = () => {
    navigation.navigate('BraceReviewUploadStackScreen', {
      screen: 'BraceReviewMetaDataScreen',
      params: {
        requestType: 'post',
      },
    });
  };

  return (
    <Container as={SafeAreaView}>
      <NavigationHeader
        inSafeAreaView={true}
        headerLeftProps={{type: 'arrow', onPress: goBack}}
        headerTitle={'이벤트'}
      />
      <BodyContainer showsVerticalScrollIndicator={false}>
        <PosterImage
          source={require('~/Assets/Images/Poster/poster_proofEvent.png')}
        />
        <InfoContainer style={{
            paddingBottom: route.params?.showRedirectButton ? 100 : 50
        }}>
          <InfoHeaderContainer>
            <InfoIcon source={require('~/Assets/Images/Mark/ic_info.png')} />
            <InfoLabelText>{'안내사항'}</InfoLabelText>
          </InfoHeaderContainer>
          <InfoDescripContainer>
            <InfoDescripText>
              {
                '1인이 여러 병･의원에 대해 횟수 제한 없이 이벤트에 참여할 수 있습니다. 단 동일 병･의원에 대한 리뷰는 상품 중복 지급이 불가합니다.'
              }
            </InfoDescripText>
            <InfoDescripText style={{marginTop: 16}}>
              {
                '상품은 작성해주신 리뷰 검수 후, 7일(영업일 기준) 이내에 문자로 발송드립니다.'
              }
            </InfoDescripText>
            <InfoDescripText style={{marginTop: 16}}>
              {
                '본 이벤트는 당사의 사정에 따라 사전고지 없이 변경 또는 종료될 수 있습니다.'
              }
            </InfoDescripText>
          </InfoDescripContainer>
        </InfoContainer>
      </BodyContainer>
      {route.params?.showRedirectButton ? (
        <TouchableWithoutFeedback onPress={() => moveToReviewUpload()}>
          <FloatingButtonView>
            <FloatingButtonContentView>
              <FloatingButtonText>
                {'리뷰쓰고 쿠폰 받으러 갈까요?'}
              </FloatingButtonText>
              <FloatingButtonImage
                source={require('~/Assets/Images/Review/review_bill.png')}
              />
            </FloatingButtonContentView>
          </FloatingButtonView>
        </TouchableWithoutFeedback>
      ) : null}
    </Container>
  );
};

export default ProofImageEventScreen;
