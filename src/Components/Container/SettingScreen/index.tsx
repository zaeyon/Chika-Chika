import React from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('11.7%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const HeaderLeftContainer = Styled.View`
`;

const BackButtonContainer = Styled.View`
padding: 12.5px 15px 13px 16px;
 align-items: center;
 justify-content: center;
`;

const BackButton = Styled.Image`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding: 12.5px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;

const TabItemContainer = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('17%')}px;
 background-color: #ffffff;
 justify-content: center;
 padding-left: 16px;
 padding-right: 16px;
`;

const TabItemInnerContainer = Styled.View`
flex: 1;
 flex-direction: row;
 align-items: center;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const SettingTabIconImage = Styled.Image`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;

const SettingTabLabelText = Styled.Text`
 margin-left: 11px;
 font-size: 18px;
 color: #1D1E1F;
`;

const SettingTabListContainer = Styled.View`

`;

const EmptyContaienr = Styled.View`
 flex: 1;
 background-color: #eeeeee80;
`;

interface Props {
  navigation: any;
  route: any;
}

const SettingScreen = ({navigation, route}: Props) => {
  console.log(
    'SettingScreen route.params.profileInfo',
    route.params?.profileInfo,
  );

  const moveToAccountSetting = () => {
    /*
        navigation.navigate("AccountSettingScreen", {
            profileInfo: route.params?.profileInfo,
        });
        */
  };

  const moveToAlarmSetting = () => {
    /*
        navigation.navigate("AlarmSettingScreen");
        */
  };

  const moveToCustomerService = () => {
    /*
        navigation.navigate("CustomerServiceSettingScreen");
        */
  };

  const moveToInformation = () => {
    /*
        navigation.navigate("InformationScreen");
        */
  };

  const moveToSendFeedback = () => {
    /*
        navigation.navigate("SendFeedbackScreen");
        */
  };

  return (
    <Container>
      <HeaderBar>
        <HeaderLeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <BackButtonContainer>
              <BackButton
                source={require('~/Assets/Images/HeaderBar/ic_back.png')}
              />
            </BackButtonContainer>
          </TouchableWithoutFeedback>
        </HeaderLeftContainer>
        <HeaderTitleText>설정</HeaderTitleText>
        <HeaderRightContainer>
          <HeaderEmptyContainer></HeaderEmptyContainer>
        </HeaderRightContainer>
      </HeaderBar>
      <SettingTabListContainer>
        <TouchableWithoutFeedback onPress={() => moveToAccountSetting()}>
          <TabItemContainer>
            <TabItemInnerContainer>
              <SettingTabIconImage
                source={require('~/Assets/Images/Profile/Setting/ic_profile.png')}
              />
              <SettingTabLabelText>계정 및 보안</SettingTabLabelText>
            </TabItemInnerContainer>
          </TabItemContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => moveToAlarmSetting()}>
          <TabItemContainer>
            <TabItemInnerContainer>
              <SettingTabIconImage
                source={require('~/Assets/Images/Profile/Setting/ic_alarm.png')}
              />
              <SettingTabLabelText>알림</SettingTabLabelText>
            </TabItemInnerContainer>
          </TabItemContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => moveToCustomerService()}>
          <TabItemContainer>
            <TabItemInnerContainer>
              <SettingTabIconImage
                source={require('~/Assets/Images/Profile/Setting/ic_help.png')}
              />
              <SettingTabLabelText>고객센터</SettingTabLabelText>
            </TabItemInnerContainer>
          </TabItemContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => moveToInformation()}>
          <TabItemContainer>
            <TabItemInnerContainer>
              <SettingTabIconImage
                source={require('~/Assets/Images/Profile/Setting/ic_information.png')}
              />
              <SettingTabLabelText>정보</SettingTabLabelText>
            </TabItemInnerContainer>
          </TabItemContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => moveToSendFeedback()}>
          <TabItemContainer>
            <TabItemInnerContainer>
              <SettingTabIconImage
                source={require('~/Assets/Images/Profile/Setting/ic_information.png')}
              />
              <SettingTabLabelText>의견 전달하기</SettingTabLabelText>
            </TabItemInnerContainer>
          </TabItemContainer>
        </TouchableWithoutFeedback>
      </SettingTabListContainer>
      <EmptyContaienr></EmptyContaienr>
    </Container>
  );
};

export default SettingScreen;
