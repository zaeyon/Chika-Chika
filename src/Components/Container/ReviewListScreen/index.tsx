import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';

// Local Component
import ReviewItem from '~/Components/Presentational/ReviewItem';

// Route
import GETReviewList from '~/Routes/Review/GETReviewList';

const Container = Styled.SafeAreaView`
 flex: 1;
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


const TEST_REVIEW_DATA = [
    {
        user: {
            profileImage: "http://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2020/03/27/5561b209-4809-4c6e-9f8b-33d0e7792de8.jpg",
            nickname: "닉네임"
        },
        createdAt: '2020-10-13',
        reviewImages: [
            {
                uri: "http://cfs9.tistory.com/image/15/tistory/2008/09/26/14/31/48dc73c30853d"
            },
            {
                uri: "http://cfs9.tistory.com/image/15/tistory/2008/09/26/14/31/48dc73c30853d"
            },
        ],
        tags: [
            "치아교정", "부정교합"
        ],
        date: "2020-09-24",
        rating: "3.5",
        description: "교정치과에서 악궁확장장치를 달고 온 날이예요. 그 전에 공포의 파란 고무링을 어금니 사이마다 좌우 3개씩 총 6개를 2주 정도 끼워서 어금니 사이를 벌려요.",
        view: "300",
        getInfo: "102",
        like: "123",
        comment: "24"
    },
    {
        user: {
            profileImage: "http://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2020/03/27/5561b209-4809-4c6e-9f8b-33d0e7792de8.jpg",
            nickname: "닉네임2"
        },
        createdAt: '2020-10-13',
        reviewImages: [
            {
                uri: "http://cfs9.tistory.com/image/15/tistory/2008/09/26/14/31/48dc73c30853d"
            },
            {
                uri: "http://cfs9.tistory.com/image/15/tistory/2008/09/26/14/31/48dc73c30853d"
            },
        ],
        tags: [
            "치아교정", "부정교합"
        ],
        date: "2020-09-24",
        rating: "3.5",
        description: "교정치과에서 악궁확장장치를 달고 온 날이예요. 그 전에 공포의 파란 고무링을 어금니 사이마다 좌우 3개씩 총 6개를 2주 정도 끼워서 어금니 사이를 벌려요.",
        view: "300",
        getInfo: "102",
        like: "123",
        comment: "24"
    },
    {
        user: {
            profileImage: "http://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2020/03/27/5561b209-4809-4c6e-9f8b-33d0e7792de8.jpg",
            nickname: "닉네임3"
        },
        createdAt: '2020-10-13',
        reviewImages: [
            {
                uri: "http://cfs9.tistory.com/image/15/tistory/2008/09/26/14/31/48dc73c30853d"
            },
            {
                uri: "http://cfs9.tistory.com/image/15/tistory/2008/09/26/14/31/48dc73c30853d"
            },
        ],
        tags: [
            "치아교정", "부정교합"
        ],
        date: "2020-09-24",
        rating: "3.5",
        description: "교정치과에서 악궁확장장치를 달고 온 날이예요. 그 전에 공포의 파란 고무링을 어금니 사이마다 좌우 3개씩 총 6개를 2주 정도 끼워서 어금니 사이를 벌려요.",
        view: "300",
        getInfo: "102",
        like: "123",
        comment: "24"
    },
    {
        user: {
            profileImage: "http://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2020/03/27/5561b209-4809-4c6e-9f8b-33d0e7792de8.jpg",
            nickname: "닉네임4"
        },
        createdAt: '2020-10-13',
        reviewImages: [
            {
                uri: "http://cfs9.tistory.com/image/15/tistory/2008/09/26/14/31/48dc73c30853d"
            },
            {
                uri: "http://cfs9.tistory.com/image/15/tistory/2008/09/26/14/31/48dc73c30853d"
            },
        ],
        tags: [
            "치아교정", "부정교합"
        ],
        date: "2020-09-24",
        rating: "3.5",
        description: "교정치과에서 악궁확장장치를 달고 온 날이예요. 그 전에 공포의 파란 고무링을 어금니 사이마다 좌우 3개씩 총 6개를 2주 정도 끼워서 어금니 사이를 벌려요.",
        view: "300",
        getInfo: "102",
        like: "123",
        comment: "24"
    }
]

interface Props {
    navigation: any,
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
    concsulationDate: String,
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

const ReviewListScreen = ({navigation}: Props) => {
    const [reviewList, setReviewList] = useState<Array<ReviewData>>([]);
    const [loadingReviewList, setLoadingReviewList] = useState<boolean>(true);
    const [order, setOrder] = useState<string>("createdAt");

    var offset = 0;
    var limit = 10;

    useEffect(() => {
        getReviewList()
    }, [])

    const getReviewList = () => {
        GETReviewList({order, offset, limit})
        .then((response: any) => {
            console.log("GETReviewList response", response);
            setReviewList(response);
            setLoadingReviewList(false);
        })
        .catch((error) => {
            console.log("GETReviewList error", error)
        })
    }

    const goBack = () => {
       navigation.goBack()
    }

    const renderReviewItem = ({item, index}: any) => {

        const avgRating = ((item.starRate_cost + item.starRate_service + item.StarRate_treatment)/3).toFixed(1);

        console.log("renderReviewItem item", item.review_contents);

        return (
            <ReviewItem
            navigation={navigation}
            writer={item.user}
            createdAt={item.createdAt}
            imageArray={item.reviewImages ? item.reviewImages : []}
            treatmentArray={item.TreatmentItems}
            treatmentDate={item.concsulationDate}
            rating={item.avgRating}
            description={item.description ? item.description : ""}
            viewCount={item.reviewViewNum}
            treatInfoCount={item.getInfo}
            likeCount={item.reviewLikeNum}
            commentCount={item.reviewCommentNum}/>
        )
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
                <HeaderTitleText>Review List</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            {!loadingReviewList && (
            <ReviewContainer>
            <ReviewListContainer>
                <FlatList
                horizontal={false}
                showsVerticalScrollIndicator={false}
                data={reviewList}
                renderItem={renderReviewItem}/>
            </ReviewListContainer>
            </ReviewContainer>
            )}
            {loadingReviewList && (
            <IndicatorContainer>
                <ActivityIndicator/>
            </IndicatorContainer>
            )}
        </Container>
    )
}

export default ReviewListScreen


