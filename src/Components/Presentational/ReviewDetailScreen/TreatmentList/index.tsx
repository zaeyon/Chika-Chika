import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('100%')}px;
`;

const TreatmentListContainer = Styled.View`
padding: 16px 16px 0px 16px;
flex-direction: row;
flex-wrap: wrap;
`;

const TreatmentItemContainer = Styled.View`
margin-top: 8px;
margin-right: 8px;
flex-direction: row;
align-items: center;
background-color: #F5F7F9;
padding: 4px 10px 4px 10px;
border-radius: 4px;
`;

const TreatmentText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
font-size: 12px;
line-height: 20px;
color: #131F3C;
`;

const HashText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
font-size: 12px;
line-height: 20px;
color: #9AA2A9;
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

    return (
        <Container>
            <TreatmentListContainer>
                    {treatmentArray.map((item, index) => {
                        return (
                            <TreatmentItemContainer>
                                <TreatmentText>
                                  <HashText>{"# "}</HashText>
                                  {item.name}
                                </TreatmentText>
                            </TreatmentItemContainer>
                        )
                    })}
            </TreatmentListContainer>
        </Container>
    )
}

export default TreatmentList;


