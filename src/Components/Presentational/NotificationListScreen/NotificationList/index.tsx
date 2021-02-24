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
    View
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
    navigation: any,
    route: any,
    isEditing: boolean,
    refreshingNotification: boolean,
    onRefreshNotificationArray: () => void,
    notificationArray: any,
    selectedNotificationIdArray: Array<any>,
    selectNotificationItem: (notificationId: number, type: string, index: number) => void,
}

const NotificationList = ({navigation, route, isEditing,  selectNotificationItem, refreshingNotification, onRefreshNotificationArray, notificationArray, selectedNotificationIdArray}: Props) => {
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

    const moveToNotifiedPost = (notificationObj: any) => {
        console.log("moveToNotifiedPost notificationObj", notificationObj);
        if(notificationObj.type === "Comment") {
            if(notificationObj.communityId !== null) {
                navigation.navigate("CommunityStackScreen", {
                    screen: "CommunityDetailScreen",
                    params: {
                        id: notificationObj.communityId,
                    }
                })
            } else if(notificationObj.reviewId !== null) {
                navigation.navigate("ReviewStackScreen", {
                    screen: "ReviewDetailScreen",
                    params: {
                        reviewId: notificationObj.reviewId,
                        postId: notificationObj.reviewId,
                        postType: 'review',
                        requestType: 'notification',
                    }
                })
            }
        } else if(notificationObj.type === "Like") {
            if(notificationObj.reviewId !== null) {
                navigation.navigate("ReviewStackScreen", {
                    screen: "ReviewDetailScreen",
                    params: {
                        reviewId: notificationObj.reviewId,
                    }
                })
            } else if(notificationObj.communityId !== null) {
                navigation.navigate("CommunityStackScreen", {
                    screen: "CommunityDetailScreen",
                    params: {
                        id: notificationObj.communityId,
                    }
                })
            }
        }
    }

    const renderNotificationItem = ({item, index}: any) => {

        console.log("renderNotificationItem item", item);
    
        let selectedIndex;

        selectedIndex = selectedNotificationIdArray.findIndex((selectedItem, index) => {
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
    

    const renderNotificationFooter = () => {
        return (
            <GuideContainer>
                    <GuideText>{"최근 30일 동안 받은 알림을 모두 확인했습니다."}</GuideText>
            </GuideContainer>
        )
    }

    return (
        <Container>
            {notificationArray?.length > 0 && (
            <NotificationListContainer>
                <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 40}}
                refreshing={refreshingNotification}
                onRefresh={onRefreshNotificationArray}
                renderItem={renderNotificationItem}
                data={notificationArray}
                listFooterComponent={renderNotificationFooter}/>
            </NotificationListContainer>
            )}
            {notificationArray?.length === 0 && (
            <ScrollView
            refreshControl={
                <RefreshControl
                refreshing={refreshingNotification}
                onRefresh={onRefreshNotificationArray}/>
            }>
            <NoNotificationListContainer>
                <NoDataImage
                source={require('~/Assets/Images/ic_noData.png')}/>
                <NoDataText>{"알림이 없습니다."}</NoDataText>
            </NoNotificationListContainer>
            </ScrollView>
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



{/* <ScrollView
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
        contentContainerStyle={[{marginTop: 12}]}
        data={likeNotificationArray}
        renderItem={renderLikeNotificationItem}
        ListFooterComponent={renderNotificationFooter}/>
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
        contentContainerStyle={[{marginTop: 12}]}
        data={eventNotificationArray}
        renderItem={renderEventNotificationItem}
        ListFooterComponent={renderNotificationFooter}/>  
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
        contentContainerStyle={[{marginTop: 12}]}
        data={commentNotificationArray}
        renderItem={renderCommentNotificationItem}
        ListFooterComponent={renderNotificationFooter}/>
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
</ScrollView> */}


// const renderCommentNotificationItem = ({item, index}: any) => {

//     let selectedIndex;

//      selectedIndex = commentNotifyIdArray.findIndex((selectedItem, index) => {
//         if(selectedItem.id === item.id) {
//             return index
//         }
//     })

//     return (
//         <NotificationItem
//         index={index}
//         selected={selectedIndex === -1 ? false : true}
//         isEditing={isEditing}
//         notificationObj={item}
//         selectNotificationItem={selectNotificationItem}
//         moveToAnotherProfile={moveToAnotherProfile}
//         moveToNotifiedPost={moveToNotifiedPost}/>
//     )
// }

// const renderLikeNotificationItem = ({item, index}: any) => {

//     let selectedIndex;

//      selectedIndex = likeNotifyIdArray.findIndex((selectedItem, index) => {
//         if(selectedItem.id === item.id) {
//             return index
//         }
//     })

//     return (
//         <NotificationItem
//         index={index}
//         selected={selectedIndex === -1 ? false : true}
//         isEditing={isEditing}
//         notificationObj={item}
//         selectNotificationItem={selectNotificationItem}
//         moveToAnotherProfile={moveToAnotherProfile}
//         moveToNotifiedPost={moveToNotifiedPost}/>
//     )
// }

// const renderEventNotificationItem = ({item, index}: any) => {

//     let selectedIndex;

//      selectedIndex = eventNotifyIdArray.findIndex((selectedItem, index) => {
//         if(selectedItem.id === item.id) {
//             return index
//         }
//     })

//     return (
//         <NotificationItem
//         index={index}
//         selected={selectedIndex === -1 ? false : true}
//         isEditing={isEditing}
//         notificationObj={item}
//         selectNotificationItem={selectNotificationItem}
//         moveToAnotherProfile={moveToAnotherProfile}
//         moveToNotifiedPost={moveToNotifiedPost}/>
//     )
// }