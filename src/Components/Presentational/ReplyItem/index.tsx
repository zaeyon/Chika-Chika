import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';


const Container = Styled.View`
 width: ${wp('100%')};
 margin-bottom: 2px;
 flex-direction: row;
`;

const ProfileImageContainer = Styled.View`
padding-top: 15px;
padding-left: 70px;
padding-right: 12px;
 align-items: center;
`;

const CommentRightContainer = Styled.View`
padding-right: 120px;
`;

const HeaderContainer = Styled.View`
padding-top: 14px;
padding-right: 16px;
flex-direction: row;
align-items: center;
`;

const NicknameContentContainer = Styled.View`
padding-top: 5px;
padding-bottom: 0px;
padding-right: 10px;
justify-content: center;
`;

const BodyContainer = Styled.View`
 flex-direction: row;
`;

const FooterContainer = Styled.View`
 flex-direction: row;
 padding-top: 8px;
 padding-bottom: 10px;
 align-items: center;
`;

const ProfileImage = Styled.Image`
 width: ${wp('8.5%')};
 height: ${wp('8.5%')};
 border-radius: 100px;
`;

const NicknameText = Styled.Text`
 font-size: 15px;
 font-weight: 600;
`;

const CommentDescripText = Styled.Text`
 margin-top: 5px;
 font-size: 16px;
`;

const CreateAtText = Styled.Text`
 font-size: 15px;
 color: #cccccc;
`;

const ReplyText = Styled.Text`
margin-left: 15px;
font-size: 14px;
font-weight: 600;
color: #979797;
`;

const ReplyContainer = Styled.View`
`;

const ReportText = Styled.Text`
font-size: 14px;
font-weight: 600;
color: #979797;
`;

interface Props {
    navigation: any,
    replyId: number,
    profileImage: string,
    nickname: string,
    description: string,
    createAt: string,
    openCommentModal: (nickname:string, commentId:number) => void,
}

const ReplyItem = ({navigation, profileImage, nickname, description, createAt, replyId, openCommentModal}: Props) => {
    const currentUser = useSelector((state: any) => state.currentUser);

    function getDateFormat(date) {
        var year = date.getFullYear();
        var month = (1+ date.getMonth());
        month = month >= 10 ? month : '0' + month;
        var day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '/' + month + '/' + day;
    }

    const moveToUserProfile = () => {
        /*
        if(currentUser.user?.nickname === nickname) {
            navigation.push("AnotherUserProfileStack", {
                screen: "AnotherUserProfileScreen",
                params: {requestedUserNickname: nickname}
              });
        } else {
            navigation.push("AnotherUserProfileStack", {
              screen: "AnotherUserProfileScreen",
              params: {requestedUserNickname: nickname}
            });
        }
        */
      }

    const onLongPressComment = () => {
        //console.log("replyId", replyId);
        //openCommentModal(nickname, replyId)
    }

    return (
        <TouchableOpacity onLongPress={() => onLongPressComment()}>
        <Container>
            <TouchableWithoutFeedback onPress={() => moveToUserProfile()}>
            <ProfileImageContainer>
                <ProfileImage
                source={{uri:profileImage}}/>
            </ProfileImageContainer>
            </TouchableWithoutFeedback>
            <CommentRightContainer>
                <HeaderContainer>
                    <NicknameText>{nickname}</NicknameText>
                </HeaderContainer>
                <CommentDescripText>{description}</CommentDescripText>
                <FooterContainer>
                    <CreateAtText>{createAt}</CreateAtText>
                </FooterContainer>
            </CommentRightContainer>
        </Container>
        </TouchableOpacity>
    )
}

export default ReplyItem;




