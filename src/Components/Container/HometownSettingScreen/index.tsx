import React, {useState, useCallback} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useSelector, useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import allActions from '~/actions';

// local component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import AnimatedModal from '~/Components/Presentational/AnimatedModal';

// route
import DELETEUserHometown from '~/Routes/User/DELETEUserHometown';
import PUTUserHometown from '~/Routes/User/PUTUserHometown';
import POSTMainHometownChange from '~/Routes/User/POSTMainHometownChange';

const Container = Styled.View`
flex: 1;
padding-top: ${getStatusBarHeight()}px;
background-color: #ffffff;
`;

const BodyContainer = Styled.View`
background-color: #F5F7F9;
flex: 1;
`;

const MyHometownContainer = Styled.View`
background-color: #ffffff;
padding-top: 24px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 24px;

`;

const MyHometownListContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-top: 16px;
`;

const HometownSettingGuideContainer = Styled.View`
flex-direction: row;
align-items: center;
background-color: #F5F7F9;
border-radius: 4px;
padding-top: 15px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 15px;
`;

const GuideIcon = Styled.Image`
width: ${wp('3.73%')}px;
height: ${wp('3.73%')}px;
`;

const HometownSettingGuideText = Styled.Text`
margin-left: 5px;
font-weight: 700;
font-size: 13px;
color: #131F3C;
`;

const HometownItemContainer = Styled.View`
flex-direction: row;
align-items: center;
width: ${wp('44.26%')}px;
height: ${wp('14.5%')}px;
padding-left: 16px;
border-radius: 4px;
background-color: #ffffff;
justify-content: space-between;
border-width: 1px;
border-color: #E2E6ED;
`;

const HometownEmdNameText = Styled.Text`
line-height: 24px;
font-size: 16px;
font-weight: 800;
color: #131F3C;
`;

const DeleteIconContainer = Styled.View`
justify-content: center;
padding: 0px 16px 0px 20px;
height: ${wp('14.5%')}px;

`;

const DeleteIcon = Styled.Image`
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
tint-color: #9AA2A9;
`;

const AddHometownButton = Styled.View`
width: ${wp('44.26%')}px;
height: ${wp('14.5%')}px;
border-radius: 4px;
background-color: #ffffff;
align-items: center;
justify-content: center;
border-color: #E2E6ED;
border-style: dashed;
border-width: 1.5px;
`;

const AddHometownIcon = Styled.View`
background-color: #E2E6ED;
width: ${wp('7.46%')}px;
height: ${wp('7.46%')}px;
border-radius: 100px;
align-items: center;
justify-content: center;
`;

const PlusIconContainer = Styled.View`
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
`;

const PlusIconWidthContainer = Styled.View`
justify-content: center;
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
`;

const PlusIconHeightContainer = Styled.View`
position: absolute;
align-items: center;
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
`;

const PlusIconWidth = Styled.View`
width: ${wp('3.2%')}px;
height: 2px;
background-color: #ffffff;
`;

const PlusIconHeight = Styled.View`
height: ${wp('3.2%')}px;
width: 2px;
background-color: #ffffff;
`;

const ModalTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 20px;
color: #131F3C;
`;

const ModalDescriptionText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 24px;
color: #808080;
margin-top: 4px;
`;

interface HometownObj {
  emdName: string;
  id: number;
  sido: string;
  sigungu: string;
}

interface Props {
  navigation: any;
  route: any;
}

let selectedCityId = 0;
let selectedCityType = '';
let isSelectMainHometown = false;

const HometownSettingScreen = ({navigation, route}: Props) => {
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const hometownArray = useSelector((state: any) => state.currentUser.hometown);
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState<boolean>(
    false,
  );
  const [isVisibleChangeModal, setIsVisibleChangeModal] = useState<boolean>(
    false,
  );

  const dispatch = useDispatch();

  const goBack = () => {
    navigation.goBack();
  };

  const clickDeleteHometown = (cityId: number, isMainHometown: boolean) => {
    selectedCityId = cityId;
    isSelectMainHometown = isMainHometown;

    if (hometownArray.length === 1) {
      setIsVisibleChangeModal(true);
    } else if (hometownArray.length === 2) {
      setIsVisibleDeleteModal(true);
    }
  };

  const clickDeleteMainHometown = (cityId: number, type: string) => {
    //Alert.alert(`동네는 한곳이상 등록되어야합니다. ${'\n'}해당 동네를 변경하시겠어요?`)

    selectedCityId = cityId;
  };

  const cancelModal = () => {
    if (isVisibleDeleteModal) {
      setIsVisibleDeleteModal(false);
    } else if (isVisibleChangeModal) {
      setIsVisibleChangeModal(false);
    }
  };

  const deleteHometown = () => {
    setIsVisibleDeleteModal(false);
    const cityId = selectedCityId;
    dispatch(allActions.userActions.deleteHometown(cityId));

    DELETEUserHometown({jwtToken, cityId})
      .then((response) => {
        console.log('DELETEUserHometown response', response);
      })
      .catch((error) => {
        console.log('DELETEUserHometown error', error);
      });
  };

  const moveToHometownSearch = () => {
    navigation.navigate('HometownSearchScreen', {
      requestType: 'add',
    });
  };

  const changeMainHometown = () => {
    console.log('changeMainHometown selectedCityId', selectedCityId);
    setIsVisibleChangeModal(false);

    navigation.navigate('HometownSearchScreen', {
      requestType: 'revise',
      preCityId: selectedCityId,
    });
  };

  const clickHometownItem = (index: number) => {
    if (hometownArray[index].UsersCities?.now === true) {
      return;
    } else if (hometownArray[index].UsersCities?.now === false) {
      dispatch(allActions.userActions.changeMainHometown(index));
      const cityId = hometownArray[index].id;

      POSTMainHometownChange({jwtToken, cityId})
        .then((response) => {
          console.log('POSTMainHometownChange response', response);
        })
        .catch((error) => {
          console.log('POStMainHometownChange error', error);
        });
    }
  };

  return (
    <Container>
      <NavigationHeader
        headerLeftProps={{type: 'arrow', onPress: goBack}}
        headerTitle={'동네 설정'}
      />
      <BodyContainer>
        <MyHometownContainer>
          <HometownSettingGuideContainer>
            <GuideIcon
              source={require('~/Assets/Images/Hometown/ic_info.png')}
            />
            <HometownSettingGuideText>
              {'지역은 최대 두개까지 설정 가능합니다.'}
            </HometownSettingGuideText>
          </HometownSettingGuideContainer>
          <MyHometownListContainer>
            <TouchableWithoutFeedback onPress={() => clickHometownItem(0)}>
              <HometownItemContainer
                style={
                  hometownArray[0].UsersCities?.now && {
                    backgroundColor: '#00D1FF',
                    borderWidth: 0,
                  }
                }>
                <HometownEmdNameText
                  style={
                    hometownArray[0].UsersCities?.now && {color: '#ffffff'}
                  }>
                  {hometownArray[0].emdName}
                </HometownEmdNameText>
                <TouchableWithoutFeedback
                  onPress={() =>
                    clickDeleteHometown(
                      hometownArray[0].id,
                      hometownArray[0].UsersCities?.now,
                    )
                  }>
                  <DeleteIconContainer>
                    <DeleteIcon
                      style={
                        hometownArray[0].UsersCities?.now && {
                          tintColor: '#FFFFFF',
                        }
                      }
                      source={require('~/Assets/Images/Hometown/ic_delete.png')}
                    />
                  </DeleteIconContainer>
                </TouchableWithoutFeedback>
              </HometownItemContainer>
            </TouchableWithoutFeedback>
            {!hometownArray[1] && (
              <TouchableWithoutFeedback onPress={() => moveToHometownSearch()}>
                <AddHometownButton>
                  <AddHometownIcon>
                    <PlusIconContainer>
                      <PlusIconWidthContainer>
                        <PlusIconWidth />
                      </PlusIconWidthContainer>
                      <PlusIconHeightContainer>
                        <PlusIconHeight />
                      </PlusIconHeightContainer>
                    </PlusIconContainer>
                  </AddHometownIcon>
                </AddHometownButton>
              </TouchableWithoutFeedback>
            )}
            {hometownArray[1] && (
              <TouchableWithoutFeedback onPress={() => clickHometownItem(1)}>
                <HometownItemContainer
                  style={
                    hometownArray[1].UsersCities?.now && {
                      backgroundColor: '#00D1FF',
                      borderWidth: 0,
                    }
                  }>
                  <HometownEmdNameText
                    style={
                      hometownArray[1].UsersCities?.now && {color: '#ffffff'}
                    }>
                    {hometownArray[1].emdName}
                  </HometownEmdNameText>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      clickDeleteHometown(
                        hometownArray[1].id,
                        hometownArray[0].UsersCities?.now,
                      )
                    }>
                    <DeleteIconContainer>
                      <DeleteIcon
                        style={
                          hometownArray[1].UsersCities?.now && {
                            tintColor: '#FFFFFF',
                          }
                        }
                        source={require('~/Assets/Images/Hometown/ic_delete.png')}
                      />
                    </DeleteIconContainer>
                  </TouchableWithoutFeedback>
                </HometownItemContainer>
              </TouchableWithoutFeedback>
            )}
          </MyHometownListContainer>
        </MyHometownContainer>
      </BodyContainer>
      <AnimatedModal
        visible={isVisibleDeleteModal}
        buttons={[
          {
            title: '취소',
            style: {fontWeight: '400'},
            onPress: cancelModal,
          },
          {
            title: '확인',
            style: {fontWeight: '700'},
            onPress: deleteHometown,
          },
        ]}>
        <ModalTitleText>{'선택한 지역을 삭제하시겠습니까?'}</ModalTitleText>
      </AnimatedModal>
      <AnimatedModal
        visible={isVisibleChangeModal}
        buttons={[
          {
            title: '취소',
            style: {fontWeight: '400'},
            onPress: cancelModal,
          },
          {
            title: '변경',
            style: {fontWeight: '700'},
            onPress: changeMainHometown,
          },
        ]}>
        <ModalTitleText>{`동네는 한 곳 이상 등록되어야 합니다.${'\n'}해당 동네를 변경하시겠어요?`}</ModalTitleText>
      </AnimatedModal>
    </Container>
  );
};

export default HometownSettingScreen;
