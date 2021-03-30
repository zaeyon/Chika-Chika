import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  Platform,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {hasNotch} from '~/method/deviceInfo';

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

const PostItemSkeletonView = Styled.View`
width: ${wp('100%')}px;
height: auto;
padding: 16px 16px 16px 16px;
background: #FFFFFF;
margin-bottom: 8px;
`;


const ProfileContainerView = Styled.View`
width: auto;
height: auto;
margin-right: auto;
flex-direction: row;
align-items: center;
padding: 8px 0px 6px 0px;
`;

const ProfileImage = Styled.Image<{source: any}>`
width: ${wp('7.46')}px;
 height: ${wp('7.46%')}px;
background-color: #F5F7F9;
border-width: 0.5px
border-color: #E2E6ED;
border-radius: 100px;
`;

const ProfileContentView = Styled.View`
width: auto;
height: auto;
flex-direction: row;
align-items: center;
padding-left: 8px;
`;
const ProfileNameText = Styled.Text`
font-style: normal;
font-weight: 600;
font-size: 15px;
margin-right: 4px;
background-color: #F5F7F9;
color: #F5F7F9;
`;


const ProfileDescriptionText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 13px;
background-color: #F5F7F9;
color: #F5F7F9;
`
const ImageSkeletonView = Styled.View`
width: 124px;
height: 124px;
background-color: #F5F7F9;
margin: 6px 0px;
border-radius: 8px;
border-color: #F5F7F9;
border-width: 1px;
`
const ContentText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
background-color: #F5F7F9;
color: #F5F7F9;
margin-right: auto;
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
  tabBarVisible?: boolean;
  initialize: boolean;
  postData: Array<PostData>;
  refreshing: boolean;
  onRefresh: any;
  isEndReached: boolean;
  onEndReached: any;
  moveToKeywordSearch: ({keyword, searchQuery, category, tagId}: any) => void;
  moveToCommunityDetail: any;
  moveToAnotherProfile: any;
  toggleSocialLike: any;
  toggleSocialScrap: any;
  renderHeaderComponent?: () => any;
}
const CommunityPostList = ({
  tabBarVisible=false,
  initialize,
  postData,
  refreshing,
  onRefresh,
  isEndReached,
  onEndReached,
  moveToKeywordSearch,
  moveToCommunityDetail,
  moveToAnotherProfile,
  toggleSocialLike,
  toggleSocialScrap,
  renderHeaderComponent,
}: Props) => {
  const listRef: any = useRef();
  useScrollToTop(listRef);

  const renderPostSkeleton = useCallback(({item, index}: any) => {
    return (
      <PostItemSkeletonView>
      <ProfileContainerView>
      <ProfileImage/>
      <ProfileContentView>
        <ProfileNameText>{"치카치카"}</ProfileNameText>
        <ProfileDescriptionText>
          {"1분 전"}
        </ProfileDescriptionText>
      </ProfileContentView>
    </ProfileContainerView>
    <ImageSkeletonView/>
    <ContentText>
      {"가나다라마바사아자차카타파하"}
    </ContentText>
    </PostItemSkeletonView>
    )
  }, [])
  const renderPost = useCallback(({item, index}: any) => {
    return (
      <PostItem
        data={item}
        moveToKeywordSearch={moveToKeywordSearch}
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
      data={initialize ? [{id: 'skeleton1'}, {id: 'skeleton2'}] : postData}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          enabled={refreshing}
        />
      }
      keyExtractor={getItemKey}
      contentContainerStyle={{
        paddingBottom: tabBarVisible ? (Platform.OS === 'ios' ? (hasNotch() ? hp('10.59%') : hp('7.2%')) : hp('7.2%')) : 0
      }}
      showsVerticalScrollIndicator={false}
      renderItem={initialize ? renderPostSkeleton : renderPost}
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
