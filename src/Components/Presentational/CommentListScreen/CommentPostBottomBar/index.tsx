import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const Container = Styled.View`
border-top-width: 0.5px;
border-color: #E2E6ED;
background-color: #ffffff;
`;

const CommentContentView = Styled.View`
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

const ActionTypeIndicatorView = Styled.View`
background: #F5F7F9;
flex-direction: row;
align-items: center;
`;

const ActionTypeIndicatorTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
color: #131F3C;
`;

const ActionTypeIndicatorText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
color: #131F3C;
margin: 12px 16px;
`;

const ActionTypeIndicatorButtonView = Styled.View`
margin-left: auto;
padding: 12px 16px 12px 12px;
`;
const ActionTypeIndicatorImage = Styled.Image`
`;

interface Props {
  postComment: any;
  postReply: any;
  commentActionType: string;
  commentInputRef: any;
  targetUserNickname: string;
  onReplyCancel: any;
}

const CommentPostBottomBar = ({
  postComment,
  postReply,
  commentActionType,
  commentInputRef,
  targetUserNickname,
  onReplyCancel,
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
    <Container>
      {commentActionType === 'reply' ? (
        <ActionTypeIndicatorView>
          <ActionTypeIndicatorText>
            <ActionTypeIndicatorTitleText>
              {`@${targetUserNickname}`}
            </ActionTypeIndicatorTitleText>
            {'에게 댓글 다는 중'}
          </ActionTypeIndicatorText>
          <TouchableWithoutFeedback
            onPress={() => {
              ReactNativeHapticFeedback.trigger('impactLight');
              onReplyCancel();
            }}>
            <ActionTypeIndicatorButtonView>
              <ActionTypeIndicatorImage
                source={require('~/Assets/Images/Social/cancel.png')}
              />
            </ActionTypeIndicatorButtonView>
          </TouchableWithoutFeedback>
        </ActionTypeIndicatorView>
      ) : null}
      <CommentContentView>
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
      </CommentContentView>
    </Container>
  );
};

export default CommentPostBottomBar;
