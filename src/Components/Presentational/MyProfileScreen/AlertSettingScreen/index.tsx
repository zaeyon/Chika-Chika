import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, TouchableOpacity, Switch} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
flex: 1;
background: white;
`;

const ContentContainerView = Styled.View`
width: ${wp('100%')}px
height: auto;
`;

const ContentView = Styled.View`
width: 100%;
height: ${hp((56 / 812) * 100)}px;
flex-direction: row;
align-items: center;
padding: 16px;
`;

const ContentTitleText = Styled.Text`
font-size: 16px;
line-height: 24px;
`;

const ContentSwitch = Styled(Switch as new () => Switch)`
margin-left: auto;
`;
interface Props {
  navigation: any;
  route: any;
}

const AlertSettingScreen = ({navigation, route}: Props) => {
  const [isLikesAlertEnabled, setIsLikesAlertEnabled] = useState(false);
  const [isCommentsAlertEnabled, setIsCommentsAlertEnabled] = useState(false);
  const [isToothbrushAlertEnabled, setIsToothbrushAlertEnabled] = useState(
    false,
  );
  const [isBrushTimeAlertEnabled, setIsBrushTimeAlertEnabled] = useState(false);
  const [isEventAlertEnabled, setIsEventAlertEnabled] = useState(false);
  return (
    <ContainerView>
      <ContentContainerView>
        <ContentView>
          <ContentTitleText>좋아요</ContentTitleText>
          <ContentSwitch
            onValueChange={() => {
              setIsLikesAlertEnabled((prev) => !prev);
            }}
            value={isLikesAlertEnabled}
          />
        </ContentView>
        <ContentView>
          <ContentTitleText>댓글</ContentTitleText>
          <ContentSwitch
            onValueChange={() => {
              setIsCommentsAlertEnabled((prev) => !prev);
            }}
            value={isCommentsAlertEnabled}
          />
        </ContentView>
        <ContentView>
          <ContentTitleText>칫솔교체</ContentTitleText>
          <ContentSwitch
            onValueChange={() => {
              setIsToothbrushAlertEnabled((prev) => !prev);
            }}
            value={isToothbrushAlertEnabled}
          />
        </ContentView>
        <ContentView>
          <ContentTitleText>양치시간</ContentTitleText>
          <ContentSwitch
            onValueChange={() => {
              setIsBrushTimeAlertEnabled((prev) => !prev);
            }}
            value={isBrushTimeAlertEnabled}
          />
        </ContentView>
        <ContentView>
          <ContentTitleText>이벤트</ContentTitleText>
          <ContentSwitch
            onValueChange={() => {
              setIsEventAlertEnabled((prev) => !prev);
            }}
            value={isEventAlertEnabled}
          />
        </ContentView>
      </ContentContainerView>
    </ContainerView>
  );
};
export default AlertSettingScreen;
