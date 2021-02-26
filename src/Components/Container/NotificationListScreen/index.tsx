import React, {useState, useEffect} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

// Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import NotificationList from '~/Components/Presentational/NotificationListScreen/NotificationList';

// Route
import GETUserNotifications from '~/Routes/Notification/GETUserNotifications';
import DELETEUserNotifications from '~/Routes/Notification/DELETEUserNotifications';

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #F5F7F9;
padding-bottom: 16px;
`;

interface Props {
  navigation: any;
  route: any;
}

const NotificationListScreen = ({navigation, route}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [refreshingNotification, setRefreshingNotification] = useState<boolean>(false);
  const [selectedNotificationIdArray, setSelectedNotificationIdArray] = useState<Array<any>>([""]);

  const dispatch = useDispatch();
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const notificationArray = useSelector((state: any) => state.currentUser.notificationArray);

  useEffect(() => {
    GETUserNotifications({jwtToken})
      .then((response) => {
        console.log('GETUserNotifications response', response);
        dispatch(allActions.userActions.setNotificationArray(response));
      })
      .catch((error) => {
        console.log('GETUserNotifications error', error);
      });
  }, [])

  const goBack = () => {
    navigation.goBack();
  };

  const clickEdit = () => {
    setIsEditing(true);
  };

  const onRefreshNotificationArray = () => {
      setRefreshingNotification(true);

      GETUserNotifications({jwtToken})
      .then((response: any) => {
        console.log('GETUserNotifications response ', response);
        setRefreshingNotification(false);
        dispatch(allActions.userActions.setNotificationArray(response));
      })
      .catch((error) => {
        console.log('GETUserNotifications error', error);
        setRefreshingNotification(false);
      });
  };

  const deleteNotification = async () => {
    setIsEditing(false);
    console.log("selectedNotificationIdArray", selectedNotificationIdArray);


    const tmpNotificationArray = [...notificationArray];
    const formattedIdArray = new Array();

    function deleteNotificationArray() {
      for (let i = selectedNotificationIdArray.length - 1; i >= 1; i--) {
        tmpNotificationArray.splice(selectedNotificationIdArray[i].index, 1);
        formattedIdArray.push(selectedNotificationIdArray[i].id);
      }
    }

    await deleteNotificationArray();
    dispatch(allActions.userActions.setNotificationArray(tmpNotificationArray));
    DELETEUserNotifications({jwtToken, formattedIdArray})
      .then((response) => {
        console.log('DELETEUserNotifications response', response);
        setSelectedNotificationIdArray([""]);
      })
      .catch((error) => {
        console.log('DELETEUserNotifications error', error);
      });
  };

  const selectNotificationItem = (id: number, type: string, index: number) => {
    const notificationObj = {
      id,
      index,
    };

    setSelectedNotificationIdArray((prevState) => {
      const selectedIndex = prevState.findIndex((item, index) => {
        if(id === item.id) {
          return index;
        }
      });

      if(selectedIndex === -1) {
        const tmpPrevState = [...prevState];
        tmpPrevState.push(notificationObj);
        console.log("tmpPrevState.push", tmpPrevState);
        return tmpPrevState;
      } else {
        const tmpPrevState = [...prevState];
        tmpPrevState.splice(selectedIndex, 1);
        console.log("tmpPrevState.splice", tmpPrevState);
        return tmpPrevState;
      }
    })
  };

  return (
    <Container as={SafeAreaView} forceInset={{top: 'always'}}>
      <NavigationHeader
        headerLeftProps={{type: 'arrow', onPress: goBack}}
        headerRightProps={
          notificationArray.length > 0 ? (
          !isEditing
            ? {
                type: 'text',
                text: '편집',
                fontColor: '#4E525D',
                onPress: clickEdit,
              }
            : {
                type: 'text',
                text: '삭제',
                fontColor: '#00D1FF',
                onPress: deleteNotification,
              }
          ) : null
        }
        headerTitle={'활동 알림'}
      />
      <BodyContainer>
        <NotificationList
          navigation={navigation}
          route={route}
          notificationArray={notificationArray}
          selectedNotificationIdArray={selectedNotificationIdArray}
          refreshingNotification={refreshingNotification}
          onRefreshNotificationArray={onRefreshNotificationArray}
          selectNotificationItem={selectNotificationItem}
          isEditing={isEditing}
        />
      </BodyContainer>
    </Container>
  );
};

export default NotificationListScreen;

