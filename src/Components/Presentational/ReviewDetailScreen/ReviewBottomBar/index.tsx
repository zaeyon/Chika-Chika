import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';

const Container = Styled.View`
width: ${wp('100%')}px;
height: ${DeviceInfo.hasNotch() ? wp('15.2%') : wp('19.2%')}px;
border-top-width: 1px;
border-color: #c4c4c4;
background-color: #ffffff;
flex-direction: row;
align-items: center;
justify-content: space-around;
`;

const SocialInfoListContainer = Styled.View`
flex-direction: row;
align-items: center;

`;

const LikeContainer = Styled.View`
padding: 16px 8px 16px 0px;
flex-direction: row;
align-items: center;
background-color: #ffffff;
`;

const ScrapContainer = Styled.View`
background-color: #ffffff;
padding: 16px 16px 16px 8px;
`;

const CommentContainer = Styled.View`
background-color: #ffffff;
padding: 16px 8px 16px 16px;
`;

const LikeIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const LikeCountText = Styled.Text`
margin-left: 4px;
font-weight: 400;
font-size: 14px;
color: #000000;
`;

const ScrapIcon = Styled.Image`
width: ${wp('4.53%')};
height: ${wp('4.53%')};
`;

const CommentIcon = Styled.Image`
width: ${wp('5.3%')};
height: ${wp('5.3%')};
`;

const SeeDentalInfoButton = Styled.View`
padding: 12px 35px 12px 35px;
background-color: #000000;
border-radius: 4px;
align-items: center;
justify-content: center;
`;

const SeeDentalInfoText = Styled.Text`
font-weight: 400;
font-size: 14px;
color: #ffffff;
`;

interface Props {
    likeCount: number
}

const ReviewBottomBar = ({likeCount}: Props) => {
    console.log("getBottomSpace", getBottomSpace())
    return (
        <Container>
            <SocialInfoListContainer>
            <LikeContainer>
                <LikeIcon
                source={require('~/Assets/Images/Social/ic_like.png')}/>
                <LikeCountText>{likeCount}</LikeCountText>
            </LikeContainer>
            <ScrapContainer>
                <ScrapIcon
                source={require('~/Assets/Images/Social/ic_scrap.png')}/>
            </ScrapContainer>
            <CommentContainer>
                <CommentIcon
                source={require('~/Assets/Images/Social/ic_comment.png')}/>
            </CommentContainer>
            </SocialInfoListContainer>
            <SeeDentalInfoButton>
                <SeeDentalInfoText>{"병원정보 보러가기"}</SeeDentalInfoText>
            </SeeDentalInfoButton>
        </Container>
    )
}

export default ReviewBottomBar;