import React from 'react';
import Styled from 'styled-components/native';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Rating} from 'react-native-ratings';



// Local Component
import RatingReport from '~/Components/Presentational/RatingReport';

const Container = Styled.View`
background-color: #ffffff;
border-color: #E2E6ED;
border-width: 1px;
border-radius: 16px;
`;

const PriceInfoContainer = Styled.View`
padding: 16px 16px 16px 16px;
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
margin-top: 8px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const InfoValueText = Styled.View`
font-weight: 400;
font-size: 12px;
line-height: 16px;
color: #000000;
`;

const ReceiptCertificationContainer = Styled.View`
padding: 2px 4px 2px 4px;
border-width: 1px;
border-color: #00D1FF;
border-radius: 2px;
`;

const ReceiptCertificationText = Styled.Text`
font-weight: 700;
font-size: 10px;
line-height: 16px;
color: #00D1FF;
font-family: NanumSquare;
`;

const TotalPriceText = Styled.Text`
margin-left: 4px;
font-weight: 700;
font-size: 12px;
color: #000000;
line-height: 16px;
font-family: NanumSquare;
`;

const ViewDetailPriceText = Styled.Text`
font-weight: 700;
font-size: 12px;
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

const AvgRatingValueText = Styled.Text`
font-family: NanumSquare;
margin-left: 4px;
font-weight: 800;
line-height: 16px;
font-size: 12px;
color: #131F3C;
`;

const TreatmentDateInfoContainer = Styled.View`
padding: 16px 16px 24px 16px;
`;

const TreatmentDateText = Styled.Text`
margin-top: 8px;
font-weight: 400;
font-size: 12px;
color: #000000;
line-height: 16px;
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

const AvgRatingValueContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const RatingValueContainer = Styled.View`
margin-top: 8px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const RatingImage = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const StarListContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const DetailRatingContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const DetailRatingTypeText = Styled.Text`
font-weight: 400;
font-size: 10px;
color: #000000;
line-height: 16px;
`;

const DetailRatingValueText = Styled.Text`
margin-left: 4px;
font-weight: 700;
font-size: 10px;
color: #000000;
line-height: 16px;
`;

const DetailRatingDivider = Styled.View`
margin-left: 4px;
margin-right: 4px;
width: 1px;
height: ${hp('0.738%')}px;
background-color: #9AA2A9; 
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
    // if(treatmentDate) {

    //     splitedTreatmentDate = treatmentDate.split("");
    //     formattedTreatmentDate = splitedTreatmentDate[0] + splitedTreatmentDate[1] + splitedTreatmentDate[2] + splitedTreatmentDate[3] + "." + splitedTreatmentDate[6] + splitedTreatmentDate[7] + "." + splitedTreatmentDate[10] + splitedTreatmentDate[11]
    // }

    let splitedAddress = new Array();
    let formattedAddress = "";

    if(dentalObj?.address) {
        splitedAddress = dentalObj.address.split(" ");
        formattedAddress = splitedAddress[0] + " " + splitedAddress[1] + " " + splitedAddress[2] + " " + splitedAddress[3] + " " + splitedAddress[4]
    }

    return (
        <Container>
        <TouchableWithoutFeedback onPress={() => moveToDentalDetail(dentalObj.id)}>
        <DentalInfoContainer>
            <DentalNameAddressContainer>
                <DentalNameText>{dentalObj?.originalName}</DentalNameText>
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
                <AvgRatingValueContainer>
                <Rating
                type={"custom"}
                ratingImage={require('~/Assets/Images/Review/ic_ratingStar_swipe.png')}
                ratingColor={"#00D1FF"}
                ratingBackgroundColor={"#E2E6ED"}
                imageSize={wp('4.26%')}
                ratingCount={5}
                startingValue={ratingObj?.avgRating}
                readonly={true}/>
                <AvgRatingValueText>{ratingObj?.avgRating}</AvgRatingValueText>
                </AvgRatingValueContainer>
                <DetailRatingContainer>
                    <DetailRatingTypeText>{"시술"}</DetailRatingTypeText>
                    <DetailRatingValueText>{ratingObj?.treatRating}</DetailRatingValueText>
                    <DetailRatingDivider/>
                    <DetailRatingTypeText>{"서비스"}</DetailRatingTypeText>
                    <DetailRatingValueText>{ratingObj?.serviceRating}</DetailRatingValueText>
                    <DetailRatingDivider/>
                    <DetailRatingTypeText>{"가격"}</DetailRatingTypeText>
                    <DetailRatingValueText>{ratingObj?.priceRating}</DetailRatingValueText>
                </DetailRatingContainer>
                </RatingValueContainer>
            </RatingInfoContainer>
            <SectionDevider/>
            <PriceInfoContainer>
                <InfoLabelText>{"전체 시술 비용"}</InfoLabelText>
                <PriceItemContainer>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                    {/* {certifiedReceipt && ( */}
                    <ReceiptCertificationContainer>
                        <ReceiptCertificationText>
                            {"영수증인증"}
                        </ReceiptCertificationText>
                    </ReceiptCertificationContainer>
                    {/* )} */}
                    <TotalPriceText>
                        {totalPrice}
                    </TotalPriceText>
                    </View>
                    <ViewDetailPriceContainer>
                    <ViewDetailPriceText>{"상세 비용"}</ViewDetailPriceText>
                    </ViewDetailPriceContainer>
                </PriceItemContainer>
            </PriceInfoContainer>
            <SectionDevider/>
            <TreatmentDateInfoContainer>
                <InfoLabelText>{"방문 일자"}</InfoLabelText>
                <TreatmentDateText>{treatmentDate}</TreatmentDateText>
            </TreatmentDateInfoContainer>
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

