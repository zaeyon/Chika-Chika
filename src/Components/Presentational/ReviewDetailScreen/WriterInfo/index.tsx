import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {
    TouchableWithoutFeedback
} from 'react-native';

const Container = Styled.View`
padding-top: ${hp('2.70%')}px;
padding-bottom: ${hp('0%')}px;
padding-left: 16px;
padding-right: 16px;
background-color: #ffffff;
flex-direction: row;
align-items: center;
justify-content: space-between
`;

const ProfileContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ProfileImage = Styled.Image`
width: ${wp('10.66%')}px;
height: ${wp('10.66%')}px;
border-radius: 100px;
border-width: 0.5px;
border-color: #9AA2A9
`;

const ProfileRightContainer = Styled.View`
margin-left: 12px;
`;

const NicknameText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
line-height: 18px;
font-size: 14px;
color: #131F3C;
`;

const ElapsedTimeText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
line-height: 16px;
font-size: 12px;
color: #9AA2A9;
`;

const ViewWriterProfileButton = Styled.View`
padding-top: ${hp('0.98%')}px;
padding-bottom: ${hp('0.98%')}px;
padding-left: ${wp('3.287%')}px;
padding-right: ${wp('3.287%')}px;
border-radius: 100px;
background-color: #ffffff;
border-width: 1px;
border-color: #00D1FF;
`;

const ViewWriterProfileText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
font-size: 12px;
color: #00D1FF;
`;

interface WriterObj {
  nickname: string;
  profileImage: string;
  userId: string;
}

interface Props {
    writerObj: WriterObj,
    elapsedTime: string,
    isVisibleElapsedTime: boolean,
    createdDate: string,
    moveToAnotherProfile: (userId: string, nickname: string, profileImageUri: string) => void,
}

const WriterInfo = ({writerObj, elapsedTime, isVisibleElapsedTime, createdDate, moveToAnotherProfile}: Props) => {

    console.log("WriterInfo elapsedTime", elapsedTime)

    return (
        <Container>
            <TouchableWithoutFeedback onPress={() => moveToAnotherProfile(writerObj.userId, writerObj.nickname, writerObj.profileImage)}>
            <ProfileContainer>
                <ProfileImage
                source={{uri:writerObj?.profileImage}}/>
                <ProfileRightContainer>
                    <NicknameText>{writerObj?.nickname}</NicknameText>
                    <ElapsedTimeText>{elapsedTime}</ElapsedTimeText>
                </ProfileRightContainer>
            </ProfileContainer>
            </TouchableWithoutFeedback>
            {/*
            <ViewWriterProfileButton>
                <ViewWriterProfileText>{"프로필 방문"}</ViewWriterProfileText>
            </ViewWriterProfileButton>
            */}
        </Container>
    )
}

export default WriterInfo


