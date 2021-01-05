import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  LayoutAnimation,
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

const CreatePostView = Styled.View`
width: ${wp('30%')}px;
height: auto;
padding: 10px 27px;
background: #FFFFFF;
border: 1px solid #C3C3C3;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
border-radius: 100px;
position: absolute;
left: ${wp('35%')}px;
bottom: ${getBottomSpace() + hp('9.6%') + 20}px;
`;

const CreatePostText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
`;
interface Props {
  navigation: any;
  route: any;
}

const QuestionTabScreen = ({navigation, route}: Props) => {
  const type = 'Question';
  const limit = 10;
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [order, setOrder] = useState('createdAt');
  const jwtToken = route.params.jwtToken;
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
      setIsDataFinish(false);
      const data = {
        type,
        posts: response,
      };
      if (
        postData &&
        JSON.stringify(response).replace(
          /"createdDiff\(second\)\"\:\d*\,/gi,
          '',
        ) !==
          JSON.stringify(postData).replace(
            /"createdDiff\(second\)\"\:\d*\,/gi,
            '',
          )
      ) {
        console.log('liked post diff');
        LayoutAnimation.configureNext(
          LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
        );

        dispatch(allActions.communityActions.setPosts(data));
      }
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
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('CommunityPostUploadStackScreen', {
            data: {
              id: -1,
            },
          })
        }>
        <CreatePostView>
          <CreatePostText>{'글 작성하기'}</CreatePostText>
        </CreatePostView>
      </TouchableWithoutFeedback>
    </ContainerView>
  );
};

export default QuestionTabScreen;
