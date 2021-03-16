import React, {useState, useEffect, useRef, useCallback} from 'react';
import {TouchableWithoutFeedback, Animated, Image} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const SocialInfoContainerView = Styled.View`
width: ${wp('100%')}px;
align-items: center;
flex-direction: row;
padding: 8.5px 16px;
border-top-width: 0.5px;
border-color: #E2E6ED;
box-shadow: 0px -2px 8px rgba(218, 218, 218, 0.3);
overflow: visible;
`;

const SocialInfoContentView = Styled.View`
min-width: 60px;
`;

const SocialInfoView = Styled.View`
width: auto;
height: 44px;
margin-right: auto;
padding: 0px 4px;
flex-direction: row;
align-items: center;
`;
const SocialInfoText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 16px;
margin-left: 4px;
color: #000000;
`;

interface Props {
  moveToCommentList: any;
  toggleSocialLike: any;
  toggleSocialScrap: any;
  data: any;
  commentCount: number;
}
const PostBottomBar = ({
  moveToCommentList,
  toggleSocialLike,
  toggleSocialScrap,
  data,
  commentCount,
}: Props) => {
  const {
    id,
    type,
    postLikeNum,
    postCommentsNum,
    viewerLikeCommunityPost,
    viewerScrapCommunityPost,
  } = data;

  const likeButtonScale = useRef(new Animated.Value(1)).current;
  const scrapButtonScale = useRef(new Animated.Value(1)).current;

  const [isLiked, setIsLiked] = useState(viewerLikeCommunityPost);
  const [isScraped, setIsScraped] = useState(viewerScrapCommunityPost);
  const [likeNum, setLikeNum] = useState(
    postLikeNum - (viewerLikeCommunityPost ? 1 : 0),
  );

  return (
    <SocialInfoContainerView>
      <SocialInfoContentView>
        <TouchableWithoutFeedback
          onPress={() => {
            toggleSocialLike(id, viewerLikeCommunityPost, type);
            setIsLiked((prev) => !prev);
            if (!viewerLikeCommunityPost) {
              ReactNativeHapticFeedback.trigger('impactLight');
            }
            likeButtonScale.setValue(0.8);
            Animated.spring(likeButtonScale, {
              toValue: 1,
              friction: 8,
              tension: 300,
              useNativeDriver: true,
            }).start();
          }}>
          <SocialInfoView>
            <Animated.Image
              style={{
                transform: [{scale: likeButtonScale}],
              }}
              source={
                isLiked
                  ? require('~/Assets/Images/Community/bottomBar/like/focus.png')
                  : require('~/Assets/Images/Community/bottomBar/like/unfocus.png')
              }
            />
            <SocialInfoText>{likeNum + (isLiked ? 1 : 0)}</SocialInfoText>
          </SocialInfoView>
        </TouchableWithoutFeedback>
      </SocialInfoContentView>
      <SocialInfoContentView>
        <TouchableWithoutFeedback onPress={() => moveToCommentList()}>
          <SocialInfoView>
            <Image
              source={require('~/Assets/Images/Community/bottomBar/comment.png')}
            />
            <SocialInfoText>{commentCount || String(postCommentsNum)}</SocialInfoText>
          </SocialInfoView>
        </TouchableWithoutFeedback>
      </SocialInfoContentView>

      <TouchableWithoutFeedback
        onPress={() => {
          toggleSocialScrap(id, viewerScrapCommunityPost, type);
          setIsScraped((prev) => !prev);
          if (!viewerScrapCommunityPost) {
            ReactNativeHapticFeedback.trigger('impactLight');
          }
          scrapButtonScale.setValue(0.8);
          Animated.spring(scrapButtonScale, {
            toValue: 1,
            friction: 8,
            tension: 300,
            useNativeDriver: true,
          }).start();
        }}>
        <SocialInfoView style={{marginLeft: 'auto', marginRight: 0}}>
          <Animated.Image
            style={{
              transform: [{scale: scrapButtonScale}],
            }}
            source={
              isScraped
                ? require('~/Assets/Images/Community/bottomBar/scrap/focus.png')
                : require('~/Assets/Images/Community/bottomBar/scrap/unfocus.png')
            }
          />
          <SocialInfoText
            style={{
              color: '#131F3C',
            }}>
            {'저장하기'}
          </SocialInfoText>
        </SocialInfoView>
      </TouchableWithoutFeedback>
    </SocialInfoContainerView>
  );
};

export default React.memo(PostBottomBar);
