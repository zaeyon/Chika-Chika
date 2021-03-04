import React, {useState, useCallback, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Switch,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
  Linking,
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

// Routes
import DELETEWithdrawal from '~/Routes/Auth/DELETEWithdrawal';

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

const LoadingContainer = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
align-items: center;
justify-content: center;
`;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  jwtToken: string;
  changeNotificationSetting: any;
  signout: any;
  logout: any;
  profile: any;
}
interface Props {
  jwtToken: string;
  navigation: any;
}

const GeneralSettingScreen = ({
  jwtToken,
  changeNotificationSetting,
  navigation,
  signout,
  logout,
  profile,
}: Props) => {
  console.log("GeneralSettingScreen profile", profile);
  const dispatch = useDispatch();

  const [sectionArrow, setSectionArrow] = useState(
    require('~/Assets/Images/MyPage/EditProfile/Section/profile_edit_section_arrow.png'),
  );
  const [childrenIndicator, setChildrenIndicator] = useState(
    require('~/Assets/Images/Setting/list/children_indicator.png'),
  );

  const [isAlertEnabled, setIsAlertEnabled] = useState(
    profile.notificationConfig?.ALOTrue === 1 ? true : false,
  );
  const [isLikesAlertEnabled, setIsLikesAlertEnabled] = useState(
    profile.notificationConfig?.like,
  );
  const [isCommentsAlertEnabled, setIsCommentsAlertEnabled] = useState(
    profile.notificationConfig?.comment,
  );
  const [isEventAlertEnabled, setIsEventAlertEnabled] = useState(
    profile.notificationConfig?.event,
  );

  const [loadingSignout, setLoadingSignout] = useState<boolean>(false);

  useEffect(() => {
    cleanup();
    dispatch(
      allActions.userActions.setNotification({
        ALOTrue: isAlertEnabled ? 1 : 0,
        comment: isCommentsAlertEnabled,
        like: isLikesAlertEnabled,
        event: isEventAlertEnabled,
      }),
    );
  }, [
    isAlertEnabled,
    isLikesAlertEnabled,
    isCommentsAlertEnabled,
    isEventAlertEnabled,
  ]);

  const cleanup = useCallback(() => {
    console.log(
      isLikesAlertEnabled,
      isCommentsAlertEnabled,
      isEventAlertEnabled,
    );
    changeNotificationSetting({
      like: String(isLikesAlertEnabled),
      comment: String(isCommentsAlertEnabled),
      event: String(isEventAlertEnabled),
    });
  }, [isLikesAlertEnabled, isCommentsAlertEnabled, isEventAlertEnabled]);

  // const logout = useCallback(() => {
  //   storeUserInfo(null);
  //   dispatch(allActions.userActions.logOut());
  // }, []);

  // const signout = useCallback(() => {
  //   console.log('sign out');
  //   setLoadingSignout(true);

  //   DELETEWithdrawal({jwtToken})
  //     .then((response) => {
  //       console.log('DELETEWithdrawal response', response);
  //       storeUserInfo(null);
  //       dispatch(allActions.userActions.logOut());
  //       setLoadingSignout(false);
  //     })
  //     .catch((error) => {
  //       console.log('DELETEWithdrawal error', error);
  //       Alert.alert('회원탈퇴에 실패하셨습니다.');
  //       setLoadingSignout(false);
  //     });
  // }, []);

  const alertLogout = () => {
    Alert.alert('로그아웃 하시겠어요?', '', [
      {
        text: '아니요',
        style: 'cancel',
        onPress: () => 0
      },
      {
        text: '예',
        onPress: () => logout(),
      }
    ])
  }

  const alertSignout = () => {
    Alert.alert('탈퇴하시겠어요?', '', [
      {
        text: '아니요',
        style: 'cancel',
        onPress: () => 0,
      },
      {
        text: '예',
        style: 'default',
        onPress: () => {
          signout();
        }
      }
    ])
  }

  const moveToPrivacyPolicy = () => {
    navigation.navigate("PrivacyPolicyScreen");
  }

  const moveToTermsOfService = () => {
    navigation.navigate("TermsOfServiceScreen");
  }

  const moveToLocationInfoTermsOfUse = () => {
    navigation.navigate("LocationInfoTermsOfUseScreen");
  }

  const openEmailSend = () => {
    Linking.openURL(`mailto:wodus5677@gmail.com?subject=이메일 문의&body=치카치카 앱 이용중 불편한점이나 개선할점을 작성해주세요.\n작성자 닉네임: ${profile.nickname}`)
  }

  return (
    <ContainerView
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}>
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
              setIsLikesAlertEnabled(!isAlertEnabled);
              setIsCommentsAlertEnabled(!isAlertEnabled);
              setIsEventAlertEnabled(!isAlertEnabled);
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
                  setIsLikesAlertEnabled((prev) => {
                    if (
                      !isEventAlertEnabled &&
                      !isCommentsAlertEnabled &&
                      prev
                    ) {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'),
                      );
                      setIsAlertEnabled(false);
                    }
                    return !prev;
                  });
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
                  setIsCommentsAlertEnabled((prev) => {
                    if (!isLikesAlertEnabled && !isEventAlertEnabled && prev) {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'),
                      );
                      setIsAlertEnabled(false);
                    }
                    return !prev;
                  });
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
                  setIsEventAlertEnabled((prev) => {
                    if (
                      !isLikesAlertEnabled &&
                      !isCommentsAlertEnabled &&
                      prev
                    ) {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'),
                      );
                      setIsAlertEnabled(false);
                    }
                    return !prev;
                  });
                }}
                value={isEventAlertEnabled}
              />
            </SectionContentView>
          </>
        ) : null}
      </SectionContainerView>
      <SectionContainerView>
        <TouchableHighlight activeOpacity={0.9} underlayColor="black"
        onPress={() => openEmailSend()}>
          <SectionContentView>
            <SectionContentTitleText>{'이메일 문의'}</SectionContentTitleText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
        <SectionVerticalDivider />
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() => alertLogout()}>
          <SectionContentView>
            <SectionContentTitleText>{'로그아웃'}</SectionContentTitleText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
        <SectionVerticalDivider />
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() => alertSignout()}>
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
        <TouchableHighlight 
        activeOpacity={0.9} 
        underlayColor="black"
        onPress={() => moveToTermsOfService()}>
          <SectionContentView>
            <SectionContentTitleText>
              {'서비스 이용약관'}
            </SectionContentTitleText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
        <SectionVerticalDivider />
        <TouchableHighlight
        activeOpacity={0.9}
        underlayColor="black"
        onPress={() => moveToPrivacyPolicy()}>
          <SectionContentView>
            <SectionContentTitleText>
              {'개인정보 처리방침'}
            </SectionContentTitleText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
        <SectionVerticalDivider />
        <TouchableHighlight
        activeOpacity={0.9}
        underlayColor="black"
        onPress={() => moveToLocationInfoTermsOfUse()}>
          <SectionContentView>
            <SectionContentTitleText>
              {'위치정보 이용약관'}
            </SectionContentTitleText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
        <SectionVerticalDivider />
      </SectionContainerView>
      {loadingSignout && (
        <LoadingContainer>
          <ActivityIndicator/>
        </LoadingContainer>
      )}
    </ContainerView>
  );
};
export default GeneralSettingScreen;
