import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';
import {enableScreens} from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';

import allActions from '~/actions';

// Firebase
import messaging from '@react-native-firebase/messaging';
// Routes
import GETUserInfo from '~/Routes/Auth/GETUserInfo';
import GETUserSavedHospitals from '~/Routes/User/GETUserSavedHospitals';
import GETUserReservations from '~/Routes/User/GETUserReservations';
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
import CommentListScreen from '~/Components/Container/CommentListScreen';
import AccuseScreen from '~/Components/Container/AccuseScreen';

// Review Upload Stack Screen
import ReviewUploadScreen from '~/Components/Container/ReviewUploadScreen';
import ReviewMetaDataScreen from '~/Components/Container/ReviewUploadScreen/ReviewMetaDataScreen';
import ContentPostScreen from '~/Components/Container/ReviewUploadScreen/ContentPostScreen';
import TeethCamera from '~/Components/Container/TeethCamera';
import Gallery from '~/Components/Container/Gallery';
import GallerySelectOne from '~/Components/Container/GallerySelectOne';
import ReviewGuideScreen from '~/Components/Container/ReviewUploadScreen/ReviewGuideScreen';
import ReceiptCamera from '~/Components/Container/ReceiptCamera';
import TakenPictureScreen from '~/Components/Container/ReviewUploadScreen/TakenPictureScreen';
import DentalNameSearchScreen from '~/Components/Container/ReviewUploadScreen/DentalNameSearchScreen';
import TreatSearchScreen from '~/Components/Container/ReviewUploadScreen/TreatSearchScreen';
import DetailPriceScreen from '~/Components/Container/ReviewUploadScreen/DetailPriceScreen';
import RatingScreen from '~/Components/Container/ReviewUploadScreen/RatingScreen';
import SelectProofImageScreen from '~/Components/Container/ReviewUploadScreen/SelectProofImageScreen';

// My Profile Stack Screen
import MyProfileScreen from '~/Components/Container/MyProfileScreen';
import EditProfileTabScreen from '~/Components/Container/MyProfileScreen/EditProfileTabScreen';
import EditNicknameScreen from '~/Components/Presentational/MyProfileScreen/EditProfileScreen/EditNicknameScreen';
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
import ImageSelectScreen from '~/Components/Container/ImageSelectScreen';
import ImageSelectOneScreen from '~/Components/Container/ImageSelectOneScreen';
import FullImageScreen from '~/Components/Container/ImageSelectOneScreen/FullImageScreen';
import ImageDetailScreen from '~/Components/Container/ImageDetailScreen';

// Dental Clinic Stack Screen
import NearDentalMap from '~/Components/Container/NearDentalMap';
import DentalTotalSearchScreen from '~/Components/Container/DentalTotalSearchScreen';
import DentalDetailScreen from '~/Components/Container/DentalDetailScreen';
import DentalInfoEditRequestScreen from '~/Components/Container/DentalDetailScreen/DentalInfoEditRequestScreen';
import DentalLocationMapScreen from '~/Components/Container/DentalDetailScreen/DentalLocationMapScreen';

// Teeth Care Stack Screen
import GuideScreen from '~/Components/Container/TeethCareScreen/GuideScreen';
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
import HometownSearchScreen from '~/Components/Container/HometownSearchScreen';

// Keyword Search Screen
import TotalKeywordSearchScreen from '~/Components/Container/TotalKeywordSearchScreen';

// Notification Stack Screen
import NotificationListScreen from '~/Components/Container/NotificationListScreen';

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
const TotalKeywordSearchStack = createStackNavigator();
const NotificationStack = createStackNavigator();

const EditProfileStack = createSharedElementStackNavigator();
const ImageSelectOneStack = createSharedElementStackNavigator();

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
        name="HometownSearchScreen"
        component={HometownSearchScreen}
      />
    </AuthStack.Navigator>
  );
}

function ReviewStackScreen() {
  return (
    <ReviewStack.Navigator
      headerMode="none"
      screenOptions={{
        gestureEnabled: true,
      }}>
      <ReviewStack.Screen
        name="ReviewListScreen"
        component={ReviewListScreen}
        options={{
          gestureEnabled: true,
        }}
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
        options={{
          gestureEnabled: false,
        }}
      />
      <ReviewStack.Screen
        name="DentalClinicStack"
        component={DentalClinicStackScreen}
      />
      <ReviewStack.Screen
        name="CommentListScreen"
        component={CommentListScreen}
      />
      <ReviewStack.Screen
        name="ImageDetailScreen"
        component={ImageDetailScreen}
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
          cardStyle: {backgroundColor: 'transparent'},
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
        // sharedElementsConfig={(route, otherRoute, showing) => {
        //   console.log(route.params.imageIndex);
        //   if (showing) {
        //     const item = route.params.imageArray;
        //     return item.map((item) => `item.${item}`);
        //     return [`item.${item[route.params.imageIndex]}`];
        //   }
        // }}
      />
      <ReviewStack.Screen name="AccuseScreen" component={AccuseScreen} />
    </ReviewStack.Navigator>
  );
}

function AnotherProfileStackScreen({route}) {
  return (
    <AnotherProfileStack.Navigator headerMode="none">
      <AnotherProfileStack.Screen
        name="AnotherProfileScreen"
        component={AnotherProfileScreen}
        initialParams={route.params}
      />
      <AnotherProfileStack.Screen
        name="CommunityStackScreen"
        component={CommunityStackScreen}
      />
      <AnotherProfileStack.Screen
        name="ReviewStackScreen"
        component={ReviewStackScreen}
      />
    </AnotherProfileStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      headerMode="none"
      screenOptions={{
        gestureEnabled: true,
      }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="CommunityStackScreen"
        component={CommunityStackScreen}
      />
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
        options={{
          gestureEnabled: false,
        }}
      />
      <HomeStack.Screen
        name="NotificationStackScreen"
        component={NotificationStackScreen}
      />
      <HomeStack.Screen
        name="HometownSettingScreen"
        component={HometownSettingScreen}
      />
      <HomeStack.Screen
        name="HometownSearchScreen"
        component={HometownSearchScreen}
      />
      <HomeStack.Screen
        name="TotalKeywordSearchStackScreen"
        component={TotalKeywordSearchStackScreen}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 0},
            },
            close: {
              animation: 'timing',
              config: {duration: 0},
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
        name="DentalTotalSearchScreen"
        component={DentalTotalSearchScreen}
        options={{
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 0},
            },
            close: {
              animation: 'timing',
              config: {duration: 0},
            },
          },
        }}
      />
      <NearDentalMapStack.Screen
        name="DentalDetailScreen"
        component={DentalDetailScreen}
      />
      <NearDentalMapStack.Screen
        name="DentalInfoEditRequestScreen"
        component={DentalInfoEditRequestScreen}
      />
      <NearDentalMapStack.Screen
        name="ReviewUploadStackScreen"
        component={ReviewUploadStackScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <NearDentalMapStack.Screen
        name="DentalLocationMapScreen"
        component={DentalLocationMapScreen}
      />
      <NearDentalMapStack.Screen
        name="ImageSelectScreen"
        component={ImageSelectScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <NearDentalMapStack.Screen
        name="ReviewStackScreen"
        component={ReviewStackScreen}
      />
      <HomeStack.Screen
        name="AnotherProfileStackScreen"
        component={AnotherProfileStackScreen}
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
      <DentalClinicStack.Screen
        name="ReviewUploadStackScreen"
        component={ReviewUploadStackScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <DentalClinicStack.Screen
        name="DentalLocationMapScreen"
        component={DentalLocationMapScreen}
      />
      <DentalClinicStack.Screen
        name="ImageSelectScreen"
        component={ImageSelectScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <DentalClinicStack.Screen
        name="ReviewStackScreen"
        component={ReviewStackScreen}
      />
    </DentalClinicStack.Navigator>
  );
}

function TeethCareStackScreen() {
  return (
    <TeethCareStack.Navigator headerMode="none">
      <TeethCareStack.Screen name="GuideScreen" component={GuideScreen} />
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
        name="ReviewGuideScreen"
        component={ReviewGuideScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <ReviewUploadStack.Screen
        name="ReviewUploadScreen"
        component={ReviewUploadScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <ReviewUploadStack.Screen
        name="ReviewMetaDataScreen"
        component={ReviewMetaDataScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <ReviewUploadStack.Screen
        name="ContentPostScreen"
        component={ContentPostScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <ReviewUploadStack.Screen name="TeethCamera" component={TeethCamera} />
      <ReviewUploadStack.Screen name="Gallery" component={Gallery} />
      <ReviewUploadStack.Screen
        name="GallerySelectOne"
        component={GallerySelectOne}
        options={{
          gestureEnabled: false,
        }}
      />
      <ReviewUploadStack.Screen
        name="ReceiptCamera"
        component={ReceiptCamera}
        options={{
          gestureEnabled: false,
        }}
      />
      <ReviewUploadStack.Screen
        name="TakenPictureScreen"
        component={TakenPictureScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <ReviewUploadStack.Screen
        name="DentalNameSearchScreen"
        component={DentalNameSearchScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <ReviewUploadStack.Screen
        name="TreatSearchScreen"
        component={TreatSearchScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <ReviewUploadStack.Screen
        name="DetailPriceScreen"
        component={DetailPriceScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <ReviewUploadStack.Screen name="RatingScreen" component={RatingScreen} />
      <ReviewUploadStack.Screen
        name="ImageSelectScreen"
        component={ImageSelectScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <ReviewUploadStack.Screen
        name="ImageSelectOneStackScreen"
        component={ImageSelectOneStackScreen}
      />
      <ReviewUploadStack.Screen
        name="SelectProofImageScreen"
        component={SelectProofImageScreen}
      />
    </ReviewUploadStack.Navigator>
  );
}

function EditProfileStackScreen() {
  return (
    <EditProfileStack.Navigator headerMode="none" mode="modal">
      <EditProfileStack.Screen
        name="EditProfileTabScreen"
        component={EditProfileTabScreen}
        sharedElementsConfig={(route, otherRoute, showing) => {
          if (otherRoute.name === 'EditNicknameScreen') {
            return [{id: 'nicknameInput'}];
          }
        }}
      />
      <EditProfileStack.Screen
        name="ImageSelectOneStackScreen"
        component={ImageSelectOneStackScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <EditProfileStack.Screen
        name="EditNicknameScreen"
        component={EditNicknameScreen}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        }}
      />
    </EditProfileStack.Navigator>
  );
}

function ImageSelectOneStackScreen({route}) {
  return (
    <ImageSelectOneStack.Navigator headerMode="none">
      <ImageSelectOneStack.Screen
        name="ImageSelectOneScreen"
        component={ImageSelectOneScreen}
        initialParams={route.params}
      />
      <ImageSelectOneStack.Screen
        name="FullImageScreen"
        component={FullImageScreen}
        initialParams={route.params}
        sharedElementsConfig={(route, otherRoute, showing) => {
          if (
            otherRoute.name === 'FullImageScreen' ||
            otherRoute.name === 'ImageSelectOneScreen'
          ) {
            return [{id: 'header', animation: 'fade'}];
          }
        }}
        options={{
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 200},
            },
            close: {
              animation: 'timing',
              config: {duration: 200},
            },
          },
          cardStyle: {backgroundColor: 'transparent'},
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        }}
      />
    </ImageSelectOneStack.Navigator>
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
        options={({route}: any) => {
          const routeName = route.state
            ? route.state.routeNames[route.state.index]
            : '';
          return {
            gestureEnabled:
              routeName === 'ImageSelectOneStackScreen' ? false : true,
          };
        }}
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
        name="HometownSearchScreen"
        component={HometownSearchScreen}
      />
      <MyProfileStack.Screen
        name="HometownSettingScreen"
        component={HometownSettingScreen}
      />
      <MyProfileStack.Screen
        name="AnotherProfileStackScreen"
        component={AnotherProfileStackScreen}
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
        initialParams={route.params && route.params.data}
        options={{
          gestureEnabled: false,
        }}
      />
      <CommunityPostUploadStack.Screen
        name="ImageSelectScreen"
        component={ImageSelectScreen}
        options={{
          gestureEnabled: false,
        }}
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
        name="CommentListScreen"
        component={CommentListScreen}
      />
      <CommunityStack.Screen
        name="AnotherProfileStackScreen"
        component={AnotherProfileStackScreen}
      />
      <CommunityStack.Screen
        name="CommunityPostUploadStackScreen"
        component={CommunityPostUploadStackScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <CommunityStack.Screen
        name="ImageDetailScreen"
        component={ImageDetailScreen}
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
          cardStyle: {backgroundColor: 'transparent'},
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
        // sharedElementsConfig={(route, otherRoute, showing) => {
        //   console.log(route.params.imageIndex);
        //   if (showing) {
        //     const item = route.params.imageArray;
        //     return item.map((item) => `item.${item}`);
        //     return [`item.${item[route.params.imageIndex]}`];
        //   }
        // }}
      />
      <CommunityStack.Screen
        name="TotalKeywordSearchStackScreen"
        component={TotalKeywordSearchStackScreen}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 100},
            },
            close: {
              animation: 'timing',
              config: {duration: 100},
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
      <CommunityStack.Screen
        name="NotificationStackScreen"
        component={NotificationStackScreen}
      />
      <CommunityStack.Screen
        name="HometownSearchScreen"
        component={HometownSearchScreen}
      />
      <CommunityStack.Screen
        name="HometownSettingScreen"
        component={HometownSettingScreen}
      />
      <CommunityStack.Screen name="AccuseScreen" component={AccuseScreen} />
    </CommunityStack.Navigator>
  );
}

function TotalKeywordSearchStackScreen() {
  return (
    <TotalKeywordSearchStack.Navigator headerMode="none">
      <TotalKeywordSearchStack.Screen
        name="TotalKeywordSearchScreen"
        component={TotalKeywordSearchScreen}
      />
      <TotalKeywordSearchStack.Screen
        name="CommunityStackScreen"
        component={CommunityStackScreen}
      />
      <TotalKeywordSearchStack.Screen
        name="ReviewStackScreen"
        component={ReviewStackScreen}
      />
    </TotalKeywordSearchStack.Navigator>
  );
}

function NotificationStackScreen() {
  return (
    <NotificationStack.Navigator headerMode="none">
      <NotificationStack.Screen
        name="NotificationListScreen"
        component={NotificationListScreen}
      />
      <NotificationStack.Screen
        name="ReviewStackScreen"
        component={ReviewStackScreen}
      />
    </NotificationStack.Navigator>
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

    if (routeName.name === 'CommunityStackScreen') {
      return false;
    }

    if (routeName.name === 'HometownSettingScreen') {
      return false;
    }

    return true;
  };

  const getDentalBottomTabBarVisibility = (route: any) => {
    const routeName = route.state ? route.state.routes[route.state.index] : '';

    const stackRouteName = routeName.state
      ? routeName.state.routes[routeName.state.index].name
      : '';

    if (
      routeName.name === 'DentalTotalSearchScreen' ||
      routeName.name === 'DentalDetailScreen' ||
      routeName.name === 'ReviewStackScreen' ||
      routeName.name === 'ReviewUploadStackScreen'
    ) {
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
      routeName.name === 'ImageDetailScreen'
    ) {
      return false;
    }
    if (
      stackRouteName === 'CommunityStackScreen' ||
      routeName.name === 'CommentListScreen'
    ) {
      return false;
    }
    if (
      stackRouteName === 'CommunityStackScreen' ||
      routeName.name === 'TotalKeywordSearchStackScreen'
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
    if (
      routeName.name === 'EditProfileStackScreen' ||
      routeName.name === 'HometownSettingScreen' ||
      routeName.name === 'HometownSearchScreen'
    ) {
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

    if (routeName.name === 'DentalClinicStackScreen') {
      return false;
    }

    return true;
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: styles.tabBar,
        tabStyle: {
          borderTopWidth: 0.5,
          borderTopColor: '#E2E6ED',
        },
      }}>
      <Tab.Screen
        name="홈"
        component={HomeStackScreen}
        options={({route}) => ({
          gestureEnabled: false,
          tabBarVisible: getHomeBottomTabBarVisibility(route),
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/BottomTab/ic/home/focus.png')
                  : require('~/Assets/Images/BottomTab/ic/home/unfocus.png')
              }
            />
          ),
        })}
      />
      <Tab.Screen
        name="지도"
        component={NearDentalMapStackScreen}
        options={({route}) => ({
          tabBarVisible: getDentalBottomTabBarVisibility(route),
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/BottomTab/ic/map/focus.png')
                  : require('~/Assets/Images/BottomTab/ic/map/unfocus.png')
              }
            />
          ),
        })}
      />
      {
        <Tab.Screen
          name="관리"
          component={TeethCareStackScreen}
          options={({route}) => ({
            tabBarVisible: getTeethCareBottomTabBarVisibility(route),
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <Image
                source={
                  focused
                    ? require('~/Assets/Images/BottomTab/ic/care/focus.png')
                    : require('~/Assets/Images/BottomTab/ic/care/unfocus.png')
                }
              />
            ),
          })}
        />
      }
      <Tab.Screen
        name="수다방"
        component={CommunityStackScreen}
        options={({route}) => ({
          tabBarVisible: getCommunityBottomTabBarVisibility(route),
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/BottomTab/ic/community/focus.png')
                  : require('~/Assets/Images/BottomTab/ic/community/unfocus.png')
              }
            />
          ),
        })}
      />
      <Tab.Screen
        name="마이"
        component={MyProfileStackScreen}
        options={({route}) => ({
          tabBarVisible: getMyProfileBottomTabBarVisibility(route),
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/BottomTab/ic/mypage/focus.png')
                  : require('~/Assets/Images/BottomTab/ic/mypage/unfocus.png')
              }
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

const Navigator = () => {
  const currentUser = useSelector((state: any) => state.currentUser);
  const dispatch = useDispatch();
  // const getFcmToken = async () => {
  //   const fcmToken = await messaging().getToken();
  //   console.log('getFcmToken fcmToken', fcmToken);
  // };
  useEffect(() => {
    if (currentUser.loggedIn) {
      console.log('hometown', currentUser.hometown);
      SplashScreen.hide();
    }
  }, [currentUser]);

  useEffect(() => {
    //getFcmToken();

    getUserInfo()
      .then((jwtToken) => {
        console.log('getUserInfo response', jwtToken);
        GETUserInfo(jwtToken)
          .then((response: any) => {
            console.log('profile', response);

            dispatch(
              allActions.userActions.setUser({jwtToken, profile: response}),
            );
            dispatch(allActions.userActions.setHometown(response.Residences));
            GETUserReservations({jwtToken}).then((response: any) => {
              dispatch(allActions.userActions.setReservations(response));
            });
            GETUserSavedHospitals({jwtToken}).then((response: any) => {
              dispatch(allActions.userActions.setSavedHospitals(response));
            });
          })
          .catch((error: any) => {
            console.log('get user error', error);
            SplashScreen.hide();
          });
      })
      .catch((error) => {
        console.log('getUserInfo error', error);
        SplashScreen.hide();
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
    height: DeviceInfo.hasNotch() ? hp('10.59%') : hp('7.2%'),
    paddingHorizontal: 0,
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowColor: 'rgb(218, 218, 218)',
  },
});

export default Navigator;
