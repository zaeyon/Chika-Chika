import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, ScrollView} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';

// Local Component
import ReviewItem from '~/Components/Presentational/ReviewItem';

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


const NearDentistText = Styled.Text`
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

const HomeScreen = ({navigation}: Props) => {

    const moveToReviewList = () => {
        navigation.navigate("ReviewStackScreen", {
            screen: "ReviewListScreen"
        });
    }

    const moveToReviewUpload = () => {
        navigation.navigate("ReviewUploadStackScreen", {
            screen: "ReceiptRegisterScreen"
        });
    }

    

    const renderReviewItem = ({item, index}: any) => {
        return (
            <ReviewItem
            navigation={navigation}
            profileImageUri={item.user.profileImage}
            nickname={item.user.nickname}
            createdAt={item.createdAt}
            imageArray={item.reviewImages}
            tagArray={item.tags}
            date={item.date}
            rating={item.rating}
            description={item.description}
            viewCount={item.view}
            treatInfoCount={item.getInfo}
            likeCount={item.like}
            commentCount={item.comment}/>
        )
    }

    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderLeftContainer>
                <HeaderTitleText>Home</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <ScrollView>
            <BodyContainer>
                <ReviewContainer>
                    <ReviewHeaderContainer>
                        <ReviewLabelText>인기 리뷰 TEST</ReviewLabelText>
                        <TouchableWithoutFeedback onPress={() => moveToReviewList()}>
                        <MoreViewContainer>
                            <MoreViewText>더보기</MoreViewText>
                        </MoreViewContainer>
                        </TouchableWithoutFeedback>
                    </ReviewHeaderContainer>
                    <ReviewListContainer>
                        <ReviewItemContainer>
                        </ReviewItemContainer>
                    </ReviewListContainer>
                </ReviewContainer>
                <HospitalContainer style={{marginTop: 24}}>
                    <HospitalHeaderContainer>
                        <HospitalLabelText>인기 병원</HospitalLabelText>
                        <MoreViewContainer>
                            <MoreViewText>더보기</MoreViewText>
                        </MoreViewContainer>
                    </HospitalHeaderContainer>
                    <HospitalListContainer>
                        <HospitalItemContainer>
                        </HospitalItemContainer>
                    </HospitalListContainer>
                </HospitalContainer>
                <TouchableWithoutFeedback onPress={() => moveToReviewUpload()}>
                <ReviewUploadButton style={{marginTop: 50}}>
                    <ReviewUploadText>
                        리뷰 작성하기
                    </ReviewUploadText>
                </ReviewUploadButton>
                </TouchableWithoutFeedback>
                <ToothCareButton style={{marginTop: 20}}>
                    <ToothCareText>
                        치아 관리하러 가기 
                    </ToothCareText>
                </ToothCareButton>
            </BodyContainer>
            </ScrollView>
        </Container>
    )
}

export default HomeScreen


