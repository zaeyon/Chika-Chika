import React, {useState} from 'react';
import {TouchableWithoutFeedback, Dimensions, View} from 'react-native';
import Styled from 'styled-components/native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ImageEditor from "@react-native-community/image-editor";

let {width, height} = Dimensions.get('window');
const Container = Styled.View`
`;

const HeaderBar = Styled.View`
 position: absolute;
 top: ${getStatusBarHeight()}
 width: ${wp('100%')}px;
 height: ${wp('20.7%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
padding: 7px 15px 13px 16px;
align-items: center;
justify-content: center;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const HeaderRightContainer = Styled.View`
padding: 7px 15px 13px 16px;
align-items: center;
justify-content: center;
`;

const ChangeCameraTypeText = Styled.Text`
`;

const CameraCuideContainer = Styled.View`
position: absolute;
background-color: transparent;
border-width: ${wp('100%')/2};
border-radius: ${wp('100%')};
border-color: #000000;
top: ${-wp('100%')/2 + 100},
left: ${-wp('100%')/2 + 50},
right: ${-wp('100%')/2 + 50},
bottom: ${-wp('100%')/2 + 200},
opacity: 0.3;
`;

const CameraGuideInnerContainer = Styled.View`
width: ${wp('70%')};
height: ${hp('70%')};
background-color: #ffffff00;
`;

const TakePhotoContainer = Styled.View`
position: absolute;
width: ${wp('100%')};
justify-content: center;
align-items: center;
bottom: 30;
padding-bottom: 20px;
`;

const TakePhotoButton = Styled.View`
position: absolute;
width: 80px;
height: 80px;
border-radius: 100px;
background-color: #ffffff;
bottom: 0;
`;

const CameraGuideTextContainer = Styled.Text`
width: ${wp('100%')};
padding-top: 80;
position: absolute;
align-items: center;
justify-content: center;
`;

const CameraGuideText = Styled.Text`
text-align: center;
justify-content: center;
color: #ffffff;
font-size: 20px;
`;

const Touchable = Styled.TouchableOpacity``;


interface Props {
    navigation: any,
    route: any,
}

const ReceiptCamera = ({navigation, route}: Props) => {
    const [cameraType, setCameraType] = useState<string>("front");
    const cameraRef = React.useRef(null); // useRef로 camera를 위한 ref를 하나 만들어 주고

    const takePhoto = async () => {
        console.log('cameraRef', cameraRef);
        if(cameraRef) {
            const data = await cameraRef.current.takePictureAsync({
                quality: 1,
                exif: true,
                doNotSave: false,
            });
            console.log('촬영한 사진 data', data);
            if(data) {
                
                CameraRoll.save(data.uri)
                .then((result) => {
                    console.log("사진 저장 성공 result", result)    
                })
                .catch((error) => {
                    console.log("사진 저장 실패 error", error);
                })
                
            }
        }
    };

    const changeCameraType = () => {
        if(cameraType === "front") {
            setCameraType("back")
        } else if(cameraType === "back") {
            setCameraType("front")
        }
    }

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <Container>
            <RNCamera
            ref={cameraRef}
            style={{
                width: wp('100%'),
                height: hp('100%'),
            }}
            captureAudio={false}
            type={cameraType === "front" ? RNCamera.Constants.Type.front : (cameraType === "back" ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front)}
            />
            <TakePhotoContainer>
            <TouchableWithoutFeedback onPress={() => takePhoto()}>
            <TakePhotoButton/>
            </TouchableWithoutFeedback>
            </TakePhotoContainer>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => goBack()}>
                <HeaderLeftContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() =>changeCameraType()}>
                <HeaderRightContainer>
                    <ChangeCameraTypeText>카메라 전환</ChangeCameraTypeText>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
        </Container>
    )
}

export default ReceiptCamera;