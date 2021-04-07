import React, {useState, useEffect, useLayoutEffect, useCallback, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, TouchableHighlight, Animated} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

// Local Component
import PreviewImages from '~/Components/Presentational/ReviewItem/PreviewImages';
import BracePreviewImages from '~/Components/Presentational/ReviewItem/BracePreviewImages';

// Route
import POSTReviewLike from '~/Routes/Review/POSTReviewLike';
import DELETEReviewLike from '~/Routes/Review/DELETEReviewLike';
import POSTReviewScrap from '~/Routes/Review/POSTReviewScrap';
import DELETEReviewScrap from '~/Routes/Review/DELETEReviewScrap';

const Container = Styled.View`
 padding-top: 8px;
 padding-bottom: 10px;
 width: ${wp('100')}px;
 background-color: #FFFFFF;
 flex-direction: column;
  margin-bottom: 8px;
`;

const BodyContainer = Styled.View`
`;

const ProfileContainer = Styled.View`
 flex-direction: row;
 justify-content: space-between;
 background-color: #ffffff;
 padding: 8px 16px;
`;

const ProfileLeftContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 background-color: #ffffff;
`;

const ScrapContainer = Styled.View`
flex-direction: row;
padding: 10px;
align-items: center;
justify-content: center;
`;

const ProfileImage = Styled.Image`
 width: ${wp('7.46')}px;
 height: ${wp('7.46%')}px;
 border-radius: 40px;
 background-color: #ececec;
`;

const NicknameCreatedAtContainer = Styled.View`
flex-direction: row;
align-items: center;
 margin-left: 8px;
`;

const NicknameText = Styled.Text`
 font-size: 15px;
 font-weight: 600;
 color: #000000;
`;

const CreatedAtText = Styled.Text`
margin-left: 4px;
font-size: 13px;
line-height: 16px;
color: #9AA2A9;
`;

const ImagesPreviewContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
padding-top: 9px;
padding-bottom: 9px;
`;

const InfoContainer = Styled.View`
`;

const TagListContainer = Styled.View`

flex-direction: row;
`;

const TagText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #4E525D;
`;

const HashText = Styled.Text`
font-weight: 500;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
`;

const TagBackground = Styled.View`
padding-left: 10px;
padding-right: 10px;
padding-top: 6px;
padding-bottom: 6px;
background-color: #F5F7F9;
border-radius: 4px;
margin-right: 8px;
flex-direction: row;
align-items: center;
`;

const DateRatingContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
margin-top: 4px;
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
line-height: 16px;
font-weight: 500;
color: #9AA2A9;
font-size: 14px;
`;

const InfoValueText = Styled.Text`
font-weight: 500;
margin-left: 4px;
font-size: 14px;
line-height: 16px;
color: #9AA2A9;
`;

const DescripContainer = Styled.View`
padding-top: 6px;
padding-left: 16px;
padding-right: 16px;
`;

const DescripText = Styled.Text`
font-weight: 500;
 font-size: 14px;
 line-height: 24px;
 color: #000000;
`;

const ActionContainer = Styled.View`
margin-top: 16px;
padding-left: 16px;
padding-right: 16px;
flex-direction: row;
justify-content: space-between;
`;

const LikeCommentContainer = Styled.View`
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
 color: #131F3C;
 font-size: 13px;
 line-height: 16px;
`;

const LikeContainer = Styled.View`
padding-bottom: 5px;
padding-top: 5px;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const CommentContainer = Styled.View`
margin-left: 23px;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const ScrapIcon = Styled.Image`
 width: ${wp('6%')}px;
 height: ${wp('6%')}px;
 tint-color: #131F3C;
`;

const ScrapText = Styled.Text`
margin-left: 4px;
font-weight: 500;
font-size: 14px;
line-height: 16px;
color: #131F3C;
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
  img_thumbNail: string;
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
  reviewObj: any;
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
    visibleElapsedtime: boolean,
    elapsedTime: string,
  ) => void;
  moveToAnotherProfile: (
    userId: string,
    nickname: string,
    profileImageUri: string,
    img_thumbNail: string,
  ) => void;
  moveToDentalDetail: (dentalId: number) => void;
}

const ReviewItem = ({
  reviewObj,
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
  moveToAnotherProfile,
  isCurUserLikeProp,
  isCurUserScrapProp,
  refreshingReviewList,
  dentalObj,
  moveToDentalDetail,
}: Props) => {

  console.log("ReviewItem reviewObj", reviewObj);

  const [formattedDescriptions, setFormattedDescriptions] = useState<string>(
    '',
  );
  const currentUser = useSelector((state: any) => state.currentUser);
  const dispatch = useDispatch();
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const likeIconScale = useRef(new Animated.Value(1)).current;
  const scrapIconScale = useRef(new Animated.Value(1)).current;

  

  let formatedCreatedAtDate = '';
  let formatedTreatmentDate = '';

  useEffect(() => {

    // 시술후 사진을 이미지 배열의 앞부분으로 정렬하는 알고리즘
    // imageArray.forEach((item, index) => {
    //   if (item.img_before_after === 'after') {
    //     const tmp = item;
    //     imageArray.splice(index, 1);
    //     imageArray.unshift(tmp);
    //   }
    // });

    if (descriptions.length > 100) {
      setFormattedDescriptions(descriptions.substr(0, 100) + ' ...');
    } else {
      setFormattedDescriptions(descriptions);
    }

  }, [descriptions]);

  const formatDate = useCallback(
    (createdAt: string) => {
      const currentYear = new Date(Date.now()).getFullYear();

      const [date, time] = createdAt.split(' ');
      const [year, month, day] = date.split('-');

      if (String(currentYear) === year) {
        return parseInt(month) + '월 ' + parseInt(day) + '일';
      } else {
        return year + '년 ' + parseInt(month) + '월 ' + parseInt(day) + '일';
      }
    },
    [createdAt],
  );

  const formatTreatmentDate = (date: string) => {
    const dateArray = date.split('-');

    const yearArray = dateArray[0].split('');

    const result =
      yearArray[2] + yearArray[3] + '.' + dateArray[1] + '.' + dateArray[2];
    formatedTreatmentDate = result;
    return result;
  };

  const getBraceElapsedTime = () => {
    console.log("교정 시작일 reviewObj.correctionStartDate", new Date(reviewObj.correctionStartDate));
    const splitedCreatedDate = reviewObj.createdAt.split(" ");
    console.log("리뷰 작성일 splitedCreatedDate[0]", splitedCreatedDate[0]);

    const braceStartDate = new Date(reviewObj.correctionStartDate);
    const braceEndDate = reviewObj.correctionEndDate === "0000-00-00" ? new Date(splitedCreatedDate[0]) : new Date(reviewObj.correctionEndDate);

    const dateDiff = Math.ceil(braceEndDate.getTime() - braceStartDate.getTime());

    const braceElapsedDay = dateDiff/(1000 * 60 * 60 * 24) + 1;
    let braceElapsedRemainderYear: any;
    let braceElapsedRemainderMonth: any;
    let braceElapsedRemainderDay: any;

    //const braceElapsedMonth = dateDiff/(1000 * 60 * 60 * 24 * 30);
    //const braceElapsedYear = dateDiff/(1000 * 60 * 60 * 24 * 30 * 12);

    let braceElapsedDateText = "";


    console.log("교정 기간 일 차이 braceElapsedTime", braceElapsedDay);

    if(braceElapsedDay >= 365) {
      braceElapsedRemainderYear = Math.floor(braceElapsedDay / 365);
      if((braceElapsedDay % 365) >= 30) {
        
        braceElapsedRemainderMonth = Math.floor((braceElapsedDay % 365) / 30);

        braceElapsedDateText = braceElapsedRemainderYear + "년 " + braceElapsedRemainderMonth + "개월";

        //return braceElapsedDateText;

      } else {
          braceElapsedDateText = braceElapsedRemainderYear + "년";

          //return braceElapsedDateText;
        }
    } else {
      if(braceElapsedDay >= 30) {
        braceElapsedRemainderMonth = Math.floor(braceElapsedDay / 30);

        if(braceElapsedDay % 30 >= 1) {
          braceElapsedRemainderDay = braceElapsedDay % 30;

          braceElapsedDateText = braceElapsedRemainderMonth + "개월 " + braceElapsedRemainderDay + "일";

          //eturn braceElapsedDateText;

        } else {
          braceElapsedDateText = braceElapsedRemainderMonth + "개월";

          //return braceElapsedDateText;
        }
      } else {
        braceElapsedDateText = braceElapsedDay + "일";

        //return braceElapsedDateText;
      }
    }

    if(reviewObj.correctionEndDate === "0000-00-00") {
      return braceElapsedDateText + "(진행중)"
    } else {
      return braceElapsedDateText + "(교정완료)"
    }
  }

  const clickLike = () => {
    console.log("clickLike isCurUserLikeProp", isCurUserLikeProp);
    dispatch(allActions.reviewListActions.toggleReviewLike(reviewId));
    if (isCurUserLikeProp) {
      deleteReviewLike();
    } else {
      likeIconScale.setValue(0.8)
      Animated.spring(likeIconScale, {
        toValue: 1,
        friction: 8,
        tension: 300,
        useNativeDriver: true,
      }).start();
      postReviewLike();
    }
  };

  const clickScrap = () => {
    dispatch(allActions.reviewListActions.toggleReviewScrap(reviewId));
    if (isCurUserScrapProp) {
      deleteReviewScrap();
    } else {
      scrapIconScale.setValue(0.8)
      Animated.spring(scrapIconScale, {
        toValue: 1,
        friction: 8,
        tension: 300,
        useNativeDriver: true,
      }).start();
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
    console.log("리뷰 스크랩")
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
      <TagBackground
      style={index === treatmentArray.length - 1 && {marginRight: 0}}>
        <TagText>
          <HashText>{'# '}</HashText>
          {item.name || item.usualName}
        </TagText>
      </TagBackground>
    );
  };

  return (
      <Container>
        <ProfileContainer>
          <TouchableWithoutFeedback
            onPress={() =>
              moveToAnotherProfile(
                writer.userId,
                writer.nickname,
                writer.profileImage,
                writer.img_thumbNail
              )
            }>
            <ProfileLeftContainer>
              <ProfileImage
                source={
                  writer.img_thumbNail
                    ? {
                        uri: writer.img_thumbNail,
                        cache: 'force-cache',
                      }
                    : writer.profileImage
                    ? {
                        uri: writer.profileImage,
                        cache: 'force-cache',
                      }
                    : require('~/Assets/Images/MyPage/default_profileImg.png')
                }
              />
              <NicknameCreatedAtContainer>
                <NicknameText>{writer.nickname}</NicknameText>
                <CreatedAtText>
                  {visibleElapsedTime ? elapsedTimeText : formatDate(createdAt)}
                </CreatedAtText>
              </NicknameCreatedAtContainer>
            </ProfileLeftContainer>
          </TouchableWithoutFeedback>
        </ProfileContainer>
        <InfoContainer>
          {imageArray.length > 0 && (
          <TouchableWithoutFeedback
          onPress={() => {
            console.log('moveToReviewDetail');
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
              visibleElapsedTime,
              elapsedTimeText,
            );
          }}>
          <ImagesPreviewContainer>
            <BracePreviewImages sortedImageArray={imageArray} />
          </ImagesPreviewContainer>
          </TouchableWithoutFeedback>
          )}
          <TagListContainer>
            <FlatList
            contentContainerStyle={{paddingLeft: 16, paddingRight: 16, paddingTop:
              6, paddingBottom: 8}}
              keyExtractor={(item, index) => `${index}`}
              horizontal={true}
              data={treatmentArray}
              renderItem={renderTreatmentItem}
              showsHorizontalScrollIndicator={false}
            />
          </TagListContainer>
          <TouchableWithoutFeedback
          onPress={() => {
          console.log('moveToReviewDetail');
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
          visibleElapsedTime,
          elapsedTimeText,
          );
          }}>
          <BodyContainer>
          <DateRatingContainer>
            {/* <InfoItemContainer>
              <InfoLabelText>{'진료･치료시기'}</InfoLabelText>
              <InfoValueText>
                {formatTreatmentDate(treatmentDate)}
              </InfoValueText>
            </InfoItemContainer>
            <InfoItemContainer style={{marginTop: 6}}>
              <InfoLabelText>만족도</InfoLabelText>
              <InfoValueText>{ratingObj.avgRating}</InfoValueText>
            </InfoItemContainer> */}
            <InfoItemContainer>
              <InfoLabelText>교정기간</InfoLabelText>
              <InfoValueText>{getBraceElapsedTime()}</InfoValueText>
            </InfoItemContainer>
          </DateRatingContainer> 
          <DescripContainer>
            <DescripText>{formattedDescriptions}</DescripText>
          </DescripContainer>
          </BodyContainer>
          </TouchableWithoutFeedback>
        </InfoContainer>
        <ActionContainer>
          <LikeCommentContainer>
            <TouchableWithoutFeedback onPress={() => clickLike()}>
              <LikeContainer>
                <Animated.Image
                  style={[
                    {width: wp('6.4%'), height: wp('6.4%')},
                    !isCurUserLikeProp && {tintColor: '#131F3C'}, 
                    {transform: [{scale: likeIconScale}]}
                  ]}
                  source={
                    isCurUserLikeProp
                      ? require('~/Assets/Images/Indicator/list/ic_like_focus.png')
                      : require('~/Assets/Images/Indicator/list/ic_like_unfocus.png')
                  }
                />
                <IndicatorCountText>{likeCountProp}</IndicatorCountText>
              </LikeContainer>
            </TouchableWithoutFeedback>
            <CommentContainer>
              <CommentIcon
                style={{tintColor: '#131F3C'}}
                source={require('~/Assets/Images/Indicator/list/ic_comment.png')}
              />
              <IndicatorCountText>{commentCount}</IndicatorCountText>
            </CommentContainer>
          </LikeCommentContainer>
          <TouchableWithoutFeedback onPress={() => clickScrap()}>
            <ScrapContainer>
              <Animated.Image
                style={[
                  {width: wp('6.4%'), height: wp('6.4%'), transform: [{scale: scrapIconScale}]}
                ]}
                source={
                  isCurUserScrapProp
                    ? require('~/Assets/Images/Indicator/ic_scrap_focus.png')
                    : require('~/Assets/Images/Indicator/list/ic_scrap_unfocus.png')
                }
              />
              <ScrapText>{'저장하기'}</ScrapText>
            </ScrapContainer>
          </TouchableWithoutFeedback>
        </ActionContainer>
      </Container>
  );
};

const isEqual = (prevItem: any, nextItem: any) => {
  return (
    prevItem.reviewId === nextItem.reviewId &&
    prevItem.isCurUserLikeProp === nextItem.isCurUserLikeProp &&
    prevItem.isCurUserScrapProp === nextItem.isCurUserScrapProp
  );
};

const MemoizedReviewItem = React.memo(ReviewItem, isEqual);

export default MemoizedReviewItem;
