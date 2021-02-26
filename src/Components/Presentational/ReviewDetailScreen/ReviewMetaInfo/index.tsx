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
margin-top: 4px;
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

interface MetaInfoObj {
  dentalObj: any;
  ratingObj: any;
  treatmentDateObj: any;
  totalPriceObj: any;
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
    splitedAddress = metaInfoObj.dentalObj.address.split(' ');
    formattedAddress =
      splitedAddress[0] +
      ' ' +
      splitedAddress[1] +
      ' ' +
      splitedAddress[2] +
      ' ' +
      splitedAddress[3] +
      ' ' +
      splitedAddress[4];
  }

  return (
    <Container>
      <TouchableWithoutFeedback
        onPress={() => moveToDentalDetail(metaInfoObj.dentalObj.id)}>
        <DentalInfoContainer>
          <DentalNameAddressContainer>
            <DentalNameText>{metaInfoObj.dentalObj?.originalName}</DentalNameText>
            <DentalAddressContainer>
              <DentalAddressText>{formattedAddress}</DentalAddressText>
            </DentalAddressContainer>
          </DentalNameAddressContainer>
          <DentalImageContainer>
            <DentalImage
            source={{uri: metaInfoObj.dentalObj.profileImages[0]}}/>
          </DentalImageContainer>
        </DentalInfoContainer>
      </TouchableWithoutFeedback>
      <SectionDevider />
      <RatingInfoContainer>
        <InfoLabelText>{'회원님의 병원 만족도'}</InfoLabelText>
        <RatingValueContainer>
          <AvgRatingValueContainer>
            <Rating
              type={'custom'}
              ratingImage={require('~/Assets/Images/Review/ic_ratingStar_swipe.png')}
              ratingColor={'#00D1FF'}
              ratingBackgroundColor={'#E2E6ED'}
              imageSize={wp('4.26%')}
              ratingCount={5}
              startingValue={metaInfoObj.ratingObj?.avgRating}
              readonly={true}
            />
            <AvgRatingValueText>{metaInfoObj.ratingObj?.avgRating}</AvgRatingValueText>
          </AvgRatingValueContainer>
          <DetailRatingContainer>
            <DetailRatingTypeText>{'시술'}</DetailRatingTypeText>
            <DetailRatingValueText>
              {metaInfoObj.ratingObj?.treatmentRating}
            </DetailRatingValueText>
            <DetailRatingDivider />
            <DetailRatingTypeText>{'서비스'}</DetailRatingTypeText>
            <DetailRatingValueText>
              {metaInfoObj.ratingObj?.serviceRating}
            </DetailRatingValueText>
            <DetailRatingDivider />
            <DetailRatingTypeText>{'가격'}</DetailRatingTypeText>
            <DetailRatingValueText>
              {metaInfoObj.ratingObj?.priceRating}
            </DetailRatingValueText>
          </DetailRatingContainer>
        </RatingValueContainer>
      </RatingInfoContainer>
      <SectionDevider />
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
            style={!isCertifiedReceipt && {marginLeft: 0}}>{metaInfoObj.totalPriceObj.displayTreatPrice}</TotalPriceText>
          </View>
        </PriceItemContainer>
      </PriceInfoContainer>
      <SectionDevider />
      <TreatmentDateInfoContainer>
        <InfoLabelText>{'방문 일자'}</InfoLabelText>
        <TreatmentDateText>{metaInfoObj.treatmentDateObj.displayTreatmentDate}</TreatmentDateText>
      </TreatmentDateInfoContainer>
    </Container>
  );
};

const isEqual = (prevItem: any, nextItem: any) => {
  return (prevItem.metaInfoObj === nextItem.metaInfoObj)
}

const MemoizedReviewMetaInfo = React.memo(ReviewMetaInfo, isEqual)

export default MemoizedReviewMetaInfo;


