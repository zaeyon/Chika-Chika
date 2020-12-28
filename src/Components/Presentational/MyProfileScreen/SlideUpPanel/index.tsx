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
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    align-items: center;
    padding: 10px 0px 70px 0px;
`;

const TopIndicatorView = Styled.View`
width: 48px;
height: 3px;
background: #C4C4C4;
border-radius: 100px;
margin-bottom: 16px;
`;

const ContentItemTouchableHighlight = Styled(
  TouchableHighlight as new () => TouchableHighlight,
)`
width: 100%;
height: ${hp('8.13%')}px;
padding: 0px 16px;
`;
const ContentItemView = Styled.View`
flex: 1;
flex-direction: row;
align-items: center;
`;

const ContentImageView = Styled.View`
width: 24px;
height: 24px;
background: #C4C4C4;
margin-right: 12px;
`;

const ContentTitleText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 16px;
padding-top: 2.3px;
`;

const HorizontalLineView = Styled.View`
width: 91%;
height: 1px;
margin-left: auto;
background: #ECECEC;
`;

interface Props {
  navigation: any;
  closeBottomSheet: any;
  disabled: boolean;
}

const SlideUpPanel = ({navigation, closeBottomSheet, disabled}: Props) => {
  const contents = [
    {title: '스크랩한 글', name: ''},
    {title: '좋아요한 글', name: ''},
    {title: '내가 댓글 단 글', name: ''},
    {title: '내 정보 수정', name: 'EditProfileTabScreen'},
    {title: '설정', name: 'GeneralSettingTabScreen'},
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
              setTimeout(() => navigation.navigate(item.name), 400);

              // setNavigateName(item.name);
            }
          }}>
          <ContentItemView>
            <ContentImageView></ContentImageView>
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
