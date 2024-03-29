import React, {useEffect, useState, createRef, useMemo, memo} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
// import DeviceInfo from 'react-native-device-info';

import DentalCarouselItem from '~/Components/Presentational/NearDentalMap/DentalCarouselItem';


const DentalCarouselListContainer = Styled.View`
align-items: center;
`;

const DentalCarouselItemContainer = Styled.View`
`;

const CarouselIndexText = Styled.Text`
font-weight: 700;
font-size: 12px;
color: #ffffff;
`;

const CarouselIndexContainer = Styled.View`
padding-top: 8px;
`;


const carouselItem = (({item, index, todayIndex, moveToDentalDetail, clickDentalCallReservation}: any) => {

    const isLunchTime = item.lunchTimeNow == 1 ? true : false;
    const isOpen = item.conclustionNow == 1 ? true : false;
    const rating = item.reviewAVGStarRate ? item.reviewAVGStarRate : "평가없음";

    const splitedAddressArray = item.address.split(" ");

    const deletedAddress = splitedAddressArray[0] + " " + splitedAddressArray[1] + " " + splitedAddressArray[2] + " " + splitedAddressArray[3]
    
    let todayStartTime = ""
    let todayEndTime = ""

    if(todayIndex === 0) {
        todayStartTime = item.Sun_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Sun_Consulation_end_time?.slice(0, 5);
    } else if(todayIndex === 1) {
        todayStartTime = item.Mon_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Mon_Consulation_end_time?.slice(0, 5);
    } else if(todayIndex === 2) {
        todayStartTime = item.Tus_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Tus_Consulation_end_time?.slice(0, 5);
    } else if(todayIndex === 3) {
        todayStartTime = item.Wed_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Wed_Consulation_end_time?.slice(0, 5);
    } else if(todayIndex === 4) {
        todayStartTime = item.Thu_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Thu_Consulation_end_time?.slice(0, 5);
    } else if(todayIndex === 5) {
        todayStartTime = item.Fri_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Fri_Consulation_end_time?.slice(0, 5);
    } else if(todayIndex === 6) {
        todayStartTime = item.Sat_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Sat_Consulation_end_time?.slice(0, 5);
    }

    return (
        <TouchableWithoutFeedback onPress={() => moveToDentalDetail(item.id)}>
        <DentalCarouselItemContainer>
            <DentalCarouselItem
            dentalObj={item}
            isOpen={isOpen}
            isLunchTime={isLunchTime}
            rating={rating}
            reviewCount={item.reviewNum}
            name={item.originalName}
            address={deletedAddress}
            lunchTime={item.lunchTime}
            openTime={todayStartTime}
            closeTime={todayEndTime}
            clickDentalCallReservation={clickDentalCallReservation}/>
        </DentalCarouselItemContainer>
        </TouchableWithoutFeedback>
    )
});


function isEqualItem(prevItem: any, nextItem: any) {
    return (prevItem.item === nextItem.item)
}

const MemoizedCarouselItem = memo(carouselItem, isEqualItem);

const DentalCarouselList = ({searchedDentalArr, onSnapToDentalCarouselItem, selectedDentalIndex, dentalCarouselRef, todayIndex, moveToDentalDetail, clickDentalCallReservation}: any) => {

    const renderCarouselItem = ({item, index}: any) => (
        <MemoizedCarouselItem
        item={item}
        index={item}
        todayIndex={todayIndex}
        moveToDentalDetail={moveToDentalDetail}
        clickDentalCallReservation={clickDentalCallReservation}
        />
    )

    return (
        <DentalCarouselListContainer>
        <Carousel
        slideStyle={{alignItems: 'center', paddingTop: 20, paddingBottom: hp('2.9%')}}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        inactiveSlideShift={0}
        onSnapToItem={(index) => onSnapToDentalCarouselItem(index)}
        ref={dentalCarouselRef}
        data={searchedDentalArr}
        renderItem={renderCarouselItem}
        sliderWidth={wp('100%')}
        firstItem={selectedDentalIndex}
        itemWidth={wp('93.6%')}/>
        </DentalCarouselListContainer>
    );
}

const styles = StyleSheet.create({
    carouselIndexShadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 6,
        shadowOpacity: 0.5
    },
})


export default DentalCarouselList;


/*

        <CarouselIndexContainer>
            <CarouselIndexText style={styles.carouselIndexShadow}>{selectedDentalIndex+1 + " / " + searchedDentalArr.length}
            </CarouselIndexText>
        </CarouselIndexContainer>
*/
