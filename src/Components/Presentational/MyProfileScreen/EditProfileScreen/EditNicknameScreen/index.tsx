import React, {useEffect, useCallback, useState, useRef} from 'react';
import Styled from 'styled-components/native';
import {Alert} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {SharedElement} from 'react-navigation-shared-element';
// Local Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

// Routes
import PUTEditProfile from '~/Routes/User/PUTEditProfile';
import GETUserInfo from '~/Routes/Auth/GETUserInfo';

const ContainerView = Styled.View`
flex: 1;
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
color: #131F3C;
`;

const SectionContentTextInput = Styled.TextInput`
font-style: normal;
font-size: 16px;
font-weight: bold;
color: #9AA2A9;
flex: 1;
`;

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

interface Props {
  navigation: any;
  route: any;
}

const EditNicknameScreen = ({navigation, route}: Props) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [goBack, setGoBack] = useState(false);

  const textInputRef: any = useRef();

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (goBack) {
      navigation.goBack();
    }
  }, [goBack]);

  useEffect(() => {
    console.log(input);
  }, [input]);

  const updateUserNickname = useCallback(
    (nickname: string) => {
      setIsLoading(true);
      textInputRef.current.blur();
      PUTEditProfile(jwtToken, {nickname})
        .then((response: any) => {
          console.log('프로필 변경 성공', response.body.message);
          GETUserInfo(jwtToken).then((response: any) => {
            dispatch(
              allActions.userActions.setUser({
                profile: response,
              }),
            );
            setIsLoading(false);

            navigation.goBack();
          });
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
    [jwtToken],
  );

  return (
    <ContainerView as={SafeAreaView}>
      <NavigationHeader
        headerLeftProps={{
          type: 'arrow',
          onPress: () => {
            setGoBack((prev) => {
              setInput('');
              textInputRef.current.blur();
              return !prev;
            });
          },
        }}
        headerTitle="이름"
        headerRightProps={{
          type: 'text',
          text: '완료',
          onPress: () => updateUserNickname(input),
        }}
        headerRightDisabled={input === ''}
        headerRightActiveColor="#00D1FF"
      />
      <SharedElement id="nicknameInput">
        <SectionContentView>
          <SectionContentTitleText>{'닉네임'}</SectionContentTitleText>
          <SectionContentTextInput
            ref={textInputRef}
            value={input}
            onChangeText={(text) => setInput(text)}
            autoFocus={true}
            autoCorrect={false}
            placeholder={route.params.nickname}
            placeholderTextColor="#E2E6ED"
          />
          <SectionImage
            source={require('~/Assets/Images/MyPage/EditProfile/Section/profile_edit_section_arrow.png')}
          />
        </SectionContentView>
      </SharedElement>
      <TouchBlockIndicatorCover loading={isLoading} />
    </ContainerView>
  );
};

export default EditNicknameScreen;
