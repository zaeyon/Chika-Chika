import React, {useCallback} from 'react';
import Styled from 'styled-components/native';
import {
    TouchableWithoutFeedback
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
background-color: #FFFFFF;
padding-top: 22px;
padding-left: 16px;
padding-right: 10px;
`;

const ContentContainer = Styled.View`
flex-direction: row;
`;

const BottomDivier = Styled.View`
margin-top: 22px;
height: 0.7px;
background-color: #F5F7F9;
`;

const ProfileContainer = Styled.View`
flex-direction: row;
`;

const ProfileImageContainer = Styled.View`
background-color: #ffffff;
`;

const ProfileImage = Styled.Image`
width: ${wp('10.66%')}px;
height: ${wp('10.66%')}px;
border-radius: 100px;
border-width: 0.5px;
border-color: #E2E6ED;
`;

const BodyContainer = Styled.View`
flex: 1;
margin-left: 8px;
justify-content: center;
background-color: #ffffff;
`;

const NicknameText = Styled.Text`
font-weight: 800;
font-size: 15px;
line-height: 16px;
color: #131F3C;
`;

const NotifyDescripText = Styled.Text`
margin-top: 4px;
font-weight: 400;
font-size: 13px;
line-height: 16px;
color: #4E525D;
`;

const DateContainer = Styled.View`
`;

const DateText = Styled.Text`
margin-right: 6px;
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: #9AA2A9;
`;

const NicknameContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const SelectButtonContainer = Styled.View`
padding: 0px 0px 0px 16px; 
align-items: center;
justify-content: center;
`;

const SelectButtonIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;



interface Props {
    notificationObj: any,
    isEditing: boolean,
    selectNotificationItem: (notificationId: number, type: string, index: number) => void,
    selected: boolean,
    index: number,
    moveToAnotherProfile: (userId: string, nickname: string, profileImageUri: string) => void,
    moveToNotifiedPost: (notificationObj: any) => void,
}

const NotificationItem = ({notificationObj, isEditing, selectNotificationItem, selected, index, moveToAnotherProfile, moveToNotifiedPost}: Props) => {

    console.log("NotificationItem notificationObj", notificationObj);

    const formatDate = useCallback((createdAt: string) => {
    const currentYear = new Date(Date.now()).getFullYear();

    const [date, time] = createdAt.split(' ');
    const [year, month, day] = date.split('-');

    if (String(currentYear) === year) {
      return parseInt(month) + '월 ' + parseInt(day) + '일';
    } else {
      return year + '년 ' + parseInt(month) + '월 ' + parseInt(day) + '일';
    }
  }, [notificationObj]);


    return (
        <TouchableWithoutFeedback onPress={() => moveToNotifiedPost(notificationObj)}>
        <Container>
            <ContentContainer>
            <TouchableWithoutFeedback onPress={() => moveToAnotherProfile(notificationObj.senders.id, notificationObj.senders.nickname, notificationObj.senders.profileImg)}>
            <ProfileImageContainer>
                <ProfileImage
                source={{uri: notificationObj.senders.profileImg ? notificationObj.senders.profileImg : "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg"}}/>
            </ProfileImageContainer>
            </TouchableWithoutFeedback>
            <BodyContainer>
                <NicknameContainer>
                    <NicknameText>{notificationObj.senders.nickname}</NicknameText>
                    <DateText>{formatDate(notificationObj.createdAt)}</DateText>
                </NicknameContainer>
                <NotifyDescripText>{notificationObj.message}</NotifyDescripText>
            </BodyContainer>
            {isEditing && (
                <TouchableWithoutFeedback onPress={() => selectNotificationItem(notificationObj.id, notificationObj.type, index)
                }>
                <SelectButtonContainer>
                    <SelectButtonIcon
                    source={
                    selected
                    ? require('~/Assets/Images/Notification/ic_selected.png')
                    : require('~/Assets/Images/Notification/ic_unselected.png')
                    }/>
                </SelectButtonContainer>
                </TouchableWithoutFeedback>
            )}
            </ContentContainer>
            <BottomDivier/>
        </Container>
        </TouchableWithoutFeedback>
    )
}

function isEqual(prevItem: any, nextItem: any) {
    return (prevItem.notificationObj.id === nextItem.notificationObj.id) && (prevItem.selected === nextItem.selected) && (prevItem.isEditing === nextItem.isEditing)
}

export default React.memo(NotificationItem, isEqual);