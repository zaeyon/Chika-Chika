import React, {useState, useCallback, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Switch,
  LayoutAnimation,
  TouchableHighlight,
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
import AnimatedModal from '~/Components/Presentational/AnimatedModal';
const ContainerView = Styled.ScrollView`
flex: 1;
background: #F5F7F9;
`;

const SectionContainerView = Styled.View`
margin-top: 16px;
background: #FFFFFF;
border-color: #E2E6ED;
border-top-width: 0.5px;
border-bottom-width: 0.5px;
`;

const SectionVerticalDivider = Styled.View`
background: #E2E6ED;
width: auto
height: 0.5px;
margin: 0px 16px;

`;

const SectionContentView = Styled.View`
flex-direction: row;
padding: 16px;
align-items: center;
background: #FFFFFF;
`;
const SectionContentTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
color: #131F3C;`;

const SectionContentText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
`;

const SectionImage = Styled.Image`
margin-left: auto;
`;

const ChildrenIndicatorImage = Styled.Image`
margin-right: 8px;
`;

const AlertSwitch = Styled.Switch`
margin-left: auto;
`;

const ModalText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 20px;
color: #131F3C;
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

  const [sectionArrow, setSectionArrow] = useState(
    require('~/Assets/Images/MyPage/common/gan/list/profile_edit_section_arrow.png'),
  );
  const [childrenIndicator, setChildrenIndicator] = useState(
    require('~/Assets/Images/Setting/list/children_indicator.png'),
  );

  const [isAlertEnabled, setIsAlertEnabled] = useState(false);
  const [isLikesAlertEnabled, setIsLikesAlertEnabled] = useState(false);
  const [isCommentsAlertEnabled, setIsCommentsAlertEnabled] = useState(false);
  const [isEventAlertEnabled, setIsEventAlertEnabled] = useState(false);

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [signoutModalVisible, setSignoutModalVisible] = useState(false);

  const logout = useCallback(() => {
    storeUserInfo(null);
    dispatch(allActions.userActions.logOut());
  }, []);

  const signout = useCallback(() => {
    console.log('sign out');
  }, []);

  return (
    <ContainerView
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}>
      <AnimatedModal
        visible={logoutModalVisible}
        buttons={[
          {
            title: '아니요',
            onPress: () => setLogoutModalVisible(false),
          },
          {
            title: '예',
            onPress: () => logout(),
          },
        ]}>
        <ModalText>{'로그아웃 하시겠어요?'}</ModalText>
      </AnimatedModal>
      <AnimatedModal
        visible={signoutModalVisible}
        buttons={[
          {
            title: '아니요',
            onPress: () => setSignoutModalVisible(false),
          },
          {
            title: '예',
            onPress: () => signout(),
          },
        ]}>
        <ModalText>{'탈퇴하시겠어요?'}</ModalText>
      </AnimatedModal>
      <SectionContainerView>
        <SectionContentView>
          <SectionContentTitleText>{'알림'}</SectionContentTitleText>
          <AlertSwitch
            trackColor={{
              true: '#00D1FF',
              false: '#E2E6ED',
            }}
            onValueChange={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'),
              );
              setIsAlertEnabled((prev) => !prev);
              setIsLikesAlertEnabled(false);
              setIsCommentsAlertEnabled(false);
              setIsEventAlertEnabled(false);
            }}
            value={isAlertEnabled}
          />
        </SectionContentView>
        {isAlertEnabled ? (
          <>
            <SectionContentView>
              <ChildrenIndicatorImage source={childrenIndicator} />
              <SectionContentTitleText>{'좋아요'}</SectionContentTitleText>
              <AlertSwitch
                trackColor={{
                  true: '#00D1FF',
                  false: '#E2E6ED',
                }}
                onValueChange={() => {
                  setIsLikesAlertEnabled((prev) => !prev);
                }}
                value={isLikesAlertEnabled}
              />
            </SectionContentView>
            <SectionContentView>
              <ChildrenIndicatorImage source={childrenIndicator} />
              <SectionContentTitleText>{'댓글'}</SectionContentTitleText>
              <AlertSwitch
                trackColor={{
                  true: '#00D1FF',
                  false: '#E2E6ED',
                }}
                onValueChange={() => {
                  setIsCommentsAlertEnabled((prev) => !prev);
                }}
                value={isCommentsAlertEnabled}
              />
            </SectionContentView>
            <SectionContentView>
              <ChildrenIndicatorImage source={childrenIndicator} />
              <SectionContentTitleText>{'이벤트'}</SectionContentTitleText>
              <AlertSwitch
                trackColor={{
                  true: '#00D1FF',
                  false: '#E2E6ED',
                }}
                onValueChange={() => {
                  setIsEventAlertEnabled((prev) => !prev);
                }}
                value={isEventAlertEnabled}
              />
            </SectionContentView>
          </>
        ) : null}
      </SectionContainerView>
      <SectionContainerView>
        <TouchableHighlight activeOpacity={0.9} underlayColor="black">
          <SectionContentView>
            <SectionContentTitleText>{'이메일 상담'}</SectionContentTitleText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
        <SectionVerticalDivider />
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() => setLogoutModalVisible(true)}>
          <SectionContentView>
            <SectionContentTitleText>{'로그아웃'}</SectionContentTitleText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
        <SectionVerticalDivider />
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() => setSignoutModalVisible(true)}>
          <SectionContentView>
            <SectionContentTitleText>{'회원탈퇴'}</SectionContentTitleText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
      </SectionContainerView>
      <SectionContainerView>
        <TouchableHighlight activeOpacity={0.9} underlayColor="black">
          <SectionContentView>
            <SectionContentTitleText>{'버전정보'}</SectionContentTitleText>
          </SectionContentView>
        </TouchableHighlight>
        <SectionVerticalDivider />
        <TouchableHighlight activeOpacity={0.9} underlayColor="black">
          <SectionContentView>
            <SectionContentTitleText>
              {'개인정보보호정책'}
            </SectionContentTitleText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
        <SectionVerticalDivider />
        <TouchableHighlight activeOpacity={0.9} underlayColor="black">
          <SectionContentView>
            <SectionContentTitleText>
              {'약관 및 이용동의'}
            </SectionContentTitleText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
      </SectionContainerView>
    </ContainerView>
  );
};
export default GeneralSettingScreen;
