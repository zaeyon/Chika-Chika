import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {Alert} from 'react-native';
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

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

interface Form {
  profileImg?: string;
  birthdate?: string;
  gender?: string;
  nickname?: string;
}

const EditProfileTabScreen = ({navigation, route}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useSelector((state: any) => state.currentUser).user;
  const jwtToken = currentUser.jwtToken;
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?.changeExistingImage && route.params?.selectedImage) {
      changeProfileImage(route.params.selectedImage);
    }
  }, [route]);

  const updateUserProfile = useCallback((form: Form, callback: any) => {
    PUTEditProfile(jwtToken, form)
      .then((response: any) => {
        console.log(response.body.message);
        Alert.alert('변경 성공', '닉네임이 변경되었습니다.');
        callback();
      })
      .catch((e) => {
        if (e.data.statusCode === 403) {
          Alert.alert('변경 실패', '이미 있는 닉네임입니다.', [
            {
              text: '확인',
              onPress: () => setIsLoading(false),
            },
          ]);
        } else if (e.data.statusCode === 500) {
          Alert.alert(
            '서버 오류',
            '닉네임 변경에 실패하였습니다. 다시 한 번 시도해주세요.',
            [
              {
                text: '확인',
                onPress: () => setIsLoading(false),
              },
            ],
          );
        }
      });
  }, []);

  const changeProfileImage = useCallback((selectedImage: string) => {
    setIsLoading(true);
    uploadImageToS3(selectedImage).then((res: any) => {
      console.log('change profile img', res);
      const form = {
        profileImg: res.response.location,
      };
      updateUserProfile(form, () => {
        dispatch(allActions.userActions.putProfileImage(res.response.location));
        setIsLoading(false);
      });
      navigation.setParams({
        changeExistingImage: false,
        selectedImage: null,
      });
    });
  }, []);

  const changeProfileNickname = useCallback((nickname: string) => {
    setIsLoading(true);
    const form = {
      nickname,
    };
    updateUserProfile(form, () => {
      dispatch(allActions.userActions.putProfileNickname(nickname));
      setIsLoading(false);
    });
  }, []);

  const changeProfileBirthdate = useCallback((birthdate: string) => {
    setIsLoading(true);
    const form = {
      birthdate,
    };
    updateUserProfile(form, () => {
      dispatch(allActions.userActions.putProfileBirthdate(birthdate));
      setIsLoading(false);
    });
  }, []);

  const changeProfileGender = useCallback((gender: string) => {
    setIsLoading(true);
    const form = {
      gender,
    };
    updateUserProfile(form, () => {
      dispatch(allActions.userActions.putProfileGender(gender));
      setIsLoading(false);
    });
  }, []);

  const headerLeftAction = useCallback(() => {
    navigation.goBack();
  }, []);

  const headerRightAction = useCallback(() => {
    navigation.goBack();
  }, []);

  const moveToGallery = useCallback(() => {
    navigation.navigate('EditProfileGallery', {
      requestType: 'EditProfileTabScreen',
    });
  }, []);

  return (
    <ContainerView>
      <NavigationHeader
        headerLeftProps={{
          onPress: headerLeftAction,
          text: '취소',
        }}
        headerTitle="내 정보 수정"
      />
      <EditProfileScreen
        moveToGallery={moveToGallery}
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
