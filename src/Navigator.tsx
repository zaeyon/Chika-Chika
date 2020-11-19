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
import allActions from '~/actions';

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

// Another Profile Stack Screen
import AnotherProfileScreen from '~/Components/Container/AnotherProfileScreen';

// Setting Stack Screen
import SettingScreen from '~/Components/Container/SettingScreen';

// Community Stack Screen
import CommunityScreen from '~/Components/Container/CommunityScreen';

// Dental Clinic Stack Screen
import NearDentistMap from '~/Components/Container/NearDentistMap';
import DentalClinicListScreen from '~/Components/Container/DentalClinicListScreen';
import DentalDetailScreen from '~/Components/Container/DentalDetailScreen';
import DentalInfoEditRequestScreen from '~/Components/Container/DentalDetailScreen/DentalInfoEditRequestScreen';

// Teeth Care Stack Screen
import TeethCareScreen from '~/Components/Container/TeethCareScreen';



const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ReviewUploadStack = createStackNavigator();
const MyProfileStack = createStackNavigator();
const ReviewStack = createStackNavigator();
const AnotherProfileStack = createStackNavigator();
const SettingStack = createStackNavigator();
const CommunityStack = createStackNavigator();
const DentalClinicStack = createStackNavigator();
const TeethCareStack = createStackNavigator();

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
        </AuthStack.Navigator>
    )
}

function ReviewStackScreen() {
  return (
    <ReviewStack.Navigator
    headerMode="none">
      <ReviewStack.Screen
      name="ReviewListScreen"
      component={ReviewListScreen}/>
      <ReviewStack.Screen
      name="ReviewDetailScreen"
      component={ReviewDetailScreen}/>
      <ReviewStack.Screen
      name="FullImagesScreen"
      component={FullImagesScreen}/>
    </ReviewStack.Navigator>
  )
}

function AnotherProfileStackScreen() {
  return (
    <AnotherProfileStack.Navigator
    headerMode="none">
      <AnotherProfileStack.Screen
      name="AnotherProfileScreen"
      component={AnotherProfileScreen}/>
    </AnotherProfileStack.Navigator>
  )
}

function HomeStackScreen() {
    return (
        <HomeStack.Navigator
        headerMode="none">
            <HomeStack.Screen
            name="HomeScreen"
            component={HomeScreen}/>
            <HomeStack.Screen
            name="ReviewStackScreen"
            component={ReviewStackScreen}/>
            <HomeStack.Screen
            name="AnotherProfileStackScreen"
            component={AnotherProfileStackScreen}/>
            <HomeStack.Screen
            name="ReviewUploadStackScreen"
            component={ReviewUploadStackScreen}/>
        </HomeStack.Navigator>
    )
}

function DentalClinicStackScreen() {
  return (
    <DentalClinicStack.Navigator
    headerMode="none">
      <DentalClinicStack.Screen
      name="NearDentistMap"
      component={NearDentistMap}/>
      <DentalClinicStack.Screen
      name="DentalClinicListScreen"
      component={DentalClinicListScreen}/>
      <DentalClinicStack.Screen
      name="DentalDetailScreen"
      component={DentalDetailScreen}/>
      <DentalClinicStack.Screen
      name="DentalInfoEditRequestScreen"
      component={DentalInfoEditRequestScreen}/>
    </DentalClinicStack.Navigator>
  )
}

function TeethCareStackScreen() {
  return (
    <TeethCareStack.Navigator
    headerMode="none">
      <TeethCareStack.Screen
      name="TeethCareScreen"
      component={TeethCareScreen}/>
    </TeethCareStack.Navigator>
  )
}

function ReviewUploadStackScreen() {
    return (
        <ReviewUploadStack.Navigator
        headerMode="none">
            <ReviewUploadStack.Screen
            name="ReceiptRegisterScreen"
            component={ReceiptRegisterScreen}/>
            <ReviewUploadStack.Screen
            name="ReviewUploadScreen"
            component={ReviewUploadScreen}/>
            <ReviewUploadStack.Screen
            name="ReviewMetaDataScreen"
            component={ReviewMetaDataScreen}/>
            <ReviewUploadStack.Screen
            name="ReviewContentScreen"
            component={ReviewContentScreen}/>
            <ReviewUploadStack.Screen
            name="TeethCamera"
            component={TeethCamera}/>
            <ReviewUploadStack.Screen
            name="Gallery"
            component={Gallery}/>
            <ReviewUploadStack.Screen
            name="GallerySelectOne"
            component={GallerySelectOne}/>
            <ReviewUploadStack.Screen
            name="ReceiptCamera"
            component={ReceiptCamera}/>
            <ReviewUploadStack.Screen
            name="TakenPictureScreen"
            component={TakenPictureScreen}/>
            <ReviewUploadStack.Screen
            name="DentalClinicSearchScreen"
            component={DentalClinicSearchScreen}/>
            <ReviewUploadStack.Screen
            name="TreatSearchScreen"
            component={TreatSearchScreen}/>
            <ReviewUploadStack.Screen
            name="DetailPriceScreen"
            component={DetailPriceScreen}/>
            <ReviewUploadStack.Screen
            name="RatingScreen"
            component={RatingScreen}/>
        </ReviewUploadStack.Navigator>
    )
}

function MyProfileStackScreen() {
    return (
        <MyProfileStack.Navigator
        headerMode="none">
            <MyProfileStack.Screen
            name="MyProfileScreen"
            component={MyProfileScreen}/>
            <MyProfileStack.Screen
            name="SettingStackScreen"
            component={SettingStackScreen}/>
        </MyProfileStack.Navigator>
    )
}


function SettingStackScreen() {
  return (
    <SettingStack.Navigator
    headerMode="none">
      <SettingStack.Screen
      name="SettingScreen"
      component={SettingScreen}/>
    </SettingStack.Navigator>
  )
}

function CommunityStackScreen() {
  return (
    <CommunityStack.Navigator
    headerMode="none">
      <CommunityStack.Screen
      name="CommunityScreen"
      component={CommunityScreen}/>
    </CommunityStack.Navigator>
  )
}


function BottomTab() {

  const getHomeTabBarVisibility = (route: any) => {
    const routeName = route.state
    ? route.state.routes[route.state.index]
    : '';

    const stackRouteName = routeName.state
    ? routeName.state.routes[routeName.state.index].name
    : '';

    if(routeName.name === 'ReviewStackScreen' || routeName.name === "NearDentistMap" || routeName.name === 'ReviewUploadStackScreen') {
      return false;
    }

    if(stackRouteName === 'ReviewStackScreen' || routeName.name === 'ReviewUploadStackScreen') {
      return false;
    }

    return true;
  }

    return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: true,
        labelStyle: styles.tabLabel,
        style: styles.tabBar
      }}>
      <Tab.Screen 
      name="Home" 
      component={HomeStackScreen}
      options={({route}) => ({
        tabBarVisible: getHomeTabBarVisibility(route)
      })}
      />
      <Tab.Screen
      name="Dental Clinic"
      component={DentalClinicStackScreen}/>
      <Tab.Screen
      name="Teeth Care"
      component={TeethCareStackScreen}
      />
      <Tab.Screen
      name="Community"
      component={CommunityStackScreen}
      options={{
        /*
        tabBarIcon: ({focused}: {focused: boolean}) => (
        
          <Image
          source={
            require('~/Assets/Images/BottomTab/ic_community_outline.png')
          }/>
        )
        */
      }}/>
      <Tab.Screen 
      name="Profile" 
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
  )
}

const Navigator = () => {
    const currentUser = useSelector((state: any) => state.currentUser)
    return (
        <NavigationContainer>
        {(currentUser.loggedIn) ? (
            <BottomTab/>
        ) : (
            <AuthStackScreen/>
        )}
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    tabBar: {
      paddingTop: isIphoneX() ? 10 : 0,
      height: isIphoneX() ? wp("21%") : wp("15%"),
      position: 'absolute',
    },
    tabLabel: {
      fontSize: 13
    }
  });

export default Navigator