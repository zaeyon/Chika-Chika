import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ActionSheet from 'react-native-actionsheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import {SharedElement} from 'react-navigation-shared-element';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import SafeAreaView from 'react-native-safe-area-view';
// Local Component
import AnimatedModal from '~/Components/Presentational/AnimatedModal';

const ContainerView = Styled.View`
flex: 1;
background: #F5F7F9;
`;

const ProfileImageContainerView = Styled.View`
width: ${wp('100%')}px;
padding: 16px 0px;
align-items: center;
justify-content: center;
`;

const ProfileImage = Styled.Image`
width: 77px;
height: 77px;
border-width: 0.5px;
border-color: #A6A8AC;
box-shadow: 0px 0px 12px #D8DCDE;
border-radius: 100px;
`;

const ProfileImageMaskView = Styled.View`
position: absolute;
width: 77px;
height: 77px;
border-radius: 100px;
background: #00000040;
align-items: center;
justify-content: center;
z-index: 1;
`;

const ProfileImageMaskImage = Styled.Image``;

const ProfileImageContentView = Styled.View`
`;

const SectionContainerView = Styled.View`
background: #FFFFFF;
margin-bottom: 16px;
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
width: 94px;
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

const VerifiedBadgeView = Styled.View`
padding: 3px 8px;
background: #00D1FF;
border-radius: 4px;
margin-left: auto;
`;

const VerifiedBadgeText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 10px;
line-height: 16px;
color: #FFFFFF;
`;

const DetailFilterModalContainer = Styled.View`
width: ${wp('100%')}px;
background-color: #ffffff;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
position: absolute;
bottom: 0;
`;

const FilterDividingText = Styled.Text`
font-weight: normal;
font-size: 18px;
line-height: 24px;
color: #131F3C;
`;

const DetailFilterHeaderContainer = Styled.View`
flex-direction: row;
padding-top: 16px;
padding-bottom: 16px;
padding-left: 16px;
align-items: center;
border-bottom-width: 1px;
border-color: #F5F7F9;
`;

const DetailFilterTitleText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 19px;
color: #000000;
`;

const DetailFilterFooterContainer = Styled.View`
padding: 16px 16px ${isIphoneX() ? getBottomSpace() : 16}px 0px
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const TimeFilterModalContainer = Styled.View`
`;

const TimePickerContainer = Styled.View`
align-items: center;
padding: 0px 25px;
justify-content: space-between;
flex-direction: row;
border-bottom-width: 1px;
border-color: #F5F7F9;
`;

const TimePickerLabelText = Styled.Text`
font-size: 20px;
color: #000000;
`;

const InitializeFilterContainer = Styled.View`
flex-direction: row;
align-items: center;
padding-top: 8px;
padding-bottom: 8px;
padding-left: 16px;
padding-right: 16px;
`;

const InitializeFilterText = Styled.Text`
font-weight: normal;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
`;

const InitializeFilterIcon = Styled.Image`
margin-left: 4px;
width: ${wp('2.66%')}px;
height: ${wp('2.66%')}px;
`;

const RegisterFilterButton = Styled.View`
width: ${wp('55.46%')}px;
align-items: center;
border-radius: 4px;
background-color: #131F3C;
padding-top: 12px;
padding-bottom: 12px;
`;

const RegisterFilterText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 24px;
color: #ffffff;
`;

const BitrhdateModal = Styled.Modal`
`;

const BirthdateModalContinerView = Styled.View`
background: #000000;
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
`;

interface Props {
  capturePhoto: any;
  moveToEditNickname: any;
  moveToGallery: any;
  moveToHomeTownSetting: any;
  moveToHomeTownSearch: any;
  moveToPhoneVerify: any;
  profile: any;
  hometown: any;
  changeProfileGender: (gender: string) => void;
  changeProfileBirthdate: (birthdate: string) => void;
  deleteProfileImage: () => void;
}

const EditProfileScreen = ({
  capturePhoto,
  moveToEditNickname,
  moveToGallery,
  moveToHomeTownSetting,
  moveToHomeTownSearch,
  moveToPhoneVerify,
  hometown,
  profile,
  changeProfileGender,
  changeProfileBirthdate,
  deleteProfileImage,
}: Props) => {
  const [textInput, setTextInput] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sectionArrow, setSectionArrow] = useState(
    require('~/Assets/Images/MyPage/EditProfile/Section/profile_edit_section_arrow.png'),
  );
  console.log(profile);
  const [selectedBirthYear, setSelectedBirthYear] = useState(
    profile.birthdate ? profile.birthdate.split('-')[0] : 1900,
  );
  const [selectedBirthMonth, setSelectedBirthMonth] = useState(
    profile.birthdate ? String(parseInt(profile.birthdate.split('-')[1])) : 1,
  );
  const [selectedBirthDay, setSelectedBirthDay] = useState(
    profile.birthdate ? String(parseInt(profile.birthdate.split('-')[2])) : 1,
  );

  const genderActionSheetRef: any = useRef();
  const imageActionSheetRef: any = useRef();

  const genderActionSheetItemList = ['취소', '여성', '남성', '선택안함'];
  const imageActionSheetItemList = [
    '취소',
    '카메라',
    '앨범에서 선택',
    '현재 사진 삭제',
  ];

  const modalContentY = useRef(new Animated.Value(hp('50%'))).current;
  const [date, setDate] = useState<Date>(
    new Date(profile.birthdate || Date.now()),
  );

  useEffect(() => {
    initializeBirthDate()
  }, [])
  const onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onPressGenderActionSheet = useCallback((index: number) => {
    switch (genderActionSheetItemList[index]) {
      case '남성':
        changeProfileGender('남성');
        break;
      case '여성':
        changeProfileGender('여성');
        break;
      case '선택안함':
        changeProfileGender('선택안함');
        break;
    }
  }, []);

  const onPressImageActionSheet = useCallback((index: number) => {
    switch (imageActionSheetItemList[index]) {
      case '카메라':
        console.log('open camera');
        capturePhoto();
        break;
      case '앨범에서 선택':
        console.log('open gallery');
        moveToGallery();
        break;
      case '현재 사진 삭제':
        console.log('delete profileImg');
        deleteProfileImage();
    }
  }, []);

  const openModal = useCallback(() => {
    setIsModalVisible(true);
    Animated.spring(modalContentY, {
      toValue: 0,
      friction: 17,
      tension: 68,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeModal = useCallback(() => {
    Animated.timing(modalContentY, {
      toValue: hp('50%'),
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsModalVisible(false));
  }, []);

  const setUserBirthdate = useCallback(() => {
    Animated.timing(modalContentY, {
      toValue: hp('50%'),
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsModalVisible(false));
    console.log("selectedBirthYear selectedBirthMonth, selectedBirthDay", selectedBirthYear, selectedBirthMonth, selectedBirthDay)
    const formattedDate = `${selectedBirthYear}-${selectedBirthMonth}-${selectedBirthDay}`;
    console.log(formattedDate);
    changeProfileBirthdate(formattedDate);
  }, [selectedBirthYear, selectedBirthMonth, selectedBirthDay]);

  const renderResidences = useCallback(() => {
    const placeHolder = '동네를 설정해주세요.'
    let result = '';
    hometown.map((item: any, index: number) => {
      if (index === 0) {
        result += item.emdName;
      } else {
        result += `, ${item.emdName}`;
      }
    });
    return result === '' ? placeHolder : result;
  }, [hometown]);

  const formatProvider = useCallback((provider: string) => {
    switch (provider) {
      case 'google':
        return '구글';
      case 'kakao':
        return '카카오';
      case 'apple':
        return '애플';
      case 'local':
        return '없음';
    }
  }, []);

  const renderYearPickerItem = useCallback(() => {
    const startYear = 1900;
    const currentYear = new Date(Date.now()).getFullYear();
    const result = [];
    for (let i = 0; i <= currentYear - startYear; i++) {
      result.push(
        <Picker.Item
          key={String(startYear + i)}
          label={String(startYear + i)}
          value={String(startYear + i)}
        />,
      );
    }
    return result;
  }, []);

  const renderMonthPickerItem = useCallback(() => {
    const currentDate = new Date(Date.now());
    const result = [];
    if (parseInt(selectedBirthYear) === currentDate.getFullYear()) {
      for (let i = 1; i <= currentDate.getMonth() + 1; i++) {
        result.push(<Picker.Item label={String(i)} value={String(i)} />);
      }
    } else {
      for (let i = 1; i <= 12; i++) {
        result.push(<Picker.Item label={String(i)} value={String(i)} />);
      }
    }
    return result;
  }, [selectedBirthYear]);

  const renderDayPickerItem = useCallback(() => {
    const currentDate = new Date(Date.now());
    const result = [];
    if (
      parseInt(selectedBirthYear) === currentDate.getFullYear() &&
      parseInt(selectedBirthMonth) === currentDate.getMonth() + 1
    ) {
      for (let i = 1; i <= currentDate.getDate(); i++) {
        result.push(<Picker.Item label={String(i)} value={String(i)} />);
      }
    } else {
      if (selectedBirthMonth === '2') {
        if (
          (parseInt(selectedBirthYear) % 4) +
            (parseInt(selectedBirthYear) % 100) +
            (parseInt(selectedBirthYear) % 400) ===
          0
        ) {
          for (let i = 1; i <= 29; i++) {
            result.push(<Picker.Item label={String(i)} value={String(i)} />);
          }
        } else {
          for (let i = 1; i <= 28; i++) {
            result.push(<Picker.Item label={String(i)} value={String(i)} />);
          }
        }
      } else if (
        [1, 3, 5, 7, 8, 10, 12].includes(parseInt(selectedBirthMonth))
      ) {
        for (let i = 1; i <= 31; i++) {
          result.push(<Picker.Item label={String(i)} value={String(i)} />);
        }
      } else {
        for (let i = 1; i <= 30; i++) {
          result.push(<Picker.Item label={String(i)} value={String(i)} />);
        }
      }
    }
    return result;
  }, [selectedBirthMonth, selectedBirthYear]);

  const initializeBirthDate = useCallback(() => {
    if (profile.birthdate) {
      setSelectedBirthYear(String(parseInt(profile.birthdate.split('-')[0])));
      setSelectedBirthMonth(String(parseInt(profile.birthdate.split('-')[1])));
      setSelectedBirthDay(String(parseInt(profile.birthdate.split('-')[2])));
    } else {
      const currentDate = new Date(Date.now());
      setSelectedBirthYear(String(currentDate.getFullYear()));
      setSelectedBirthMonth(String(currentDate.getMonth() + 1));
      setSelectedBirthDay(String(currentDate.getDate()));
    }
  }, [profile]);

  const registerTimeFilter = useCallback(() => {}, []);

  return (
    <ContainerView>
      <ProfileImageContainerView>
        <TouchableWithoutFeedback
          onPress={() => imageActionSheetRef.current.show()}>
          <ProfileImageContentView>
            <ProfileImageMaskView>
              <ProfileImageMaskImage
                source={require('~/Assets/Images/MyPage/EditProfile/ProfileImg/ic_edit_profileImg.png')}
              />
            </ProfileImageMaskView>
            <ProfileImage source={
              profile.img_thumbNail
              ? {uri: profile.img_thumbNail}
              : require('~/Assets/Images/MyPage/default_profileImg.png')
              } />
          </ProfileImageContentView>
        </TouchableWithoutFeedback>
      </ProfileImageContainerView>
      <SectionContainerView>
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() => moveToEditNickname(profile.nickname)}>
          <SharedElement id="nicknameInput">
            <SectionContentView>
              <SectionContentTitleText>{'닉네임'}</SectionContentTitleText>
              <SectionContentText>{profile.nickname}</SectionContentText>
              <SectionImage source={sectionArrow} />
            </SectionContentView>
          </SharedElement>
        </TouchableHighlight>
        <SectionVerticalDivider />
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() => moveToHomeTownSearch()}>
          <SectionContentView>
            <SectionContentTitleText>{'우리동네'}</SectionContentTitleText>
            <SectionContentText>{renderResidences()}</SectionContentText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
      </SectionContainerView>

      <SectionContainerView>
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() => genderActionSheetRef.current.show()}>
          <SectionContentView>
            <SectionContentTitleText>{'성별'}</SectionContentTitleText>
            <SectionContentText>
              {profile.gender || '미등록'}
            </SectionContentText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
        <SectionVerticalDivider />
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() => openModal()}>
          <SectionContentView>
            <SectionContentTitleText>{'생일'}</SectionContentTitleText>
            <SectionContentText>
              {profile.birthdate || '미등록'}
            </SectionContentText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
        <SectionVerticalDivider />
        <SectionContentView>
          <SectionContentTitleText>{'전화번호'}</SectionContentTitleText>
          <SectionContentText>
              {`${profile.phoneNumber.slice(0, 3)}-${profile.phoneNumber.slice(3, 7)}-${profile.phoneNumber.slice(7)}`|| '미등록'}
          </SectionContentText>
        </SectionContentView>
      </SectionContainerView>

      <BitrhdateModal
        visible={isModalVisible}
        transparent={true}
        animationType="none">
        <TouchableWithoutFeedback onPress={() => closeModal()}>
          <BirthdateModalContinerView
            as={Animated.View}
            style={{
              opacity: modalContentY.interpolate({
                inputRange: [0, hp('50%')],
                outputRange: [0.3, 0],
                extrapolate: 'clamp',
              }),
            }}></BirthdateModalContinerView>
        </TouchableWithoutFeedback>
        <DetailFilterModalContainer
          as={Animated.View}
          style={{
            opacity: modalContentY.interpolate({
              inputRange: [0, hp('40%')],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
            transform: [{translateY: modalContentY}],
          }}>
          <DetailFilterHeaderContainer>
            <DetailFilterTitleText>{'생일 설정'}</DetailFilterTitleText>
          </DetailFilterHeaderContainer>
          <TimeFilterModalContainer>
            <TimePickerContainer>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                style={{width: wp('20%'), height: '100%'}}
                onValueChange={(itemValue) => setSelectedBirthYear(itemValue)}
                selectedValue={selectedBirthYear}>
                {renderYearPickerItem()}
              </Picker>
              <FilterDividingText>{'년'}</FilterDividingText>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                selectedValue={selectedBirthMonth}
                onValueChange={(itemValue) => setSelectedBirthMonth(itemValue)}
                style={{width: wp('20%'), height: '100%'}}>
                {renderMonthPickerItem()}
              </Picker>
              <FilterDividingText>{'월'}</FilterDividingText>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                style={{width: wp('20%'), height: '100%'}}
                onValueChange={(itemValue) => setSelectedBirthDay(itemValue)}
                selectedValue={selectedBirthDay}>
                {renderDayPickerItem()}
              </Picker>
              <FilterDividingText>{'일'}</FilterDividingText>
            </TimePickerContainer>
            <DetailFilterFooterContainer>
              <TouchableWithoutFeedback onPress={() => initializeBirthDate()}>
                <InitializeFilterContainer>
                  <InitializeFilterText>{'생일 초기화'}</InitializeFilterText>
                  <InitializeFilterIcon
                    source={require('~/Assets/Images/Map/ic_initialize.png')}
                  />
                </InitializeFilterContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setUserBirthdate()}>
                <RegisterFilterButton>
                  <RegisterFilterText>{'적용하기'}</RegisterFilterText>
                </RegisterFilterButton>
              </TouchableWithoutFeedback>
            </DetailFilterFooterContainer>
          </TimeFilterModalContainer>
        </DetailFilterModalContainer>
      </BitrhdateModal>
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
