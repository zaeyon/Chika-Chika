import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Rating} from '~/Components/Presentational/Rating';

// Local Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

const ratingImage = require('~/Assets/Images/Upload/ic_swipeStar.png');

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #F5F7F9;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
`;

const FooterContainer = Styled.View`
position: absolute;
bottom: 53px;
`;

const FinishButton = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('12.799%')}px;
border-radius: 8px;
background-color: #0075FF;
align-items: center;
justify-content: center;
`;

const FinishText = Styled.Text`
font-weight: bold;
font-size: 16px;
color: #ffffff;
`;

const SkipText = Styled.Text`
font-size: 16px;
color: #797979;
`;

const DetailPriceItemContainer = Styled.View`
width: ${wp('88%')}px;
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-bottom: 16px;
`;

const DetailPriceLabelText = Styled.Text`
font-size: 16px; 
color: #000000;
`;

const DetailPriceInputContainer = Styled.View`
width: ${wp('69.6%')}px;
height: ${wp('11.2%')}px;
justify-content: center;
padding-left: 12px;
background-color: #f6f7f8;
border-radius: 8px;
`;

const RatingItemContainer = Styled.View`
padding-top: 24px;
padding-bottom: 24px;
padding-left: 16px;
padding-right: 29px;
justify-content: space-between;
align-items: center;
flex-direction: row;
border-radius: 12px;
background-color: #ffffff;
`;

const RatingLabelText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 24px;
color: #313131;
`;

const RatingValueText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 24px;
color: #313131;
`;

const SwipeRatingContainer = Styled.View`
position: absolute;
right: 31;
align-items: center;
padding-right: 40px;
background-color: #ffffff;
flex-direction: row;
`;

const RatingValueContainer = Styled.View`
position: absolute;
right: 0px;
`;

const RatingLabelContainer = Styled.View`
`;

interface Props {
  navigation: any;
  route: any;
}

const RatingScreen = ({navigation, route}: Props) => {
  const [serviceRating, setServiceRating] = useState<number>(0);
  const [treatmentRating, setTreatmentRating] = useState<number>(0);
  const [priceRating, setPriceRating] = useState<number>(0);

  const [defaultServiceRating, setDefaultServiceRating] = useState<number>(
    route.params.ratingObj.serviceRating
      ? route.params.ratingObj.serviceRating
      : 0,
  );

  const [defaultTreatmentRating, setDefaultTreatmentRating] = useState<number>(
    route.params.ratingObj.treatmentRating
      ? route.params.ratingObj.treatmentRating
      : 0,
  );

  const [defaultPriceRating, setDefaultPriceRating] = useState<number>(
    route.params.ratingObj.priceRating ? route.params.ratingObj.priceRating : 0,
  );

  const [isActivatedFinish, setIsActivatedFinish] = useState<boolean>(false);

  useEffect(() => {
    if (route.params?.ratingObj.serviceRating) {
      console.log('route.params?.ratingObj', route.params?.ratingObj);
      setServiceRating(route.params.ratingObj.serviceRating);
      setTreatmentRating(route.params.ratingObj.treatmentRating);
      setPriceRating(route.params.ratingObj.priceRating);

      setDefaultServiceRating(route.params.ratingObj.serviceRating);
      setDefaultTreatmentRating(route.params.ratingObj.treatmentRating);
      setDefaultPriceRating(route.params.ratingObj.priceRating);
    }
  }, [route.params?.ratingObj]);

  useEffect(() => {
    if (
      serviceRating > 0 &&
      treatmentRating > 0 &&
      priceRating > 0 &&
      !isActivatedFinish
    ) {
      setIsActivatedFinish(true);
    }
  }, [serviceRating, treatmentRating, priceRating]);

  const goBack = () => {
    navigation.goBack();
  };

  const completeServiceRating = (rating: any) => {
    setServiceRating(rating);
  };

  const movingServiceRating = (rating: any) => {
    setServiceRating(rating);
  };

  const completeTreatmentRating = (rating: any) => {
    setTreatmentRating(rating);
  };

  const movingTreatmentRating = (rating: any) => {
    setTreatmentRating(rating);
  };

  const completePriceRating = (rating: any) => {
    setPriceRating(rating);
  };

  const movingPriceRating = (rating: any) => {
    setPriceRating(rating);
  };

  const onPressFinishButton = () => {
    navigation.navigate('ReviewMetaDataScreen', {
      ratingObj: {
        serviceRating: serviceRating,
        priceRating: priceRating,
        treatmentRating: treatmentRating,
      },
    });
  };

  const renderSwipeServiceRating = useCallback(() => {
    return (
      <Rating
        type="custom"
        ratingImage={ratingImage}
        imageSize={wp('8.53%')}
        fractions={2}
        minValue={0.5}
        jumpValue={0.5}
        ratingColor="#00D1FF"
        ratingBackgroundColor="#E2E6ED"
        startingValue={defaultServiceRating}
        onFinishRating={completeServiceRating}
        onStartRating={movingServiceRating}
        onSwipeRating={movingServiceRating}
      />
    );
  }, [defaultServiceRating]);

  const renderSwipeTreatmentRating = useCallback(() => {
    return (
      <Rating
        type="custom"
        ratingImage={ratingImage}
        imageSize={wp('8.53%')}
        fractions={2}
        minValue={0.5}
        jumpValue={0.5}
        ratingColor="#00D1FF"
        ratingBackgroundColor="#E2E6ED"
        startingValue={defaultTreatmentRating}
        onFinishRating={completeTreatmentRating}
        onStartRating={movingTreatmentRating}
        onSwipeRating={movingTreatmentRating}
      />
    );
  }, [defaultTreatmentRating]);

  const renderSwipePriceRating = useCallback(() => {
    return (
      <Rating
        type="custom"
        ratingImage={ratingImage}
        imageSize={wp('8.53%')}
        fractions={2}
        minValue={0.5}
        jumpValue={0.5}
        ratingColor="#00D1FF"
        ratingBackgroundColor="#E2E6ED"
        startingValue={defaultPriceRating}
        onFinishRating={completePriceRating}
        onStartRating={movingPriceRating}
        onSwipeRating={movingPriceRating}
      />
    );
  }, [defaultPriceRating]);

  return (
    <Container>
      <NavigationHeader
        headerLeftProps={{type: 'arrow', onPress: goBack}}
        headerTitle={'병원 만족도'}
        headerRightProps={{
          type: 'text',
          text: '완료',
          onPress: onPressFinishButton,
        }}
        headerRightActiveColor={'#00D1FF'}
        headerRightDisabled={!isActivatedFinish}
      />
      <BodyContainer>
        <RatingItemContainer style={{marginTop: 0}}>
          <RatingLabelText>{'진료 만족도'}</RatingLabelText>
          <SwipeRatingContainer
            onLayout={(e) => console.log('container', e.nativeEvent.layout)}>
            {renderSwipeTreatmentRating()}
            <RatingValueContainer>
              <RatingValueText>{treatmentRating.toFixed(1)}</RatingValueText>
            </RatingValueContainer>
          </SwipeRatingContainer>
        </RatingItemContainer>
        <RatingItemContainer style={{marginTop: 16}}>
          <RatingLabelText>{'비용 만족도'}</RatingLabelText>
          <SwipeRatingContainer>
            {renderSwipePriceRating()}
            <RatingValueContainer>
              <RatingValueText>{priceRating.toFixed(1)}</RatingValueText>
            </RatingValueContainer>
          </SwipeRatingContainer>
        </RatingItemContainer>
        <RatingItemContainer style={{marginTop: 16}}>
          <RatingLabelContainer>
            <RatingLabelText>{'서비스 만족도'}</RatingLabelText>
          </RatingLabelContainer>
          <SwipeRatingContainer>
            {renderSwipeServiceRating()}
            <RatingValueContainer>
              <RatingValueText>{serviceRating.toFixed(1)}</RatingValueText>
            </RatingValueContainer>
          </SwipeRatingContainer>
        </RatingItemContainer>
      </BodyContainer>
    </Container>
  );
};

export default RatingScreen;

/*

      <FooterContainer>
        <TouchableWithoutFeedback onPress={() => onPressFinishButton()}>
          <FinishButton>
            <FinishText>확인</FinishText>
          </FinishButton>
        </TouchableWithoutFeedback>
      </FooterContainer>
*/
