import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
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

const ReviewListContainer = Styled.View`
padding-bottom: ${isIphoneX() ? hp("11%") : hp("8%")}
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
        like: "123"
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
        like: "123"
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
        like: "123"
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
        like: "123"
    }
]

interface Props {
    navigation: any,
}

const HomeScreen = ({navigation}: Props) => {

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
            likeCount={item.like}/>
        )

    }
    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                </HeaderLeftContainer>
                <HeaderTitleText>Home</HeaderTitleText>
                <HeaderRightContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <ReviewListContainer>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={TEST_REVIEW_DATA}
                renderItem={renderReviewItem}/>
            </ReviewListContainer>
        </Container>
    )
}

export default HomeScreen


