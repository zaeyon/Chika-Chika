import React, {useState, useEffect} from 'react';
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
height: ${hp('8%')}px;
border-top-width: 1px;
border-color: #E2E6ED;
background-color: #ffffff;
`;

const DefaultContainer = Styled.View`
flex: 1;
flex-direction: row;
align-items: center;
justify-content: space-around;
`;

const CommentInputContainer = Styled.View`
padding: 12px 16px;
flex-direction: row;
align-items: center;
justify-content: space-around;
`;

const SocialInfoListContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const LikeContainer = Styled.View`
padding: 16px 25px 16px 0px;
flex-direction: row;
align-items: center;
background-color: #ffffff;
`;

const ScrapContainer = Styled.View`
background-color: #ffffff;
padding: 16px 16px 16px 8px;
`;

const CommentContainer = Styled.View`
background-color: #ffffff;
padding: 16px 8px 16px 16px;
`;

const LikeIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const LikeCountText = Styled.Text`
position: absolute;
left: ${wp('6.4%')}px;
margin-left: 4px;
font-weight: 400;
font-size: 14px;
color: #000000;
`;

const ScrapIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const CommentIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const SeeDentalInfoButton = Styled.View`
padding: 12px 35px 12px 35px;
background-color: #000000;
border-radius: 4px;
align-items: center;
justify-content: center;
`;

const SeeDentalInfoText = Styled.Text`
font-weight: 400;
font-size: 14px;
color: #ffffff;
`;

const CommentTextInput = Styled.TextInput`
border-radius: 8px;
font-size: 14px;
line-height: 16px;
flex: 1;
padding: ${hp('100%') * 0.01478}px ${hp('100%') * 0.0197}px ${
  hp('100%') * 0.01478 - 1
}px ${hp('100%') * 0.0197}px;
border-width: 1;
border-color: #E9E9E9;
background-color: white;
`;

const CommentUploadText = Styled.Text`
font-size: 14px;
line-height: 16px;
`;

interface Props {
  likeCount: number;
  clickCommentIcon: () => void;
  isCommentInputFocused: boolean;
  postReviewComment: (description: string) => void;
  clickReviewLike: () => void;
  clickReviewScrap: () => void;
  isCurUserLike: boolean;
  isCurUserScrap: boolean;
}

const ReviewBottomBar = ({
  likeCount,
  clickCommentIcon,
  isCommentInputFocused,
  postReviewComment,
  clickReviewLike,
  clickReviewScrap,
  isCurUserLike,
  isCurUserScrap,
}: Props) => {
  const [isCommentInput, setIsCommentInput] = useState<boolean>(false);
  const [commentDescrip, setCommentDescrip] = useState<string>('');

  const clickCommentIcon2 = () => {
    setIsCommentInput(true);
  };

  const onChangeCommentInput = (text: string) => {
    setCommentDescrip(text);
  };

  const clickPostComment = () => {
    postReviewComment(commentDescrip);
    setCommentDescrip('');
  };

  return (
    <Container>
      {!isCommentInputFocused ? (
        <DefaultContainer>
          <SocialInfoListContainer>
            <TouchableWithoutFeedback onPress={() => clickReviewLike()}>
              <LikeContainer>
                <LikeIcon
                  source={
                    isCurUserLike 
                    ? require('~/Assets/Images/Indicator/ic_like_focus.png')
                    : require('~/Assets/Images/Indicator/ic_like_unfocus.png')
                  }
                />
                <LikeCountText>{likeCount}</LikeCountText>
              </LikeContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => clickReviewScrap()}>
              <ScrapContainer>
                <ScrapIcon
                  source={
                    isCurUserScrap
                    ? require('~/Assets/Images/Indicator/ic_scrap_focus.png')
                    : require('~/Assets/Images/Indicator/ic_scrap_unfocus.png')
                  }
                />
              </ScrapContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => clickCommentIcon()}>
              <CommentContainer>
                <CommentIcon
                  source={require('~/Assets/Images/Indicator/ic_comment.png')}
                />
              </CommentContainer>
            </TouchableWithoutFeedback>
          </SocialInfoListContainer>
          <SeeDentalInfoButton>
            <SeeDentalInfoText>{'병원정보 보러가기'}</SeeDentalInfoText>
          </SeeDentalInfoButton>
        </DefaultContainer>
      ) : (
        <CommentInputContainer>
          <CommentTextInput
            multiline={true}
            clearButtonMode="always"
            autoCapitalize={'none'}
            autoCorrect={false}
            autoFocus={true}
            placeholder="댓글 입력"
            placeholderTextColor={'grey'}
            value={commentDescrip}
            onChangeText={(text: string) => onChangeCommentInput(text)}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              marginLeft: 16,
            }}
            onPress={() => clickPostComment()}>
            <CommentUploadText>게시</CommentUploadText>
          </TouchableOpacity>
        </CommentInputContainer>
      )}
    </Container>
  );
};

export default ReviewBottomBar;
