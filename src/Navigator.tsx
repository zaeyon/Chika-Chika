import React from 'react';
import {StyleSheet, Image} from 'react-native';
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

import allActions from '~/actions';

// ReUsable Components
import InstantCamera from './Components/Container/InstantCamera';
// Auth Stack Screen
import UnauthorizedScreen from '~/Components/Container/UnauthorizedScreen';
import LoginScreen from '~/Components/Container/LoginScreen';
import ProfileInputScreen from '~/Components/Container/SignUpScreen/ProfileInputScreen';
import BasicInputScreen from './Components/Container/SignUpScreen/BasicInputScreen';
import VerifyPhoneNumberScreen from '~/Components/Container/VerifyPhoneNumberScreen';

// Home Stack Screee
import HomeScreen from '~/Components/Container/HomeScreen';

// Review Stack Screen
import ReviewListScreen from '~/Components/Container/ReviewListScreen';
import ReviewDetailScreen from '~/Components/Container/ReviewDetailScreen';
import FullImagesScreen from '~/Components/Container/FullImagesScreen';

// Review Upload Stack Screen
import ReviewUploadScreen from '~/Components/Container/ReviewUploadScreen';
import ReviewMetaDataScreen from '~/Components/Container/ReviewUploadScreen/ReviewMetaDataScreen';
import ReviewContentScreen from '~/Components/Container/ReviewUploadScreen/ReviewContentScreen';
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
import ActivityHistoryTabScreen from '~/Components/Container/MyProfileScreen/ActivityHistoryTabScreen';
import AlertSettingTabScreen from '~/Components/Container/MyProfileScreen/AlertSettingTabScreen';
import EditProfileTabScreen from '~/Components/Container/MyProfileScreen/EditProfileTabScreen';
import EmailConsultingTabScreen from '~/Components/Container/MyProfileScreen/EmailConsultingTabScreen';
import GeneralSettingTabScreen from '~/Components/Container/MyProfileScreen/GeneralSettingTabScreen';
import LocationSettingTabScreen from '~/Components/Container/MyProfileScreen/LocationSettingTabScreen';
import ReservationTabScreen from '~/Components/Container/MyProfileScreen/ReservationTabScreen';
import SavedHospitalTabScreen from '~/Components/Container/MyProfileScreen/SavedHospitalTabScreen';

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
import DentalClinicListScreen from '~/Components/Container/DentalClinicListScreen';
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



const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ReviewUploadStack = createStackNavigator();
const MyProfileStack = createStackNavigator();
const ReviewStack = createStackNavigator();
const AnotherProfileStack = createStackNavigator();
const SettingStack = createStackNavigator();
const CommunityStack = createStackNavigator();
const CommunityPostUploadStack = createStackNavigator();
const DentalClinicStack = createStackNavigator();
const TeethCareStack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    duration: 0,
  },
};

function AuthStackScreen() {
    return (
        <AuthStack.Navigator
        headerMode="none">
            <AuthStack.Screen
            name="UnauthorizedScreen"
            component={UnauthorizedScreen}/>
            <AuthStack.Screen
            name="LoginScreen"
            component={LoginScreen}/>
            <AuthStack.Screen
            name="BasicInputScreen"
            component={BasicInputScreen}/>
            <AuthStack.Screen
            name="ProfileInputScreen"
            component={ProfileInputScreen}/>
            <AuthStack.Screen
            name="VerifyPhoneNumberScreen"
            component={VerifyPhoneNumberScreen}/>
            <AuthStack.Screen
            name="HometownSettingScreen"
            component={HometownSettingScreen}/>
        </AuthStack.Navigator>
    )
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

function DentalClinicStackScreen() {
  return (
    <DentalClinicStack.Navigator headerMode="none">
      <DentalClinicStack.Screen
        name="NearDentalMap"
        component={NearDentalMap}
      />
      <DentalClinicStack.Screen
      name="DentalClinicListScreen"
      component={DentalClinicListScreen}
      options={{
        transitionSpec: {
          open: config,
          close: config,
        },
      }}/>
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
        name="ReviewContentScreen"
        component={ReviewContentScreen}
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

function MyProfileStackScreen() {
  return (
    <MyProfileStack.Navigator headerMode="none">
      <MyProfileStack.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
      />
      <MyProfileStack.Screen
        name="EditProfileTabScreen"
        component={EditProfileTabScreen}
      />
      <MyProfileStack.Screen
        name="AlertSettingTabScreen"
        component={AlertSettingTabScreen}
      />
      <MyProfileStack.Screen
        name="ActivityHistoryTabScreen"
        component={ActivityHistoryTabScreen}
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
      {/* 
      <MyProfileStack.Screen
        name="EmailConsultingTabScreen"
        component={EmailConsultingTabScreen}
      />
      <MyProfileStack.Screen
        name="LocationSettingTabScreen"
        component={LocationSettingTabScreen}
      />
       */}
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

function CommunityPostUploadStackScreen() {
  return (
    <CommunityPostUploadStack.Navigator headerMode="none">
      <CommunityPostUploadStack.Screen
        name="CommunityPostUploadScreen"
        component={CommunityPostUploadScreen}
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
    </CommunityStack.Navigator>
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
    const routeName = route.state ? route.state.routes[route.state.index] : '';

    const stackRouteName = routeName.state
      ? routeName.state.routes[routeName.state.index].name
      : '';

    if (routeName.name === 'DentalClinicListScreen') {
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

  const getTeethCareBottomTabVisibility = (route: any) => {
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
        tabBarVisible: getHomeBottomTabBarVisibility(route)
      })}
      />
      <Tab.Screen
      name="지도"
      component={DentalClinicStackScreen}
      options={({route}) => ({
        tabBarVisible: getDentalBottomTabBarVisibility(route)
      })}
      />
      <Tab.Screen
      name="관리"
      component={TeethCareStackScreen}
      options={({route}) => ({
        tabBarVisible: getTeethCareBottomTabVisibility(route)
      })}
      />
      <Tab.Screen
      name="수다방"
      component={CommunityStackScreen}
      options={({route}) => ({
        tabBarVisible: getCommunityBottomTabBarVisibility(route)
        /*
        tabBarIcon: ({focused}: {focused: boolean}) => (
        
          <Image
          source={
            require('~/Assets/Images/BottomTab/ic_community_outline.png')
          }/>
        )
        */
      })}/>
      <Tab.Screen 
      name="마이" 
      component={MyProfileStackScreen}
      options={({route}) => ({
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
  return (
    <NavigationContainer>
      {currentUser.loggedIn ? <BottomTab /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    tabBar: {
      paddingTop: isIphoneX() ? 10 : 0,
      height: DeviceInfo.hasNotch() ? hp("9.6%") : hp("9.6%"),
      position: 'absolute',
    },
    tabLabel: {
      fontSize: 13
    }
  });

export default Navigator
