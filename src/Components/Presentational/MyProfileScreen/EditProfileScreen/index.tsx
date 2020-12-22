import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ActionSheet from 'react-native-actionsheet';

const ContainerView = Styled.ScrollView`
flex: 1;
background: #EEEEEE;
`;

const ProfileContainerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
padding: 16px 0px;
justify-content: center;
align-items: center;
background: white;
`;

const ProfileContentView = Styled.View`
width: auto;
height: auto;
align-items: center;
`;
const ProfileImageView = Styled.View`
width: ${wp('15%')}px;
height: ${wp('15%')}px;
margin-top: 8px;
background: #ECECEC;
border-radius: 8px;
`;

const ProfileImage = Styled.Image`
width: 100%;
height: 100%;
border-radius: 8px;
`;

const ProfileNicknameText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
margin-top: 8px;
`;

const EditProfileTouchableHighlight = Styled(
  TouchableHighlight as new () => TouchableHighlight,
)`
width: auto;
height: auto;
margin-top: 8px;
padding: 8px 18px;
border: 1px solid #EEEEEE;
border-radius: 100px;
`;

const EditProfileText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 16px;
color: #787878;
`;

const LocationSettingView = Styled.View`
width: ${wp('100%')}px;
height: auto;
margin-bottom: 12px;
background: white;
`;

const LocationIconView = Styled.View`
width: 16px;
height: 16px;
border-radius: 8px;
margin-right: 8px;
background: #C4C4C4;
`;

const LocationIconImage = Styled.Image``;

const PrivacySettingView = Styled.View`
width: ${wp('100%')}px;
height: auto;
margin-bottom: 12px;
background: white;
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

const UserSettingView = Styled.View`
width: ${wp('100%')}px;
flex: 1;
background: white;
`;

const ContentTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 100%;
height: ${hp('6.89%')}px;
flex-direction: row;
align-items: center;
padding: 0px 16px;
margin-bottom: 4px;
`;

const ContentTitleText = Styled.Text`
font-weight: bold;
font-size: 16px;
line-height: 24px;
width: 91px;
`;

const ContentText = Styled.Text`
font-size: 16px;
line-height: 24px;
color: #7A7A7A;
`;

const VerificatedView = Styled.View`
width: 58px;
height: 24px;
margin-left: auto;
background: #EEEEEE;
border-radius: 4px;
`;

const VerificatedText = Styled.Text`
font-size: 12px;
line-height: 24px;
text-align: center;
color: #7A7A7A;
`;

const ArrowIconView = Styled.View`
width: 7px;
height: 12px;
margin-left: 16px;
`;

const ArrowIconImage = Styled.Image`
width: 100%;
height: 100%;
`;

const InterLockIconView = Styled.View`
width: 16px;
height: 16px;
border-radius: 8px;
margin-right: 8px;
background: #C4C4C4;
`;

const InterLockIconImage = Styled.Image`
width: 100%;
height: 100%;
border-radius: 8px;
`;
interface Props {
  navigation: any;
  route: any;
  userData: any;
  setUserData: any;
}

const EditProfileScreen = ({
  navigation,
  route,
  userData,
  setUserData,
}: Props) => {
  const genderActionSheetRef: any = useRef();
  const genderActionSheetItemList = ['취소', '남성', '여성'];
  const onPressGenderActionSheet = (index: number) => {
    switch (genderActionSheetItemList[index]) {
      case '남성':
        setUserData((prev: any) => ({
          ...prev,
          gender: '남성',
        }));
        break;
      case '여성':
        setUserData((prev: any) => ({
          ...prev,
          gender: '여성',
        }));
        break;
    }
  };
  return (
    <ContainerView>
      <ProfileContainerView>
        <ProfileContentView>
          <ProfileImageView>
            <ProfileImage
              source={require('~/Assets/Images/appIcon_chika.png')}
            />
          </ProfileImageView>
          <ProfileNicknameText>{userData.nickname}</ProfileNicknameText>
          <EditProfileTouchableHighlight
            activeOpacity={1}
            underlayColor="#EEEEEE"
            onPress={() => {}}>
            <EditProfileText>{`프로필 수정하기`}</EditProfileText>
          </EditProfileTouchableHighlight>
        </ProfileContentView>
      </ProfileContainerView>
      <LocationSettingView>
        <SettingTitleView>
          <SettingTitleText>위치설정</SettingTitleText>
        </SettingTitleView>
        <ContentTouchableOpacity>
          <ContentTitleText>동네설정</ContentTitleText>
          <LocationIconView></LocationIconView>
          <ContentText>이의동</ContentText>
          <ArrowIconView
            style={{
              marginLeft: 'auto',
            }}>
            <ArrowIconImage
              style={{
                resizeMode: 'contain',
              }}
              source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
            />
          </ArrowIconView>
        </ContentTouchableOpacity>
      </LocationSettingView>
      <PrivacySettingView>
        <SettingTitleView>
          <SettingTitleText>개인설정</SettingTitleText>
        </SettingTitleView>
        <ContentTouchableOpacity>
          <ContentTitleText>전화번호</ContentTitleText>
          <ContentText>010-1234-1232</ContentText>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity
          onPress={() => genderActionSheetRef.current.show()}>
          <ContentTitleText>성별</ContentTitleText>
          <ContentText>{userData.gender}</ContentText>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity>
          <ContentTitleText>생일</ContentTitleText>
          <ContentText>{userData.birthday}</ContentText>
        </ContentTouchableOpacity>
      </PrivacySettingView>
      <UserSettingView>
        <SettingTitleView>
          <SettingTitleText>회원설정</SettingTitleText>
        </SettingTitleView>
        <ContentTouchableOpacity>
          <ContentTitleText>연동계정</ContentTitleText>
          <InterLockIconView></InterLockIconView>
          <ContentText>카카오 로그인</ContentText>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity>
          <ContentTitleText>본인 인증</ContentTitleText>
          <VerificatedView>
            <VerificatedText>미인증</VerificatedText>
          </VerificatedView>
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
      <ActionSheet
        ref={genderActionSheetRef}
        options={genderActionSheetItemList}
        cancelButtonIndex={0}
        onPress={(index: any) => onPressGenderActionSheet(index)}
      />
    </ContainerView>
  );
};

export default EditProfileScreen;
