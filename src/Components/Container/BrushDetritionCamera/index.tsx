import React, {useState, useRef, useEffect} from 'react';
import {TouchableWithoutFeedback, Animated} from 'react-native';
import Styled from 'styled-components/native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import DeviceInfo from 'react-native-device-info';

const Container = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
`;

const HeaderBar = Styled.View`
position: absolute;
top: ${DeviceInfo.hasNotch() ? hp('5%') : hp('4%')}px;
width: ${wp('100%')}px;
height: ${wp('13.8%')}px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
padding: 7px 15px 13px 16px;
height: ${wp('13.8%')}px;
align-items: center;
justify-content: center;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
font-size: 16px;
color: #ffffff;
`;

const HeaderCancelIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
tint-color: #ffffff;
`;

const HeaderRightContainer = Styled.View`
padding: 7px 15px 13px 16px;
height: ${wp('13.8%')}px;
align-items: center;
justify-content: center;
`;

const CameraCoverContainer = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
align-items: center;
justify-content: center;
`;

const GuideLineBackground = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
background-color: #000000;
opacity: 0.8;
`;

const GuideLineContainer = Styled.View`
width: ${wp('42.93%')}px;
height: ${wp('42.93%')}px;
`;

const GuideLineTopLeft = Styled.View`
width: ${wp('9%')}px;
height: ${wp('9%')}px;
border-color: #c4c4c4;
opacity: 1;
border-top-left-radius: 8px;
border-top-width: ${wp('3.17%')}px;
border-left-width: ${wp('3.17%')}px;
position: absolute;
top: 0
left: 0
`;

const GuideLineTopLeftImage = Styled.Image`
width: ${wp('9%')}px;
height: ${wp('9%')}px;
position: absolute;
top: 0
left: 0
`;

const GuideLineTopRightImage = Styled.Image`
width: ${wp('9%')}px;
height: ${wp('9%')}px;
position: absolute;
top: 0
right: 0
`;

const GuideLineBottomLeftImage = Styled.Image`
width: ${wp('9%')}px;
height: ${wp('9%')}px;
position: absolute;
bottom: 0
left: 0
`;

const GuideLineBottomRightImage = Styled.Image`
width: ${wp('9%')}px;
height: ${wp('9%')}px;
position: absolute;
bottom: 0
right: 0
`;

const CameraGuideText = Styled.Text`
font-size: 24px;
color: #ffffff;
font-weight: 300;
text-align: center;
`;

const CameraGuideTextContainer = Styled.View`
margin-top: 29px;
`;

const TakePictureButton = Styled.View`
width: ${wp('16.266%')}px;
height: ${wp('16.266%')}px;
border-radius: 100px;
background-color: #ffffff;
border-width: 6px;
border-color: #595959;
position: absolute;
bottom: ${hp('10%')}px;
`;

interface Props {
    navigation: any,
    route: any,
}

const BrushDetritionCamera = ({navigation, route}: Props) => {
    const [guideLineState, setGuideLineState] = useState<string>("unfold");
    const [guideText, setGuideText] = useState<string>(`칫솔모를 촬영해서\n칫솔 마모정도를\n확인해보세요.`)
    const guideLineTLAniValue = useRef(new Animated.ValueXY()).current;
    const guideLineTRAniValue = useRef(new Animated.ValueXY()).current;
    const guideLineBLAniValue = useRef(new Animated.ValueXY()).current;
    const guideLineBRAniValue = useRef(new Animated.ValueXY()).current;

    const coverOpaAniValue = useRef(new Animated.Value(1)).current;
    const cameraRef = useRef<any>(null);

    const guideLineTLAnim = Animated.spring(guideLineTLAniValue, {
        toValue: -wp('17%'),
        useNativeDriver: true,
        bounciness: 12
    })

    const guideLineTRAnim = Animated.spring(guideLineTRAniValue, {
        toValue: wp('17%'),
        useNativeDriver: true,
        bounciness: 12
    })

    const guideLineBLAnim = Animated.spring(guideLineBLAniValue, {
        toValue: -wp('17%'),
        useNativeDriver: true,
        bounciness: 12
    })

    const guideLineBRAnim = Animated.spring(guideLineBRAniValue, {
        toValue: wp('17%'),
        useNativeDriver: true,
        bounciness: 12
    })

    useEffect(() => {
        if(route.params?.remeasure) {
            setGuideLineState("open")
            setGuideText(`칫솔 옆모습을\n평평한 배경에서\n칫솔대는 안보이게!`)
    
           Animated.parallel([guideLineTLAnim, guideLineTRAnim, guideLineBLAnim, guideLineBRAnim]).start()
        }

    }, [route.params?.remeasure])

     


    const takePicture = async () => {
        if(cameraRef) {
            const data = await cameraRef.current.takePictureAsync({
                quality: 1,
                exif: true,
                doNotSave: false,
            });

            console.log("촬영한 사진 data", data);

            if(data) {
                CameraRoll.save(data.uri)
                .then((result) => {
                    console.log("사진 저장 성공 result", result);
                    navigation.navigate("MeasuredBrushPictureScreen", {
                        takenPicture: result
                    });
                    
                })
                .catch((error) => {
                    console.log("사진 저장 실패 error", error);
                })
            }
        }
    }

    const openGuideLine = () => {
        if(guideLineState === "unfold") {
            setGuideLineState("open");
            setGuideText(`칫솔 옆모습을\n평평한 배경에서\n칫솔대는 안보이게!`)

            console.log("open guide line")

           Animated.parallel([guideLineTLAnim, guideLineTRAnim, guideLineBLAnim, guideLineBRAnim]).start()
        }
    }

    const goBack = () => {
        navigation.navigate("TeethCareScreen")
    }

    return (
        <TouchableWithoutFeedback onPress={() => openGuideLine()}>
        <Container>
            <RNCamera
            ref={cameraRef}
            style={{
                width: wp('100%'),
                height: hp('100%'),
            }}
            captureAudio={false}
            type={RNCamera.Constants.Type.back}/>
            <CameraCoverContainer>
                <Animated.View
                style={{
                    position: "absolute",
                    width: wp('100%'),
                    height: hp('100%'),
                    opacity: coverOpaAniValue
                }}>
                <GuideLineBackground>
                </GuideLineBackground>
                </Animated.View>
                <GuideLineContainer>
                    <Animated.View
                    style={{
                        transform: [{translateX: guideLineTLAniValue.x}],
                        position: "absolute",
                        left: 0,
                        top: 0,
                    }}>
                    <GuideLineTopLeftImage
                    source={require('~/Assets/Images/Camera/ic_brushGuideLine_topLeft.png')}/>
                    </Animated.View>
                    <Animated.View
                    style={{
                        transform: [{translateX: guideLineTRAniValue.x}],
                        position: "absolute",
                        right: 0,
                        top: 0,
                    }}>
                    <GuideLineTopRightImage
                    source={require('~/Assets/Images/Camera/ic_brushGuideLine_topRight.png')}/>
                    </Animated.View>
                    <Animated.View
                    style={{
                        transform: [{translateX: guideLineBLAniValue.x}],
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                    }}>
                    <GuideLineBottomLeftImage
                    source={require('~/Assets/Images/Camera/ic_brushGuideLine_bottomLeft.png')}/>
                    </Animated.View>
                    <Animated.View
                    style={{
                        transform: [{translateX: guideLineBRAniValue.x}],
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                    }}>
                    <GuideLineBottomRightImage
                    source={require('~/Assets/Images/Camera/ic_brushGuideLine_bottomRight.png')}/>
                    </Animated.View>
                </GuideLineContainer>
                <CameraGuideTextContainer>
                    <CameraGuideText>
                        {guideText}
                    </CameraGuideText>
                </CameraGuideTextContainer>
                {guideLineState === "open" && (
                    <TouchableWithoutFeedback onPress={() => takePicture()}>
                    <TakePictureButton/>
                    </TouchableWithoutFeedback>
                )}
            </CameraCoverContainer>
            <HeaderBar>
                <HeaderLeftContainer>
                    <HeaderEmptyContainer/>
                </HeaderLeftContainer>
                <HeaderTitleText>{"측정하기"}</HeaderTitleText>
                <TouchableWithoutFeedback onPress={() => goBack()}>
                <HeaderRightContainer>
                    <HeaderCancelIcon
                    source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default BrushDetritionCamera;