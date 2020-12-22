import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
//Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import EditProfileScreen from '~/Components/Presentational/MyProfileScreen/EditProfileScreen';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const EditProfileTabScreen = ({navigation, route}: Props) => {
  const [userData, setUserData] = useState({
    nickname: '익명의 쿼카',
    gender: '미등록',
    birthday: '미등록',
  });
  const headerLeftAction = () => {
    navigation.goBack();
  };

  return (
    <ContainerView>
      <NavigationHeader
        headerLeftProps={{
          onPress: headerLeftAction,
          text: 'arrow',
        }}
        headerTitle="내 정보"
      />
      <EditProfileScreen
        navigation={navigation}
        route={route}
        userData={userData}
        setUserData={setUserData}
      />
    </ContainerView>
  );
};

export default EditProfileTabScreen;
