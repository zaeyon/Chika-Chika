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
  Animated,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';

const Container = Styled.View`
width: ${wp('100%')}px;
flex-direction: row;
height: ${DeviceInfo.hasNotch() ? hp('8.128%')+34 : hp('11.2')}px;
border-top-width: 1px;
border-color: #E2E6ED;
background-color: #ffffff;
padding-top: ${hp('1.9%')}px;
padding-left: ${wp('4.26%')}px;
padding-right: ${wp('4.26%')}px;
justify-content: space-between;
position: absolute;
bottom: 0;
`;

const DefaultContainer = Styled.View`
flex: 1;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const CommentInputContainer = Styled.View`
padding: 12px 16px;
flex-direction: row;
align-items: center;
justify-content: space-around;
`;

const SocialInfoListContainer = Styled.View`
flex-direction: row;
`;

const SocialItemContainer = Styled.View`
width: ${wp('12.8%')}px;
height: ${wp('12.8%')}px;
align-items: center;
justify-content: center;
background-color: #ffffff;
border-radius: 8px;
border-width: 1px;
border-color: #F5F7F9;
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
flex: 1;
margin-left: ${wp('4.26%')}px;
height: ${wp('12.79%')}px;
background-color: #131F3C;
border-radius: 8px;
align-items: center;
justify-content: center;
`;

const SeeDentalInfoText = Styled.Text`
 
font-weight: 700;
font-size: 16px;
color: #ffffff;
`;

interface Props {
  likeCount: number;
  clickCommentIcon: (request: string) => void;
  clickReviewLike: () => void;
  clickReviewScrap: () => void;
  isCurUserLike: boolean;
  isCurUserScrap: boolean;
  moveToDentalDetail: () => void,
}

const ReviewBottomBar = ({
  likeCount,
  clickCommentIcon,
  clickReviewLike,
  clickReviewScrap,
  isCurUserLike,
  isCurUserScrap,
  moveToDentalDetail,
}: Props) => {

  const [isCommentInput, setIsCommentInput] = useState<boolean>(false);
  const [commentDescrip, setCommentDescrip] = useState<string>('');
  const likeIconScale = useRef(new Animated.Value(1)).current;

  return (
    <Container>
          <SocialInfoListContainer>
            <TouchableWithoutFeedback onPress={() => {
              clickReviewLike();
              if(!isCurUserLike) {
                likeIconScale.setValue(0.7);
                Animated.spring(likeIconScale, {
                  toValue: 1,
                  friction: 6,
                  tension: 400,
                  useNativeDriver: true,
                }).start()
              }
            }}>
              <SocialItemContainer>
                <Animated.Image
                style={{
                  width: wp('6.4%'),
                  height: wp('6.4%'),
                  transform: [{scale: likeIconScale}],
                }}
                  source={
                    isCurUserLike 
                    ? require('~/Assets/Images/Indicator/ic_like_focus.png')
                    : require('~/Assets/Images/Indicator/ic_like_unfocus.png')
                  }
                />
              </SocialItemContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => clickReviewScrap()}>
              <SocialItemContainer style={{marginLeft: 8}}>
                <ScrapIcon
                  source={
                    isCurUserScrap
                    ? require('~/Assets/Images/Indicator/ic_scrap_focus.png')
                    : require('~/Assets/Images/Indicator/ic_scrap_unfocus.png')
                  }
                />
              </SocialItemContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => clickCommentIcon("post")}>
              <SocialItemContainer style={{marginLeft: 8}}>
                <CommentIcon
                  source={require('~/Assets/Images/Indicator/ic_comment.png')}
                />
              </SocialItemContainer>
            </TouchableWithoutFeedback>
          </SocialInfoListContainer>
          <TouchableWithoutFeedback onPress={() => moveToDentalDetail()}>
          <SeeDentalInfoButton>
            <SeeDentalInfoText>{'병원정보'}</SeeDentalInfoText>
          </SeeDentalInfoButton>
          </TouchableWithoutFeedback>
    </Container>
  );
};

export default ReviewBottomBar;


/*
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
*/