import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import CommunityPostList from '~/Components/Presentational/CommunityPostList';
import LocationSelection from '~/Components/Container/CommunityListScreen/FilteringHeader/LocationSelection';

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

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  fetchSearchResult: any;
  navigation: any;
  renderHeaderComponent: any;
}

const CommunityRoute = ({
  fetchSearchResult,
  navigation,
  renderHeaderComponent,
}: Props) => {
  const type = 'SearchResult';
  const limit = 10;
  const orderList = [
    {name: '최신순', data: 'createdAt'},
    {name: '인기순', data: 'popular'},
  ];
  const [initialize, setInitialize] = useState(true);
  const [floatVisible, setFloatVisible] = useState(false);
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [region, setRegion] = useState('all');
  const [order, setOrder] = useState('createdAt');
  const [pageIndex, setPageIndex] = useState(1);

  const dispatch = useDispatch();

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const hometown = useSelector((state: any) => state.currentUser.hometown);
  const [selectedHometown, setSelectedHometown] = useState({
    emdName: '전국',
    id: -1,
  });
  const postData = useSelector(
    (state: any) => state.communityPostList.SearchResultPosts,
  );

  useEffect(() => {
    console.log('selected hometown changed');
    setPageIndex(1);
    dispatch(allActions.communityActions.setPosts([]));
    setOrder('createdAt');
    setRegion(selectedHometown.id === -1 ? 'all' : 'residence');
    const form = {
      pathType: 'community',
      communityType: 'All',
      region: selectedHometown.id === -1 ? 'all' : 'residence',
      cityId: String(selectedHometown.id),
      order: 'createdAt',
      offset: 0,
      limit: 10,
    };

    fetchSearchResult(form, (response: any) => {
      const data = {
        type,
        posts: response,
      };

      setInitialize(false);
      LayoutAnimation.configureNext(
        LayoutAnimation.create(100, 'easeInEaseOut', 'opacity'),
      );
      dispatch(allActions.communityActions.setPosts(data));
    });
  }, [selectedHometown]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPageIndex(1);
    const form = {
      pathType: 'community',
      communityType: 'All',
      cityId: String(selectedHometown.id),
      offset: 0,
      limit: 10,
      order,
      region,
    };
    fetchSearchResult(form, (response: any) => {
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
        console.log('liked post diff3');
        LayoutAnimation.configureNext(
          LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
        );

        dispatch(allActions.communityActions.setPosts(data));
      }
      setRefreshing(false);
    });
  }, [
    jwtToken,
    postData,
    order,
    region,
    selectedHometown,
    type,
    fetchSearchResult,
  ]);

  const onEndReached = useCallback(
    (info: any) => {
      if (isDataFinish || !postData.length || postData.length % limit !== 0) {
        return;
      }
      if (!isEndReached) {
        setIsEndReached(true);

        const form = {
          pathType: 'community',
          communityType: 'All',
          region,
          cityId: String(selectedHometown.id),
          order,
          offset: pageIndex * limit,
          limit,
        };

        fetchSearchResult(form, (response: any) => {
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
    [
      isEndReached,
      pageIndex,
      postData,
      order,
      limit,
      jwtToken,
      region,
      selectedHometown,
      fetchSearchResult,
    ],
  );

  const onRegionChanged = useCallback(
    (region: string, callback = () => console.log('region changed')) => {
      setRefreshing(true);
      const form = {
        pathType: 'community',
        communityType: 'All',
        region,
        cityId: String(selectedHometown.id),
        order,
        offset: 0,
        limit,
      };

      fetchSearchResult(form, (response: any) => {
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
      });
    },
    [
      order,
      limit,
      region,
      postData,
      jwtToken,
      selectedHometown,
      fetchSearchResult,
    ],
  );

  const onFiltering = useCallback(
    (searchOrder: string, callback = () => console.log('filtered')) => {
      setOrder(searchOrder);
      setPageIndex(1);
      const form = {
        pathType: 'community',
        communityType: 'All',
        region,
        cityId: String(selectedHometown.id),
        order: searchOrder,
        offset: 0,
        limit,
      };

      fetchSearchResult(form, (response: any) => {
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
          console.log('liked post diff5');
          LayoutAnimation.configureNext(
            LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
          );

          dispatch(allActions.communityActions.setPosts(data));
        }
        callback();
      });
    },
    [jwtToken, postData, region, limit, selectedHometown, fetchSearchResult],
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
        renderHeaderComponent={() =>
          renderHeaderComponent &&
          renderHeaderComponent({
            order,
            orderList,
            selectedHometown,
            floatAvailable: true,
            onFiltering,
            setFloatVisible,
            isEmpty: postData.length === 0,
            initialize,
          })
        }
      />
      {floatVisible ? (
        <LocationSelection
          hometown={[{emdName: '전국', id: -1}, ...hometown]}
          selectedHometown={selectedHometown}
          setSelectedHometown={setSelectedHometown}
          setFloatVisible={setFloatVisible}
          moveToHomeTownSetting={moveToHomeTownSetting}
          style={{
            right: 16,
            top: 54,
          }}
        />
      ) : null}
    </ContainerView>
  );
};

export default React.memo(CommunityRoute);
