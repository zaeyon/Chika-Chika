import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
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
import FilteringHeader from '~/Components/Container/CommunityListScreen/FilteringHeader';
import TopBanner from '~/Components/Container/CommunityListScreen/TopBanner';
import AdviceInfoHeader from '~/Components/Container/CommunityListScreen/AdviceInfoHeader';
import CarouselContent from '~/Components/Container/CommunityListScreen/CarouselContent';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover'
// Routes
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';
import POSTSocialLike from '~/Routes/Community/social/POSTSocialLike';
import DELETESocialLike from '~/Routes/Community/social/DELETESocialLike';
import POSTSocialScrap from '~/Routes/Community/social/POSTSocialScrap';
import DELETESocialScrap from '~/Routes/Community/social/DELETESocialScrap';

const ContainerView = Styled.View`
 flex: 1;
 background-color: #F5F7F9;
`;

const EmptyIndicatorContainerView = Styled.View`
width: 100%;
height: 100%;
background: #FFFFFF;
padding-top: 56px;
`;

const EmptyIndicatorView = Styled.View`
align-items: center;
justify-content: center;
`;

const EmptyIndicatorImage = Styled.Image`
margin-bottom: 12px;
`;

const EmptyIndicatorText = Styled.Text`
font-weight: normal;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
margin-bottom: 16px;
`;

const EmptyIndicatorButtonView = Styled.View`
padding: 14px 16px;
border-width: 1px;
align-items: center;
border-color: #E2E6ED;
border-radius: 100px;
flex-direction: row;
`;

const EmptyIndicatorButtonText = Styled.Text`
font-weight: normal;
font-size: 16px;
color: #131F3C;
`;

const EmptyIndicatorButtonImage = Styled.Image`
margin-left: 4px;
`;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  navigation: any;
  route: any;
}

const QuestionTabScreen = ({navigation, route}: Props) => {
  const type = 'Question';
  const limit = 10;
  const [initialize, setInitialize] = useState(true);
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [region, setRegion] = useState('all');
  const [order, setOrder] = useState('createdAt');
  const [isFiltering, setIsFiltering] = useState(false);
  const [isRegionChanging, setIsRegionChanging] = useState(false);
  const [selectedHometown, setSelectedHometown] = useState({
    emdName: '전국',
    id: -1,
  });
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const profile = useSelector((state: any) => state.currentUser.profile);
  const hometown = useSelector((state: any) => state.currentUser.hometown);

  const postData = useSelector(
    (state: any) => state.communityPostList.QuestionPosts,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setOrder('createdAt');
    setRegion(selectedHometown?.id === -1 ? 'all' : 'residence');
    !initialize && setIsRegionChanging(true);
    const form = {
      type,
      limit: 10,
      offset: 0,
      order: 'createdAt',
      region: selectedHometown?.id === -1 ? 'all' : 'residence',
    };
    GETCommunityPosts(jwtToken, String(selectedHometown?.id), form).then(
      (response: any) => {
        const data = {
          type,
          posts: response,
        };
        
          console.log('liked post diff1');
          initialize && LayoutAnimation.configureNext(
            LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
          );
          setInitialize(false);
          dispatch(allActions.communityActions.setPosts(data));
          setIsRegionChanging(false)
      },
    );
  }, [selectedHometown]);

  useEffect(() => {
    if (route.params?.isPostCreated) {
      console.log('post created')
      setOrder('createdAt');
      navigation.setParams({isPostCreated: false});
      const form = {
        type,
        limit: 10,
        offset: 0,
        order: 'createdAt',
        region,
      };
      GETCommunityPosts(jwtToken, String(selectedHometown?.id), form).then(
        (response: any) => {
          const data = {
            type,
            posts: response,
          };

          console.log('liked post diff2');
          LayoutAnimation.configureNext(
            LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
          );

          dispatch(allActions.communityActions.setPosts(data));
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
    GETCommunityPosts(jwtToken, String(selectedHometown?.id), form).then(
      (response: any) => {
        setIsDataFinish(false);
        const data = {
          type,
          posts: response,
        };
          console.log('liked post diff3');
          LayoutAnimation.configureNext(
            LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
          );

          dispatch(allActions.communityActions.setPosts(data));
        
        setRefreshing(false);
      },
    );
  }, [jwtToken, postData, order, region, selectedHometown]);

  const onEndReached = useCallback(
    (info: any) => {
      console.log('onQuestionEnd');
      if (isDataFinish || !postData.length || postData.length % limit !== 0) {
        return;
      }
      if (!isEndReached) {
        setIsEndReached(true);
        const pageIndex = Math.floor(postData.length / 10);

        const form = {
          type,
          limit,
          offset: pageIndex * limit,
          order,
          region,
        };
        GETCommunityPosts(jwtToken, String(selectedHometown?.id), form).then(
          (response: any) => {
            if (response.length === 0) {
              setIsDataFinish(true);
            }
            const data = {
              type,
              posts: [...postData, ...response],
            };
            dispatch(allActions.communityActions.setPosts(data));
            setIsEndReached(false);
          },
        );
      }
    },
    [isEndReached, postData, order, jwtToken, region, selectedHometown],
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
      GETCommunityPosts(jwtToken, String(selectedHometown?.id), form).then(
        (response: any) => {
          setIsDataFinish(false);
          const data = {
            type,
            posts: response,
          };

          console.log('liked post diff4');
          LayoutAnimation.configureNext(
            LayoutAnimation.create(400, 'easeInEaseOut', 'opacity'),
          );
          setRegion(region);
          dispatch(allActions.communityActions.setPosts(data));

          setRefreshing(false, callback());
        },
      );
    },
    [order, region, postData, jwtToken, selectedHometown],
  );

  const onFiltering = useCallback(
    (order: string, callback = () => console.log('filtered')) => {
      setOrder(order);
      setIsFiltering(true);
      const form = {
        type,
        limit,
        offset: 0,
        order,
        region,
      };
      GETCommunityPosts(jwtToken, String(selectedHometown?.id), form).then(
        (response: any) => {
          setIsDataFinish(false);
          const data = {
            type,
            posts: response,
          };
          // if (
          //   postData &&
          //   JSON.stringify(response).replace(
          //     /"createdDiff\(second\)\"\:\d*\,/gi,
          //     '',
          //   ) !==
          //     JSON.stringify(postData).replace(
          //       /"createdDiff\(second\)\"\:\d*\,/gi,
          //       '',
          //     )
          // ) {
          //   console.log('liked post diff5');
          //   LayoutAnimation.configureNext(
          //     LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
          //   );

            dispatch(allActions.communityActions.setPosts(data));
            setIsFiltering(false)
          // }
          callback();
        },
      );
    },
    [jwtToken, postData, region, order, selectedHometown],
  );

  const moveToKeywordSearch = useCallback((
    {
      query,
      category,
    }
  ) => {
    navigation.navigate('TotalKeywordSearchStackScreen', {
      screen: 'TotalKeywordSearchScreen',
      params: {
        redirected: true,
        redirectionBody: {
          query,
          category,
        }
      }
    })
  }, []);
  
  const moveToCommunityDetail = useCallback(
    (postId: number, postType: string) => {
      navigation.navigate('CommunityDetailScreen', {

          id: postId,
          type: postType,
      });
    },
    [],
  );

  const moveToCreatePost = useCallback(() => {
    navigation.navigate('CommunityPostUploadStackScreen', {
      data: {
        type: '질문방',
      },
    });
  }, []);

  const moveToAnotherProfile = useCallback(
    (userId: string, nickname: string, profileImageUri: string, img_thumbNail: string) => {
      navigation.navigate('AnotherProfileStackScreen', {
        targetUser: {
          userId,
          nickname,
          profileImageUri,
          img_thumbNail,
        },
      });
    },
    [],
  );
  const moveToHomeTownSetting = useCallback(() => {
    navigation.navigate('HometownSettingScreen');
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
        <TopBanner type="question" />
        <FilteringHeader
          onFiltering={onFiltering}
          hometown={hometown}
          setSelectedHometown={setSelectedHometown}
          selectedHometown={selectedHometown}
          order={order}
          moveToHomeTownSetting={moveToHomeTownSetting}
        />
        {initialize || postData.length !== 0 ? <CarouselContent
        initialize={initialize}
            postData={postData}
            titleText="💬 답변을 기다리는 질문"
            moveToCommunityDetail={moveToCommunityDetail}
            moveToAnotherProfile={moveToAnotherProfile}
          /> : (
          <EmptyIndicatorContainerView>
            <EmptyIndicatorView>
              <EmptyIndicatorImage
                source={require('~/Assets/Images/ic_noData.png')}
              />
              <EmptyIndicatorText>{'게시글이 없습니다.'}</EmptyIndicatorText>
              <TouchableWithoutFeedback onPress={() => moveToCreatePost()}>
                <EmptyIndicatorButtonView>
                  <EmptyIndicatorButtonText>
                    <EmptyIndicatorButtonText style={{color: '#00D1FF'}}>
                      {'첫번째 질문글'}
                    </EmptyIndicatorButtonText>
                    {' 남기러 가기'}
                  </EmptyIndicatorButtonText>
                  <EmptyIndicatorButtonImage
                    source={require('~/Assets/Images/Arrow/ic_postReviewArrow.png')}
                  />
                </EmptyIndicatorButtonView>
              </TouchableWithoutFeedback>
            </EmptyIndicatorView>
          </EmptyIndicatorContainerView>
        ) }
      </>
    );
  }, [profile, postData, order, region, hometown, selectedHometown, initialize]);

  return (
    <ContainerView>
      <CommunityPostList
      tabBarVisible={true}
        initialize={initialize}
        postData={postData}
        refreshing={refreshing}
        onRefresh={onRefresh}
        isEndReached={isEndReached}
        onEndReached={onEndReached}
        moveToKeywordSearch={moveToKeywordSearch}
        moveToCommunityDetail={moveToCommunityDetail}
        moveToAnotherProfile={moveToAnotherProfile}
        toggleSocialLike={toggleSocialLike}
        toggleSocialScrap={toggleSocialScrap}
        renderHeaderComponent={renderHeaderComponent}
      />
      <TouchBlockIndicatorCover loading={isRegionChanging || isFiltering}/>
    </ContainerView>
  );
};

export default QuestionTabScreen;
