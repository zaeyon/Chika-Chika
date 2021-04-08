import React, {useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
background: #FFFFFF;
padding: 16px 16px 24px 16px;
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

const NavigationButtonView = Styled.View`
border: 1px #E2E6ED;
border-radius: 100px;
padding: 12px 0px;
justify-content: center;
align-items: center;
flex-direction: row;
margin-top: 12px;
background: #FFFFFF;
`;

const NavigationButtonText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
`;

const NavigationButtonImage = Styled.Image`
`;


interface Props {
    renderContentItem: any;
    onPress: any;
}

const HomeContentContainerView = ({renderContentItem, onPress}: Props) => {
  const viewScale = useRef(new Animated.Value(1)).current;

    return (
        <ContainerView as={Animated.View}
        style={{
          transform: [
            {
              scale: viewScale,
            },
          ],
        }}>
            {renderContentItem()}
        <TouchableWithoutFeedback 
        onPressIn={() => {
          Animated.spring(viewScale, {
            toValue: 0.97,
            friction: 9,
            tension: 78,
            useNativeDriver: true,
          }).start();
        }}
        onPressOut={() => {
          Animated.spring(viewScale, {
            toValue: 1,
            friction: 9,
            tension: 78,
            useNativeDriver: true,
          }).start();
        }}
        onPress={() => onPress()}>
          <NavigationButtonView>
            <NavigationButtonText>
              <NavigationButtonText
                style={{
                  color: '#00D1FF',
                }}>
                {'다른 병원도 '}
              </NavigationButtonText>
              {'궁금해요'}
            </NavigationButtonText>
            <NavigationButtonImage
              source={require('~/Assets/Images/Arrow/common/gan/button_right_arrow.png')}
            />
          </NavigationButtonView>
        </TouchableWithoutFeedback>
        </ContainerView>
    )
}

export default HomeContentContainerView