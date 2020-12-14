import React, {useState, useEffect, useRef} from 'react';
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
const PostBottomBar = ({
  toggleKeyboardAnimation,
  uploadComment,
  postLikeNum,
  viewerLikeCommunityPost,
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', _keyboardWillHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardWillShow', _keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', _keyboardWillHide);
    };
  }, []);

  const _keyboardWillShow = (e: any) => {
    toggleKeyboardAnimation(e.endCoordinates.height - getBottomSpace());
  };
  const _keyboardWillHide = (e: any) => {
    toggleKeyboardAnimation(-(e.endCoordinates.height - getBottomSpace()));

    setIsFocused(false);
  };
  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        bottom: getBottomSpace(),
        width: wp('100%'),
        left: 0,
      }}>
      <CommentBottomBarContainerView>
        {isFocused ? null : (
          <SocialInfoContainerView>
            <TouchableOpacity
              style={{
                marginRight: 16,
              }}
              onPress={() => {
                console.log(hp('100%'));
              }}>
              <SocialInfoView>
                <Image
                  source={require('~/Assets/Images/Review/ic_like_inline.png')}
                />
                <SoicalInfoText>{postLikeNum}</SoicalInfoText>
              </SocialInfoView>
            </TouchableOpacity>
            <SocialInfoView
              style={{
                marginRight: 24,
              }}>
              <Image
                source={require('~/Assets/Images/Review/ic_scrap_inline.png')}
              />
            </SocialInfoView>
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
    </KeyboardAvoidingView>
  );
};

export default PostBottomBar;
