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
  View,
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
  navigation: any;
  route: any;
  isEditing: boolean;
  refreshingNotification: boolean;
  onRefreshNotificationArray: () => void;
  notificationArray: any;
  selectedNotificationIdArray: Array<any>;
  selectNotificationItem: (
    notificationId: number,
    type: string,
    index: number,
  ) => void;
}

const NotificationList = ({
  navigation,
  route,
  isEditing,
  selectNotificationItem,
  refreshingNotification,
  onRefreshNotificationArray,
  notificationArray,
  selectedNotificationIdArray,
}: Props) => {
  const [selectedType, setSelectedType] = useState<string>('like');

  console.log(selectedNotificationIdArray);
  const selectNotificationType = (type: string) => {
    if (selectedType !== type) {
      setSelectedType(type);
    }
  };

  const moveToAnotherProfile = (
    userId: string,
    nickname: string,
    profileImageUri: string,
  ) => {
    navigation.navigate('AnotherProfileStackScreen', {
      targetUser: {
        userId,
        nickname,
        profileImageUri,
      },
    });
  };

  const moveToNotifiedPost = (notificationObj: any) => {
    console.log('moveToNotifiedPost notificationObj', notificationObj);
    if (notificationObj.type === 'Comment') {
      if (notificationObj.communityId !== null) {
        navigation.navigate('CommunityStackScreen', {
          screen: 'CommunityDetailScreen',
          params: {
            id: notificationObj.communityId,
            type: 'Notification',
            category: 'comment',
            commentId: notificationObj.communityCommentId,
            isLoading: true,
          },
        });
      } else if (notificationObj.reviewId !== null) {
        navigation.navigate('ReviewStackScreen', {
          screen: 'ReviewDetailScreen',
          params: {
            reviewId: notificationObj.reviewId,
            postId: notificationObj.reviewId,
            postType: 'review',
            type: 'Notification',
            category: 'comment',
            commentId: notificationObj.reviewCommentId,
            isLoading: true,
          },
        });
      }
    } else if (notificationObj.type === 'Like') {
      if (notificationObj.reviewId !== null) {
        navigation.navigate('ReviewStackScreen', {
          screen: 'ReviewDetailScreen',
          params: {
            reviewId: notificationObj.reviewId,
          },
        });
      } else if (notificationObj.communityId !== null) {
        navigation.navigate('CommunityStackScreen', {
          screen: 'CommunityDetailScreen',
          params: {
            id: notificationObj.communityId,
          },
        });
      }
    }
  };

  const renderNotificationItem = ({item, index}: any) => {
    const selectedIndex = selectedNotificationIdArray.findIndex(
      (selectedItem) => selectedItem.id === item.id,
    );

    return (
      <NotificationItem
        index={index}
        selected={selectedIndex !== -1}
        isEditing={isEditing}
        notificationObj={item}
        selectNotificationItem={selectNotificationItem}
        moveToAnotherProfile={moveToAnotherProfile}
        moveToNotifiedPost={moveToNotifiedPost}
      />
    );
  };

  const renderNotificationFooter = () => {
    return (
      <GuideContainer>
        <GuideText>{'최근 30일 동안 받은 알림을 모두 확인했습니다.'}</GuideText>
      </GuideContainer>
    );
  };

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
            ListFooterComponent={renderNotificationFooter}
          />
        </NotificationListContainer>
      )}
      {notificationArray?.length === 0 && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshingNotification}
              onRefresh={onRefreshNotificationArray}
            />
          }>
          <NoNotificationListContainer>
            <NoDataImage source={require('~/Assets/Images/ic_noData.png')} />
            <NoDataText>{'알림이 없습니다.'}</NoDataText>
          </NoNotificationListContainer>
        </ScrollView>
      )}
    </Container>
  );
};

export default NotificationList;
