import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
background-color: #ffffff;
`;

const SocialInfoContainer = Styled.View`
flex-direction: row;
padding-top: 5px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 5px;
align-items: center;
`;

const SocialInfoText = Styled.Text`
font-size: 12px;
color: #888888;
`;

const SocialActionContainer = Styled.View`
padding-top: 13px;
padding-bottom: 13px;
padding-left: 16px;
padding-right: 16px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const EmptyLikeIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const LikeCountText = Styled.Text`
font-size: 16px;
color: #56575C;
`;

const EmptyScrapIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const GetTreatInfoButton = Styled.View`
width: ${wp('55.7%')}px;
height: ${wp('10.66%')}px;
background-color: #267DFF;
border-radius: 4px;
align-items: center;
justify-content: center;
`;

const GetTreatInfoText = Styled.Text`
font-weight: bold;
color: #ffffff;
font-size: 14px;
`;

interface Props {
  view_count: number;
  getInfo_count: number;
}

const SocialInformation = ({view_count, getInfo_count}: Props) => {
  return (
    <Container>
      <SocialInfoContainer>
        <SocialInfoText>{'조회' + view_count}</SocialInfoText>
        <SocialInfoText>{'정보받기' + getInfo_count}</SocialInfoText>
      </SocialInfoContainer>
    </Container>
  );
};

export default SocialInformation;
