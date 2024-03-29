import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AboveKeyboard from 'react-native-above-keyboard';
//import DeviceInfo from 'react-native-device-info';
import {hasNotch} from '~/method/deviceInfo'
import {useDispatch, useSelector} from 'react-redux';
import allActions from '~/actions';

// Local Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

// Async Storage
import {storeUserInfo} from '~/storage/currentUser';

// Route
import POSTRegister from '~/Routes/Auth/POSTRegister';
import POSTSocialRegister from '~/Routes/Auth/POSTSocialRegister';
import { storeOpenModalInfo } from '~/storage/openModalInfo';

const Container = Styled.View`
flex: 1;
background-color: #FFFFFF;
`;

const TitleText = Styled.Text`
font-weight: 400;
font-size: 24px;
line-height: 24px;
color: #131F3C;
`;

const DescripText = Styled.Text`
margin-top: 11px;
font-weight: 400;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
`;

const BodyContainer = Styled.View`
background-color: #FFFFFF;
padding-top: ${hasNotch() ? 32 : 10}px;
padding-bottom: 32px;
padding-left: 23px;
padding-right: 23px;
`;

const AllAgreeItemContainer = Styled.View`
padding: 16px 9px 16px 9px;
flex-direction: row;
margin-top: 32px;
background-color: #F5F7F9;
border-radius: 8px;
`;

const TermsItemContainer = Styled.View`
padding: 16px 9px 16px 0px;
flex-direction: row;
`;

const TermsItemAgreeContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const CheckIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const LabelText = Styled.Text`
margin-left: 10px;
font-weight: 400;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
`;

const RightArrowContainer = Styled.View`
position: absolute;
right: 0px;
padding: 19px 20px 19px 20px;
align-items: center;
justify-content: center;
`;

const RightArrowIcon = Styled.Image`
width: ${wp('2.4%')}px;
height: ${wp('4.8%')}px;
`;

const FinishButtonContainer = Styled.View`
width: ${wp('100%')}px;
position:absolute;
bottom: 0px;
background-color : #707070;
`;

const LoginButtonContainer = Styled.View`
`;

const DisabledLoginButton = Styled.View`
width: ${wp('100%')}px;
height: ${hasNotch() ? hp('7.5%') : hp('8.3%')}px;
background-color: #E2E6ED;
justify-content: center;
align-items: center;
`;

const DisabledLoginText = Styled.Text`
font-weight: bold;
font-size: 19px;
color: #ffffff;
`;

const AbledLoginButton = Styled.View`
width: ${wp('100%')}px;
height: ${hasNotch() ? hp('7.5%') : hp('8.3%')}px;
background-color: #00D1FF;
justify-content: center;
align-items: center;
`;

const AbledLoginText = Styled.Text`
font-weight: bold;
font-size: 19px;
color: #FFFFFF;
`;

const IndicatorContainer = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
background-color: #00000040;
align-items: center;
justify-content: center;
z-index: 10;
`;


interface Props {
    navigation: any;
    route: any;
}

const TermsAgreeScreen = ({navigation, route}: Props) => {
    const [isAgreedAll, setIsAgreedAll] = useState<boolean>(false);
    const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
    const dispatch = useDispatch();

    const goBack = () => {
        navigation.goBack();
    }

    const clickAgreeAll = () => {
       setIsAgreedAll(!isAgreedAll);
    }

    const clickSignUp = () => {
        if(route.params?.provider === 'local') {
            localSignUp()
        } else {
            socialSignUp()
        }
    }

    const moveToTermsOfService = () => {
      navigation.navigate("TermsOfServiceScreen")
    }

    const moveToLocationInfoTermsOfUse = () => {
      navigation.navigate("LocationInfoTermsOfUseScreen");
    }

    const moveToPrivacyPolicy = () => {
      navigation.navigate("PrivacyPolicyScreen");
    }

    const localSignUp = () => {
        setLoadingSignUp(true);
    
        const certifiedPhoneNumber = route.params?.certifiedPhoneNumber;
        const provider = route.params?.provider;
        const fcmToken = route.params?.fcmToken;
        const phoneNumber = route.params?.phoneNumber;
        const nickname = route.params?.nickname;
        const cityId = route.params?.cityId;

        POSTRegister({
        certifiedPhoneNumber,
        provider,
        fcmToken,
        phoneNumber,
        nickname,
        cityId,
        })
        .then((response: any) => {
            setLoadingSignUp(false);
           
            const profile = {
            id: response.user.userId,
            nickname: response.user.userNickname,
            profileImg: response.user.userProfileImg,
            img_thumbNail: response.user?.img_thumbNail,
            phoneNumber,
            birthdate: response.user.userBirthdate,
            gender: response.user.userGender,
            provider,
            Residences: response.user.userResidences,
            };

            const userInfo = {
            jwtToken: response.token,
            profile,
            };

            const openModalInfo = {
              isOpenSpecialistDescripModal: true,
              isOpenNightCareDescripModal: true,
              isOpenGoodDentalDescripModal: true,
            }

            storeUserInfo(response.token);
            storeOpenModalInfo(openModalInfo);

            dispatch(allActions.userActions.setUser(userInfo));
            dispatch(allActions.userActions.setHometown(response.user.userResidences));
            
        })
        .catch((error) => {
            setLoadingSignUp(false);
            console.log('POSTRegister error', error);
        });
    }

    const socialSignUp = () => {
        setLoadingSignUp(true)

    const certifiedPhoneNumber = route.params.certifiedPhoneNumber;
    const birthdate = route.params.birthdate;
    const profileImg = route.params.profileImg;
    const nickname = route.params.nickname;
    const phoneNumber = route.params.phoneNumber;
    const fcmToken = route.params.fcmToken;
    const email = route.params.email;
    const provider = route.params.provider;
    const socialId = route.params.socialId;
    const cityId = route.params?.cityId;

    POSTSocialRegister({
      certifiedPhoneNumber,
      birthdate,
      profileImg,
      nickname,
      phoneNumber,
      fcmToken,
      email,
      provider,
      socialId,
      cityId,
    })
      .then((response: any) => {
        setLoadingSignUp(false);
        console.log('POSTSocialRegister response', response);
        console.log("POSTSocialRegister response.")

        const profile = {
          id: response.user.userId,
          nickname: response.user.userNickname,
          profileImg: response.user.userProfileImg,
          img_thumbNail: response.user?.img_thumbNail,
          phoneNumber,
          birthdate,
          gender: '',
          provider,
          Residences: response.user.userResidences,
        };

        const userInfo = {
          jwtToken: response.token,
          profile,
        };

        const openModalInfo = {
          isOpenSpecialistDescripModal: true,
          isOpenNightCareDescripModal: true,
          isOpenGoodDentalDescripModal: true,
        }

        storeUserInfo(response.token);
        storeOpenModalInfo(openModalInfo);

        dispatch(allActions.userActions.setUser(userInfo));
        dispatch(allActions.userActions.setHometown(response.user.userResidences));
        
      })
      .catch((error: any) => {
        setLoadingSignUp(false);
        console.log('POSTSocialRegister error', error);
      });

    }

    return (
        <Container>
           <NavigationHeader
           headerLeftProps={{type: 'arrow', onPress: goBack}}
           headerTitle={" "}
           borderDisable={true}/>
          <BodyContainer>
                <TitleText>{"이용약관"}</TitleText>
                <TouchableWithoutFeedback onPress={() => clickAgreeAll()}>
                <AllAgreeItemContainer>
                    <TermsItemAgreeContainer>
                    <CheckIcon
                    source={
                        isAgreedAll
                        ? require('~/Assets/Images/Terms/ic_check_selected.png')
                        : require('~/Assets/Images/Terms/ic_check_unselected.png')}/>
                    <LabelText>{"전체 동의"}</LabelText>
                    </TermsItemAgreeContainer>
                </AllAgreeItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => moveToTermsOfService()}>
                <TermsItemContainer
                style={{marginTop: 16}}>
                    <TermsItemAgreeContainer>
                    <LabelText>{"(필수) 서비스 이용약관"}</LabelText>
                    </TermsItemAgreeContainer>
                    <RightArrowContainer>
                        <RightArrowIcon
                        source={require('~/Assets/Images/Terms/ic_rightArrow.png')}/>
                    </RightArrowContainer>
                </TermsItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => moveToPrivacyPolicy()}>
                <TermsItemContainer
                style={{marginTop: 1}}>
                    <TermsItemAgreeContainer>
                    <LabelText>{"(필수) 개인정보 처리방침"}</LabelText>
                    </TermsItemAgreeContainer>
                    <RightArrowContainer>
                        <RightArrowIcon
                        source={require('~/Assets/Images/Terms/ic_rightArrow.png')}/>
                    </RightArrowContainer>
                </TermsItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => moveToLocationInfoTermsOfUse()}>
                <TermsItemContainer
                style={{marginTop: 1}}>
                    <TermsItemAgreeContainer>
                    <LabelText>{"(필수) 위치정보 이용약관"}</LabelText>
                    </TermsItemAgreeContainer>
                    <RightArrowContainer>
                        <RightArrowIcon
                        source={require('~/Assets/Images/Terms/ic_rightArrow.png')}/>
                    </RightArrowContainer>
                </TermsItemContainer>
                </TouchableWithoutFeedback>
            </BodyContainer>

        <FinishButtonContainer>
            <LoginButtonContainer>
              {isAgreedAll && (
                  <TouchableWithoutFeedback onPress={() => clickSignUp()}>
                    <AbledLoginButton>
                      <AbledLoginText>{"동의하고 시작하기"}</AbledLoginText>
                    </AbledLoginButton>
                  </TouchableWithoutFeedback>
                )}
              {!isAgreedAll && (
                <DisabledLoginButton>
                  <DisabledLoginText>{"동의하고 시작하기"}</DisabledLoginText>
                </DisabledLoginButton>
              )}
            </LoginButtonContainer>
        </FinishButtonContainer>
        {(loadingSignUp) && (
        <IndicatorContainer>
          <ActivityIndicator color={'#ffffff'} />
        </IndicatorContainer>
      )}
        </Container>
    )
}

export default TermsAgreeScreen;

