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

// Home Stack Screee 
import HomeScreen from '~/Components/Container/HomeScreen';

// Review Stack Screen
import ReviewDetailScreen from '~/Components/Container/ReviewDetailScreen';

// Review Upload Stack Screen
import ReviewUploadScreen from '~/Components/Container/ReviewUploadScreen';
import Camera from '~/Components/Container/Camera';
import Gallery from '~/Components/Container/Gallery';

// My Profile Stack Screen
import MyProfileScreen from '~/Components/Container/MyProfileScreen';

// Another Profile Stack Screen
import AnotherProfileScreen from '~/Components/Container/AnotherProfileScreen';

// Setting Stack Screen
import SettingScreen from '~/Components/Container/SettingScreen';

const Tab = createBottomTabNavigator();

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ReviewUploadStack = createStackNavigator();
const MyProfileStack = createStackNavigator();
const ReviewStack = createStackNavigator();
const AnotherProfileStack = createStackNavigator();
const SettingStack = createStackNavigator();

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
        </HomeStack.Navigator>
    )
}

function ReviewUploadStackScreen() {
    return (
        <ReviewUploadStack.Navigator
        headerMode="none">
            <ReviewUploadStack.Screen
            name="ReviewUploadScreen"
            component={ReviewUploadScreen}/>
            <ReviewUploadStack.Screen
            name="Camera"
            component={Camera}/>
            <ReviewUploadStack.Screen
            name="Gallery"
            component={Gallery}/>
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


function BottomTab() {

  const getHomeTabBarVisibility = (route: any) => {
    const routeName = route.state
    ? route.state.routes[route.state.index]
    : '';

    const stackRouteName = routeName.state
    ? routeName.state.routes[routeName.state.index].name
    : '';

    if(routeName.name === 'ReviewStackScreen') {
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