import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, View, TouchableOpacity, Keyboard, KeyboardAvoidingView} from 'react-native'
import {getBottomSpace} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';

const Container = Styled.View`
height: auto;
min-height: ${hp('100%') * 0.08}px;
max-height: ${hp('100%') * 0.15}px;
border-top-width: 1px;
border-color: #c4c4c4;
background-color: #ffffff;
`;

const DefaultContainer = Styled.View`
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
padding: 16px 8px 16px 0px;
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
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const LikeCountText = Styled.Text`
margin-left: 4px;
font-weight: 400;
font-size: 14px;
color: #000000;
`;

const ScrapIcon = Styled.Image`
width: ${wp('4.53%')};
height: ${wp('4.53%')};
`;

const CommentIcon = Styled.Image`
width: ${wp('5.3%')};
height: ${wp('5.3%')};
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
`;

const CommentUploadText = Styled.Text`
font-size: 14px;
line-height: 16px;
`;

interface Props {
    likeCount: number,
    clickCommentIcon: () => void,
    isCommentInputFocused: boolean,
}

const ReviewBottomBar = ({likeCount, clickCommentIcon, isCommentInputFocused}: Props) => {
    const [isCommentInput, setIsCommentInput] = useState<boolean>(false);

    /*
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
        }
    }, [])

    const _keyboardDidShow = (e: any) => {
        //setPaddingBottom(e.endCoordinates.height);
        //scrollViewRef.current.scrollToEnd({animated: false})
    }

    const _keyboardWillHide = () => {
        setIsCommentInput(false);
    }
    */

    const clickCommentIcon2 = () => {
        setIsCommentInput(true)
    }

    return (
        <Container>
            {!isCommentInputFocused ? (
            <DefaultContainer>
                <SocialInfoListContainer>
                    <LikeContainer>
                        <LikeIcon
                        source={require('~/Assets/Images/Social/ic_like.png')}/>
                    <LikeCountText>{likeCount}</LikeCountText>
                    </LikeContainer>
                    <ScrapContainer>
                        <ScrapIcon
                        source={require('~/Assets/Images/Social/ic_scrap.png')}/>
                    </ScrapContainer>
                    <TouchableWithoutFeedback onPress={() => clickCommentIcon()}>
                    <CommentContainer>
                        <CommentIcon
                        source={require('~/Assets/Images/Social/ic_comment.png')}/>
                    </CommentContainer>
                    </TouchableWithoutFeedback>
                </SocialInfoListContainer>
                <SeeDentalInfoButton>
                    <SeeDentalInfoText>{"병원정보 보러가기"}</SeeDentalInfoText>
                </SeeDentalInfoButton>
            </DefaultContainer>
            ) : (
                <CommentInputContainer>
                    <CommentTextInput
                    multiline={true}
                    clearButtonMode="always" 
                    autoCorrect={false}
                    autoFocus={true}
                    placeholder="댓글 입력"
                    placeholderTextColor={'grey'}
                    style={{
                    borderWidth: 1,
                    borderColor: '#E9E9E9',
                    backgroundColor: 'white',
                    }}
                    />
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        marginLeft: 16,
                      }}
                      onPress={() => {}}>
                      <CommentUploadText>게시</CommentUploadText>
                    </TouchableOpacity>
                </CommentInputContainer>
            )}
        </Container>
    )
}

export default ReviewBottomBar;