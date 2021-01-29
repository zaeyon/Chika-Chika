import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
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
padding-top: 13px;
padding-bottom: 13px;
padding-left: 16px;
color: #131F3C;
`;

const DisabledCommentUploadText = Styled.Text`
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

const ActionTypeIndicatorView = Styled.View``;

const ActionTypeIndicatorTitleText = Styled.Text``;

const ActionTypeIndicatorText = Styled.Text``;

const ActionTypeIndicatorImage = Styled.Image``;

interface Props {
  postComment: any;
  postReply: any;
  commentActionType: string;
  commentInputRef: any;
  targetUserNickname: string;
}

const CommentPostBottomBar = ({
  postComment,
  postReply,
  commentActionType,
  commentInputRef,
  targetUserNickname,
}: Props) => {
  const [input, setInput] = useState<string>('');

  const onChangeCommentInput = useCallback((text: string) => {
    setInput(text);
  }, []);

  const onSubmit = useCallback(() => {
    if (commentActionType === 'comment') {
      postComment(input);
    } else {
      postReply(input);
    }
    setInput('');
  }, [commentActionType, input]);

  return (
    <KeyboardAvoidingView behavior={'position'}>
      <Container>
        <ActionTypeIndicatorView>
          <ActionTypeIndicatorTitleText>
            {targetUserNickname}
          </ActionTypeIndicatorTitleText>
          <ActionTypeIndicatorText></ActionTypeIndicatorText>
          <ActionTypeIndicatorImage />
        </ActionTypeIndicatorView>
        <CommentInputContainer>
          <CommentTextInput
            ref={commentInputRef}
            multiline={true}
            clearButtonMode="always"
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder="댓글 입력"
            placeholderTextColor={'grey'}
            value={input}
            onChangeText={(text: string) => onChangeCommentInput(text)}
          />
          {input.length === 0 && (
            <CommentUploadContainer>
              <DisabledCommentUploadText>게시</DisabledCommentUploadText>
            </CommentUploadContainer>
          )}
          {input.length > 0 && (
            <TouchableWithoutFeedback onPress={() => onSubmit()}>
              <CommentUploadContainer>
                <CommentUploadText>게시</CommentUploadText>
              </CommentUploadContainer>
            </TouchableWithoutFeedback>
          )}
        </CommentInputContainer>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default CommentPostBottomBar;
