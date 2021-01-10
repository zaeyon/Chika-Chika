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
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
// Local Component
import CommunityPostList from '~/Components/Presentational/CommunityPostList';
import LocationInfoHeader from '~/Components/Container/CommunityListScreen/LocationInfoHeader';
import TopBanner from '~/Components/Container/CommunityListScreen/TopBanner';
import AdviceInfoHeader from '~/Components/Container/CommunityListScreen/AdviceInfoHeader';
import CarouselContent from '~/Components/Container/CommunityListScreen/CarouselContent';
import PostFilterHeader from '~/Components/Container/CommunityListScreen/PostFilterHeader';
// Routes
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';
import POSTSocialLike from '~/Routes/Community/social/POSTSocialLike';
import DELETESocialLike from '~/Routes/Community/social/DELETESocialLike';
import POSTSocialScrap from '~/Routes/Community/social/POSTSocialScrap';
import DELETESocialScrap from '~/Routes/Community/social/DELETESocialScrap';

const ContainerView = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

const ActivityIndicatorContainerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
padding-bottom: 18px;
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
  const [isFiltering, setIsFiltering] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [region, setRegion] = useState('all');
  const [order, setOrder] = useState('createdAt');
  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;
  const profile = currentUser.profile;
  const postData = useSelector(
    (state: any) => state.communityPostList.QuestionPosts,
  );
  const dispatch = useDispatch();
  const buttonY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (route.params?.isPostCreated) {
      setOrder('createdAt');
      navigation.setParams({isPostCreated: false});
      const form = {
        type,
        limit: 10,
        offset: 0,
        order: 'createdAt',
        region,
      };
      GETCommunityPosts(jwtToken, String(profile.Residences[0].id), form).then(
        (response: any) => {
          const data = {
            type,
            posts: response,
          };
          if (
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
        },
      );
    }
  }, [route.params]);

  const onRefresh = useCallback(() => {
    const form = {
      type,
      limit,
      offset: 0,
      order,
      region,
    };
    setRefreshing(true);
    GETCommunityPosts(jwtToken, String(profile.Residences[0].id), form).then(
      (response: any) => {
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
      },
    );
  }, [jwtToken, postData, order, region]);

  const onEndReached = useCallback(
    (info: any) => {
      if (isDataFinish || !postData.length || postData.length % limit !== 0) {
        return;
      }
      if (!isEndReached) {
        console.log(postData.length);
        setIsEndReached(true);
        const pageIndex = Math.floor(postData.length / 10);

        const form = {
          type,
          limit,
          offset: pageIndex * limit,
          order,
          region,
        };
        GETCommunityPosts(
          jwtToken,
          String(profile.Residences[0].id),
          form,
        ).then((response: any) => {
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
    [isEndReached, postData, order, jwtToken, region],
  );

  const onRegionChanged = useCallback(
    (region: string, callback = () => console.log('region changed')) => {
      const form = {
        type,
        limit,
        offset: 0,
        order,
        region,
      };
      setRefreshing(true);
      GETCommunityPosts(jwtToken, String(profile.Residences[0].id), form).then(
        (response: any) => {
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
              LayoutAnimation.create(400, 'easeInEaseOut', 'opacity'),
            );
            setRegion(region);
            dispatch(allActions.communityActions.setPosts(data));
          }
          setRefreshing(false, callback());
        },
      );
    },
    [order, region, postData, jwtToken],
  );

  const onFiltering = useCallback(
    (order: string, callback = () => console.log('filtered')) => {
      setIsFiltering(true);
      const form = {
        type,
        limit,
        offset: 0,
        order,
        region,
      };
      GETCommunityPosts(jwtToken, String(profile.Residences[0].id), form).then(
        (response: any) => {
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
          setIsFiltering(() => {
            setOrder(order);
            return false;
          });
          callback();
        },
      );
    },
    [jwtToken, postData, region, order],
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

  const renderHeaderComponent = useCallback(() => {
    return (
      <>
        <LocationInfoHeader
          type="question"
          profile={profile}
          region={region}
          setRegion={onRegionChanged}
        />
        <AdviceInfoHeader profile={profile} />
        <TopBanner type="question" />
        <CarouselContent
          postData={postData}
          titleText="답변을 기다리는 질문"
          moveToCommunityDetail={moveToCommunityDetail}
          moveToAnotherProfile={moveToAnotherProfile}
        />

        <PostFilterHeader order={order} setOrder={onFiltering} />
      </>
    );
  }, [profile, postData, order, region]);

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
        renderHeaderComponent={renderHeaderComponent}
      />
      {/* <TouchableWithoutFeedback
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
      </TouchableWithoutFeedback> */}
    </ContainerView>
  );
};

export default QuestionTabScreen;
