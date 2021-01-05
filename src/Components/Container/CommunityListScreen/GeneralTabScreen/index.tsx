import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
//Local Component
import CommunityPostList from '~/Components/Presentational/CommunityPostList';
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';
import POSTSocialLike from '~/Routes/Community/social/POSTSocialLike';
import DELETESocialLike from '~/Routes/Community/social/DELETESocialLike';
import POSTSocialScrap from '~/Routes/Community/social/POSTSocialScrap';
import DELETESocialScrap from '~/Routes/Community/social/DELETESocialScrap';

const ContainerView = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

interface Props {
  navigation: any;
  route: any;
}

const FreeTalkTabScreen = ({navigation, route}: Props) => {
  const type = 'FreeTalk';
  const limit = 10;
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [order, setOrder] = useState('createdAt');
  const jwtToken = route.params.jwtToken;
  const postData = useSelector(
    (state: any) => state.communityPostList.FreeTalkPosts,
  );
  const dispatch = useDispatch();
  const buttonY = useRef(new Animated.Value(0)).current;

  const onRefresh = useCallback(() => {
    const form = {
      type: type,
      limit: limit,
      offset: 0,
      order: order,
    };
    setRefreshing(true);
    GETCommunityPosts(jwtToken, form).then((response: any) => {
      setIsDataFinish(false);
      const data = {
        type,
        posts: response,
      };
      dispatch(allActions.communityActions.setPosts(data));
      setRefreshing(false);
    });
  }, [jwtToken, order]);

  const onEndReached = useCallback(
    (info: any) => {
      if (!postData.length || postData.length % limit !== 0) {
        return;
      }
      if (!isEndReached) {
        console.log(postData.length);
        setIsEndReached(true);
        const pageIndex = Math.floor(postData.length / 10);

        const form = {
          type: type,
          limit: limit,
          offset: pageIndex * limit,
          order: order,
        };
        GETCommunityPosts(jwtToken, form).then((response: any) => {
          console.log(response.length);
          if (response.length === 0) {
            setIsDataFinish(true);
          }
          const data = {
            type,
            posts: [...postData, ...response],
          };
          dispatch(allActions.communityActions.setPosts(data));
          setIsEndReached(false);
        });
      }
    },
    [isEndReached, postData, order, jwtToken],
  );

  const moveToCommunityDetail = useCallback(
    (postId: number, postType: string) => {
      navigation.navigate('CommunityDetailScreen', {
        id: postId,
        type: postType,
      });
    },
    [],
  );

  const moveToAnotherProfile = useCallback(() => {
    navigation.navigate('AnotherProfileScreen');
  }, []);

  const toggleSocialLike = useCallback(
    (postId: number, prevState: number, type: string) => {
      const form = {
        type,
        id: postId,
      };
      dispatch(allActions.communityActions.toggleLike(form));
      if (prevState) {
        // true
        DELETESocialLike(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
          }
        });
      } else {
        POSTSocialLike(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
          }
        });
      }
    },
    [],
  );

  const toggleSocialScrap = useCallback(
    (postId: number, prevState: number, type: string) => {
      const form = {
        type,
        id: postId,
      };
      dispatch(allActions.communityActions.toggleScrap(form));
      if (prevState) {
        // true
        DELETESocialScrap(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
          }
        });
      } else {
        POSTSocialScrap(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
          }
        });
      }
    },
    [],
  );

  return (
    <ContainerView>
      <CommunityPostList
        postData={postData}
        refreshing={refreshing}
        onRefresh={onRefresh}
        isEndReached={isEndReached}
        onEndReached={onEndReached}
        moveToCommunityDetail={moveToCommunityDetail}
        moveToAnotherProfile={moveToAnotherProfile}
        toggleSocialLike={toggleSocialLike}
        toggleSocialScrap={toggleSocialScrap}
      />
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 3,
          right: wp('50%') - 45,
          bottom: (getBottomSpace() ? wp('12%') : wp('15%')) + 23,
          backgroundColor: '#C4C4C4',
          borderRadius: 100,
          width: 90,
          height: 34,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            {
              translateY: buttonY.interpolate({
                inputRange: [
                  0,
                  (getBottomSpace() ? wp('12%') : wp('15%')) + 23,
                ],
                outputRange: [
                  0,
                  (getBottomSpace() ? wp('12%') : wp('15%')) + 23,
                ],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 9,
            borderRadius: 100,
          }}
          onPress={() => {
            navigation.navigate('CommunityPostUploadStackScreen', {
              data: {
                id: -1,
              },
            });
          }}>
          <Text>글 작성하기</Text>
        </TouchableOpacity>
      </Animated.View>
    </ContainerView>
  );
};

export default FreeTalkTabScreen;
