import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ActionSheet from 'react-native-actionsheet';

// Local Component
import AnimatedModal from '~/Components/Presentational/AnimatedModal';

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
padding: 4px 16px;
border-bottom-width: 1px;
border-color: #C4C4C4;
align-items: center;
`;
const ProfileImageView = Styled.View`
width: ${wp('15%')}px;
height: ${wp('15%')}px;
margin-top: 8px;
background: #ECECEC;
border-radius: 20px;
`;

const ProfileImage = Styled.Image`
width: 100%;
height: 100%;
border-radius: 20px;
`;

const ProfileNicknameText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
margin-top: 16px;
color: #9E9E9E;
`;

const EditProfileTouchableHighlight = Styled(
  TouchableHighlight as new () => TouchableHighlight,
)`
width: auto;
height: auto;
margin-top: 8px;
padding: 8px 18px;
border: 1px #EEEEEE;
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

const ModalContainerView = Styled.View`
flex: 1;
background: #00000070;
align-items: center;
justify-content: center;
`;

const ModalTitleText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 24px;
`;

const ModalDescriptionText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 24px;
color: #808080;
margin-top: 4px;
`;

const ModalTextInput = Styled.TextInput`
width: 90%;
height: 40px;
border: 0.25px #898989;
border-radius: 8px;
background: #FFFFFF;
margin-top: 16px;
text-align: center;
`;

const ModalButtonContainerView = Styled.View`
width: 100%;
height: 50px;
background: #C4C4C4;
flex-direction: row;
margin-top: auto;
`;

const ModalButtonItemView = Styled.TouchableHighlight`
flex: 1;
height: 100%;
background: rgba(255, 255, 255, 0.9);
align-items: center;
justify-content: center;
border-top-width: 1px;
border-color: #C4C4C4;
`;

const ModalButtonText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
color: #2998FF;
`;

interface Props {
  moveToGallery: any;
  moveToHomeTownSetting: any;
  moveToPhoneVerify: any;
  currentUser: any;
  changeProfileNickname: (nickname: string) => void;
  changeProfileGender: (gender: string) => void;
  changeProfileBirthdate: (birthdate: string) => void;
}

const EditProfileScreen = ({
  moveToGallery,
  moveToHomeTownSetting,
  moveToPhoneVerify,
  currentUser,
  changeProfileNickname,
  changeProfileGender,
  changeProfileBirthdate,
}: Props) => {
  const [textInput, setTextInput] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const genderActionSheetRef: any = useRef();
  const imageActionSheetRef: any = useRef();

  const genderActionSheetItemList = ['취소', '남성', '여성'];
  const imageActionSheetItemList = ['취소', '카메라', '앨범'];

  const onPressGenderActionSheet = useCallback((index: number) => {
    switch (genderActionSheetItemList[index]) {
      case '남성':
        changeProfileGender('남성');
        break;
      case '여성':
        changeProfileGender('여성');
        break;
    }
  }, []);

  const onPressImageActionSheet = useCallback((index: number) => {
    switch (imageActionSheetItemList[index]) {
      case '카메라':
        console.log('open camera');
        break;
      case '앨범':
        console.log('open gallery');
        moveToGallery();
        break;
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const setUserNickname = useCallback(() => {
    changeProfileNickname(textInput);
    setIsModalVisible(false);
    setTextInput('');
  }, [textInput]);

  const onChangeText = useCallback(
    (input: string) => setTextInput(input.replace(/\s/g, '')),
    [],
  );

  const formatProvider = useCallback((provider: string) => {
    switch (provider) {
      case 'google':
        return '구글';
      case 'kakao':
        return '카카오';
      case 'apple':
        return '애플';
    }
  }, []);
  return (
    <ContainerView
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}>
      <AnimatedModal
        visible={isModalVisible}
        buttons={[
          {
            title: '취소',
            onPress: closeModal,
          },
          {
            title: '변경',
            onPress: setUserNickname,
          },
        ]}>
        <ModalTitleText>{'닉네임 변경'}</ModalTitleText>
        <ModalDescriptionText>
          {'10자 이내로 입력이 가능합니다.'}
        </ModalDescriptionText>
        <ModalTextInput
          autoFocus={true}
          autoCorrect={false}
          maxLength={10}
          autoCapitalize="none"
          onChangeText={onChangeText}
          value={textInput}
        />
      </AnimatedModal>
      <ProfileContainerView>
        <ProfileContentView>
          <TouchableOpacity
            onPress={() => {
              console.log('profile image clicked');
              imageActionSheetRef.current.show();
            }}>
            <ProfileImageView>
              <ProfileImage
                source={{
                  uri: currentUser.profileImg,
                }}
              />
            </ProfileImageView>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('profile nickname clicked');
              setIsModalVisible(true);
            }}>
            <ProfileNicknameText>{currentUser.nickname}</ProfileNicknameText>
          </TouchableOpacity>
        </ProfileContentView>
      </ProfileContainerView>
      <LocationSettingView>
        <SettingTitleView>
          <SettingTitleText>위치설정</SettingTitleText>
        </SettingTitleView>
        <ContentTouchableOpacity onPress={() => moveToHomeTownSetting()}>
          <ContentTitleText>동네설정</ContentTitleText>
          <LocationIconView></LocationIconView>
          <ContentText>
            {currentUser.Residences[0].sido +
              ' ' +
              currentUser.Residences[0].sigungu +
              ' ' +
              currentUser.Residences[0].emdName}
          </ContentText>
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
        <ContentTouchableOpacity onPress={() => moveToPhoneVerify()}>
          <ContentTitleText>전화번호</ContentTitleText>
          <ContentText>{currentUser.phoneNumber || '미등록'}</ContentText>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity
          onPress={() => genderActionSheetRef.current.show()}>
          <ContentTitleText>성별</ContentTitleText>
          <ContentText>{currentUser.gender || '미등록'}</ContentText>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity>
          <ContentTitleText>생일</ContentTitleText>
          <ContentText>{currentUser.birthday || '미등록'}</ContentText>
        </ContentTouchableOpacity>
      </PrivacySettingView>
      <UserSettingView>
        <SettingTitleView>
          <SettingTitleText>회원설정</SettingTitleText>
        </SettingTitleView>
        <ContentTouchableOpacity>
          <ContentTitleText>연동계정</ContentTitleText>
          <InterLockIconView></InterLockIconView>
          <ContentText>
            {formatProvider(currentUser.provider)} 로그인
          </ContentText>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity onPress={() => moveToPhoneVerify()}>
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
      <ActionSheet
        ref={imageActionSheetRef}
        options={imageActionSheetItemList}
        cancelButtonIndex={0}
        onPress={(index: any) => onPressImageActionSheet(index)}
      />
    </ContainerView>
  );
};

export default EditProfileScreen;
