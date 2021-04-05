import React from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
margin: 0px 16px;
margin-bottom: 21px;
background: #FFFFFF;
padding: 24px 16px;
border-radius: 8px;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
width: auto;
`;

const TitleText = Styled.Text`
font-style: normal;
font-weight: 800;
font-size: 18px;
line-height: 24px;
color: #131F3C;
margin-bottom: 12px;
`

const NavigatoinButtonView = Styled.View`
border: 1px #E2E6ED;
border-radius: 100px;
padding: 12px 0px;
justify-content: center;
align-items: center;
flex-direction: row;
margin-top: 12px;
background: #FFFFFF;
`;

const NavigatoinButtonText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
`;

const NavigatoinButtonImage = Styled.Image`
`;


interface Props {
    renderContentItem: any;
    title: string;
    onPress: any;
}

const HomeContentContainerView = ({renderContentItem, title, onPress}: Props) => {
    return (
        <ContainerView>
            <TitleText>
                {title}
            </TitleText>
            {renderContentItem()}
        <TouchableWithoutFeedback onPress={() => moveToCommunity()}>
          <NavigatoinButtonView>
            <NavigatoinButtonText>
              <NavigatoinButtonText
                style={{
                  color: '#00D1FF',
                }}>
                {'다른 병원도 '}
              </NavigatoinButtonText>
              {'궁금해요'}
            </NavigatoinButtonText>
            <NavigatoinButtonImage
              source={require('~/Assets/Images/Arrow/common/gan/button_right_arrow.png')}
            />
          </NavigatoinButtonView>
        </TouchableWithoutFeedback>
        </ContainerView>
    )
}

export default HomeContentContainerView