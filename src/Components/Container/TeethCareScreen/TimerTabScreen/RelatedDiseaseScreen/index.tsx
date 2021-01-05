import React from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('11.7%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;

const HeaderLeftContainer = Styled.View`
height: ${wp('11.7%')}px;
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderTitleText = Styled.Text`
font-size: 16px;
color: #595959;
`;

const HeaderRightContainer = Styled.View`
height: ${wp('11.7%')}px;
padding: 7px 16px 13px 15px;
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
background-color: #ffffff;
`;

const RelatedDiseaseScreen = ({}) => {
  return (
    <Container>
      <HeaderBar>
        <HeaderLeftContainer>
          <HeaderEmptyContainer />
        </HeaderLeftContainer>
        <HeaderTitleText>{'오늘은 어떤가요?'}</HeaderTitleText>
        <HeaderRightContainer>
          <HeaderEmptyContainer />
        </HeaderRightContainer>
      </HeaderBar>
      <BodyContainer></BodyContainer>
    </Container>
  );
};

export default RelatedDiseaseScreen;
