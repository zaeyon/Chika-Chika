import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {Alert} from 'react-native';
import {launchCamera, ImagePickerResponse} from 'react-native-image-picker';
//Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import EditProfileScreen from '~/Components/Presentational/MyProfileScreen/EditProfileScreen';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
import ToastMessage from '~/Components/Presentational/ToastMessage';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
// Method
import {uploadImageToS3} from '~/method/uploadImageToS3';
// Routes
import PUTEditProfile from '~/Routes/User/PUTEditProfile';
import GETUserInfo from '~/Routes/Auth/GETUserInfo';

const ContainerView = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const EditProfileTabScreen = ({navigation, route}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const hometown = useSelector((state: any) => state.currentUser).hometown;
  const profile = useSelector((state: any) => state.currentUser.profile);
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?.selectedImage) {
      changeProfileImage(route.params.selectedImage);
    }
  }, [route]);

  const showToastMessage = useCallback((message: string) => {
    ToastMessage.show(message);
  }, []);

  const updateUserProfile = useCallback(
    (
      form: any,
      message: string,
      callback: any = () => console.log('change profile...'),
    ) => {
      PUTEditProfile(jwtToken, form)
        .then((response: any) => {
          console.log('프로필 변경 성공', response.body.message);
          GETUserInfo(jwtToken)
            .then((response: any) => {
              console.log('get user info res', response);
              dispatch(
                allActions.userActions.setUser({
                  profile: response,
                }),
              );
              showToastMessage(message);
              setIsLoading(false);
            })
            .catch((e) => {
              console.log('get user info error', e);
            });
          callback();
        })
        .catch((e) => {
          console.log('프로필 변경 실패', e);
        });
    },
    [jwtToken],
  );

  const changeProfileImage = useCallback((selectedImage: any) => {
    setIsLoading(true);
    console.log('before S3', selectedImage);
    uploadImageToS3(selectedImage, 'userProfileImgs').then((res: any) => {
      const form = {
        userProfileImgKeyValue: res.response.key,
        profileImg: res.response.location,
      };
      updateUserProfile(form, '프로필 사진이 변경되었습니다.', () => {
        navigation.setParams({
          selectedImage: null,
        });
      });
    });
  }, []);

  const deleteProfileImage = useCallback(() => {
    setIsLoading(true);
    const form = {
      userProfileImgKeyValue: '',
      profileImg: '',
    };

    updateUserProfile(form, '프로필 사진이 삭제되었습니다.');
  }, [updateUserProfile]);

  const changeProfileBirthdate = useCallback(
    (birthdate: string) => {
      console.log(birthdate)
      setIsLoading(true);
      const form = {
        birthdate,
      };
      updateUserProfile(form, '생일이 변경되었습니다.');
    },
    [updateUserProfile],
  );

  const changeProfileGender = useCallback(
    (gender: string) => {
      setIsLoading(true);
      const form = {
        gender,
      };
      updateUserProfile(form, '성별이 변경되었습니다.');
    },
    [updateUserProfile],
  );

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
      requestScreen: 'EditProfileTabScreen',
    });
  }, []);

  const moveToHometownSearch = useCallback(() => {
    console.log("moveToHometownSearch hometown", hometown);
    if(hometown[0]) {
      navigation.navigate('HometownSearchScreen', {
        profile: profile,
        requestType: "revise",
        preCityId: hometown[0].id,
      });
    } else {
      navigation.navigate("HometownSearchScreen", {
        profile: profile,
        requestType: "add"
      })
    }
  }, []);

  return (
    <ContainerView>
      <NavigationHeader
        headerLeftProps={{
          onPress: headerLeftAction,
          type: 'arrow',
        }}
        headerTitle="내 정보 수정"
      />
      <EditProfileScreen
        capturePhoto={capturePhoto}
        moveToEditNickname={moveToEditNickname}
        moveToGallery={moveToGallery}
        moveToHomeTownSearch={moveToHometownSearch}
        moveToPhoneVerify={moveToPhoneVerify}
        profile={profile}
        hometown={hometown}
        changeProfileGender={changeProfileGender}
        changeProfileBirthdate={changeProfileBirthdate}
        deleteProfileImage={deleteProfileImage}
      />
      <TouchBlockIndicatorCover loading={isLoading} />
    </ContainerView>
  );
};

export default EditProfileTabScreen;
