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
height: auto;
border-radius: 8px;
margin-right: 16px;
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;

const ReviewThumbnailHeaderImage = Styled.Image`
width: 28px;
height: 28px;
background: #F5F7F9;
border-radius: 100px;
margin-right: 8px;
`;
const ReviewThumbnailHeaderText = Styled.Text`
font-size: 13.5px;
line-height: 16px;
font-weight: 500;
color: #FFFFFF;
box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.9);
`;

const ReviewThumbnailHeaderTimeText = Styled.Text`
font-style: normal;
font-weight: 400;
font-size: 13.5px;
line-height: 16px;
color: #FFFFFF;
margin-left: auto;
box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.9);
`;
const ReviewThumbnailContentView = Styled.View`
padding: 0px 8px 16px 8px;
`;

const HashTagContainerView = Styled.View`
width: 100%;
height: auto;
padding: 12px 4px;
flex-direction: row;

`;

const HashTagIconView = Styled.TouchableOpacity`
width: auto;
height: auto;
flex-direction: row;
align-items: center;
padding: 6px 10px;
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
color: #4E525D;
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
      <HashTagIconView key={String(item)}>
        <HashTagIconText>{'#' + item + ' '}</HashTagIconText>
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

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        Animated.spring(viewScale, {
          toValue: 0.95,
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
        <LinearGradient
          colors={['#00000080', '#00000000']}
          style={{
            position: 'absolute',
            width: '100%',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            zIndex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            top: 0,
            padding: 8,
          }}>
          <ReviewThumbnailHeaderImage
            source={{
              uri: review.user.img_thumbNail || review.user.profileImg,
              cache: 'force-cache',
            }}
          />
          <ReviewThumbnailHeaderText>
            {review.user.nickname}
          </ReviewThumbnailHeaderText>
          <ReviewThumbnailHeaderTimeText>
            {formatElapsedDate(
              review['createdDiff(second)'] * 1000,
              review.createdAt,
            )}
          </ReviewThumbnailHeaderTimeText>
        </LinearGradient>
        <Image
          style={{
            flex: 1,
            height: wp('50%'),
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            resizeMode: 'cover',
          }}
          source={{
            uri: review.review_contents[0].img_thumbNail,
            cache: 'force-cache',
          }}
        />
        <ReviewThumbnailContentView>
          <HashTagContainerView>
            {review.reviewTreatmentTags.map(renderHashTagItem)}
          </HashTagContainerView>
          <RatingValueContainer>
            <AvgRatingValueContainer>
              <Rating
                type={'custom'}
                ratingImage={require('~/Assets/Images/Review/ic_ratingStar_swipe.png')}
                ratingColor={'#00D1FF'}
                ratingBackgroundColor={'#E2E6ED'}
                imageSize={wp('4.26%')}
                ratingCount={5}
                startingValue={review.AVGStarRate}
                readonly={true}
              />
              <AvgRatingValueText>{review.AVGStarRate}</AvgRatingValueText>
            </AvgRatingValueContainer>
            <DetailRatingContainer>
              <DetailRatingTypeText>{'시술'}</DetailRatingTypeText>
              <DetailRatingValueText>
                {review.starRate_treatment}
              </DetailRatingValueText>
              <DetailRatingDivider />
              <DetailRatingTypeText>{'서비스'}</DetailRatingTypeText>
              <DetailRatingValueText>
                {review.starRate_service}
              </DetailRatingValueText>
              <DetailRatingDivider />
              <DetailRatingTypeText>{'가격'}</DetailRatingTypeText>
              <DetailRatingValueText>
                {review.starRate_cost}
              </DetailRatingValueText>
            </DetailRatingContainer>
          </RatingValueContainer>
        </ReviewThumbnailContentView>
      </ReviewThumbnailContainerView>
    </TouchableWithoutFeedback>
  );
};

export default ReviewThumbnail;
