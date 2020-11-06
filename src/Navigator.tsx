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
import NearDentistMap from '~/Components/Container/NearDentistMap';

// Review Stack Screen
import ReviewDetailScreen from '~/Components/Container/ReviewDetailScreen';
import FullImagesScreen from '~/Components/Container/FullImagesScreen';

// Review Upload Stack Screen
import ReviewUploadScreen from '~/Components/Container/ReviewUploadScreen';
import MetaDataScreen from '~/Components/Container/ReviewUploadScreen/ReviewMetaDataScreen';
import ReviewContentScreen from '~/Components/Container/ReviewUploadScreen/ReviewContentScreen';
import TeethCamera from '~/Components/Container/TeethCamera';
import Gallery from '~/Components/Container/Gallery';
import ReceiptRegisterScreen from '~/Components/Container/ReviewUploadScreen/ReceiptRegisterScreen';
import ReceiptCamera from '~/Components/Container/ReceiptCamera';
import TakenPictureScreen from '~/Components/Container/ReviewUploadScreen/TakenPictureScreen';

// My Profile Stack Screen
import MyProfileScreen from '~/Components/Container/MyProfileScreen';

// Another Profile Stack Screen
import AnotherProfileScreen from '~/Components/Container/AnotherProfileScreen';

// Setting Stack Screen
import SettingScreen from '~/Components/Container/SettingScreen';

// Community Stack Screen
import CommunityScreen from '~/Components/Container/CommunityScreen';


const Tab = createBottomTabNavigator();

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ReviewUploadStack = createStackNavigator();
const MyProfileStack = createStackNavigator();
const ReviewStack = createStackNavigator();
const AnotherProfileStack = createStackNavigator();
const SettingStack = createStackNavigator();
const CommunityStack = createStackNavigator();

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
            name="NearDentistMap"
            component={NearDentistMap}/>
        </HomeStack.Navigator>
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
            name="MetaDataScreen"
            component={MetaDataScreen}/>
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
            name="ReceiptCamera"
            component={ReceiptCamera}/>
            <ReviewUploadStack.Screen
            name="TakenPictureScreen"
            component={TakenPictureScreen}/>
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

    if(routeName.name === 'ReviewStackScreen' || routeName.name === "NearDentistMap") {
      return false;
    }

    if(stackRouteName === 'ReviewStackScreen') {
      return false;
    }

    return true;
  }

    return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: styles.tabBar
      }}>
      <Tab.Screen 
      name="Home" 
      component={HomeStackScreen}
      options={({route}) => ({
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            source={
            focused
             ? require('~/Assets/Images/BottomTab/ic_home_focused.png')
             : require('~/Assets/Images/BottomTab/ic_home_outline.png')
            }
          />
        ),
        tabBarVisible: getHomeTabBarVisibility(route)
      })}
      />
      <Tab.Screen 
      name="Upload"
      component={ReviewUploadStackScreen}
      options={{
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            source={
               require('~/Assets/Images/BottomTab/ic_upload.png')
            }
          />
        ),
        tabBarVisible: false,
      }}
      />
      <Tab.Screen
      name="Community"
      component={CommunityStackScreen}
      options={{
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
          source={
            require('~/Assets/Images/BottomTab/ic_community_outline.png')
          }/>
        )
      }}/>
      <Tab.Screen 
      name="Profile" 
      component={MyProfileStackScreen}
      options={({route}) => ({
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            source={
              focused
               ? require('~/Assets/Images/BottomTab/ic_profile_focused.png')
               : require('~/Assets/Images/BottomTab/ic_profile_outline.png')
            }
          />
        ),
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
  });

export default Navigator