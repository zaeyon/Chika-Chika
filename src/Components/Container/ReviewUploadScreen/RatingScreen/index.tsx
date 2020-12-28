import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Keyboard, FlatList, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Rating} from '~/Components/Presentational/Rating';

const ratingImage = require('~/Assets/Images/Review/ic_swipeStar.png');


const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
 align-items: center;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('13.8%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;


const HeaderLeftContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
margin-top: 5px;
font-size: 18px;
color: #000000;
font-weight: bold
`;

const HeaderRightContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderSkipContainer = Styled.View`
position: absolute;
right: 0px;
padding: 14px 16px 13px 15px;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
align-items: center;
padding-top: 30px;
`;


const FooterContainer = Styled.View`
position: absolute;
bottom: 53px;

`;

const FinishButton = Styled.View`
width: ${wp('91.46%')};
height: ${wp('12.799%')};
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
width: ${wp('88%')};
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
width: ${wp('69.6%')};
height: ${wp('11.2%')};
justify-content: center;
padding-left: 12px;
background-color: #f6f7f8;
border-radius: 8px;
`;

const DetailPriceInput = Styled.TextInput`
width: ${wp('69.6%')};
height: ${wp('11.2%')};
font-size: 16px;
color: #ffffff00;
`;

const DisplayDetailPriceText = Styled.Text`
position: absolute;
left: 12px;
font-size: 16px;
color: #0075FF;
`;

const RatingItemContainer = Styled.View`
width: ${wp('91.73')};
height: ${wp('27.99%')};
justify-content: center;
align-items: center;
flex-direction: column;
border-width: 1px;
border-color: #c6c6c6;
border-radius: 8px;
background-color: #ffffff;
`;

const RatingLabelText = Styled.Text`
font-size: 16px;
color: #313131;
`;

const SwipeRatingContainer = Styled.View`
flex-direction: row;
margin-top: 7px;
`;




interface Props {
    navigation: any,
    route: any,
}

const RatingScreen = ({navigation, route}: Props) => {
     const [serviceRating, setServiceRating] = useState<number>(0);
     const [treatRating, setTreatRating] = useState<number>(0);
     const [priceRating, setPriceRating] = useState<number>(0);

     const [serviceRatingEnroll, setServiceRatingEnroll] = useState<boolean>(false);
     const [treatRatingEnroll, setTreatRatingEnroll] = useState<boolean>(false);
     const [priceRatingEnroll, setPriceRatingEnroll] = useState<boolean>(false);
     

     useEffect(() => {
         if(route.params?.inputedRating) {
             console.log("route.params.inputedRating", route.params.inputedRating);

             setServiceRating(route.params.inputedRating.serviceRating);
             setTreatRating(route.params.inputedRating.treatRating);
             setPriceRating(route.params.inputedRating.priceRating);
             
         }
     }, [route.params?.inputedRating])
    
    const goBack = () => {
        navigation.goBack();
    }
  
  const completeServiceRating = (rating: any) => {
    console.log("rating", rating);
    setServiceRating(rating);
    setServiceRatingEnroll(true);
}

const movingServiceRating = (rating: any) => {
    console.log("rating changed", rating)
}


const completeTreatRating = (rating: any) => {
    console.log("rating", rating);
    setTreatRating(rating);
    setTreatRatingEnroll(true);
}

const movingTreatRating = (rating: any) => {
    console.log("rating changed", rating)
}

const completePriceRating = (rating: any) => {
    setPriceRating(rating)
    setPriceRatingEnroll(true);
}

const movingPriceRating = (rating: any) => {
    console.log("rating changed", rating)
}

const onPressFinishButton = () => {
    if(serviceRating > 0 && treatRating > 0 && priceRating > 0) {
        if(route.params.requestPage === "detailPrice") {
            navigation.navigate("ContentPostScreen", {
            selectedTreatList: route.params?.selectedTreatList,
            dentalClinic: route.params?.dentalClinic,
            treatDate: route.params?.treatDate,
            treatPrice: route.params?.treatPrice,
            rating: {
                serviceRating: serviceRating,
                treatRating: treatRating,
                priceRating: priceRating,
                avgRating: ((serviceRating + treatRating + priceRating) / 3).toFixed(1)
            },
            detailPriceList: route.params?.detailPriceList,
            requestType: route.params?.requestType,
        });
        } else if(route.params?.requestPage === "content") {
            navigation.navigate("ContentPostScreen", {
                rating: {
                    serviceRating: serviceRating,
                    treatRating: treatRating,
                    priceRating: priceRating,
                    avgRating: ((serviceRating + treatRating + priceRating) / 3).toFixed(1)
                },
                requestType: route.params?.requestType,
            })
        }
    } else {
        Alert.alert("평점을 등록해주세요!")
    }
    
}





    return (
        <Container>
            <HeaderBar>
               <TouchableWithoutFeedback onPress={() => goBack()}>
                <HeaderLeftContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>만족도</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer/>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <RatingItemContainer>
                    <RatingLabelText>{"서비스 만족도"}</RatingLabelText>
                    <SwipeRatingContainer>
                    <Rating
                    type="custom"
                    ratingImage={ratingImage}
                    imageSize={wp('11%')}
                    fractions={2}
                    startingValue={serviceRating}
                    onFinishRating={completeServiceRating}
                    setRatingInMove={movingServiceRating}
                    />
                    </SwipeRatingContainer>
                </RatingItemContainer>
                <RatingItemContainer style={{marginTop: 24}}>
                    <RatingLabelText>{"진료 만족도"}</RatingLabelText>
                    <SwipeRatingContainer>
                    <Rating
                    type={'custom'}
                    ratingImage={ratingImage}
                    imageSize={wp('11%')}
                    fractions={2}
                    startingValue={treatRating}
                    onFinishRating={completeTreatRating}
                    setRatingInMove={movingTreatRating}
                    />
                    </SwipeRatingContainer>
                </RatingItemContainer>
                <RatingItemContainer style={{marginTop: 24}}>
                    <RatingLabelText>{"비용 만족도"}</RatingLabelText>
                    <SwipeRatingContainer>
                    <Rating
                    type={'custom'}
                    ratingImage={ratingImage}
                    imageSize={wp('11%')}
                    fractions={2}
                    startingValue={priceRating}
                    onFinishRating={completePriceRating}
                    setRatingInMove={movingPriceRating}
                    />
                    </SwipeRatingContainer>
                </RatingItemContainer>
            </BodyContainer>
            <FooterContainer>
            <TouchableWithoutFeedback onPress={() => onPressFinishButton()}>
            <FinishButton>
                <FinishText>확인</FinishText>
            </FinishButton>
            </TouchableWithoutFeedback>
            </FooterContainer>
        </Container>
    )
}

export default RatingScreen


