import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//Local Components
import CommunityPostList from '~/Components/Presentational/CommunityPostList';
//Routes
import GETUserCommunityPosts from '~/Routes/Community/showPosts/GETUserCommunityPost';
import {useSelector} from 'react-redux';
import CommunityDetailScreen from '../../CommunityDetailScreen';
import MyPosts from '~/Components/Presentational/MyProfileScreen/MyPosts';
const ContainerView = Styled.View`
 flex: 1;
 background: white;
`;

interface Props {
  navigation: any;
  route: any;
}

const MyPostScreen = ({navigation, route}: Props) => {
  const type = 'All';
  const limit = 10;
  const [order, setOrder] = useState('createdAt');
  const [pageIndex, setPageIndex] = useState(0);
  const [postData, setPostData] = useState([] as any);
  const [refreshing, setRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const currentUser = useSelector((state: any) => state.currentUser);
  const nickname = currentUser.user.nickname;
  const jwtToken = currentUser.user.jwtToken;

  const onRefresh = () => {
    const form = {
      type: type,
      limit: limit,
      offset: 0,
      order: order,
    };
    setRefreshing(true);
    GETUserCommunityPosts(jwtToken, nickname, form).then((response: any) => {
      setPostData(response);
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
      GETUserCommunityPosts(jwtToken, nickname, form).then((response: any) => {
        console.log(response.length);
        setPostData((prev: any) => {
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
    GETUserCommunityPosts(jwtToken, nickname, form).then((response) => {
      setPostData(response);
    });
  }, []);

  return (
    <ContainerView>
      {/* <CommunityPostList
        navigation={navigation}
        route={route}
        postData={postData}
        refreshing={refreshing}
        onRefresh={onRefresh}
        isEndReached={isEndReached}
        onEndReached={onEndReached}
      /> */}
      <MyPosts />
    </ContainerView>
  );
};

export default MyPostScreen;
