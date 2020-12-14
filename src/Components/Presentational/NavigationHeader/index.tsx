import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${hp('8%')}px;
 padding-top: 7px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color: white;
 border-bottom-width: 1px;
 border-color: #eeeeee;
`;

const HeaderLeftContainer = Styled.View`
width: 30%;
height: ${hp('8%')}px;
padding: 0px 16px;
 align-items: center;
 flex-direction: row;
`;

const HeaderTitleText = Styled.Text`

font-weight: bold;
font-size: 18px; 

`;

const HeaderRightContainer = Styled.View`
width: 30%;
height: ${hp('8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 justify-content: flex-end;
 flex-direction: row;
`;

interface Props {
  renderHeaderLeftContainer: any;
  renderHeaderRightContanier: any;
  headerTitle: string;
}
const NavigationHeader = ({
  renderHeaderLeftContainer,
  renderHeaderRightContanier,
  headerTitle,
}: Props) => {
  return (
    <HeaderBar>
      <HeaderLeftContainer>{renderHeaderLeftContainer()}</HeaderLeftContainer>
      <HeaderTitleText>{headerTitle}</HeaderTitleText>
      <HeaderRightContainer>
        {renderHeaderRightContanier()}
      </HeaderRightContainer>
    </HeaderBar>
  );
};

export default NavigationHeader;
