import React, {useEffect} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

import allActions from '~/actions';

// Routes
import GETUserInfo from '~/Routes/Auth/GETUserInfo';
// Async Storage
import {getUserInfo} from '~/storage/currentUser';

// ReUsable Components
import InstantCamera from './Components/Container/InstantCamera';

// Auth Stack Screen
import UnauthorizedScreen from '~/Components/Container/UnauthorizedScreen';
import LoginScreen from '~/Components/Container/LoginScreen';
import ProfileInputScreen from '~/Components/Container/SignUpScreen/ProfileInputScreen';
import BasicInputScreen from './Components/Container/SignUpScreen/BasicInputScreen';
import PhoneVerifyScreen from '~/Components/Container/PhoneVerifyScreen';

// Home Stack Screee
import HomeScreen from '~/Components/Container/HomeScreen';

// Review Stack Screen
import ReviewListScreen from '~/Components/Container/ReviewListScreen';
import ReviewDetailScreen from '~/Components/Container/ReviewDetailScreen';
import FullImagesScreen from '~/Components/Container/FullImagesScreen';

// Review Upload Stack Screen
import ReviewUploadScreen from '~/Components/Container/ReviewUploadScreen';
import ReviewMetaDataScreen from '~/Components/Container/ReviewUploadScreen/ReviewMetaDataScreen';
import ContentPostScreen from '~/Components/Container/ReviewUploadScreen/ContentPostScreen';
import TeethCamera from '~/Components/Container/TeethCamera';
import Gallery from '~/Components/Container/Gallery';
import GallerySelectOne from '~/Components/Container/GallerySelectOne';
import ReceiptRegisterScreen from '~/Components/Container/ReviewUploadScreen/ReceiptRegisterScreen';
import ReceiptCamera from '~/Components/Container/ReceiptCamera';
import TakenPictureScreen from '~/Components/Container/ReviewUploadScreen/TakenPictureScreen';
import DentalClinicSearchScreen from '~/Components/Container/ReviewUploadScreen/DentalClinicSearchScreen';
import TreatSearchScreen from '~/Components/Container/ReviewUploadScreen/TreatSearchScreen';
import DetailPriceScreen from '~/Components/Container/ReviewUploadScreen/DetailPriceScreen';
import RatingScreen from '~/Components/Container/ReviewUploadScreen/RatingScreen';

// My Profile Stack Screen
import MyProfileScreen from '~/Components/Container/MyProfileScreen';
import EditProfileTabScreen from '~/Components/Container/MyProfileScreen/EditProfileTabScreen';
import EmailConsultingTabScreen from '~/Components/Container/MyProfileScreen/EmailConsultingTabScreen';
import GeneralSettingTabScreen from '~/Components/Container/MyProfileScreen/GeneralSettingTabScreen';
import ReservationTabScreen from '~/Components/Container/MyProfileScreen/ReservationTabScreen';
import SavedHospitalTabScreen from '~/Components/Container/MyProfileScreen/SavedHospitalTabScreen';
import LikedPostsTabScreen from '~/Components/Container/MyProfileScreen/LikedPostsTabScreen';
import ScrapedPostsTabScreen from '~/Components/Container/MyProfileScreen/ScrapedPostsTabScreen';
import CommentedPostsTabScreen from '~/Components/Container/MyProfileScreen/CommentedPostsTabScreen';

// Another Profile Stack Screen
import AnotherProfileScreen from '~/Components/Container/AnotherProfileScreen';

// Setting Stack Screen
import SettingScreen from '~/Components/Container/SettingScreen';

// Community Stack Screen
import CommunityListScreen from '~/Components/Container/CommunityListScreen';
import CommunityDetailScreen from '~/Components/Container/CommunityDetailScreen';
import CommunityPostUploadScreen from '~/Components/Container/CommunityPostUploadScreen';
import CommunityTreatSearchScreen from '~/Components/Container/CommunityPostUploadScreen/TreatSearchScreen';
// Dental Clinic Stack Screen
import NearDentalMap from '~/Components/Container/NearDentalMap';
import DentalListScreen from '~/Components/Container/DentalListScreen';
import DentalDetailScreen from '~/Components/Container/DentalDetailScreen';
import DentalInfoEditRequestScreen from '~/Components/Container/DentalDetailScreen/DentalInfoEditRequestScreen';

// Teeth Care Stack Screen
import TeethCareScreen from '~/Components/Container/TeethCareScreen';
import TimerReportScreen from '~/Components/Container/TeethCareScreen/ReportTabScreen/TimerReportScreen';
import BrushDetritionReportScreen from '~/Components/Container/TeethCareScreen/ReportTabScreen/BrushDetritionReportScreen';
import SymptomReportScreen from '~/Components/Container/TeethCareScreen/ReportTabScreen/SymptomReportScreen';
import AIReportScreen from '~/Components/Container/TeethCareScreen/ReportTabScreen/AIReportScreen';
import RelatedDiseaseScreen from '~/Components/Container/TeethCareScreen/TimerTabScreen/RelatedDiseaseScreen';
import BrushDetritionCamera from '~/Components/Container/BrushDetritionCamera';
import MeasuredBrushPictureScreen from '~/Components/Container/BrushDetritionCamera/MeasuredBrushPictureScreen';

// Hometown Setting Screen
import HometownSettingScreen from '~/Components/Container/HometownSettingScreen';

// Keyword Search Screen
import KeywordSearchScreen from '~/Components/Container/KeywordSearchScreen';

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const NearDentalMapStack = createStackNavigator();
const ReviewUploadStack = createStackNavigator();
const MyProfileStack = createStackNavigator();
const ReviewStack = createStackNavigator();
const AnotherProfileStack = createStackNavigator();
const SettingStack = createStackNavigator();
const CommunityStack = createStackNavigator();
const CommunityPostUploadStack = createStackNavigator();
const DentalClinicStack = createStackNavigator();
const TeethCareStack = createStackNavigator();
const KeywordSearchStack = createStackNavigator();
const EditProfileStack = createStackNavigator();

const staticConfig = {
  animation: 'timing',
  config: {
    duration: 0,
  },
};

function AuthStackScreen() {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen
        name="UnauthorizedScreen"
        component={UnauthorizedScreen}
        options={{
          transitionSpec: {
            open: staticConfig,
            close: staticConfig,
          },
        }}
      />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="BasicInputScreen" component={BasicInputScreen} />
      <AuthStack.Screen
        name="ProfileInputScreen"
        component={ProfileInputScreen}
      />
      <AuthStack.Screen
        name="PhoneVerifyScreen"
        component={PhoneVerifyScreen}
      />
      <AuthStack.Screen
        name="HometownSettingScreen"
        component={HometownSettingScreen}
      />
    </AuthStack.Navigator>
  );
}

function ReviewStackScreen() {
  return (
    <ReviewStack.Navigator headerMode="none">
      <ReviewStack.Screen
        name="ReviewListScreen"
        component={ReviewListScreen}
      />
      <ReviewStack.Screen
        name="ReviewDetailScreen"
        component={ReviewDetailScreen}
      />
      <ReviewStack.Screen
        name="FullImagesScreen"
        component={FullImagesScreen}
      />
      <ReviewStack.Screen
        name="ReviewUploadStack"
        component={ReviewUploadStackScreen}
      />
      <ReviewStack.Screen
        name="DentalClinicStack"
        component={DentalClinicStackScreen}
      />
    </ReviewStack.Navigator>
  );
}

function AnotherProfileStackScreen() {
  return (
    <AnotherProfileStack.Navigator headerMode="none">
      <AnotherProfileStack.Screen
        name="AnotherProfileScreen"
        component={AnotherProfileScreen}
      />
    </AnotherProfileStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="ReviewStackScreen"
        component={ReviewStackScreen}
      />
      <HomeStack.Screen
        name="AnotherProfileStackScreen"
        component={AnotherProfileStackScreen}
      />
      <HomeStack.Screen
        name="ReviewUploadStackScreen"
        component={ReviewUploadStackScreen}
      />
    </HomeStack.Navigator>
  );
}

function NearDentalMapStackScreen() {
  return (
    <NearDentalMapStack.Navigator headerMode="none">
      <NearDentalMapStack.Screen
        name="NearDentalMap"
        component={NearDentalMap}
        initialParams={{
          isOpenDentalList: false,
        }}
      />
      <NearDentalMapStack.Screen
        name="DentalListScreen"
        component={DentalListScreen}
        options={{
          transitionSpec: {
            open: staticConfig,
            close: staticConfig,
          },
        }}
      />
      <NearDentalMapStack.Screen
        name="DentalClinicStack"
        component={DentalClinicStackScreen}
      />
    </NearDentalMapStack.Navigator>
  );
}

function DentalClinicStackScreen() {
  return (
    <DentalClinicStack.Navigator headerMode="none">
      <DentalClinicStack.Screen
        name="DentalDetailScreen"
        component={DentalDetailScreen}
      />
      <DentalClinicStack.Screen
        name="DentalInfoEditRequestScreen"
        component={DentalInfoEditRequestScreen}
      />
    </DentalClinicStack.Navigator>
  );
}

function TeethCareStackScreen() {
  return (
    <TeethCareStack.Navigator headerMode="none">
      <TeethCareStack.Screen
        name="TeethCareScreen"
        component={TeethCareScreen}
      />
      <TeethCareStack.Screen
        name="TimerReportScreen"
        component={TimerReportScreen}
      />
      <TeethCareStack.Screen
        name="BrushDetritionReportScreen"
        component={BrushDetritionReportScreen}
      />
      <TeethCareStack.Screen
        name="SymptomReportScreen"
        component={SymptomReportScreen}
      />
      <TeethCareStack.Screen name="AIReportScreen" component={AIReportScreen} />
      <TeethCareStack.Screen
        name="RelatedDiseaseScreen"
        component={RelatedDiseaseScreen}
      />
      <TeethCareStack.Screen
        name="BrushDetritionCamera"
        component={BrushDetritionCamera}
      />
      <TeethCareStack.Screen
        name="MeasuredBrushPictureScreen"
        component={MeasuredBrushPictureScreen}
      />
    </TeethCareStack.Navigator>
  );
}

function ReviewUploadStackScreen() {
  return (
    <ReviewUploadStack.Navigator headerMode="none">
      <ReviewUploadStack.Screen
        name="ReceiptRegisterScreen"
        component={ReceiptRegisterScreen}
      />
      <ReviewUploadStack.Screen
        name="ReviewUploadScreen"
        component={ReviewUploadScreen}
      />
      <ReviewUploadStack.Screen
        name="ReviewMetaDataScreen"
        component={ReviewMetaDataScreen}
      />
      <ReviewUploadStack.Screen
        name="ContentPostScreen"
        component={ContentPostScreen}
      />
      <ReviewUploadStack.Screen name="TeethCamera" component={TeethCamera} />
      <ReviewUploadStack.Screen name="Gallery" component={Gallery} />
      <ReviewUploadStack.Screen
        name="GallerySelectOne"
        component={GallerySelectOne}
      />
      <ReviewUploadStack.Screen
        name="ReceiptCamera"
        component={ReceiptCamera}
      />
      <ReviewUploadStack.Screen
        name="TakenPictureScreen"
        component={TakenPictureScreen}
      />
      <ReviewUploadStack.Screen
        name="DentalClinicSearchScreen"
        component={DentalClinicSearchScreen}
      />
      <ReviewUploadStack.Screen
        name="TreatSearchScreen"
        component={TreatSearchScreen}
      />
      <ReviewUploadStack.Screen
        name="DetailPriceScreen"
        component={DetailPriceScreen}
      />
      <ReviewUploadStack.Screen name="RatingScreen" component={RatingScreen} />
    </ReviewUploadStack.Navigator>
  );
}

function EditProfileStackScreen() {
  return (
    <EditProfileStack.Navigator headerMode="none">
      <EditProfileStack.Screen
        name="EditProfileTabScreen"
        component={EditProfileTabScreen}
      />
      <EditProfileStack.Screen
        name="EditProfileGallery"
        component={GallerySelectOne}
      />
    </EditProfileStack.Navigator>
  );
}

function MyProfileStackScreen() {
  return (
    <MyProfileStack.Navigator headerMode="none">
      <MyProfileStack.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
      />
      <MyProfileStack.Screen
        name="EditProfileStackScreen"
        component={EditProfileStackScreen}
      />
      <MyProfileStack.Screen
        name="GeneralSettingTabScreen"
        component={GeneralSettingTabScreen}
      />
      <MyProfileStack.Screen
        name="ReservationTabScreen"
        component={ReservationTabScreen}
      />
      <MyProfileStack.Screen
        name="SavedHospitalTabScreen"
        component={SavedHospitalTabScreen}
      />
      <MyProfileStack.Screen
        name="LikedPostsTabScreen"
        component={LikedPostsTabScreen}
      />
      <MyProfileStack.Screen
        name="ScrapedPostsTabScreen"
        component={ScrapedPostsTabScreen}
      />
      <MyProfileStack.Screen
        name="CommentedPostsTabScreen"
        component={CommentedPostsTabScreen}
      />
      <MyProfileStack.Screen
        name="PhoneVerifyScreen"
        component={PhoneVerifyScreen}
      />
      <MyProfileStack.Screen
        name="CommunityStackScreen"
        component={CommunityStackScreen}
      />
      <MyProfileStack.Screen
        name="ReviewStackScreen"
        component={ReviewStackScreen}
      />
      <MyProfileStack.Screen
        name="DentalClinicStackScreen"
        component={DentalClinicStackScreen}
      />
      <MyProfileStack.Screen
        name="HometownSettingScreen"
        component={HometownSettingScreen}
      />
    </MyProfileStack.Navigator>
  );
}

function SettingStackScreen() {
  return (
    <SettingStack.Navigator headerMode="none">
      <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
    </SettingStack.Navigator>
  );
}

function CommunityPostUploadStackScreen({route}: any) {
  return (
    <CommunityPostUploadStack.Navigator headerMode="none">
      <CommunityPostUploadStack.Screen
        name="CommunityPostUploadScreen"
        component={CommunityPostUploadScreen}
        initialParams={{
          data: route.params && route.params.data,
        }}
      />
      <CommunityPostUploadStack.Screen
        name="CommunityCamera"
        component={InstantCamera}
      />
      <CommunityPostUploadStack.Screen
        name="CommunityGallery"
        component={Gallery}
      />
    </CommunityPostUploadStack.Navigator>
  );
}
function CommunityStackScreen() {
  return (
    <CommunityStack.Navigator headerMode="none">
      <CommunityStack.Screen
        options={{
          gestureEnabled: false,
        }}
        name="CommunityListScreen"
        component={CommunityListScreen}
      />
      <CommunityStack.Screen
        name="CommunityDetailScreen"
        component={CommunityDetailScreen}
      />
      <CommunityStack.Screen
        name="AnotherProfileStackScreen"
        component={AnotherProfileStackScreen}
      />
      <CommunityStack.Screen
        name="CommunityPostUploadStackScreen"
        component={CommunityPostUploadStackScreen}
      />
      <CommunityStack.Screen
        options={{
          gestureEnabled: false,
        }}
        name="FullImagesScreen"
        component={FullImagesScreen}
      />
      <CommunityStack.Screen
        name="KeywordSearchStackScreen"
        component={KeywordSearchStackScreen}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 150},
            },
            close: {
              animation: 'timing',
              config: {duration: 150},
            },
          },
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
    </CommunityStack.Navigator>
  );
}

function KeywordSearchStackScreen() {
  return (
    <KeywordSearchStack.Navigator headerMode="none">
      <KeywordSearchStack.Screen
        name="KeywordSearchScreen"
        component={KeywordSearchScreen}
      />
    </KeywordSearchStack.Navigator>
  );
}

function BottomTab() {
  // 특정 화면에서 Bottom Tab을 숨기기 위한 함수
  const getHomeBottomTabBarVisibility = (route: any) => {
    const routeName = route.state ? route.state.routes[route.state.index] : '';

    const stackRouteName = routeName.state
      ? routeName.state.routes[routeName.state.index].name
      : '';

    if (
      routeName.name === 'ReviewStackScreen' ||
      routeName.name === 'ReviewUploadStackScreen'
    ) {
      return false;
    }

    if (
      stackRouteName === 'ReviewStackScreen' ||
      routeName.name === 'ReviewUploadStackScreen'
    ) {
      return false;
    }

    return true;
  };

  const getDentalBottomTabBarVisibility = (route: any) => {
    console.log('getDentalBottomTabBarVisibility route22', route);
    console.log(
      'getDentalBottomTabBarVisibility route.state22',
      route.state?.routes,
    );

    const routeName = route.state ? route.state.routes[route.state.index] : '';
    const isOpenDentalList = routeName.params?.isOpenDentalList;

    const stackRouteName = routeName.state
      ? routeName.state.routes[routeName.state.index].name
      : '';

    if (routeName.name === 'DentalListScreen' || routeName.name === 'DentalClinicStack' || isOpenDentalList) {
      return false;
    }

    return true;
  };

  const getCommunityBottomTabBarVisibility = (route: any) => {
    const routeName = route.state ? route.state.routes[route.state.index] : '';

    const stackRouteName = routeName.state
      ? routeName.state.routes[routeName.state.index].name
      : '';
    if (
      stackRouteName === 'CommunityStackScreen' ||
      routeName.name === 'CommunityPostUploadStackScreen'
    ) {
      return false;
    }

    if (
      stackRouteName === 'CommunityStackScreen' ||
      routeName.name === 'CommunityDetailScreen'
    ) {
      return false;
    }

    if (
      stackRouteName === 'CommunityStackScreen' ||
      routeName.name === 'FullImagesScreen'
    ) {
      return false;
    }

    return true;
  };

  const getTeethCareBottomTabBarVisibility = (route: any) => {
    const routeName = route.state ? route.state.routes[route.state.index] : '';

    const stackRouteName = routeName.state
      ? routeName.state.routes[routeName.state.index].name
      : '';

    console.log('routeName', routeName);
    console.log('stackRouteName', stackRouteName);

    if (
      routeName.name === 'BrushDetritionCamera' ||
      routeName.name === 'MeasuredBrushPictureScreen'
    ) {
      return false;
    }

    if (stackRouteName === 'BrushDetritionCamera') {
      return false;
    }

    return true;
  };

  const getMyProfileBottomTabBarVisibility = (route: any) => {
    const routeName = route.state ? route.state.routes[route.state.index] : '';
    const stackRouteName = routeName.state
      ? routeName.state.routes[routeName.state.index].name
      : '';
    if (routeName.name === 'EditProfileStackScreen') {
      return false;
    }

    if (routeName.name === 'GeneralSettingTabScreen') {
      return false;
    }

    if (routeName.name === 'ReservationTabScreen') {
      return false;
    }

    if (routeName.name === 'SavedHospitalTabScreen') {
      return false;
    }

    if (routeName.name === 'LikedPostsTabScreen') {
      return false;
    }

    if (routeName.name === 'ScrapedPostsTabScreen') {
      return false;
    }

    if (routeName.name === 'CommunityStackScreen') {
      return false;
    }

    if (routeName.name === 'ReviewStackScreen') {
      return false;
    }

    return true;
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: true,
        labelStyle: styles.tabLabel,
        style: styles.tabBar,
      }}>
      <Tab.Screen
        name="홈"
        component={HomeStackScreen}
        options={({route}) => ({
          tabBarVisible: getHomeBottomTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="지도"
        component={NearDentalMapStackScreen}
        options={({route}) => ({
          tabBarVisible: getDentalBottomTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="관리"
        component={TeethCareStackScreen}
        options={({route}) => ({
          tabBarVisible: getTeethCareBottomTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="수다방"
        component={CommunityStackScreen}
        options={({route}) => ({
          tabBarVisible: getCommunityBottomTabBarVisibility(route),
          /*
        tabBarIcon: ({focused}: {focused: boolean}) => (
        
          <Image
          source={
            require('~/Assets/Images/BottomTab/ic_community_outline.png')
          }/>
        )
        */
        })}
      />
      <Tab.Screen
        name="마이"
        component={MyProfileStackScreen}
        options={({route}) => ({
          tabBarVisible: getMyProfileBottomTabBarVisibility(route),
          /*
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            source={
              focused
               ? require('~/Assets/Images/BottomTab/ic_profile_focused.png')
               : require('~/Assets/Images/BottomTab/ic_profile_outline.png')
            }
          />
        ),
        */
        })}
      />
    </Tab.Navigator>
  );
}

const Navigator = () => {
  const currentUser = useSelector((state: any) => state.currentUser);
  const dispatch = useDispatch();

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('getFcmToken fcmToken', fcmToken);
  };

  useEffect(() => {
    getFcmToken();
    getUserInfo()
      .then((jwtToken) => {
        console.log('getUserInfo response', jwtToken);
        GETUserInfo(jwtToken)
          .then((response: any) => {
            const profile = response;
            dispatch(
              allActions.userActions.setUser({
                jwtToken,
                profile,
              }),
            );
          })
          .catch((error: any) => {
            console.log('user error');
          });
      })
      .catch((error) => {
        console.log('getUserInfo error', error);
      });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      {currentUser.loggedIn ? <BottomTab /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: isIphoneX() ? 10 : 0,
    height: DeviceInfo.hasNotch() ? hp('9.6%') : hp('9.6%'),
    position: 'absolute',
  },
  tabLabel: {
    fontSize: 13,
  },
});

export default Navigator;
