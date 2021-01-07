import React from 'react';
import Styled from 'styled-components/native';
import {Text, View} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Component
import RatingReport from '~/Components/Presentational/RatingReport';

const Container = Styled.View`
align-items: center;
border-top-width: 1px;
border-color: #E2E6ED;
`;

const PriceInfoContainer = Styled.View`
width: ${wp('100%')}px;
padding: 23px 16px 23px 16px;
`;

const InfoLabelText = Styled.Text`
font-weight: 800;
font-size: 14px;
color: #9AA2A9;
font-family: NanumSquare;
`;

const PriceItemContainer = Styled.View`
margin-top: 20px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ReceiptCertificationContainer = Styled.View`
padding: 6px 7px 6px 7px;
border-width: 1px;
border-color: #6CC9A8;
border-radius: 100px;
`;

const ReceiptCertificationText = Styled.Text`
font-weight: 800;
font-size: 10px;
color: #6CC9A8;
font-family: NanumSquare;
`;

const TotalPriceText = Styled.Text`
margin-left: 8px;
font-weight: 800;
font-size: 18px;
color: #000000;
font-family: NanumSquare;
`;

const ViewDetailPriceText = Styled.Text`
font-weight: 400;
font-size: 14px;
color: #000000;
font-family: NanumSquare;

`;

const SectionDevider = Styled.View`
width: ${wp('91.46%')}px;
height: 1px;
background-color: #F5F7F9;
`;

const RatingInfoContainer = Styled.View`
width: ${wp('100%')}px;
`;

const TreatmentDateInfoContainer = Styled.View`
width: ${wp('100%')}px;
padding: 24px 16px 24px 16px;
`;

const TreatmentDateText = Styled.Text`
margin-top: 16px;
font-weight: 400;
font-size: 16px;
color: #000000;
font-family: NanumSquare;
`;

interface Props {
    totalPrice: number,
    certifiedReceipt: boolean,
    ratingObj: object,
    treatmentDate: string,
}

const ReviewMetaInfo = ({totalPrice, certifiedReceipt, ratingObj, treatmentDate}: Props) => {
    console.log("RatingMetaInfo ratingObj", ratingObj)
    return (
        <Container>
            <PriceInfoContainer>
                <InfoLabelText>{"가격"}</InfoLabelText>
                <PriceItemContainer>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                    <ReceiptCertificationContainer>
                        <ReceiptCertificationText>
                            {"영수증"}
                        </ReceiptCertificationText>
                    </ReceiptCertificationContainer>
                    <TotalPriceText>
                        {totalPrice.toLocaleString() + "원 "}
                        <Text style={{fontWeight: "400", fontSize: 12, color: "#9AA2A9"}}>{"(총계)"}</Text>
                    </TotalPriceText>
                    </View>
                    <ViewDetailPriceText>{"상세비용"}</ViewDetailPriceText>
                </PriceItemContainer>
            </PriceInfoContainer>
            <SectionDevider/>
            <RatingInfoContainer>
                <InfoLabelText style={{paddingTop: 24, paddingLeft: 16}}>{"만족도"}</InfoLabelText>
                <RatingReport
                type={"review"}
                avgRating={ratingObj.avgRating}
                priceRating={ratingObj.priceRating}
                serviceRating={ratingObj.serviceRating}
                treatRating={ratingObj.treatRating}/>
            </RatingInfoContainer>
            <SectionDevider/>
            <TreatmentDateInfoContainer>
                <InfoLabelText>{"진료일"}</InfoLabelText>
                <TreatmentDateText>{treatmentDate}</TreatmentDateText>
            </TreatmentDateInfoContainer>
        </Container>
    )
}

export default ReviewMetaInfo


