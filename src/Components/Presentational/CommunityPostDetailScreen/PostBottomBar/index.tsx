import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import Animated from 'react-native-reanimated';
import {AnyAction} from 'redux';

const CommentBottomBarContainerView = Styled.View`
height: auto;
min-height: ${hp('100%') * 0.08}px;
max-height: ${hp('100%') * 0.15}px;
flex-direction: row;
padding: 12px 16px;
border-top-width: 1px;
border-color: #C4C4C4;
margin: auto 0px;
background: white;
`;

const SocialInfoContainerView = Styled.View`
margin: auto 0px;
flex-direction: row;

`;
const SocialInfoView = Styled.View`
flex-direction: row;
align-items: center;
`;

const SoicalInfoText = Styled.Text`
font-size: 14px;
line-height: 16px;
margin-left: 4px;
`;

const CommentTextInput = Styled.TextInput`
border-radius: 8px;
font-size: 14px;
line-height: 16px;
flex: 1;
padding: ${hp('100%') * 0.016}px ${hp('100%') * 0.0197}px ${
  hp('100%') * 0.01478 - 1
}px ${hp('100%') * 0.0197}px;

`;
const CommentUploadText = Styled.Text`
font-size: 14px;
line-height: 16px;
`;

const CommentSubmitText = Styled.Text``;

interface Props {
  toggleKeyboardAnimation: any;
  uploadComment: any;
  toggleSocialLike: any;
  toggleSocialScrap: any;
  data: any;
}
const PostBottomBar = ({
  toggleKeyboardAnimation,
  uploadComment,
  toggleSocialLike,
  toggleSocialScrap,
  data,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [commentText, setCommentText] = useState('');

  const {
    id,
    type,
    postLikeNum,
    viewerLikeCommunityPost,
    viewerScrapCommunityPost,
  } = data;
  return (
    <CommentBottomBarContainerView>
      {isFocused ? null : (
        <SocialInfoContainerView>
          <TouchableOpacity
            style={{
              marginRight: 16,
            }}
            onPress={() => {
              toggleSocialLike(id, viewerLikeCommunityPost, type);
            }}>
            <SocialInfoView>
              <Image
                style={{
                  tintColor: viewerLikeCommunityPost ? '#FF5656' : '#c3c3c3',
                }}
                source={require('~/Assets/Images/Review/ic_like_inline.png')}
              />
              <SoicalInfoText>{postLikeNum}</SoicalInfoText>
            </SocialInfoView>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleSocialScrap(id, viewerScrapCommunityPost, type);
            }}>
            <SocialInfoView
              style={{
                marginRight: 24,
              }}>
              <Image
                style={{
                  tintColor: viewerScrapCommunityPost ? '#000000' : '#c3c3c3',
                }}
                source={require('~/Assets/Images/Review/ic_scrap_inline.png')}
              />
            </SocialInfoView>
          </TouchableOpacity>
        </SocialInfoContainerView>
      )}

      <CommentTextInput
        multiline
        clearButtonMode="always"
        onFocus={() => {
          setIsFocused(true);
        }}
        autoCorrect={false}
        placeholder="댓글 입력"
        placeholderTextColor={isFocused ? 'black' : 'grey'}
        style={{
          borderWidth: 1,
          borderColor: '#E9E9E9',
          backgroundColor: isFocused ? 'white' : '#E9E9E9',
        }}
        value={commentText}
        onChangeText={(text) => {
          setCommentText(text);
        }}
      />
      {isFocused ? (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            marginLeft: 16,
          }}
          onPress={() => {
            uploadComment(commentText);
            setCommentText('');
            Keyboard.dismiss();
          }}>
          <CommentUploadText>게시</CommentUploadText>
        </TouchableOpacity>
      ) : null}
    </CommentBottomBarContainerView>
  );
};

export default React.memo(PostBottomBar);
