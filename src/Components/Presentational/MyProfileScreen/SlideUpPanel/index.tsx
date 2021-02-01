import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ContainerView = Styled.View`
    flex: 1;
    background: white;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    align-items: center;
    padding: 16px 0px 70px 0px;
`;

const TopIndicatorView = Styled.View`
width: 35px;
height: 4px;
background: #E2E6ED;
border-radius: 100px;
margin-bottom: 16px;
`;

const ContentItemTouchableHighlight = Styled(
  TouchableHighlight as new () => TouchableHighlight,
)`
width: 100%;
height: ${hp('8.13%')}px;
padding: 0px 24px;
`;
const ContentItemView = Styled.View`
flex: 1;
flex-direction: row;
align-items: center;
`;

const ContentImage = Styled.Image`
width: 24px;
height: 24px;
margin-right: 12px;
`;

const ContentTitleText = Styled.Text`
 
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 16px;
padding-top: 2.3px;
`;

const HorizontalLineView = Styled.View`
width: auto;
height: 1px;
margin: 0px 24px 0px 60px;
background: #ECECEC;
`;

interface Props {
  navigation: any;
  closeBottomSheet: any;
  disabled: boolean;
}

const SlideUpPanel = ({navigation, closeBottomSheet, disabled}: Props) => {
  const contents = [
    {
      title: '스크랩',
      name: 'ScrapedPostsTabScreen',
      icon: require('~/Assets/Images/MyPage/ic/mypge/modal/scrap.png'),
    },
    {
      title: '좋아요',
      name: 'LikedPostsTabScreen',
      icon: require('~/Assets/Images/MyPage/ic/mypge/modal/like.png'),
    },
    {
      title: '댓글 단 글',
      name: 'CommentedPostsTabScreen',
      icon: require('~/Assets/Images/MyPage/ic/mypge/modal/comment.png'),
    },
    {
      title: '프로필 편집',
      name: 'EditProfileStackScreen',
      icon: require('~/Assets/Images/MyPage/ic/mypge/modal/myprofile.png'),
    },
    {
      title: '설정',
      name: 'GeneralSettingTabScreen',
      icon: require('~/Assets/Images/MyPage/ic/mypge/modal/setting.png'),
    },
  ];

  const renderItem = () =>
    contents.map((item: any, index: number) => (
      <View style={{width: '100%'}} key={item.title}>
        <ContentItemTouchableHighlight
          activeOpacity={1}
          underlayColor={disabled ? '#FFFFFF' : '#EEEEEE'}
          disabled={disabled}
          onPress={() => {
            if (!disabled) {
              closeBottomSheet();
              setTimeout(() => navigation.navigate(item.name), 200);

              // setNavigateName(item.name);
            }
          }}>
          <ContentItemView>
            <ContentImage source={item.icon}></ContentImage>
            <ContentTitleText>{item.title}</ContentTitleText>
          </ContentItemView>
        </ContentItemTouchableHighlight>
        <HorizontalLineView />
      </View>
    ));

  return (
    <ContainerView>
      <TopIndicatorView />
      {renderItem()}
    </ContainerView>
  );
};

export default SlideUpPanel;
