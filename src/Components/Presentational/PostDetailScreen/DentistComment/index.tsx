import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

const ProCommnetContainerView = Styled.View`
width: ${wp('100%')}px;
height: 226px;
background: white;
`;

const HeaderContainerView = Styled.View`
width: 100%;
height: 54px;
padding: 15px 20px;
justify-content: center;
background: #C4C4C4;
`;

const HeaderText = Styled.Text`
font-weight: bold;
font-size: 14px;
line-height: 24px;
`;
const ProCommentInfomationContainerView = Styled.View`
width: 100%;
height: auto;
background: white
flex-direction: row;
padding: 16px;
align-items: center;
`;

const ProCommentInfomationContentView = Styled.View`
flex: 1;
height: auto;
margin-left: 8px;
`;

const ProCommentInfomationContentImage = Styled.Image`
width: 72px;
height: 72px;
background: #C4C4C4
`;

const ProCommentInfomationLinkText = Styled.Text`

`;

const ProCommentInfomationTextContainerView = Styled.View`
flex-direction: row;
align-items: center;
`;

const ProCommnetInformationTitleText = Styled.Text`
font-weight: bold;
font-size: 14px;
line-height: 24px;
`;

const ProCommnetInformationText = Styled.Text`
font-size: 12px;
line-height: 20px;
margin: 0px 4px;
`;

const ProCommentContentView = Styled.View`
width: 100%;
height: 100%;
padding: 16px;
`;
const ProCommentContentText = Styled.Text`
`;

const MiddleBarView = Styled.View`
width: 92%;
margin: 0px auto;
height: 1px;
background: grey;
`;

const DentistComment = () => {
  return (
    <ProCommnetContainerView>
      <HeaderContainerView>
        <HeaderText>전문의 답변입니다.</HeaderText>
      </HeaderContainerView>
      <ProCommentInfomationContainerView>
        <ProCommentInfomationContentImage />
        <ProCommentInfomationContentView>
          <ProCommentInfomationTextContainerView>
            <ProCommnetInformationTitleText>
              의사이름
            </ProCommnetInformationTitleText>
            <ProCommnetInformationText>이태규</ProCommnetInformationText>
          </ProCommentInfomationTextContainerView>
          <ProCommentInfomationTextContainerView>
            <ProCommnetInformationTitleText>
              병원이름
            </ProCommnetInformationTitleText>
            <ProCommnetInformationText>치카치카병원</ProCommnetInformationText>
          </ProCommentInfomationTextContainerView>
          <ProCommentInfomationTextContainerView>
            <ProCommnetInformationTitleText>
              누적답변수
            </ProCommnetInformationTitleText>
            <ProCommnetInformationText>13건</ProCommnetInformationText>
          </ProCommentInfomationTextContainerView>
        </ProCommentInfomationContentView>
        <TouchableOpacity onPress={() => {}}>
          <ProCommentInfomationLinkText>유도 버튼</ProCommentInfomationLinkText>
        </TouchableOpacity>
      </ProCommentInfomationContainerView>
      <MiddleBarView />
      <ProCommentContentView>
        <ProCommentContentText>
          안녕하세요 전윤정님. 치카치카병원의 이태규입니다. 저희 병원을
          방문해주셔서 감사합니다. 어쩌구저쩌구....
        </ProCommentContentText>
      </ProCommentContentView>
    </ProCommnetContainerView>
  );
};

export default DentistComment;
