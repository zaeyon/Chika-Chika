import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {Alert} from 'react-native';
import {launchCamera, ImagePickerResponse} from 'react-native-image-picker';
//Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import EditProfileScreen from '~/Components/Presentational/MyProfileScreen/EditProfileScreen';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
// Method
import {uploadImageToS3} from '~/method/uploadImageToS3';
// Routes
import PUTEditProfile from '~/Routes/User/PUTEditProfile';
import GETUserInfo from '~/Routes/Auth/GETUserInfo';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const EditProfileTabScreen = ({navigation, route}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;
  const profile = currentUser.profile;
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?.selectedImage) {
      changeProfileImage(route.params.selectedImage);
    }
  }, [route]);

  const updateUserProfile = useCallback(
    (form: any, callback: any = () => console.log('change profile...')) => {
      PUTEditProfile(jwtToken, form)
        .then((response: any) => {
          console.log('프로필 변경 성공', response.body.message);
          GETUserInfo(jwtToken).then((response: any) => {
            dispatch(
              allActions.userActions.setUser({
                //depart
                profile: response,
              }),
            );
            setIsLoading(false);
          });
          callback();
        })
        .catch((e) => {
          console.log(e);
          // if (e.data.statusCode === 403) {
          //   Alert.alert('변경 실패', '이미 있는 닉네임입니다.', [
          //     {
          //       text: '확인',
          //       onPress: () => setIsLoading(false),
          //     },
          //   ]);
          // } else if (e.data.statusCode === 500) {
          //   Alert.alert(
          //     '서버 오류',
          //     '닉네임 변경에 실패하였습니다. 다시 한 번 시도해주세요.',
          //     [
          //       {
          //         text: '확인',
          //         onPress: () => setIsLoading(false),
          //       },
          //     ],
          //   );
          // }
        });
    },
    [],
  );

  const changeProfileImage = useCallback((selectedImage: any) => {
    setIsLoading(true);
    uploadImageToS3(selectedImage).then((res: any) => {
      console.log('change profile img', res);
      const form = {
        profileImg: res.response.location,
      };
      updateUserProfile(form, () => {
        navigation.setParams({
          selectedImage: null,
        });
      });
    });
  }, []);

  const changeProfileNickname = useCallback((nickname: string) => {
    setIsLoading(true);
    const form = {
      nickname,
    };
    updateUserProfile(form);
  }, []);

  const changeProfileBirthdate = useCallback((birthdate: string) => {
    setIsLoading(true);
    const form = {
      birthdate,
    };
    updateUserProfile(form);
  }, []);

  const changeProfileGender = useCallback((gender: string) => {
    setIsLoading(true);
    const form = {
      gender,
    };
    updateUserProfile(form);
  }, []);

  const headerLeftAction = useCallback(() => {
    navigation.goBack();
  }, []);

  const moveToPhoneVerify = useCallback(() => {
    navigation.navigate('PhoneVerifyScreen');
  }, []);

  const moveToEditNickname = useCallback((nickname: string) => {
    navigation.navigate('EditNicknameScreen', {
      nickname,
    });
  }, []);

  const capturePhoto = useCallback(() => {
    launchCamera(
      {mediaType: 'photo', includeBase64: true},
      (response: ImagePickerResponse) => {
        if (!response.didCancel) {
          const capturedImage = {
            filename: response.fileName,
            fileSize: response.fileSize,
            width: response.width,
            height: response.height,
            uri: response.uri,
            base64: response.base64,
          };
          changeProfileImage(capturedImage);
        }
      },
    );
  }, []);

  const moveToGallery = useCallback(() => {
    navigation.navigate('ImageSelectOneStackScreen', {
      screen: 'ImageSelectOneScreen',
      requestType: 'EditProfileTabScreen',
    });
  }, []);

  const moveToHomeTownSetting = useCallback(() => {
    navigation.navigate('HometownSettingScreen', {
      profile: profile,
    });
  }, []);

  return (
    <ContainerView>
      <NavigationHeader
        headerLeftProps={{
          onPress: headerLeftAction,
          type: 'arrow',
        }}
        headerTitle="프로필 편집"
      />
      <EditProfileScreen
        capturePhoto={capturePhoto}
        moveToEditNickname={moveToEditNickname}
        moveToGallery={moveToGallery}
        moveToHomeTownSetting={moveToHomeTownSetting}
        moveToPhoneVerify={moveToPhoneVerify}
        currentUser={currentUser}
        changeProfileNickname={changeProfileNickname}
        changeProfileGender={changeProfileGender}
        changeProfileBirthdate={changeProfileBirthdate}
      />
      <TouchBlockIndicatorCover loading={isLoading} />
    </ContainerView>
  );
};

export default EditProfileTabScreen;
