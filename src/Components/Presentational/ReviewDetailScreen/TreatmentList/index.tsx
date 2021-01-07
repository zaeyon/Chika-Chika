import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
background-color: #ffffff;
zIndex: 1;
`;

const TreatmentListContainer = Styled.View`
`;

const FoldedTreatmentListContainer = Styled.View`
padding: 16px; 16px; 0px 16px;
flex-direction: row;
`;

const UnfoldedTreatmentListContainer = Styled.View`
padding: 16px; 16px; 0px 16px;
flex-direction: row;
flex-wrap: wrap;
`;

const TreatmentItemContainer = Styled.View`
padding: 10px 16px 10px 16px;
border-width: 1px;
border-color: #F5F7F9;
border-radius: 100px;
`;

const TreatmentText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
font-size: 14px;
color: #9AA2A9;
`;

const FooterContainer = Styled.View`
padding: 0px 16px 9px 16px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const TreatmentCountText = Styled.Text`
font-family: NanumSquare;
font-weight: 400;
font-size: 12px;
color: #9AA2A9;
`;

const ElapsedTimeText = Styled.Text`
font-family: NanumSquare;
font-weight: 400;
font-size: 12px;
color: #9AA2A9;
`;

const FoldButtonContainer = Styled.View`
width: ${wp('13.6%')}px;
height: ${wp('18.5%')}px;
zIndex: 1;
padding-right: 16px;
align-items: flex-end;
justify-content: center;
position: absolute;
right: 0;
top: 0;
`;

const UnfoldIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const FoldIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

interface Props {
    treatmentArray: Array<object>;
    elapsedTime: string
}

const TEST_TREATMENT_DATA = [
        {
          "id": 1,
          "name": "충치",
          "review_treatment_item": {
            "cost": null,
            "index": 1
          }
        },
        {
          "id": 2,
          "name": "발치",
          "review_treatment_item": {
            "cost": null,
            "index": 2
          }
        },
        {
          "id": 3,
          "name": "임플란트",
          "review_treatment_item": {
            "cost": null,
            "index": 3
          }
        },
        {
          "id": 4,
          "name": "복합레진",
          "review_treatment_item": {
            "cost": null,
            "index": 4
          }
        },
        {
            "id": 4,
            "name": "테스트1",
            "review_treatment_item": {
              "cost": null,
              "index": 4
            }
          },
          {
            "id": 4,
            "name": "테스트2",
            "review_treatment_item": {
              "cost": null,
              "index": 4
            }
          },
          {
            "id": 4,
            "name": "테스트3",
            "review_treatment_item": {
              "cost": null,
              "index": 4
            }
          }
]


const TreatmentList = ({treatmentArray, elapsedTime}: Props) => {
    const [testTreatmentArray, setTestTreatmentArray] = useState<Array<any>>(TEST_TREATMENT_DATA);
    const [isFolded, setIsFolded] = useState<boolean>(false);
    const [isVisibleFoldIcon, setIsVisibleFoldIcon] = useState<boolean>(false);

    const treatmentListWidth = useRef<number>(0);
    
    const foldTreatmentList = () => {
        setIsFolded(true);
    }

    const unfoldTreatmentList = () => {
        setIsFolded(false);
    }
    
    return (
        <Container style={styles.bottomShadow}>
            <TreatmentListContainer>
                {!isFolded && (
                    <UnfoldedTreatmentListContainer>
                    {treatmentArray.map((item, index) => {
                        return (
                            <TreatmentItemContainer
                            onLayout={(event) => {
                                console.log("치료 항목 width", event.nativeEvent.layout);
                                treatmentListWidth.current = treatmentListWidth.current + event.nativeEvent.layout.width;
                                console.log("treatmentListWidth.current", treatmentListWidth.current)
                                if(treatmentListWidth.current > wp('88%')) {
                                    console.log("treatmentListWidth.current", treatmentListWidth.current)
                                    setIsVisibleFoldIcon(true);
                                }
                            }}
                            style={[{marginRight: 8, marginBottom: 8}, index === 0 && {borderColor: "#2998FF"}]}>
                                <TreatmentText
                                style={index === 0 && {color: "#00D1FF"}}>
                                {item.name}
                                </TreatmentText>
                            </TreatmentItemContainer>
                        )
                    })}
                    </UnfoldedTreatmentListContainer>
                )}
                {isFolded && (
                    <FoldedTreatmentListContainer>
                    {treatmentArray.map((item, index) => {
                        return (
                            <TreatmentItemContainer
                            onLayout={(event) => {
                                console.log("치료 항목 Item layout", event.nativeEvent.layout)
                            }}
                            style={[{marginRight: 8, marginBottom: 8}, index === 0 && {borderColor: "#2998FF"}]}>
                                <TreatmentText
                                style={index === 0 && {color: "#00D1FF"}}>
                                    {item.name}
                                </TreatmentText>
                            </TreatmentItemContainer>
                        )
                    })}
                    </FoldedTreatmentListContainer>
                )}
                {isFolded && isVisibleFoldIcon && (
                <TouchableWithoutFeedback onPress={() => unfoldTreatmentList()}>
                <FoldButtonContainer
                style={styles.foldButtonShadow}>
                    <UnfoldIcon
                    source={require('~/Assets/Images/Review/ic_unfold.png')}/>
                </FoldButtonContainer>
                </TouchableWithoutFeedback>
                )}
                {!isFolded && isVisibleFoldIcon && (
                <TouchableWithoutFeedback onPress={() => foldTreatmentList()}>
                <FoldButtonContainer>
                    <FoldIcon
                    source={require('~/Assets/Images/Review/ic_fold.png')}/>
                </FoldButtonContainer>
                </TouchableWithoutFeedback>
                )}
            </TreatmentListContainer>
            <FooterContainer>
                <TreatmentCountText>{treatmentArray.length + "개 항목"}</TreatmentCountText>
                <ElapsedTimeText>{elapsedTime}</ElapsedTimeText>
            </FooterContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
    bottomShadow: {
        shadowOffset: {
            width:0,
            height: 4,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        shadowColor: "#F5F7F9"
    },
    foldButtonShadow: {
        backgroundColor: "#ffffff",
        shadowOffset: {
            width: -20,
            height: 0,
        },
        shadowRadius: 10,
        shadowOpacity: 10,
        shadowColor: "#ffffff"
    }
})



export default TreatmentList;


