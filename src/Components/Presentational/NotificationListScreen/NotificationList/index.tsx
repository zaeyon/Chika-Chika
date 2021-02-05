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
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

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

const NotificationContainer = Styled.View`
flex: 1;
`;

const NoNotificationListContainer = Styled.View`
height: ${hp('60%')}px;
flex: 1;
align-items: center;
justify-content: center;
`;


const LoadingContainer = Styled.View`
height: ${hp('60%')}px;
flex: 1;
align-items: center;
justify-content: center;
`;


const NoDataImage = Styled.Image`
width: ${wp('21.6%')}px;
height: ${wp('21.6%')}px;
`;

const NoDataText = Styled.Text`
margin-top: 12px;
font-weight: 400;
line-height: 24px;
font-size: 16px;
color: #9AA2A9;
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
    isEditing: boolean,
    refreshingNotification: boolean,
    onRefreshNotificationArray: () => void,
    loadingGetLikeNotify: boolean,
    loadingGetEventNotify: boolean,
    loadingGetCommentNotify: boolean,
    likeNotifyIdArray: Array<any>,
    eventNotifyIdArray: Array<any>,
    commentNotifyIdArray: Array<any>,
    selectNotificationItem: (notificationId: number, type: string, index: number) => void,
    likeNotificationArray: Array<any>,
    eventNotificationArray: Array<any>,
    commentNotificationArray: Array<any>,
    navigation: any,
    route: any,
}

const NotificationList = ({navigation, route, isEditing, loadingGetLikeNotify, loadingGetEventNotify, loadingGetCommentNotify, selectNotificationItem, likeNotificationArray, eventNotificationArray, commentNotificationArray, likeNotifyIdArray, eventNotifyIdArray, commentNotifyIdArray, refreshingNotification, onRefreshNotificationArray}: Props) => {
    const [selectedType, setSelectedType] = useState<string>("like");

    const selectNotificationType = (type: string) => {
        if(selectedType !== type) {
            setSelectedType(type)
        }
    }

    const moveToAnotherProfile = (userId: string, nickname: string, profileImageUri: string) => {
        navigation.navigate("AnotherProfileStackScreen", {
            targetUser: {
                userId,
                nickname,
                profileImageUri,
            }
        })
    }

    const moveToNotifiedPost = (postId: number, type: string) => {
        console.log("moveToNotifiedPost type", type)
        if(type === "Comment") {
            navigation.navigate("ReviewStackScreen", {
                screen: "ReviewDetailScreen",
                params: {
                    reviewId: postId
                }
            })
        }
    }
    
    const renderCommentNotificationItem = ({item, index}: any) => {

        let selectedIndex;

         selectedIndex = commentNotifyIdArray.findIndex((selectedItem, index) => {
            if(selectedItem.id === item.id) {
                return index
            }
        })

        return (
            <NotificationItem
            index={index}
            selected={selectedIndex === -1 ? false : true}
            isEditing={isEditing}
            notificationObj={item}
            selectNotificationItem={selectNotificationItem}
            moveToAnotherProfile={moveToAnotherProfile}
            moveToNotifiedPost={moveToNotifiedPost}/>
        )
    }

    const renderLikeNotificationItem = ({item, index}: any) => {

        let selectedIndex;

         selectedIndex = likeNotifyIdArray.findIndex((selectedItem, index) => {
            if(selectedItem.id === item.id) {
                return index
            }
        })

        return (
            <NotificationItem
            index={index}
            selected={selectedIndex === -1 ? false : true}
            isEditing={isEditing}
            notificationObj={item}
            selectNotificationItem={selectNotificationItem}
            moveToAnotherProfile={moveToAnotherProfile}
            moveToNotifiedPost={moveToNotifiedPost}/>
        )
    }

    const renderEventNotificationItem = ({item, index}: any) => {

        let selectedIndex;

         selectedIndex = eventNotifyIdArray.findIndex((selectedItem, index) => {
            if(selectedItem.id === item.id) {
                return index
            }
        })

        return (
            <NotificationItem
            index={index}
            selected={selectedIndex === -1 ? false : true}
            isEditing={isEditing}
            notificationObj={item}
            selectNotificationItem={selectNotificationItem}
            moveToAnotherProfile={moveToAnotherProfile}
            moveToNotifiedPost={moveToNotifiedPost}/>
        )
    }

    return (
        <ScrollView
        refreshControl={
            <RefreshControl
            refreshing={refreshingNotification}
            onRefresh={onRefreshNotificationArray}/>
        }
        contentContainerStyle={{paddingTop: 16, paddingBottom: DeviceInfo.hasNotch() ? hp('10.59%') : hp('7.2%')}}
        showsVerticalScrollIndicator={false}>
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
            <NotificationContainer>
            {likeNotificationArray.length > 0 && !loadingGetLikeNotify && (
            <NotificationListContainer>
                <FlatList
                scrollEnabled={false}
                contentContainerStyle={[{backgroundColor: "#ffffff", marginTop: 16, borderRadius: 8, marginLeft: 16, marginRight: 16}, styles.notificationListShadow]}
                data={likeNotificationArray}
                renderItem={renderLikeNotificationItem}/>
                <GuideContainer>
                    <GuideText>{"최근 30일 동안 받은 알림을 모두 확인했습니다."}</GuideText>
                </GuideContainer>
            </NotificationListContainer>
            )}
            {likeNotificationArray.length === 0 && !loadingGetLikeNotify && (
            <NoNotificationListContainer>
                <NoDataImage
                source={require('~/Assets/Images/ic_noData.png')}/>
                <NoDataText>{"좋아요 알림이 없습니다."}</NoDataText>
            </NoNotificationListContainer>
            )}
            {loadingGetLikeNotify && (
            <LoadingContainer>
                <ActivityIndicator/>
            </LoadingContainer>
            )}
            </NotificationContainer>
            )}
            {selectedType === "event" && (
            <NotificationContainer>
            {eventNotificationArray.length > 0 && !loadingGetEventNotify && (
            <NotificationListContainer>
                <FlatList
                scrollEnabled={false}
                contentContainerStyle={[{backgroundColor: "#ffffff", marginTop: 16, borderRadius: 8, marginLeft: 16, marginRight: 16}, styles.notificationListShadow]}
                data={eventNotificationArray}
                renderItem={renderEventNotificationItem}/>  
                <GuideContainer>
                    <GuideText>{"최근 30일 동안 받은 알림을 모두 확인했습니다."}</GuideText>
                </GuideContainer> 
            </NotificationListContainer>
            )}
            {eventNotificationArray.length === 0 && !loadingGetEventNotify && (
            <NoNotificationListContainer>
                <NoDataImage
                source={require('~/Assets/Images/ic_noData.png')}/>
                <NoDataText>{"이벤트 알림이 없습니다."}</NoDataText>
            </NoNotificationListContainer>
            )}
            {loadingGetEventNotify && (
            <LoadingContainer>
                <ActivityIndicator/>
            </LoadingContainer>
            )}
            </NotificationContainer>
            )}
            {selectedType === "comment" && (
            <NotificationContainer>
            {commentNotificationArray.length > 0 && !loadingGetCommentNotify && (
            <NotificationListContainer>
                <FlatList
                scrollEnabled={false}
                contentContainerStyle={[{marginTop: 16, marginLeft: 16, marginRight: 16, borderRadius: 8, backgroundColor: "#ffffff"}, styles.notificationListShadow]}
                data={commentNotificationArray}
                renderItem={renderCommentNotificationItem}/>
                <GuideContainer>
                    <GuideText>{"최근 30일 동안 받은 알림을 모두 확인했습니다."}</GuideText>
                </GuideContainer>
            </NotificationListContainer>
            )}
            {commentNotificationArray.length === 0 && !loadingGetCommentNotify && (
            <NoNotificationListContainer>
                <NoDataImage
                source={require('~/Assets/Images/ic_noData.png')}/>
                <NoDataText>{"댓글 알림이 없습니다."}</NoDataText>
            </NoNotificationListContainer>
            )}
            {loadingGetCommentNotify && (
            <LoadingContainer>
                <ActivityIndicator/>
            </LoadingContainer>
            )}
            </NotificationContainer>
            )}
        </Container>
        </ScrollView>
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
