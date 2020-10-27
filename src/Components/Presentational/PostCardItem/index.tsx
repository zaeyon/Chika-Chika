import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('68.2%')};
height: ${wp('48.8%')};
background-color: #ffffff;
border-radius: 8px;
border-width: 1px;
border-color: #E0E0E0;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 16px;
`;

const ProfileContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ProfileImageContainer = Styled.View`
`;

const ProfileImage = Styled.View`
width: ${wp('10.6%')};
height: ${wp('10.6%')};
`;

const ProfileInfoContainer = Styled.View`
`;

const NicknameText = Styled.Text`
`;


