import React, {useState, useEffect, useRef} from 'react';
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

//Local Component
import PostItem from '~/Components/Presentational/PostItem';

const BodyContainerFlatList = Styled(FlatList as new () => FlatList)`
flex: 1;
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
  navigation: any;
  route: any;
  postData: Array<PostData>;
  refreshing: boolean;
  onRefresh: any;
  isEndReached: boolean;
  onEndReached: any;
}
const CommunityPostList = ({
  navigation,
  route,
  postData,
  refreshing,
  onRefresh,
  isEndReached,
  onEndReached,
}: Props) => {
  const renderPosts = ({item, index}: any) => (
    <PostItem mode={'Card'} navigation={navigation} data={item} />
  );

  const getItemKey = (item: any) => String(item.id);

  return (
    <BodyContainerFlatList
      data={postData}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      keyExtractor={getItemKey}
      scrollIndicatorInsets={{
        bottom: isIphoneX() ? wp('13%') : wp('15%'),
      }}
      contentContainerStyle={{
        paddingBottom: isIphoneX() ? wp('13%') : wp('15%'),
      }}
      renderItem={renderPosts}
      scrollEventThrottle={16}
      onEndReached={onEndReached}
      onEndReachedThreshold={5}
      ListFooterComponent={
        isEndReached ? (
          <ActivityIndicatorContianerView>
            <ActivityIndicator size="large" />
          </ActivityIndicatorContianerView>
        ) : null
      }
    />
  );
};
export default CommunityPostList;