import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';

const Container = Styled.View`
border-top-width: 0.5px;
border-color: #E2E6ED;
background-color: #ffffff;
padding: 8px 16px;
`;

const CommentInputContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
border-width: 1px;
border-color: #E2E6ED;
border-radius: 30px;
`;

const CommentTextInput = Styled.TextInput`
flex: 1;
font-size: 14px;
font-weight: 400;
font-family: NanumSquare;
padding-top: 13px;
padding-bottom: 13px;
padding-left: 16px;
color: #131F3C;
`;

const DisabledCommentUploadText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
font-size: 14px;
line-height: 24px;
color: #9AA2A9;
`;

const CommentUploadText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
font-size: 14px;
line-height: 24px;
color: #00D1FF;
`;

const CommentUploadContainer = Styled.View`
justify-content: center;
padding-right: 16px;
padding-left: 10px;
padding-top: 8px;
padding-bottom: 8px;
`;

const ReplyRepresentContainer = Styled.View`
width: ${wp('100%')}px;
height: ${hp('4.6%')}px;
align-items: center;
background-color: #F5F7F9;
flex-direction: row;
justify-content: space-between;
`;

const ReplyRepresentText = Styled.Text`
padding: 11px 16px 11px 16px;
font-size: 12px;
font-family: NanumSquare;
color: #9AA2A9;
`;

const ReplyTagetNicknameText = Styled.Text`
font-size: 12px;
font-family: NanumSquare;
color: #00D1FF;
`;

const ReplyCancelContainer = Styled.View`
padding: 11px 16px 11px 16px;
`;

const ReplyCancelText = Styled.Text`
font-weight: 700;
font-size: 12px;
color: #9AA2A9;
`;

interface Props {
  isFocusedInputProp?:boolean
  postReviewComment: (description: string) => void,
  inputType: string,
  commentInputRef: any,
  replyTargetNickname?: string,
  cancelReplyInput: () => void,
  requestScreen: string,
}

const CommentPostBottomBar = ({
  isFocusedInputProp,
  postReviewComment,
  inputType,
  commentInputRef,
  replyTargetNickname,
  cancelReplyInput,
  requestScreen,
}: Props) => {
  const [commentDescrip, setCommentDescrip] = useState<string>('');
  const [isFocusedInput, setIsFocusedInput] = useState<boolean>()

  useEffect(() => {
    if(requestScreen === "ReplyPostScreen") {
      if(commentInputRef.current) {
        setTimeout(() => {
          commentInputRef.current.focus()
        }, 10)
      }
    }

  }, [])

  const onChangeCommentInput = (text: string) => {
    setCommentDescrip(text);
  };

  const clickPostComment = () => {
    postReviewComment(commentDescrip);
    setCommentDescrip('');
  };

  return (
    <Container>
        <CommentInputContainer>
          <CommentTextInput
            ref={commentInputRef}
            multiline={true}
            clearButtonMode="always"
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder="댓글 입력"
            placeholderTextColor={'grey'}
            value={commentDescrip}
            onChangeText={(text: string) => onChangeCommentInput(text)}
          />
            {commentDescrip.length === 0 && (
              <CommentUploadContainer>
                <DisabledCommentUploadText>게시</DisabledCommentUploadText>
              </CommentUploadContainer>
            )}
            {commentDescrip.length > 0 && (
              <TouchableWithoutFeedback onPress={() => clickPostComment()}>
              <CommentUploadContainer>
                <CommentUploadText>게시</CommentUploadText>
              </CommentUploadContainer>
              </TouchableWithoutFeedback>
            )}
        </CommentInputContainer>
    </Container>
  );
};

export default CommentPostBottomBar;
