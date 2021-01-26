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
padding-top: 22px;
padding-left: 16px;
padding-right: 16px;
`;

const ContentContainer = Styled.View`
flex-direction: row;
`;

const BottomDivier = Styled.View`
margin-top: 22px;
flex: 1;
height: 0.5px;
background-color: #F5F7F9;
`;

const ProfileContainer = Styled.View`
flex-direction: row;
`;

const ProfileImageContainer = Styled.View`
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
    selectNotificationItem: (notificationId: number) => void,
    unselectNotificationItem: (notificationId: number) => void,
    selected: boolean,
}

const NotificationItem = ({notificationObj, isEditing, selectNotificationItem, unselectNotificationItem, selected}: Props) => {

    const formatNotifyDate = useCallback((date: any) => {

        const tmpDate = new Date(date);

        var year = '' + tmpDate.getFullYear(),
            month = '' + (tmpDate.getMonth() + 1),
            day = '' + tmpDate.getDate();

            return month + '월 ' + day + '일'
        
    }, [notificationObj])

    return (
        <Container>
            <ContentContainer>
            <ProfileImageContainer>
                <ProfileImage
                source={{uri: notificationObj.user.profileImageUri}}/>
            </ProfileImageContainer>
            <BodyContainer>
                <NicknameContainer>
                    <NicknameText>{notificationObj.user.nickname}</NicknameText>
                    <DateText>{formatNotifyDate(notificationObj.data)}</DateText>
                </NicknameContainer>
                <NotifyDescripText>{notificationObj.description}</NotifyDescripText>
            </BodyContainer>
            {isEditing && (
                <TouchableWithoutFeedback onPress={() =>
                    selected 
                    ? unselectNotificationItem(notificationObj.id, notificationObj.type)
                    : selectNotificationItem(notificationObj.id, notificationObj.type)
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
    )
}

export default React.memo(NotificationItem);