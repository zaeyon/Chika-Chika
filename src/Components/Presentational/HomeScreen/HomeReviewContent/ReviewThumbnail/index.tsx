import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  LayoutAnimation,
  Image,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {Rating} from 'react-native-ratings';

const ReviewThumbnailContainerView = Styled.View`
width: ${wp('79%')}px;
flex: 1;
border-radius: 8px;
margin-right: 16px;
padding: 20px 16px;
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;

const ReviewHeaderView = Styled.View`
flex-direction: row;
align-items:center;
`;

const ReviewTitleText = Styled.Text`
font-style: normal;
font-weight: 600;
font-size: 15px;
line-height: 18px;
color: #131F3C;
`;

const ReviewRatingView = Styled.View`
margin-left: auto;
flex-direction: row;
align-items:center;
`
const ReviewRatingText = Styled.Text`
margin-left: 4px;
font-weight: 800;
font-size: 14px;
color: #131F3C;`;

const ReviewContentView = Styled.View`
flex-direction: row;
flex: 1;
`;

const ReviewContentDescriptionView= Styled.View`
flex: 1;
margin-right: 8px;
`;
const ReviewContentText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 24px;
`;

const ReviewContentImage = Styled.Image`
width: 72px;
height: 72px;
margin-left: auto;
border-radius: 8px;
`;

const ReviewRecommendationView = Styled.View`
margin-left: auto;
flex-direction: row;
align-items: center;
`;

const ReviewRecommendationImage = Styled.Image`
margin-right: 3px;
`;

const ReviewRecommendationText = Styled.Text`
font-style: normal;
font-weight: 600;
font-size: 13px;
line-height: 18px;
color: #131F3C;
`;

const HashTagContainerView = Styled.View`
width: 100%;
height: auto;
padding: 12px 0px;
flex-direction: row;
`;

const HashTagIconView = Styled.TouchableOpacity`
width: auto;
height: auto;
flex-direction: row;
align-items: center;
padding: 4px 6px;
margin-right: 8px;
border-radius: 4px;
background-color: #F5F7F9;
`;
const HashTagIconText = Styled.Text`
font-style: normal;
font-weight: 500;
font-size: 13px;
line-height: 16px;
text-align: center;
color: #A8A3A3;
`;

const AvgRatingValueContainer = Styled.View`
flex-direction: row;
align-items: center;
margin-right: 10px;
`;

const AvgRatingValueText = Styled.Text`
margin-left: 4px;
font-weight: 800;
font-size: 14px;
color: #131F3C;
`;

const RatingValueContainer = Styled.View`

flex-direction: row;
align-items: center;
padding: 0px 4px;
`;

const DetailRatingContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const DetailRatingTypeText = Styled.Text`
font-weight: 400;
font-size: 12px;
color: #4E525D;
line-height: 16px;
`;

const DetailRatingValueText = Styled.Text`
margin-left: 4px;
font-weight: 700;
font-size: 12px;
color: #4E525D;
line-height: 16px;
`;

const DetailRatingDivider = Styled.View`
margin-left: 4px;
margin-right: 4px;
width: 1px;
height: ${hp('0.738%')}px;
background-color: #9AA2A9; 
`;

interface Props {
  review: any;
  moveToReviewDetail: any;
}
const ReviewThumbnail = ({review, moveToReviewDetail}: Props) => {
  const viewScale = useRef(new Animated.Value(1)).current;

  const renderHashTagItem = useCallback(
    (item: string) => (
      <HashTagIconView key={String(item.usualName)}>
        <HashTagIconText>{'#' + item.usualName + ' '}</HashTagIconText>
      </HashTagIconView>
    ),
    [],
  );

  const formatElapsedDate = useCallback(
    (elapsedTime: number, createdAt: string) => {
      if (elapsedTime / (24 * 3600 * 1000) > 1) {
        return formatDate(createdAt);
      }
      if (elapsedTime / (24 * 3600 * 1000) >= 1) {
        // in days
        const day = Math.floor(elapsedTime / (24 * 3600 * 1000));
        return `${day}일 전`;
      } else if (elapsedTime / (3600 * 1000) >= 1) {
        // in hours
        const hour = Math.floor(elapsedTime / (3600 * 1000));
        return `${hour}시간 전`;
      } else if (elapsedTime / (60 * 1000) >= 1) {
        // in minutes
        const minute = Math.floor(elapsedTime / (60 * 1000));
        return `${minute}분 전`;
      } else {
        // in seconds
        const second = Math.floor(elapsedTime / 1000);
        return `${second}초 전`;
      }
    },
    [],
  );

  const formatDate = useCallback((createdAt: string) => {
    const currentYear = new Date(Date.now()).getFullYear();

    const [date, time] = createdAt.split(' ');
    const [year, month, day] = date.split('-');

    if (String(currentYear) === year) {
      return parseInt(month) + '월 ' + parseInt(day) + '일';
    } else {
      return year + '년 ' + parseInt(month) + '월 ' + parseInt(day) + '일';
    }
  }, []);

  console.log(review)
  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        Animated.spring(viewScale, {
          toValue: 0.97,
          friction: 9,
          tension: 78,
          useNativeDriver: true,
        }).start();
      }}
      onPressOut={() => {
        Animated.spring(viewScale, {
          toValue: 1,
          friction: 9,
          tension: 78,
          useNativeDriver: true,
        }).start();
      }}
      onPress={() => moveToReviewDetail(review.id)}>
      <ReviewThumbnailContainerView
        as={Animated.View}
        style={{
          transform: [
            {
              scale: viewScale,
            },
          ],
        }}>
          <ReviewHeaderView>
            <ReviewTitleText>
              {review.dental_clinic.originalName}
            </ReviewTitleText>
            {review.recommend ? 
            <ReviewRecommendationView>
              <ReviewRecommendationImage source={require('~/Assets/Images/Review/ic_recommend.png')} />
              <ReviewRecommendationText>{"추천"}</ReviewRecommendationText>
            </ReviewRecommendationView>
            : null}
          </ReviewHeaderView>
          <HashTagContainerView>
            {review.TreatmentItems.map(renderHashTagItem)}
            {review.DiseaseItems.map(renderHashTagItem)}
          </HashTagContainerView>
          <ReviewContentView>
            <ReviewContentDescriptionView>
            <ReviewContentText numberOfLines={3}>
              {review?.reviewDescriptions}
            </ReviewContentText>
            </ReviewContentDescriptionView>
            <ReviewContentImage source={{
              uri: review?.review_contents[0]?.img_thumbNail || review?.review_contents[0]?.img_url,
            }}/> 
          </ReviewContentView>
            
      </ReviewThumbnailContainerView>
    </TouchableWithoutFeedback>
  );
};

export default ReviewThumbnail;
