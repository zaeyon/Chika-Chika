import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';

const Container = Styled.View`
width: ${wp('100%')}px;
height: ${DeviceInfo.hasNotch() ? hp('8.128%') + 34 : hp('11.2')}px;
background-color: #ffffff;
border-top-width: 1px;
border-color: #E2E6ED;
flex-direction: row;
padding-top: ${hp('1.91%')}px;
padding-left: ${wp('4.26%')}px;
padding-right: ${wp('4.26%')}px;
justify-content: space-between;
position: absolute;
bottom: 0;
`;

const ScrapButton = Styled.View`
width: ${wp('12.8%')}px;
height: ${wp('12.8%')}px;
align-items: center;
justify-content: center;
border-radius: 8px;
border-width: 1px;
border-color: #F5F7F9;
`;

const ScrapImage = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const ReserveButton = Styled.View`
margin-left: ${wp('4.26%')}px;
flex: 1;
height: ${wp('12.8%')}px;
border-radius: 8px;
background-color: #131F3C;
align-items: center;
justify-content: center;
`;

const ReserveText = Styled.Text`
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #ffffff;
`;

interface Props {
  postDentalScrap: () => void;
  deleteDentalScrap: () => void;
  isCurUserScrap: boolean;
}

const DentalBottomBar = ({
  postDentalScrap,
  deleteDentalScrap,
  isCurUserScrap,
}: Props) => {
  return (
    <Container>
      {isCurUserScrap && (
        <TouchableWithoutFeedback onPress={() => deleteDentalScrap()}>
          <ScrapButton>
            <ScrapImage
              source={require('~/Assets/Images/Indicator/ic_scrap_focus.png')}
            />
          </ScrapButton>
        </TouchableWithoutFeedback>
      )}
      {!isCurUserScrap && (
        <TouchableWithoutFeedback onPress={() => postDentalScrap()}>
          <ScrapButton>
            <ScrapImage
              source={require('~/Assets/Images/Indicator/ic_scrap_unfocus.png')}
            />
          </ScrapButton>
        </TouchableWithoutFeedback>
      )}
      <ReserveButton>
        <ReserveText>{'전화예약'}</ReserveText>
      </ReserveButton>
    </Container>
  );
};

export default DentalBottomBar;
