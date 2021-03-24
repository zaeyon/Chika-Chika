import {Dimensions, Platform, StatusBar} from 'react-native';

// iphone X, Xs, 11 Pro, 12 mini
const WIDTH_X = 375;
const HEIGHT_X = 812;

// iphone 11, 11 Pro Max, Xr, Xs Max
const WIDTH_11 = 414;
const HEIGHT_11 = 896;

// iphone 12, 12 Pro
const WIDTH_12 = 390;
const HEIGHT_12 = 844;

// iphone 12 Pro Max
const WIDTH_12PM = 428;
const HEIGHT_12PM = 926;

const {height, width} = Dimensions.get('window');

export const hasNotch = () => {
    if(Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
        if((width === WIDTH_X && height === HEIGHT_X) || (width === WIDTH_11 && height === HEIGHT_11) || (width === WIDTH_12 && height === HEIGHT_12) || (width === WIDTH_12PM && height === HEIGHT_12PM)) {
            return true
        } else {
            return false
        }
    } else if(Platform.OS === 'android') {
        console.log("hasNotch StatusBar.currentHeight", StatusBar.currentHeight);
        if(StatusBar.currentHeight > 24) {
            return true
        } else {
            return false
        }
    }
}





