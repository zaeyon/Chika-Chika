import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

// Local Component
import ReviewItem from '~/Components/Presentational/ReviewItem';

// Route
import GETReviewList from '~/Routes/Review/GETReviewList';


const Container = Styled.SafeAreaView`
 background-color: #FFFFFF;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('11.7%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;


const HeaderLeftContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')};
height: %{wp('6.4%)};
`;

const HeaderTitleText = Styled.Text`
 
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
padding-top: 32px;
background-color: #ffffff;
align-items: center;
`;

const ReviewContainer = Styled.View`
`;

const ReviewListContainer = Styled.View`
`;

const ReviewHeaderContainer = Styled.View`
width: ${wp('87.2%')}
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ReviewLabelText = Styled.Text`
font-weight: 700;
font-size: 16px;
color: #000000;
`;

const MoreViewContainer = Styled.View`
align-items: center;
justify-content: center;
padding: 5px;
`;

const MoreViewText = Styled.Text`
font-size: 16px;
font-weight: 400;
color: #000000;
`;

const ReviewItemContainer = Styled.View`
margin-top: 8px;
width: ${wp('87.2%')};
height: ${wp('40%')};
border-radius: 8px;
border-width: 1px;
border-color: #c4c4c4;
`;


const HospitalContainer = Styled.View`
`;

const HospitalListContainer = Styled.View`
`;

const HospitalHeaderContainer = Styled.View`
width: ${wp('87.2%')}
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const HospitalLabelText = Styled.Text`
font-weight: 700;
font-size: 16px;
color: #000000;
`;

const HospitalItemContainer = Styled.View`
margin-top: 8px;
width: ${wp('87.2%')};
height: ${wp('40%')};
border-radius: 8px;
border-width: 1px;
border-color: #c4c4c4;
`;

const ReviewUploadButton = Styled.View`
width: ${wp('87.2%')};
height: ${wp('24.416%')};
border-radius: 8px;
border-width: 1px;
border-color: #C4C4C4;
align-items: center;
justify-content: center;
`;

const ReviewUploadText = Styled.Text`
font-weight: 700;
color: #000000;
font-size: 18px;
`;


const ToothCareButton = Styled.View`
width: ${wp('87.2%')};
height: ${wp('24.416%')};
border-radius: 8px;
border-width: 1px;
border-color: #C4C4C4;
align-items: center;
justify-content: center;
`;

const ToothCareText = Styled.Text`
font-weight: 700;
color: #000000;
font-size: 18px;
`;

const IndicatorContainer = Styled.View`
flex: 1;
background-color: #ffffff;
align-items: center;
justify-content: center;
`;

const EndReachedIndicatorContainer = Styled.View`
height: ${hp('9%')}px;
background-color: #ffffff;
align-items: center;
justify-content: center;
`;

interface Props {
    reviewList: Array<ReviewData>,
    refreshingReviewList?: boolean,
    onRefreshReviewList?: () => void,
    onEndReachedReviewList?: () => void,
    loadingMoreReview?: boolean,
    scrollEnabled?: boolean,
    moveToWriterProfile: (userId: number) => void,
    moveToReviewDetail: (reviewId: number, writer: object, createdAt: string, treatmentArray: Array<object>, ratingObj: Object, treatmentDate: string, imageArray: Array<object>, isCurUserLike: boolean, likeCount: number, commentCount: number, isCurUserScrap: boolean, dentalObj: object) => void,
    moveToDentalDetail: (dentalId: number) => void,
}

interface ReviewData {
    id: Number,
    user: Object,
    userId: String,
    TreatmentItems: Array<Object>,
    certifiedBill: Boolean,
    createdAt: String,
    deletedAt: String,
    dentalClinicId: Number,
    dental_clinic: Object,
    hits: Number,
    treatmentDate: String,
    reviewCommentNum: Number,
    reivewLikeNum: Number,
    reviewViewNum: Number,
    review_contents: Array<Object>,
    starRate_cost: Number,
    starRate_service: Number,
    starRate_treatment: Number,
    updatedAt: String,
    viewerLikedReview: Number,
}

const ReviewList = ({reviewList, scrollEnabled, moveToReviewDetail, refreshingReviewList, onRefreshReviewList, onEndReachedReviewList, loadingMoreReview, moveToWriterProfile, moveToDentalDetail}: Props) => {
    const currentUser = useSelector((state: any) => state.currentUser);
    const jwtToken = currentUser.user.jwtToken;

    var offset = 0;
    var limit = 10;


    const renderEndRecahedIndicator = ({item, index}: any) => {
        console.log("renderEndRecahedIndicator loadingMoreReview", loadingMoreReview);
        if(loadingMoreReview) {
            return (
                <EndReachedIndicatorContainer>
                    <ActivityIndicator/>
                </EndReachedIndicatorContainer>
            )
        } else {
            return (
                <EndReachedIndicatorContainer
                style={{height: 10}}/>
            )
        }
    }

    const renderReviewItem = ({item, index}: any) => {

        const isCurUserLikeProp = item.viewerLikedReview === 1 ? true : false
        const isCurUserScrapProp = item.viewerScrapedReview === 1 ? true : false
        const likeArray = new Array();
        const scrapArray = new Array();
  
        if(item.viewerLikedReview === 1) {
          likeArray.push({
            nickname: currentUser.user.nickname
          })       
        }

        if(item.viewerScrapedReview === 1) {
            scrapArray.push({
                nickname: currentUser.user.nickname
            })
        }



        const ratingObj = {
            avgRating: Number(((Number(item.starRate_cost) + Number(item.starRate_service) + Number(item.starRate_treatment))/3).toFixed(1)),
            priceRating: Number(item.starRate_cost),
            serviceRating: Number(item.starRate_service),
            treatRating: Number(item.starRate_treatment),
        }

        const writer = {
            nickname: item.user.nickname,
            profileImage: item.user.profileImg,
            userId: item.userId
        }

        let elapsedTimeText = ""
        let visibleElapsedTime = false

        const elapsedMin = item['createdDiff(second)'] / 60
        const elapsedHour = item['createdDiff(second)'] / 3600
        const elapsedDay = item['createdDiff(second)'] / 86400
        
        if(elapsedMin < 1) {
            elapsedTimeText = "방금 전"
            visibleElapsedTime = true
        } else if(1 <= elapsedMin && elapsedHour < 1) {
            elapsedTimeText = `${Math.floor(elapsedMin)}분 전`
            visibleElapsedTime = true
        } else if(1 <= elapsedHour && elapsedDay < 1) {
            elapsedTimeText = `${Math.floor(elapsedHour)}시간 전`
            visibleElapsedTime = true
        } else if(elapsedDay >= 1) {
            visibleElapsedTime = false
        }

        return (
            <ReviewItem
            reviewId={item.id}
            writer={writer}
            createdAt={item.createdAt}
            elapsedTimeText={elapsedTimeText}
            visibleElapsedTime={visibleElapsedTime}
            treatmentArray={item.TreatmentItems}
            treatmentDate={item.treatmentDate ? item.treatmentDate : ""}
            dentalObj={item.dental_clinic}
            ratingObj={ratingObj}
            viewCount={item.reviewViewNum}
            treatInfoCount={item.getInfo}
            likeCountProp={item.reviewLikeNum}
            commentCount={item.reviewCommentsNum}
            imageArray={item.review_contents}
            descriptions={item.reviewDescriptions ? item.reviewDescriptions : ""}
            moveToReviewDetail={moveToReviewDetail}
            moveToWriterProfile={moveToWriterProfile}
            isCurUserLikeProp={isCurUserLikeProp}
            isCurUserScrapProp={isCurUserScrapProp}
            likeArray={likeArray}
            scrapArray={scrapArray}
            refreshingReviewList={refreshingReviewList}
            moveToDentalDetail={moveToDentalDetail}/>
            )
      }

    return (
        <Container>
            <ReviewListContainer>
                <FlatList
                scrollEnabled={scrollEnabled}
                keyExtractor={(item ,index) => `${index}`}
                refreshing={refreshingReviewList}
                onRefresh={onRefreshReviewList}
                horizontal={false}
                showsVerticalScrollIndicator={true}
                data={reviewList}
                renderItem={renderReviewItem}
                onEndReached={onEndReachedReviewList}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderEndRecahedIndicator}/>
            </ReviewListContainer>
        </Container>
    )
}


export default ReviewList

