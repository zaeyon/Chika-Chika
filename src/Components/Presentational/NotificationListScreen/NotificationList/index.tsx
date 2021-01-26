import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    TouchableWithoutFeedback,
    FlatList,
    StyleSheet,
    ScrollView,
} from 'react-native';

// Local Component
import NotificationItem from '~/Components/Presentational/NotificationListScreen/NotificationItem';

const Container = Styled.View`
flex: 1;
`;

const NotificationTypeListContainer = Styled.View`
flex-direction: row;
align-items: center;
margin-left: 16px;
`;

const NotificationTypeItemContainer = Styled.View`
padding: 8px 16px;
border-radius: 100px;
background-color: #ffffff;
border-width: 0.5px;
border-color: #E2E6ED;
`;

const NotificationTypeText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 24px;
`;

const NotificationListContainer = Styled.View`
flex: 1;
`;

const GuideContainer = Styled.View`
flex: 1;
align-items: center;
`;

const GuideText = Styled.Text`
margin-top: 16px;
font-weight: 400;
font-size: 12px;
line-height: 16px;
color: #4E524D;
`;


interface Props {
    notificationArray: any,
    isEditing: boolean,
    selectNotificationItem: (notificationId: number) => void,
    unselectNotificationItem: (notificationId: number) => void,
}

const NotificationList = ({notificationArray, isEditing, selectNotificationItem, unselectNotificationItem}: Props) => {
    const [selectedType, setSelectedType] = useState<string>("like");

    const selectNotificationType = (type: string) => {
        if(selectedType !== type) {
            setSelectedType(type)
        }
    }

    const renderNotificationItem = ({item, index}: any) => {
        return (
            <NotificationItem
            selected={false}
            isEditing={isEditing}
            notificationObj={item}
            selectNotificationItem={selectNotificationItem}
            unselectNotificationItem={unselectNotificationItem}/>
        )
    }

    return (
        <Container>
            <NotificationTypeListContainer>
                <TouchableWithoutFeedback onPress={() => selectNotificationType("like")}>
                <NotificationTypeItemContainer
                style={selectedType === "like" && {backgroundColor: "#131F3C"}}>
                    <NotificationTypeText
                    style={selectedType === "like" && {color: "#ffffff", fontWeight: "800"}}>{"좋아요"}</NotificationTypeText>
                </NotificationTypeItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => selectNotificationType("event")}>
                <NotificationTypeItemContainer
                style={[selectedType === "event" && {backgroundColor: "#131F3C"}, {marginLeft: 8}]}>
                    <NotificationTypeText
                    style={selectedType === "event" && {color: "#ffffff", fontWeight: "800"}}>{"이벤트"}</NotificationTypeText>
                </NotificationTypeItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => selectNotificationType("comment")}>
                <NotificationTypeItemContainer
                style={[selectedType === "comment" && {backgroundColor: "#131F3C"}, {marginLeft: 8}]}>
                    <NotificationTypeText
                    style={selectedType === "comment" && {color: "#ffffff", fontWeight: "800"}}>{"댓글"}</NotificationTypeText>
                </NotificationTypeItemContainer>
                </TouchableWithoutFeedback>
            </NotificationTypeListContainer>
            {selectedType === "like" && (            
            <NotificationListContainer>
                <ScrollView>
                <FlatList
                scrollEnabled={false}
                contentContainerStyle={[{backgroundColor: "#ffffff", marginTop: 16, borderRadius: 8, marginLeft: 16, marginRight: 16}, styles.notificationListShadow]}
                data={notificationArray.like}
                renderItem={renderNotificationItem}/>
                <GuideContainer>
                    <GuideText>{"최근 30일 동안 받은 알림을 모두 확인했습니다."}</GuideText>
                </GuideContainer>
                </ScrollView>
            </NotificationListContainer>
            )}
            {selectedType === "event" && (
            <NotificationListContainer>
                <ScrollView>
                <FlatList
                scrollEnabled={false}
                contentContainerStyle={[{backgroundColor: "#ffffff", marginTop: 16, borderRadius: 8, marginLeft: 16, marginRight: 16}, styles.notificationListShadow]}
                data={notificationArray.event}
                renderItem={renderNotificationItem}/>  
                <GuideContainer>
                    <GuideText>{"최근 30일 동안 받은 알림을 모두 확인했습니다."}</GuideText>
                </GuideContainer> 
                </ScrollView> 
            </NotificationListContainer>
            )}
            {selectedType === "comment" && (
            <NotificationListContainer>
                <ScrollView>
                <FlatList
                scrollEnabled={false}
                contentContainerStyle={[{backgroundColor: "#ffffff", marginTop: 16, borderRadius: 8, marginLeft: 16, marginRight: 16}, styles.notificationListShadow]}
                data={notificationArray.comment}
                renderItem={renderNotificationItem}/>
                <GuideContainer>
                    <GuideText>{"최근 30일 동안 받은 알림을 모두 확인했습니다."}</GuideText>
                </GuideContainer>
                </ScrollView>
            </NotificationListContainer>
            )}
        </Container>
    )
}

export default NotificationList;

const styles = StyleSheet.create({
    notificationListShadow: {
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    }
})
