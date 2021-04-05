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
`;

const InfoLabelText = Styled.Text`
font-weight: 800;
font-size: 14px;
line-height: 16px;
color: #000000;
`;

const PriceItemContainer = Styled.View`
margin-top: 8px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const InfoValueText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 16px;
color: #000000;
`;

const InfoDescripText = Styled.Text`
font-weight: 400; 
font-size: 12px;
line-height: 16px;
color: #4E525D;
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
`;

const TotalPriceText = Styled.Text`
margin-left: 4px;
font-weight: 400;
font-size: 14px;
color: #000000;
line-height: 16px;
`;

const ViewDetailPriceText = Styled.Text`
font-weight: 700;
font-size: 12px;
color: #9AA2A9;
`;

const ViewDetailPriceContainer = Styled.View`
border-bottom-width: 1px;
border-color: #9AA2A9;
`;

const SectionDevider = Styled.View`
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
font-size: 14px;
color: #9AA2A9;
`;

const AvgRatingValueText = Styled.Text`
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
font-size: 14px;
color: #000000;
line-height: 16px;
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
font-size: 14px;
color: #000000;
line-height: 16px;
`;

const DentalAddressContainer = Styled.View`
margin-top: 6px;
width: ${wp('65%')}px;
flex-direction: row;
align-items: center;
`;

const DentalAddressText = Styled.Text`
font-weight: 400;
font-size: 12px;
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
font-size: 12px;
color: #000000;
line-height: 16px;
`;

const DetailRatingValueText = Styled.Text`
margin-left: 4px;
font-weight: 700;
font-size: 12px;
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

const BracePeriodInfoContainer = Styled.View`
flex: 1;
padding: 14px 16px 16px 16px;
`;

const DentalNameContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const DentalRecommendBedge = Styled.View`
margin-left: 7px;
flex-direction: row;
align-items: center;
padding: 2px 6.5px 2px 6.5px;
background-color: #00D1FF;
border-radius: 30px;
`;

const RecommendIcon = Styled.Image`
width: ${wp('4%')}px;
height: ${wp('4%')}px;
`;

const RecommendText = Styled.Text`
margin-left: 3px;
font-weight: 700;
font-size: 10px;
color: #FFFFFF;
line-height: 16px;
`;

interface MetaInfoObj {
  dentalObj: any;
  ratingObj: any;
  treatmentDateObj: any;
  totalPriceObj: any;
  isDentalRecommend: boolean;
  bracePeriodObj: any;
}

interface Props {
  metaInfoObj: MetaInfoObj,
  isCertifiedReceipt: boolean;
  moveToDentalDetail: (dentalId: number) => void;
}

const ReviewMetaInfo = ({
  metaInfoObj,
  isCertifiedReceipt,
  moveToDentalDetail,
}: Props) => {

  console.log('ReviewMetaInfo metaInfoObj', metaInfoObj);

  console.log("ReviewMetaInfo isCertifiedReceipt", isCertifiedReceipt);

  let splitedAddress = new Array();
  let formattedAddress = '';

  if (metaInfoObj.dentalObj?.address) {
    splitedAddress = metaInfoObj.dentalObj.address.split(' (');
    formattedAddress = splitedAddress[0]
  }

  return (
    <Container>
      <TouchableWithoutFeedback
        onPress={() => moveToDentalDetail(metaInfoObj.dentalObj.id)}>
        <DentalInfoContainer>
          <DentalNameAddressContainer>
            <DentalNameContainer>
            <DentalNameText>{metaInfoObj.dentalObj?.originalName}
            </DentalNameText>
            {metaInfoObj.isDentalRecommend && (
            <DentalRecommendBedge>
              <RecommendIcon
              style={{tintColor: "#FFFFFF"}}
              source={require('~/Assets/Images/Dental/ic_recommend.png')}/>
              <RecommendText>{"추천"}</RecommendText>
            </DentalRecommendBedge>
            )}
            </DentalNameContainer>
            <DentalAddressContainer>
              <DentalAddressText>{formattedAddress}</DentalAddressText>
            </DentalAddressContainer>
          </DentalNameAddressContainer>
        </DentalInfoContainer>
      </TouchableWithoutFeedback>
      <SectionDevider/>
      <BracePeriodInfoContainer
      style={metaInfoObj.totalPriceObj?.treatPrice === 0 && {paddingBottom: 24}}>
        <InfoLabelText>{"교정 기간"}</InfoLabelText>
        <InfoValueText
        style={{marginTop: 8}}>{`${metaInfoObj.bracePeriodObj?.period}`}</InfoValueText>
        <InfoDescripText
        style={{marginTop: 9}}>{`${metaInfoObj.bracePeriodObj?.periodDate}`}</InfoDescripText>
      </BracePeriodInfoContainer>
      {metaInfoObj.totalPriceObj.treatPrice !== 0 && (
      <View>
      <SectionDevider
      style={{height: 0.7}}/>
      <PriceInfoContainer>
        <InfoLabelText>{'전체 시술 비용'}</InfoLabelText>
        <PriceItemContainer>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {isCertifiedReceipt && (
            <ReceiptCertificationContainer>
              <ReceiptCertificationText>
                {'영수증인증'}
              </ReceiptCertificationText>
            </ReceiptCertificationContainer>
            )}
            <TotalPriceText
            style={!isCertifiedReceipt && {marginLeft: 0}}>{metaInfoObj.totalPriceObj?.displayTreatPrice}</TotalPriceText>
          </View>
        </PriceItemContainer>
      </PriceInfoContainer>
      </View>
      )}
    </Container>
  );
};

const isEqual = (prevItem: any, nextItem: any) => {
  return (prevItem.metaInfoObj === nextItem.metaInfoObj)
}

const MemoizedReviewMetaInfo = React.memo(ReviewMetaInfo, isEqual)

export default MemoizedReviewMetaInfo;


