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
  LayoutAnimation,
} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

//Local Component
import PostItem from '~/Components/Presentational/PostItem';

const BodyContainerFlatList = Styled.FlatList`
flex: 1;
width: ${wp('100%')}px;
background: #F5F7F9;
`;

const ActivityIndicatorContianerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
align-items: center;
padding: 10px 0px;
`;

interface User {
  nickname: string;
  profileImg: string | null;
}
interface PostData {
  id: number;
  type: string;
  description: number;
  wantDentistHelp: boolean;
  createAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  userId: string;
  postCommentsNum: number;
  postLikeNum: number;
  viewerLikeCommunityPost: number;
  postViewNum: number;
  user: User;
  community_imgs: any;
  Clinics: any;
  TreatmentItems: any;
  SymptomItems: any;
  GeneralTags: any;
}

interface Props {
  postData: Array<PostData>;
  refreshing: boolean;
  onRefresh: any;
  isEndReached: boolean;
  onEndReached: any;
  moveToCommunityDetail: any;
  moveToAnotherProfile: any;
  toggleSocialLike: any;
  toggleSocialScrap: any;
  renderHeaderComponent?: () => any;
}
const CommunityPostList = ({
  postData,
  refreshing,
  onRefresh,
  isEndReached,
  onEndReached,
  moveToCommunityDetail,
  moveToAnotherProfile,
  toggleSocialLike,
  toggleSocialScrap,
  renderHeaderComponent,
}: Props) => {
  const listRef: any = useRef();
  useScrollToTop(listRef);
  const renderPosts = useCallback(({item, index}: any) => {
    return (
      <PostItem
        data={item}
        moveToCommunityDetail={moveToCommunityDetail}
        moveToAnotherProfile={moveToAnotherProfile}
        toggleSocialLike={toggleSocialLike}
        toggleSocialScrap={toggleSocialScrap}
      />
    );
  }, []);

  const getItemKey = useCallback((item: any) => String(item.id), []);

  return (
    <BodyContainerFlatList
      ref={listRef}
      data={postData}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          enabled={refreshing}
        />
      }
      keyExtractor={getItemKey}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: isIphoneX() ? wp('13%') : wp('15%'),
      }}
      renderItem={renderPosts}
      scrollEventThrottle={16}
      onEndReached={onEndReached}
      onEndReachedThreshold={2}
      ListHeaderComponent={renderHeaderComponent && renderHeaderComponent()}
      ListFooterComponent={
        isEndReached ? (
          <ActivityIndicatorContianerView>
            <ActivityIndicator />
          </ActivityIndicatorContianerView>
        ) : null
      }
    />
  );
};
export default CommunityPostList;
