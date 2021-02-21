import React, {useState, useRef, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {launchCamera} from 'react-native-image-picker';

// Local Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

const Container = Styled.View`
padding-top: ${getStatusBarHeight()}
flex: 1;
background-color: #FFFFFF;
`;

const BodyContainer = Styled.View`
flex: 1;
align-items: center;
`;

const GuideContainer = Styled.View`
width: ${wp('100%')}px;
padding-top: 120px;
padding-bottom: 120px;
align-items: center;
background-color: #cccccc;
`;

const GuideText = Styled.Text`
`;

const SelectProofImageContainer = Styled.View`
margin-top: 20px;
width: ${wp('91.46%')}px;
height: ${wp('91.46%')}px;
`;

const SelectedProofImage = Styled.Image`
width: ${wp('91%')}px;
height: ${wp('91%')}px;
`;

const SelectedProofImageContainer = Styled.View`
flex: 1;
border-width: 1px;
align-items: center;
justify-content: center;
`;

interface Props {
    navigation: any,
    route: any
}

const SelectProofImageScreen = ({navigation, route}: Props) => {

    const [selectedProofImage, setSelectedProofImage] = useState<object>({});
    const [isActivatedFinish, setIsActivatedFinish] = useState<boolean>(false);

    const actionSheetItemList = ['취소', '촬영', '앨범'];
    const actionSheetRef = useRef<any>();

    useEffect(() => {
        if(selectedProofImage.uri) {
            setIsActivatedFinish(true)
        } else {
            setIsActivatedFinish(false)
        }

    }, [selectedProofImage])

    useEffect(() => {
        if(route.params?.selectedProofImage) {
            console.log("route.params?.selectedProofImage", route.params?.selectedProofImage);
            setSelectedProofImage(route.params?.selectedProofImage); 
        }
    }, [route.params?.selectedProofImage])

    const goBack = () => {
        navigation.navigate("ReviewMetaDataScreen");
    }

    const moveToGallery = () => {
        navigation.navigate('ImageSelectOneStackScreen', {
            screen: 'ImageSelectOneScreen',
            params: {
                requestType: 'SelectProofImageScreen',
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

    const clickNoSelectedImage = () => {
        actionSheetRef.current.show();
    }

    const clickSelectedImage = () => {
        actionSheetRef.current.show();
    }


    return (
        <Container>
            <NavigationHeader
            headerLeftProps={{type: 'arrow', onPress: goBack}}
            headerTitle={'증빙자료 첨부'}
            headerRightProps={{type: 'text', text: '완료', onPress: moveToReviewMetaData}}
            headerRightDisabled={!isActivatedFinish}
            headerRightActiveColor={"#00D1FF"}/>
            <ScrollView>
            <BodyContainer>
                <GuideContainer>
                    <GuideText>{"증빙 자료 항목 & 검수 과정에 대한 상세한 설명"}</GuideText>
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
                        <GuideText>{"사진 첨부"}</GuideText>
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

export default SelectProofImageScreen;

