import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  LayoutAnimation,
  TouchableOpacity,
  Text,
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
import LocationInfoHeader from '~/Components/Container/CommunityListScreen/LocationInfoHeader';
import TopBanner from '~/Components/Container/CommunityListScreen/TopBanner';
import CarouselContent from '~/Components/Container/CommunityListScreen/CarouselContent';
import PostFilterHeader from '~/Components/Container/CommunityListScreen/PostFilterHeader';
import LocationSelection from '~/Components/Container/CommunityListScreen/LocationInfoHeader/LocationSelection';
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

const FreeTalkTabScreen = ({navigation, route}: Props) => {
  const type = 'FreeTalk';
  const limit = 10;
  const [floatVisible, setFloatVisible] = useState(false);
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [region, setRegion] = useState('all');
  const [order, setOrder] = useState('createdAt');
  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;
  const hometown = currentUser.hometown;
  const profile = currentUser.profile;
  const postData = useSelector(
    (state: any) => state.communityPostList.FreeTalkPosts,
  );
  const mainHometown = useSelector((state: any) =>
    state.currentUser.hometown.find((item) => item?.UsersCities?.now === true),
  );
  const [selectedHometown, setSelectedHometown] = useState(mainHometown);

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedHometown(mainHometown);
  }, [mainHometown]);

  useEffect(() => {
    setOrder('createdAt');
    const form = {
      type,
      limit: 10,
      offset: 0,
      order: 'createdAt',
      region,
    };
    GETCommunityPosts(jwtToken, String(selectedHometown.id), form).then(
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
          console.log('liked post diff1');
          LayoutAnimation.configureNext(
            LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
          );

          dispatch(allActions.communityActions.setPosts(data));
        }
      },
    );
  }, [selectedHometown]);

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
      GETCommunityPosts(jwtToken, String(selectedHometown.id), form).then(
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
    GETCommunityPosts(jwtToken, String(selectedHometown.id), form).then(
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
  }, [jwtToken, postData, order, region, selectedHometown]);

  const onEndReached = useCallback(
    (info: any) => {
      console.log('onGeneralEnd');
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
        GETCommunityPosts(jwtToken, String(selectedHometown.id), form).then(
          (response: any) => {
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
      GETCommunityPosts(jwtToken, String(selectedHometown.id), form).then(
        (response: any) => {
          setIsDataFinish(false);
          const data = {
            type,
            posts: response,
          };
          console.log('liked post diff');
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
      setIsFiltering(true);
      const form = {
        type,
        limit,
        offset: 0,
        order,
        region,
      };
      GETCommunityPosts(jwtToken, String(selectedHometown.id), form).then(
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
    [jwtToken, postData, region, order, selectedHometown],
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

  const moveToAnotherProfile = useCallback(
    (userId: string, nickname: string, profileImageUri: string) => {
      navigation.navigate('AnotherProfileStackScreen', {
        targetUser: {
          userId,
          nickname,
          profileImageUri,
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
        <LocationInfoHeader
          type="freetalk"
          selectedHometown={selectedHometown}
          region={region}
          setRegion={onRegionChanged}
          setFloatVisible={setFloatVisible}
        />
        <TopBanner type="freetalk" />
        <CarouselContent
          postData={postData}
          titleText="지금 뜨는 인기 글"
          moveToCommunityDetail={moveToCommunityDetail}
          moveToAnotherProfile={moveToAnotherProfile}
        />
        {floatVisible ? (
          <LocationSelection
            hometown={hometown}
            selectedHometown={selectedHometown}
            setSelectedHometown={setSelectedHometown}
            setFloatVisible={setFloatVisible}
            moveToHomeTownSetting={moveToHomeTownSetting}
          />
        ) : null}
        <PostFilterHeader order={order} setOrder={onFiltering} />
        {isFiltering ? (
          <ActivityIndicatorContainerView>
            <ActivityIndicator />
          </ActivityIndicatorContainerView>
        ) : null}
      </>
    );
  }, [
    profile,
    postData,
    order,
    isFiltering,
    region,
    floatVisible,
    hometown,
    selectedHometown,
  ]);

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
    </ContainerView>
  );
};

export default FreeTalkTabScreen;
