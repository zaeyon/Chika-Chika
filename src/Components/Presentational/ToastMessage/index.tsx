import React, {Component, useRef} from 'react';
import Styled from 'styled-components/native';
import {Animated, Easing} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('100%')}px;
padding-bottom: ${hp('15%')}px;
position: absolute;
bottom: 0px;
align-items: center;
`;

const ToastMessageBackground = Styled.View`
border-radius: 8px;
background-color: #000000;
padding: 8px 24px 8px 24px;
`;

const ToastMessageText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 24px;
color: #ffffff;
`;

interface Props {
    message: string,
}

let toastMessage: any




const destroySibling = () => {
    toastMessage.destroy();
}

class ToastMessage extends Component {

    static show = (message: string) => {
        const opacityValue = new Animated.Value(1);
        
        setTimeout(() => {
            Animated.timing(opacityValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start(({ finished }) => {
                toastMessage.destroy();
            })
        }, 1000)
        
        console.log("ToastMessage message", message);
        toastMessage = new RootSiblings
        (
        <Container>
        <Animated.View
        style={{
            opacity: opacityValue,    
        }}>
        <ToastMessageBackground>
            <ToastMessageText>{message}</ToastMessageText>
        </ToastMessageBackground>
        </Animated.View>
        </Container>
        )     
    };

    render() {
        return null
    }
}

export default ToastMessage;