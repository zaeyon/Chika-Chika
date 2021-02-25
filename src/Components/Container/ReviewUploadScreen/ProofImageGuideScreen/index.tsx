import React, {useState, useRef, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    TouchableWithoutFeedback,
    ScrollView,
    LayoutAnimation,
    Platform,
    UIManager,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {launchCamera} from 'react-native-image-picker';

// Local Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

const Container = Styled.View`
padding-top: ${getStatusBarHeight()}
flex: 1;
background-color: #F5F7F9;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #F5F7F9;
padding-bottom: 50px;
`;

const GuideContainer = Styled.View`
background-color: #F5F7F9;
padding-top: 32px;
padding-bottom: 32px;
padding-left: 16px;
padding-right: 16px;
`;

const GuideLabelText = Styled.Text`
color: #131F3C;
font-weight: 700;
font-size: 14px;
line-height: 24px;
`;

const SelectProofImageContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
background-color: #ffffff;
padding-top: 16px;
padding-bottom: 16px;
`;

const SelectedProofImage = Styled.Image`
width: ${wp('91%')}px;
height: ${wp('49%')}px;
resizeMode: contain
`;

const SelectedProofImageContainer = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('49.86%')}px;
border-width: 1px;
align-items: center;
justify-content: center;
border-radius: 8px;
`;

const InspectionProcedureContainer = Styled.View`
margin-top: 16px;
background-color: #FFFFFF;
border-radius: 8px;
`;

const InspectionProcedureBannerImage = Styled.Image`
border-radius: 8px;
width: ${wp('91.46%')}px;
height: ${wp('53.3%')}px;
`;

const ProofTypeListContainer = Styled.View`
margin-top: 16px;
`;

const ProofTypeItemContainer = Styled.View`
`;

const ProofTypeItemLabelContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ProofTypeHeaderContainer = Styled.View`
background-color: #FFFFFF;
border-radius: 8px;
flex-direction: row;
justify-content: space-between;
padding: 16px 16px 16px 16px;
`;

const ProofTypeIndexContainer = Styled.View`
background-color: #00D1FF;
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
border-radius: 100px;
align-items: center;
justify-content: center;
`;

const ProofTypeIndexText = Styled.Text`
font-weight: 700;
font-size: 16px;
color: #FFFFFF;
`;

const ProofTypeLabelText = Styled.Text`
margin-left: 12px;
font-size: 16px;
font-weight: 700;
color: #131F3C;
`;

const DropDownIconContainer = Styled.View`
position: absolute;
right: 0px;
padding: 16px;
`;

const DropDownIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const ProofTypeDescripContainer = Styled.View`
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
background-color: #FFFFFF;
padding: 16px;
`;

const ProofTypeDescripText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;

const CardDescripImage = Styled.Image`
width: ${wp('82.93%')}px;
height: ${wp('25.59%')}px;
`;

const SelectProofImageText = Styled.Text`
font-weight: 700;
font-size: 16px;
color: #00D1FF;
`;


const SaveProofImageContainer = Styled.View`
margin-top: 16px;
padding-top: 16px;
padding-bottom: 16px;
align-items: center;
background-color: #00D1FF;
border-radius: 8px;
`;

const SaveProofImageButton = Styled.View`
margin-top: 16px;
padding-top: 16px;
padding-bottom: 16px;
align-items: center;
background-color: #00D1FF;
border-radius: 8px;
`;

const SaveProofImageText = Styled.Text`
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #FFFFFF;
`;



if(Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
    navigation: any,
    route: any
}

const ProofImageGuideScreen = ({navigation, route}: Props) => {

    const [selectedProofImage, setSelectedProofImage] = useState<object>({});
    const [isActivatedFinish, setIsActivatedFinish] = useState<boolean>(false);

    const [isVisibleCardDescrip, setIsVisibleCardDescrip] = useState<boolean>(false);
    const [isVisibleBankingDescrip, setIsVisibleBankingDescrip] = useState<boolean>(false);
    const [isVisibleReceiptDescrip, setIsVisibleReceipDescrip] = useState<boolean>(false);

    const [cardDescripLayoutHeight, setCardDescripLayoutHeight] = useState<any>(new Animated.Value(0)); 

    const cardLayoutHeightValueAnim = useRef(new Animated.Value(0)).current;


    const actionSheetItemList = ['취소', '촬영', '앨범'];
    const actionSheetRef = useRef<any>();

    const cardDescripLayoutMaxHeight = cardDescripLayoutHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 130]
    });

    useEffect(() => {
        if(route.params?.selectedProofImage) {
            console.log("route.params?.selectedProofImage", route.params?.selectedProofImage);
            setSelectedProofImage(route.params?.selectedProofImage);
        }
    }, [route.params?.selectedProofImage])

    useEffect(() => {
        if(route.params?.isDeletedProofImage) {
            navigation.setParams({isDeletedProofImage: false})
            setSelectedProofImage({});
        }
    }, [route.params?.isDeletedProofImage])

    const goBack = () => {
        navigation.navigate("ReviewMetaDataScreen");
    }

    const moveToGallery = () => {
        navigation.navigate('ImageSelectOneStackScreen', {
            screen: 'ImageSelectOneScreen',
            params: {
                requestType: 'ProofImageGuideScreen',
            }
          });
    }

    const moveToReviewMetaData = () => {
        navigation.navigate('ReviewMetaDataScreen', {
            selectedProofImage: selectedProofImage,
        })
    }

    const moveToCamera = () => {
        launchCamera({includeBase64: true, mediaType: 'photo'}, (response: CameraResponse) => {
            if (!response.didCancel) {
              const capturedImage = {
                filename: response.fileName,
                fileSize: response.fileSize,
                width: response.width,
                height: response.height,
                uri: response.uri,
                base64: response.base64,
                camera: true,
              };
              setSelectedProofImage(capturedImage);
            }
          }); 
    }

    const onPressSelectProofImageActionSheet = (index: number) => {

        switch(actionSheetItemList[index]) {
            case '촬영':
                moveToCamera();
                break;
            case '앨범':
                moveToGallery();
                break;
        }
    }

    const clickSelectedImage = () => {
        console.log("clickSelectedImage selectedProofImage", selectedProofImage); 
        navigation.navigate("FullProofImageScreen", {
            selectedProofImage: selectedProofImage,
        })
    }

    const clickNoSelectedImage = () => {
        actionSheetRef.current.show();
    }

    const clickCardSpecificationDropDown = () => {
        if(!isVisibleCardDescrip) {
            setIsVisibleCardDescrip(true);
            Animated.timing(cardDescripLayoutHeight, {
                toValue: 1,
                duration: 300,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(cardDescripLayoutHeight, {
                toValue: 0,
                duration: 300,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start(() => {
                setIsVisibleCardDescrip(false);
            });
        }

    }


    return (
        <Container>
            <NavigationHeader
            headerLeftProps={{type: 'arrow', onPress: goBack}}
            headerTitle={'증빙자료 첨부'}
            headerRightProps={{type: 'text', text: '완료', onPress: moveToReviewMetaData}}
            headerRightDisabled={false}
            headerRightActiveColor={"#00D1FF"}/>
            <ScrollView
            contentContainerStyle={{backgroundColor: "#F5F7F9"}}
            showsVerticalScrollIndicator={false}>
            <BodyContainer>
                <GuideContainer>
                    <GuideLabelText>{"영수증 리뷰 검수절차"}</GuideLabelText>
                    <InspectionProcedureContainer>
                        <InspectionProcedureBannerImage
                        source={require('~/Assets/Images/Upload/InspectionProcedureBanner.png')}/>
                    </InspectionProcedureContainer>
                    <GuideLabelText
                    style={{marginTop: 32}}>{"진료 인증이 가능한 자료"}</GuideLabelText>
                    <ProofTypeListContainer>
                        <ProofTypeItemContainer
                        style={styles.proofTypeShadow}>
                            <TouchableWithoutFeedback onPress={() => clickCardSpecificationDropDown()}>
                            <ProofTypeHeaderContainer
                            style={isVisibleCardDescrip && {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
                            <ProofTypeItemLabelContainer>
                                <ProofTypeIndexContainer>
                                    <ProofTypeIndexText>{"1"}</ProofTypeIndexText>
                                </ProofTypeIndexContainer>
                                <ProofTypeLabelText>{"카드결제 문자내역"}</ProofTypeLabelText>
                            </ProofTypeItemLabelContainer>
                            <DropDownIconContainer>
                            <DropDownIcon
                            source={require('~/Assets/Images/Upload/ic_dropDown.png')}/>
                            </DropDownIconContainer>
                            </ProofTypeHeaderContainer>
                            </TouchableWithoutFeedback>
                            <Animated.Image
                            style={[styles.description, {height: cardDescripLayoutMaxHeight, width: wp('91.46%')}]}
                            source={require('~/Assets/Images/Upload/descrip_card.png')}>
                            </Animated.Image>
                        </ProofTypeItemContainer>
                        <ProofTypeItemContainer
                        style={[styles.proofTypeShadow, {marginTop: 8}]}>
                            <ProofTypeHeaderContainer>
                            <ProofTypeItemLabelContainer>
                                <ProofTypeIndexContainer>
                                    <ProofTypeIndexText>{"2"}</ProofTypeIndexText>
                                </ProofTypeIndexContainer>
                                <ProofTypeLabelText>{"뱅킹 앱 / 인터넷 뱅킹"}</ProofTypeLabelText>
                            </ProofTypeItemLabelContainer>
                            <DropDownIcon
                            source={require('~/Assets/Images/Upload/ic_dropDown.png')}/>
                            </ProofTypeHeaderContainer>
                        </ProofTypeItemContainer>
                        <ProofTypeItemContainer
                        style={[styles.proofTypeShadow, {marginTop: 8}]}>
                            <ProofTypeHeaderContainer>
                            <ProofTypeItemLabelContainer>
                                <ProofTypeIndexContainer>
                                    <ProofTypeIndexText>{"3"}</ProofTypeIndexText>
                                </ProofTypeIndexContainer>
                                <ProofTypeLabelText>{"진료 영수증 / 처방전 / 진단서"}</ProofTypeLabelText>
                            </ProofTypeItemLabelContainer>
                            <DropDownIcon
                            source={require('~/Assets/Images/Upload/ic_dropDown.png')}/>
                            </ProofTypeHeaderContainer>
                        </ProofTypeItemContainer>
                    </ProofTypeListContainer>
                </GuideContainer>
                <SelectProofImageContainer>
                    {selectedProofImage?.uri && (
                        <TouchableWithoutFeedback onPress={() => clickSelectedImage()}>
                        <SelectedProofImageContainer>
                        <SelectedProofImage
                        source={{uri: selectedProofImage.uri}}/>
                        </SelectedProofImageContainer>
                        </TouchableWithoutFeedback>
                    )}
                    {!selectedProofImage?.uri && (
                        <TouchableWithoutFeedback onPress={() => clickNoSelectedImage()}>
                        <SelectedProofImageContainer>
                            <SelectProofImageText>{"인증자료 가져오기"}</SelectProofImageText>
                        </SelectedProofImageContainer>
                        </TouchableWithoutFeedback>
                    )}
                </SelectProofImageContainer>
            </BodyContainer>
            </ScrollView>
            <ActionSheet
            ref={actionSheetRef}
            options={actionSheetItemList}
            cancelButtonIndex={0}
            onPress={(index: number) => onPressSelectProofImageActionSheet(index)}/>
        </Container>
    )
}

const styles = StyleSheet.create({
    proofTypeShadow: {
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    description: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: "#FFFFFF",
    }
})

export default ProofImageGuideScreen;

