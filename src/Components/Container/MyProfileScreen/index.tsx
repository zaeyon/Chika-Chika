import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList, View} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
//Local Component
import MyProfile from '~/Components/Presentational/MyProfileScreen';
import BottomSheet from '~/Components/Presentational/BottomSheet';
import SlideUpPanel from '~/Components/Presentational/MyProfileScreen/SlideUpPanel';
//Routes
import GETUserCommunityPosts from '~/Routes/Community/showPosts/GETUserCommunityPost';

const ContainerView = Styled.SafeAreaView`
flex: 1;
background: white;
`;
interface Props {
  navigation: any;
  route: any;
}

interface Form {
  type: string;
  limit: number;
  offset: number;
  order: string;
}

const MyProfileScreen = ({navigation, route}: Props) => {
  const type = 'All';
  const limit = 10;
  const [order, setOrder] = useState('createdAt');
  const [pageIndex, setPageIndex] = useState(0);
  const [reviewPostData, setReviewPostData] = useState([] as any);
  const [communityPostData, setCommunityPostData] = useState([] as any);
  const [refreshing, setRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [navigateName, setNavigateName] = useState('');

  const modalRef = useRef();

  const currentUser = useSelector((state: any) => state.currentUser).user;
  const jwtToken = currentUser.jwtToken;
  const userId = currentUser.userId;

  const onRefresh = () => {
    const form = {
      type: type,
      limit: limit,
      offset: 0,
      order: order,
    };
    setRefreshing(true);
    fetchCommunityData(form, (response: any) => {
      setCommunityPostData(response);
      setPageIndex(0);
      setRefreshing(false);
    });
  };

  const onEndReached = (info: any) => {
    if (!isEndReached) {
      setIsEndReached(true);
      const newPageIndex = pageIndex + 1;

      const form = {
        type: type,
        limit: limit,
        offset: newPageIndex * limit,
        order: order,
      };
      setPageIndex((prev: any) => prev + 1);
      fetchCommunityData(form, (response: any) => {
        console.log(response.length);
        setCommunityPostData((prev: any) => {
          return [...prev, ...response];
        });
        setIsEndReached(false);
      });
    }
  };

  useEffect(() => {
    const form = {
      type: type,
      limit: limit,
      offset: pageIndex * limit,
      order: order,
    };
    fetchCommunityData(form, (response: any) => {
      setCommunityPostData(response);
    });
  }, []);

  const fetchCommunityData = (form: Form, callback: any) => {
    GETUserCommunityPosts(jwtToken, userId, form).then((response) => {
      callback(response);
    });
  };

  const renderContent = (disabled: boolean) => (
    <SlideUpPanel
      navigation={navigation}
      closeModal={() => setCloseModal(true)}
      setNavigateName={setNavigateName}
      disabled={disabled}
    />
  );
  return (
    <ContainerView>
      <MyProfile
        navigation={navigation}
        route={route}
        communityPostData={communityPostData}
        refreshing={refreshing}
        onRefresh={onRefresh}
        isEndReached={isEndReached}
        onEndReached={onEndReached}
        currentUser={currentUser}
        openModal={() => {
          setIsModalVisible(true);
        }}
      />
      <BottomSheet
        navigation={navigation}
        closeModal={closeModal}
        setCloseModal={setCloseModal}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        renderContent={renderContent}
        navigateName={navigateName}
      />
    </ContainerView>
  );
};

export default MyProfileScreen;
