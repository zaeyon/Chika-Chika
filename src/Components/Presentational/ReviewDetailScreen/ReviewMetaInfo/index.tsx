import React from 'react';
import Styled from 'styled-components/native';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Component
import RatingReport from '~/Components/Presentational/RatingReport';

const Container = Styled.View`
background-color: #ffffff;
border-color: #E2E6ED;
border-width: 1px;
border-radius: 16px;
`;

const PriceInfoContainer = Styled.View`
padding: 24px 24px 24px 24px;
background-color: #ffffff;
`;

const InfoLabelText = Styled.Text`
font-weight: 800;
font-size: 12px;
line-height: 16px;
color: #000000;
font-family: NanumSquare;
`;

const PriceItemContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ReceiptCertificationContainer = Styled.View`
padding: 6px 8px 6px 8px;
border-width: 1px;
border-color: #00D1FF;
border-radius: 100px;
`;

const ReceiptCertificationText = Styled.Text`
font-weight: 800;
font-size: 10px;
color: #00D1FF;
font-family: NanumSquare;
`;

const TotalPriceText = Styled.Text`
margin-left: 4px;
font-weight: 800;
font-size: 18px;
color: #131F3C;
font-family: NanumSquare;
`;

const ViewDetailPriceText = Styled.Text`
font-weight: 700;
font-size: 14px;
color: #9AA2A9;
font-family: NanumSquare;
`;

const ViewDetailPriceContainer = Styled.View`
border-bottom-width: 1px;
border-color: #9AA2A9;
`;

const SectionDevider = Styled.View`
flex: 1;
margin-left: 16px;
margin-right: 16px;
height: 0.5px;
background-color: #E2E6ED;
`;

const RatingInfoContainer = Styled.View`
flex: 1;
flex-direction: column;
padding: 16px 16px 16px 16px;
`;

const RatingInfoItemContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const RatingInfoItemDivider = Styled.View`
margin-left: 12px;
margin-right: 12px;
width: 1px;
height: ${hp('1.87%')}px;
background-color: #E2E6ED
`;

const RatingExpressIcon = Styled.Image`
width: ${wp('4.8%')}px;
height: ${wp('4.8%')}px;
`;

const RatingTypeText = Styled.Text`
margin-left: 8px;
font-family: NanumSquare;
font-size: 14px;
color: #9AA2A9;
`;

const RatingValueText = Styled.Text`
font-family: NanumSquare;
margin-left: 4px;
font-weight: 800;
line-height: 16px;
font-size: 12px;
color: #131F3C;
`;

const TreatmentDateInfoContainer = Styled.View`
padding: 24px 24px 24px 24px;
`;

const TreatmentDateText = Styled.Text`
font-weight: 800;
font-size: 16px;
color: #131F3C;
font-family: NanumSquare;
`;

const DentalInfoContainer = Styled.View`
flex: 1;
padding: 24px 16px 16px 16px;
flex-direction: row;
align-items: center;
justify-content: space-between;

`;

const DentalNameAddressContainer = Styled.View`
`;

const DentalNameText = Styled.Text`
font-weight: 800;
font-size: 12px;
color: #000000;
font-family: NanumSquare;
line-height: 16px;
`;

const DentalAddressContainer = Styled.View`
margin-top: 4px;
width: ${wp('65%')}px;
flex-direction: row;
align-items: center;
`;

const DentalAddressText = Styled.Text`
font-family: NanumSquare;
font-weight: 400;
font-size: 10px;
color: #4E525D;
line-height: 16px;
`;

const DentalImageContainer = Styled.View`
`;

const DentalImage = Styled.Image`
width: ${wp('10.6%')}px;
height: ${wp('10.6%')}px;
border-width: 1px;
border-color: #c4c4c4;
border-radius: 100px;
`;

const RatingValueContainer = Styled.View`
margin-top: 8px;
flex-direction: row;
align-items: center;
`;

const RatingImage = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const StarListContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

interface dentalObj {
    originalName: string,
    address: string,
    id: number,
}

interface Props {
    totalPrice: number,
    certifiedReceipt: boolean,
    ratingObj: object,
    treatmentDate: string,
    dentalObj: dentalObj,
    moveToDentalDetail: (dentalId: number) => void,
}

const ReviewMetaInfo = ({totalPrice, certifiedReceipt, ratingObj, treatmentDate, dentalObj, moveToDentalDetail}: Props) => {
    console.log("RatingMetaInfo ratingObj", ratingObj);
    console.log("ReviewMetaInfo dentalObj", dentalObj);
    

    let splitedTreatmentDate = new Array
    let formattedTreatmentDate = ""
    if(treatmentDate) {

        splitedTreatmentDate = treatmentDate.split("");
        formattedTreatmentDate = splitedTreatmentDate[0] + splitedTreatmentDate[1] + splitedTreatmentDate[2] + splitedTreatmentDate[3] + "." + splitedTreatmentDate[6] + splitedTreatmentDate[7] + "." + splitedTreatmentDate[10] + splitedTreatmentDate[11]
    }

    let splitedAddress = new Array();
    let formattedAddress = "";

    if(dentalObj.address) {
        splitedAddress = dentalObj.address.split(" ");
        formattedAddress = splitedAddress[0] + " " + splitedAddress[1] + " " + splitedAddress[2] + " " + splitedAddress[3] + " " + splitedAddress[4]
    }


const RatingStarList = ({ratingValue, ratingImage, interval}: any) => {

    let isInteger = false;
    let tmpArray = [0, 0, 0, 0, 0]

    if(ratingValue % 1 !== 0) {
        
        for(var i = 0; i < Math.round(ratingValue); i++) {
            if(i === Math.round(ratingValue) - 1) {
                tmpArray[i] = 0.5
            } else {
                tmpArray[i] = 1
            }
        }
    } else if(ratingValue % 1 === 0) {
        
        for(var i = 0; i < ratingValue; i++) {
            tmpArray[i] = 1
        }
    }

    return (
        <StarListContainer>
            {tmpArray.map((item, index) => {
                if(item === 0) {
                    return (
                        <RatingImage
                        style={[{tintColor: "#CCD1DD"}, index !== 0 && {marginLeft: 0}]}
                        source={require('~/Assets/Images/Indicator/ic_ratingStar_empty.png')}/>
                    )
                } else if(item === 1) {
                    return (
                        <RatingImage
                        style={index !== 0 && {marginLeft: 0}}
                        source={require('~/Assets/Images/Indicator/ic_ratingStar_full.png')}/>
                    )
                } else if(item === 0.5) {
                    return (
                        <RatingImage
                        style={index !== 0 && {marginLeft: 0}}
                        source={require('~/Assets/Images/Indicator/ic_ratingStar_half.png')}/>
                    )
                } else {
                    return (
                        <View
                        style={{width:0, height: 0}}/>
                    )
                } 
            })}
            <RatingValueText style={{marginTop: 2, marginLeft: 8}}>{ratingValue.toFixed(1)}</RatingValueText>
        </StarListContainer>
    )
    }



    return (
        <Container>
        <TouchableWithoutFeedback onPress={() => moveToDentalDetail(dentalObj.id)}>
        <DentalInfoContainer>
            <DentalNameAddressContainer>
                <DentalNameText>{dentalObj.originalName}</DentalNameText>
                <DentalAddressContainer>
                    <DentalAddressText>{formattedAddress}</DentalAddressText>
                </DentalAddressContainer>
            </DentalNameAddressContainer>
            <DentalImageContainer>
                <DentalImage/>
            </DentalImageContainer>
        </DentalInfoContainer>
        </TouchableWithoutFeedback>
        <SectionDevider/>
            <RatingInfoContainer>
                <InfoLabelText>{"회원님의 병원 만족도"}</InfoLabelText>
                <RatingValueContainer>
                <RatingStarList
                ratingValue={ratingObj.avgRating}/>
                </RatingValueContainer>
            </RatingInfoContainer>
            <SectionDevider/>
            <TreatmentDateInfoContainer>
                <TreatmentDateText>{formattedTreatmentDate}<TreatmentDateText style={{fontWeight: "400", fontSize: 16}}>{"  방문"}</TreatmentDateText></TreatmentDateText>
            </TreatmentDateInfoContainer>
            <SectionDevider/>
            <PriceInfoContainer>
                <PriceItemContainer>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                    {certifiedReceipt && (
                    <ReceiptCertificationContainer>
                        <ReceiptCertificationText>
                            {"영수증인증"}
                        </ReceiptCertificationText>
                    </ReceiptCertificationContainer>
                    )}
                    <TotalPriceText>
                        {totalPrice.toLocaleString() + "원 "}
                    </TotalPriceText>
                    <Text style={{fontWeight: "400", fontSize: 14, color: "#9AA2A9", lineHeight: 24, fontFamily: "NanumSquare"}}>{"(총계)"}</Text>
                    </View>
                    <ViewDetailPriceContainer>
                    <ViewDetailPriceText>{"상세비용"}</ViewDetailPriceText>
                    </ViewDetailPriceContainer>
                </PriceItemContainer>
            </PriceInfoContainer>
        </Container>
    )
}

export default ReviewMetaInfo



/*

        <Container>
        <TouchableWithoutFeedback onPress={() => moveToDentalDetail(dentalObj.id)}>
        <DentalInfoContainer>
            <DentalNameAddressContainer>
                <DentalNameText>{dentalObj.originalName}</DentalNameText>
                <DentalAddressContainer>
                    <DentalAddressText>{formattedAddress}</DentalAddressText>
                </DentalAddressContainer>
            </DentalNameAddressContainer>
            <DentalImageContainer>
                <DentalImage/>
            </DentalImageContainer>
        </DentalInfoContainer>
        </TouchableWithoutFeedback>
            <RatingInfoContainer>
                <RatingInfoItemContainer>
                    <RatingExpressIcon
                    source={
                        ratingObj.treatRating.toFixed(1) > 3.5 ? require('~/Assets/Images/Review/ic_good.png') : (
                        ratingObj.treatRating.toFixed(1) > 1.5 ? require('~/Assets/Images/Review/ic_soso.png') : (
                        require('~/Assets/Images/Review/ic_bad.png')
                        )
                        )
                    }/>
                    <RatingTypeText>{"진료"}</RatingTypeText>
                    <RatingValueText>{ratingObj.treatRating.toFixed(1)}</RatingValueText>
                </RatingInfoItemContainer>
                <RatingInfoItemDivider/>
                <RatingInfoItemContainer>
                    <RatingExpressIcon
                    source={
                        ratingObj.serviceRating.toFixed(1) > 3.5 ? require('~/Assets/Images/Review/ic_good.png') : (
                        ratingObj.serviceRating.toFixed(1) > 1.5 ? require('~/Assets/Images/Review/ic_soso.png') : (
                        require('~/Assets/Images/Review/ic_bad.png')
                        )
                        )
                    }/>
                    <RatingTypeText>{"서비스"}</RatingTypeText>
                    <RatingValueText>{ratingObj.serviceRating.toFixed(1)}</RatingValueText>
                </RatingInfoItemContainer>
                <RatingInfoItemDivider/>
                <RatingInfoItemContainer>
                    <RatingExpressIcon
                    source={
                        ratingObj.priceRating.toFixed(1) > 3.5 ? require('~/Assets/Images/Review/ic_good.png') : (
                        ratingObj.priceRating.toFixed(1) > 1.5 ? require('~/Assets/Images/Review/ic_soso.png') : (
                        require('~/Assets/Images/Review/ic_bad.png')
                        )
                        )
                    }/>
                    <RatingTypeText>{"가격"}</RatingTypeText>
                    <RatingValueText>{ratingObj.priceRating.toFixed(1)}</RatingValueText>
                </RatingInfoItemContainer>
            </RatingInfoContainer>
            <SectionDevider/>
            <TreatmentDateInfoContainer>
                <TreatmentDateText>{formattedTreatmentDate}<TreatmentDateText style={{fontWeight: "400", fontSize: 16}}>{"  방문"}</TreatmentDateText></TreatmentDateText>
            </TreatmentDateInfoContainer>
            <SectionDevider/>
            <PriceInfoContainer>
                <PriceItemContainer>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                    {certifiedReceipt && (
                    <ReceiptCertificationContainer>
                        <ReceiptCertificationText>
                            {"영수증인증"}
                        </ReceiptCertificationText>
                    </ReceiptCertificationContainer>
                    )}
                    <TotalPriceText>
                        {totalPrice.toLocaleString() + "원 "}
                    </TotalPriceText>
                    <Text style={{fontWeight: "400", fontSize: 14, color: "#9AA2A9", lineHeight: 24, fontFamily: "NanumSquare"}}>{"(총계)"}</Text>
                    </View>
                    <ViewDetailPriceContainer>
                    <ViewDetailPriceText>{"상세비용"}</ViewDetailPriceText>
                    </ViewDetailPriceContainer>
                </PriceItemContainer>
            </PriceInfoContainer>
        </Container>
*/

