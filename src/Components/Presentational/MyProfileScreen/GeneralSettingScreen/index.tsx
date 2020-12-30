import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Switch,
  LayoutAnimation,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import allActions from '~/actions';

// Async Storage
import {storeUserInfo} from '~/storage/currentUser';
// Local Component

const ContainerView = Styled.ScrollView`
flex: 1;
background: #EEEEEE;
margin-bottom: ${hp('9.6%')}px;
`;

const UserSettingView = Styled.View`
width: ${wp('100%')}px;
height: auto;
background: white;
margin-top: 8px; 
padding-bottom: 16px;
`;

const SettingTitleView = Styled.View`
width: 100%;
height: ${hp('6.89%')}px;
margin-bottom: 4px;
padding: 16px 
justify-content: center;
`;

const SettingTitleText = Styled.Text`
font-size: 12px;
line-height: 24px;
color: #7A7A7A;
`;

const ContentTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 100%;
height: ${hp('6.89%')}px;
flex-direction: row;
align-items: center;
padding: 16px;
margin-bottom: 4px;
`;

const ContentTitleText = Styled.Text`
font-weight: bold;
font-size: 16px;
line-height: 24px;
margin-right: 16px;
`;

const ContentText = Styled.Text`
font-size: 16px;
line-height: 24px;
color: #7A7A7A;
`;

const ArrowIconView = Styled.View`
width: 7px;
height: 12px;
margin-left: auto;

`;

const ArrowIconImage = Styled.Image`
width: 100%;
height: 100%;
`;

const AlertContainerView = Styled.View`
width: ${wp('100%')}px
height: auto;
`;

const AlertView = Styled.View`
width: 100%;
height: ${hp('6.89%')}px;
flex-direction: row;
align-items: center;
padding: 16px;
margin-bottom: 4px;
`;

const AlertTitleText = Styled.Text`
margin-left: 16px;
font-size: 16px;
line-height: 24px;
`;

const AlertSwitch = Styled(Switch as new () => Switch)`
margin-left: auto;
`;

interface Props {
  navigation: any;
  route: any;
}
interface Props {
  navigation: any;
  route: any;
}
const GeneralSettingScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch();

  const logout = () => {
    storeUserInfo(null);
    dispatch(allActions.userActions.logOut());
  };

  const [isAlertEnabled, setIsAlertEnabled] = useState(false);
  const [isLikesAlertEnabled, setIsLikesAlertEnabled] = useState(false);
  const [isCommentsAlertEnabled, setIsCommentsAlertEnabled] = useState(false);
  const [isEventAlertEnabled, setIsEventAlertEnabled] = useState(false);

  return (
    <ContainerView
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}>
      <UserSettingView>
        <SettingTitleView>
          <SettingTitleText>{'알림설정'}</SettingTitleText>
        </SettingTitleView>
        <AlertView>
          <ContentTitleText>{'알림'}</ContentTitleText>
          <AlertSwitch
            onValueChange={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'),
              );
              setIsAlertEnabled((prev) => !prev);
            }}
            value={isAlertEnabled}
          />
        </AlertView>
        {isAlertEnabled ? (
          <>
            <AlertView>
              <AlertTitleText>좋아요</AlertTitleText>
              <AlertSwitch
                onValueChange={() => {
                  setIsLikesAlertEnabled((prev) => !prev);
                }}
                value={isLikesAlertEnabled}
              />
            </AlertView>
            <AlertView>
              <AlertTitleText>댓글</AlertTitleText>
              <AlertSwitch
                onValueChange={() => {
                  setIsCommentsAlertEnabled((prev) => !prev);
                }}
                value={isCommentsAlertEnabled}
              />
            </AlertView>
            <AlertView>
              <AlertTitleText>이벤트</AlertTitleText>
              <AlertSwitch
                onValueChange={() => {
                  setIsEventAlertEnabled((prev) => !prev);
                }}
                value={isEventAlertEnabled}
              />
            </AlertView>
          </>
        ) : null}
      </UserSettingView>
      <UserSettingView>
        <SettingTitleView>
          <SettingTitleText>{'고객센터'}</SettingTitleText>
        </SettingTitleView>
        <ContentTouchableOpacity>
          <ContentTitleText>{'이메일 상담'}</ContentTitleText>
          <ArrowIconView>
            <ArrowIconImage
              style={{
                resizeMode: 'contain',
              }}
              source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
            />
          </ArrowIconView>
        </ContentTouchableOpacity>
      </UserSettingView>
      <UserSettingView>
        <SettingTitleView>
          <SettingTitleText>{'계정 관리'}</SettingTitleText>
        </SettingTitleView>
        <ContentTouchableOpacity onPress={() => logout()}>
          <ContentTitleText>로그아웃</ContentTitleText>
          <ArrowIconView>
            <ArrowIconImage
              style={{
                resizeMode: 'contain',
              }}
              source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
            />
          </ArrowIconView>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity>
          <ContentTitleText>{'회원탈퇴'}</ContentTitleText>
          <ArrowIconView>
            <ArrowIconImage
              style={{
                resizeMode: 'contain',
              }}
              source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
            />
          </ArrowIconView>
        </ContentTouchableOpacity>
      </UserSettingView>
      <UserSettingView>
        <SettingTitleView>
          <SettingTitleText>{'앱 정보'}</SettingTitleText>
        </SettingTitleView>
        <ContentTouchableOpacity>
          <ContentTitleText>{'버전정보'}</ContentTitleText>
          <ContentText>{'V.1.1.1'}</ContentText>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity>
          <ContentTitleText>개인정보보호정책</ContentTitleText>
          <ArrowIconView>
            <ArrowIconImage
              style={{
                resizeMode: 'contain',
              }}
              source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
            />
          </ArrowIconView>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity>
          <ContentTitleText>약관 및 이용동의</ContentTitleText>
          <ArrowIconView>
            <ArrowIconImage
              style={{
                resizeMode: 'contain',
              }}
              source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
            />
          </ArrowIconView>
        </ContentTouchableOpacity>
      </UserSettingView>
    </ContainerView>
  );
};
export default GeneralSettingScreen;
