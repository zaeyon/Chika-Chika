import React, {useState, useEffect, useLayoutEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

// Local Component
import PreviewImages from '~/Components/Presentational/ReviewItem/PreviewImages';

// Route
import POSTReviewLike from '~/Routes/Review/POSTReviewLike';
import DELETEReviewLike from '~/Routes/Review/DELETEReviewLike';
import POSTReviewScrap from '~/Routes/Review/POSTReviewScrap';
import DELETEReviewScrap from '~/Routes/Review/DELETEReviewScrap';

const Container = Styled.View`
 padding-top: 24px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 10px;
 width: ${wp('100')}px;
 background-color: #FFFFFF;
 flex-direction: column;
 border-bottom-width: 1px;
 border-color: #E5E5E5;
`;

const ProfileContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const ProfileLeftContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 background-color: #ffffff;
`;

const ScrapContainer = Styled.View`
padding: 10px;
align-items: center;
justify-content: center;
`;

const ProfileImage = Styled.Image`
 width: ${wp('10.66')}px;
 height: ${wp('10.66%')}px;
 border-radius: 40px;
 background-color: #ececec;
`;

const NicknameCreatedAtContainer = Styled.View`
 margin-left: 8px;
`;

const NicknameText = Styled.Text`
 font-size: 15px;
 font-weight: 600;
 color: #000000;
`;

const CreatedAtText = Styled.Text`
 margin-top: 2px;
 font-size: 13px;
 color: #a2a2a2;
`;

const ImagesPreviewContainer = Styled.View`
margin-top: 15px;
`;

const InfoContainer = Styled.View`
`;

const TagListContainer = Styled.View`
margin-top: 8px;
flex-direction: row;
`;

const TagText = Styled.Text`
font-size: 14px;
color: #000000;
`;

const TagBackground = Styled.View`
padding-left: 12px;
padding-right: 12px;
padding-top: 4px;
padding-bottom: 4px;
background-color: #f1f1f1;
border-radius: 4px;
margin-right: 4px;
flex-direction: row;
align-items: center;
`;

const DateRatingContainer = Styled.View`
margin-top: 8px;
`;

const InfoLabelBackground = Styled.View`
padding-top: 6px;
padding-bottom: 4px;
padding-left: 8px;
padding-right: 8px;
flex-direction: row;
border-radius: 4px;
border-width: 1px;
border-color: #F6F6F6;
`;

const InfoItemContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const InfoLabelText = Styled.Text`
font-weight: 700;
color: #878787;
font-size: 14px;
`;

const InfoValueText = Styled.Text`
font-weight: 400;
margin-left: 8px;
font-size: 14px;
color: #878787;
`;

const DescripContainer = Styled.View`
margin-top: 12px;
`;

const DescripText = Styled.Text`
 font-size: 14px;
 color: #000000;
`;

const MoreViewText = Styled.Text`
 margin-top: 4px;
 color: #888888;
`;

const SocialInfoContainer = Styled.View`
 margin-top: 16px;
 flex-direction: row;
 align-items: center;
`;

const SocialLabelText = Styled.Text`
font-size: 12px;
color: #888888;
`;

const SocialValueText = Styled.Text`
font-size: 12px;
color: #888888;
margin-left: 4px;
`;

const ActionContainer = Styled.View`
margin-top: 16px;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const LikeScrapContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const LikeIcon = Styled.Image`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;

const IndicatorCountText = Styled.Text`
 position: absolute;
 left: ${wp('7%')}px;
 color: #56575C;
 font-size: 16px;
`;

const LikeContainer = Styled.View`
align-items: center;
justify-content: center;
flex-direction: row;
`;

const CommentContainer = Styled.View`
margin-left: 20px;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const ScrapIcon = Styled.Image`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;

const CommentIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const GetTreatInfoButton = Styled.View`
 width: ${wp('30%')}px;
 height: ${wp('10.33%')}px;
 background-color: #267DFF;
 border-radius: 4px;
 align-items: center;
 justify-content: center;
`;

const GetTreatInfoText = Styled.Text`
 font-weight: 700;
 font-size: 14px;
 color: #FFFFFF;
`;

const RatingStarIcon = Styled.Image`
 width: ${wp('3.2%')}px;
 height: ${wp('3.2%')}px;
`;

const TreatDateContainer = Styled.View`
flex-direction: row;
`;

interface UserObj {
  profileImage: string;
  nickname: string;
  userId: string;
}

interface RatingObj {
  avgRating: number;
  serviceRating: number;
  treatRating: number;
  priceRating: number;
}

interface DentalObj {
  id: number;
  name: string;
  address: string;
}

interface Props {
  reviewId: number;
  writer: UserObj;
  createdAt: string;
  elapsedTimeText: string;
  visibleElapsedTime: boolean;
  treatmentArray: Array<any>;
  treatmentDate: string;
  ratingObj: RatingObj;
  descriptions: string;
  viewCount: number;
  treatInfoCount: number;
  likeCountProp: number;
  commentCount: number;
  imageArray: Array<any>;
  isCurUserLikeProp: boolean;
  isCurUserScrapProp: boolean;
  refreshingReviewList: boolean;
  dentalObj: DentalObj;
  moveToReviewDetail: (
    reviewId: number,
    writer: UserObj,
    createdAt: string,
    treatmentArray: Array<any>,
    ratingObj: RatingObj,
    treatmentDate: string,
    imageArray: Array<object>,
    isCurUserLike: boolean,
    likeCount: number,
    commentCount: number,
    isCurUserScrap: boolean,
    dentalObj: DentalObj,
    elapsedTime: string,
  ) => void;
  moveToWriterProfile: (userId: number) => void;
  moveToDentalDetail: (dentalId: number) => void;
}

const ReviewItem = ({
  reviewId,
  writer,
  createdAt,
  elapsedTimeText,
  visibleElapsedTime,
  treatmentArray,
  treatmentDate,
  ratingObj,
  descriptions,
  viewCount,
  treatInfoCount,
  likeCountProp,
  commentCount,
  imageArray,
  moveToReviewDetail,
  moveToWriterProfile,
  isCurUserLikeProp,
  isCurUserScrapProp,
  refreshingReviewList,
  dentalObj,
  moveToDentalDetail,
}: Props) => {
  const currentUser = useSelector((state: any) => state.currentUser);
  const dispatch = useDispatch();
  const jwtToken = currentUser.jwtToken;

  let formatedCreatedAtDate = '';
  let formatedTreatmentDate = '';

  imageArray.forEach((item, index) => {
    if (item.img_before_after === 'after') {
      const tmp = item;
      imageArray.splice(index, 1);
      imageArray.unshift(tmp);
    }
  });

  const cutDescriptionsOver = (descriptions: string) => {
    if (descriptions.length > 100) {
      return descriptions.substr(0, 100) + ' ...';
    } else {
      return descriptions;
    }
  };

  if (descriptions.length > 100) {
    var tmpDescripPreview = descriptions.substr(0, 100);
  }

  const formatCreatedAtDate = (date: string) => {
    const tmpDate = new Date(date);

    var year = tmpDate.getFullYear() + '',
      month = tmpDate.getMonth() + 1 + '',
      day = tmpDate.getDate() + '';

    month = Number(month) >= 10 ? month : '0' + month;
    day = Number(day) >= 10 ? day : '0' + day;

    const result = year + '년 ' + month + '월 ' + day + '일';

    formatedCreatedAtDate = result;

    return result;
  };

  const formatTreatmentDate = (date: string) => {
    const dateArray = date.split('-');

    const yearArray = dateArray[0].split('');

    const result =
      yearArray[2] + yearArray[3] + '.' + dateArray[1] + '.' + dateArray[2];
    formatedTreatmentDate = result;
    return result;
  };

  const clickLike = () => {
    console.log(isCurUserLikeProp);
    dispatch(allActions.reviewListActions.toggleReviewLike(reviewId));
    if (isCurUserLikeProp) {
      deleteReviewLike();
    } else {
      postReviewLike();
    }
  };

  const clickScrap = () => {
    dispatch(allActions.reviewListActions.toggleReviewScrap(reviewId));
    if (isCurUserScrapProp) {
      deleteReviewScrap();
    } else {
      postReviewScrap();
    }
  };

  const postReviewLike = () => {
    POSTReviewLike({jwtToken, reviewId})
      .then((response) => {
        console.log('POSTReviewLike response', response);
      })
      .catch((error) => {
        console.log('POSTReviewLike error', error);
      });
  };

  const deleteReviewLike = () => {
    DELETEReviewLike({jwtToken, reviewId})
      .then((response) => {
        console.log('DELETEReviewLike response', response);
      })
      .catch((error) => {
        console.log('DELETEReviewLike error', error);
      });
  };

  const postReviewScrap = () => {
    POSTReviewScrap({jwtToken, reviewId})
      .then((response) => {
        console.log('POSTReviewScrap response', response);
      })
      .catch((error) => {
        console.log('POSTReviewScrap error', error);
      });
  };

  const deleteReviewScrap = () => {
    DELETEReviewScrap({jwtToken, reviewId})
      .then((response) => {
        console.log('DELETEReviewScrap response', response);
      })
      .catch((error) => {
        console.log('DELETEReviewScrap error', error);
      });
  };

  const renderTreatmentItem = ({item, index}: any) => {
    return (
      <TagBackground>
        <TagText>{item.name}</TagText>
      </TagBackground>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        moveToReviewDetail(
          reviewId,
          writer,
          formatedCreatedAtDate,
          treatmentArray,
          ratingObj,
          formatedTreatmentDate,
          imageArray,
          isCurUserLikeProp,
          likeCountProp,
          commentCount,
          isCurUserScrapProp,
          dentalObj,
          elapsedTimeText,
        )
      }>
      <Container>
        <ProfileContainer>
          <TouchableWithoutFeedback
            onPress={() => moveToWriterProfile(writer.id)}>
            <ProfileLeftContainer>
              <ProfileImage
                source={{
                  uri: writer.profileImage ? writer.profileImage : undefined,
                }}
              />
              <NicknameCreatedAtContainer>
                <NicknameText>{writer.nickname}</NicknameText>
                <CreatedAtText>
                  {visibleElapsedTime
                    ? elapsedTimeText
                    : formatCreatedAtDate(createdAt)}
                </CreatedAtText>
              </NicknameCreatedAtContainer>
            </ProfileLeftContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => clickScrap()}>
            <ScrapContainer>
              <ScrapIcon
                style={
                  isCurUserScrapProp
                    ? {tintColor: '#FFE600'}
                    : {tintColor: '#C3C3C3'}
                }
                source={require('~/Assets/Images/Review/ic_scrap_inline.png')}
              />
            </ScrapContainer>
          </TouchableWithoutFeedback>
        </ProfileContainer>
        <InfoContainer>
          <ImagesPreviewContainer>
            <PreviewImages sortedImageArray={imageArray} />
          </ImagesPreviewContainer>
          <TagListContainer>
            <FlatList
              keyExtractor={(item, index) => `${index}`}
              horizontal={true}
              data={treatmentArray}
              renderItem={renderTreatmentItem}
            />
          </TagListContainer>
          <DateRatingContainer>
            <InfoItemContainer>
              <InfoLabelText>{'진료･치료시기'}</InfoLabelText>
              <InfoValueText>
                {formatTreatmentDate(treatmentDate)}
              </InfoValueText>
            </InfoItemContainer>
            <InfoItemContainer style={{marginTop: 6}}>
              <InfoLabelText>만족도</InfoLabelText>
              <InfoValueText>{ratingObj.avgRating}</InfoValueText>
            </InfoItemContainer>
          </DateRatingContainer>
          <DescripContainer>
            <DescripText>{cutDescriptionsOver(descriptions)}</DescripText>
          </DescripContainer>
        </InfoContainer>
        <ActionContainer>
          <LikeScrapContainer>
            <TouchableWithoutFeedback onPress={() => clickLike()}>
              <LikeContainer>
                <LikeIcon
                  style={
                    isCurUserLikeProp
                      ? {tintColor: '#FF5656'}
                      : {tintColor: '#c3c3c3'}
                  }
                  source={require('~/Assets/Images/Review/ic_like_inline.png')}
                />
                <IndicatorCountText>{likeCountProp}</IndicatorCountText>
              </LikeContainer>
            </TouchableWithoutFeedback>
            <CommentContainer>
              <CommentIcon
                source={require('~/Assets/Images/Review/ic_comment_inline.png')}
              />
              <IndicatorCountText>{commentCount}</IndicatorCountText>
            </CommentContainer>
          </LikeScrapContainer>
          <TouchableWithoutFeedback onPress={() => moveToDentalDetail(dentalObj.id)}>
            <GetTreatInfoButton>
              <GetTreatInfoText>{'병원정보'}</GetTreatInfoText>
            </GetTreatInfoButton>
          </TouchableWithoutFeedback>
        </ActionContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default ReviewItem;
