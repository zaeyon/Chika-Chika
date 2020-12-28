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
import DELETECommunityPost from '~/Routes/Community/deletePost/DELETECommunityPost';
import communityActions from '~/actions/communityActions';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

interface Props {
  navigation: any;
  route: any;
}

const QuestionTabScreen = ({navigation, route}: Props) => {
  const type = 'Question';
  const limit = 10;
  const [refreshing, setRefreshing] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isEndReached, setIsEndReached] = useState(false);
  const [order, setOrder] = useState('createdAt');
  const jwtToken = route.params.currentUser.user.jwtToken;
  const postData = useSelector(
    (state: any) => state.communityPostList.QuestionPosts,
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
      const data = {
        type,
        posts: response,
      };
      dispatch(allActions.communityActions.setPosts(data));
      setPageIndex(0);
      setRefreshing(false);
    });
  }, [jwtToken, order]);

  const onEndReached = useCallback(
    (info: any) => {
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
        GETCommunityPosts(jwtToken, form).then((response: any) => {
          console.log(response.length);
          const data = {
            type,
            posts: [...postData, ...response],
          };
          dispatch(allActions.communityActions.setPosts(data));
          setIsEndReached(false);
        });
      }
    },
    [isEndReached, pageIndex, postData, order, jwtToken],
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

  const toggleSocialScrap = useCallback(() => {}, []);

  return (
    <ContainerView>
      <CommunityPostList
        navigation={navigation}
        route={route}
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

export default QuestionTabScreen;
