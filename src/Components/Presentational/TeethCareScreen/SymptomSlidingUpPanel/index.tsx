import React, {useRef, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

// Local Component
import SlidingUpPanel from '~/Components/Presentational/TeethCareScreen/SymptomSlidingUpPanel/SlidingUpPanel/SlidingUpPanel';
import SymptomItem from '~/Components/Presentational/TeethCareScreen/SymptomItem';


const Container = Styled.View`
width: ${wp('100%')};
height: ${hp('100%')};
border-top-left-radius: 25px;
border-top-right-radius: 25px;
background-color: #ffffff;
border-width: 1px;
border-color: #f0f0f0;
align-items: center;
`;

const UpArrowIcon = Styled.Image`
width: ${wp('3.73%')};
height: ${wp('1.8%')};
`;

const PanelHeaderTitleText = Styled.Text`
padding-top: 14px;
font-weight: 400;
color: #595959;
font-size: 16px;
`;

const PanelHeaderContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('19%')};
flex-direction: column;
justify-content: center;
align-items: center;
`;

const SymptomListContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const SymptomItemContainer = Styled.View`
`;

const LookAtRelatedDiseaseButton = Styled.View`
margin-top: 16px;
width: ${wp('91.46%')};
height: ${wp('14.398%')};
background-color: #f2f2f2;
border-radius: 8px;
align-items: center;
justify-content: center;
`;

const LookAtRelatedDiseaseText = Styled.Text`
font-size: 16px;
`;



const TEST_SYMPTOM_DATA = [
    {
        name: "이시림",
    },
    {
        name: "잇몸출혈",
    },
    {
        name: "구취",
    },
    {
        name: "에나멜 손상",
    },
    {
        name: "치아 통증",
    },
    {
        name: "턱 통증",
    },
    {
        name: "흔들리는 이",
    },
    {
        name: "고름",
    },
]

interface Props {
    navigation: any,
    route: any,
}

const SymptomSlidingUpPanel = ({navigation, route}: Props) => {
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false)
    const [symptomList, setSymptomList] = useState<Array<any>>(TEST_SYMPTOM_DATA);
    const panelRef = useRef<any>(null)

    const openPanel = () => {
        setIsPanelOpen(true)
    }

    const hidePanel = () => {
        setIsPanelOpen(false);
    }

    const moveToRelatedDisease = () => {
        navigation.navigate("RelatedDiseaseScreen")
    }

    const renderSymptomItem = ({item, index}: any) => {
        return (
            <SymptomItemContainer style={index == 0 ? {paddingLeft: 16} : (index == symptomList.length - 1 ? {paddingRight: 16, paddingLeft: 16} : {paddingLeft: 16})}>
                <SymptomItem
                name={item.name}/>
            </SymptomItemContainer>
        )
    }

    return (
        <SlidingUpPanel
        backdropOpacity={0.2}
        ref={panelRef}
        draggableRange={{top: wp('100%'), bottom: isIphoneX() ? (wp('40%')) : (wp('25%'))}}
        openPanel={openPanel}
        hidePanel={hidePanel}>
        <Container>
            <PanelHeaderContainer>
                {!isPanelOpen && (
                <UpArrowIcon
                source={require('~/Assets/Images/Arrow/ic_upArrow.png')}/>
                )}
                {isPanelOpen && (
                <UpArrowIcon
                source={require('~/Assets/Images/Arrow/ic_downArrow.png')}/>
                )}
                <PanelHeaderTitleText>오늘은 어떤가요?</PanelHeaderTitleText>
            </PanelHeaderContainer>
            <SymptomListContainer>
                <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={symptomList}
                renderItem={renderSymptomItem}/>
            </SymptomListContainer>
            <TouchableWithoutFeedback onPress={() => moveToRelatedDisease()}>
            <LookAtRelatedDiseaseButton>
                <LookAtRelatedDiseaseText>{"관련질병 확인하기"}</LookAtRelatedDiseaseText>
            </LookAtRelatedDiseaseButton>
            </TouchableWithoutFeedback>
        </Container>
        </SlidingUpPanel>
    )
}

export default SymptomSlidingUpPanel


