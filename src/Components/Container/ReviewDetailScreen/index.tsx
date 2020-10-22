import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';

import ReviewInformation from '~/Components/Presentational/ReviewDetailScreen/ReviewInformation';
import ReviewContent from '~/Components/Presentational/ReviewDetailScreen/ReviewContent';
import ReviewCommentList from '~/Components/Presentational/ReviewDetailScreen/ReviewCommentList';

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
 background-color: #ffffff;
`;

const HeaderLeftContainer = Styled.View`
 padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderBackIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderEmptyView = Styled.View`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const HeaderMoreIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const BodyContainer = Styled.ScrollView`
flex: 1;
background-color: #ffffff;
`;

const BottomContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const TEST_REVIEW_DETAIL_DATA = {
    user : {
        profile_image: "https://i.pinimg.com/564x/25/cd/bf/25cdbfb4c026ab04e3754ae707a4c7eb.jpg",
        nickname: "전윤정",
    },
    createdAt: "2020-10-22",
    tagOne: "치아교정",
    tagTwo: "부정교합",
    rating: 3.5,
    location: "서울시 강남구",
    treat_date: "2020.09.24",
    mediaFiles: [
        {
            image_uri: "https://fimg4.pann.com/new/download.jsp?FileID=49691685"
        },
        {
            image_uri: "https://fimg4.pann.com/new/download.jsp?FileID=49691687"
        },
        {
            image_uri: "https://fimg4.pann.com/new/download.jsp?FileID=49691693"
        }
    ],

    paragraph: [
        {
            index: 1,
            type: "description",
            description: "교정 전 저는 저 스스로도 심한 콤플렉스 였고, 시작하면서 여쭤보니 교정치과 의사쌤도 중상 수준이라고 하셨어요.",
        },
        {
            index: 2,
            type: "description",
            description: "엄청 편한 사이 아니고서는 무조건 입도 가리고 웃고 치아 드러나게 사진 찍는거 되도록 피하고 그러다보니 입매 항상 이상하고 어색하고...",
        },
        {
            index: 3,
            type: "description",
            description: "그래도 해야지 해야지 마음만, 생각만 하고요... 진짜 딱 세월만 보내고 있었어요. 그 중 제일 큰 이유는 돈이죠. 어마어마 하게 많이 들 줄 알고요. 교정치료 전문 치과 없는 계속 외진 곳에서 산 것도 한 몫 했고요.",
        },
        {
            index: 4,
            type: "description",
            description: "이제부턴 ((((혐짤로)))) 봐도 무방한 제 옥수수들을 자랑하겠습니다.",
        },
        {
            index: 5,
            type: "image",
            date: "2019년 10월 1일",
            image_uri: "https://fimg4.pann.com/new/download.jsp?FileID=49691685"
        },
        {
            index: 6,
            type: "image",
            date: "2019년 12월 3일",
            image_uri: "https://fimg4.pann.com/new/download.jsp?FileID=49691687",
        },
        {
            index: 7, 
            type: "image",
            date: "2020년 1월 5일",
            image_uri: "https://fimg4.pann.com/new/download.jsp?FileID=49691693",
        },
        {
            index: 8,
            type: "description",
            description: "나 진짜 너무 신난당 덧니가 너무 컴플렉스여서 시작한 교정인데 아프기도 무지 아팠고 관리도 힘들고 길고도 긴 시간이였다 ㅎㅅㅎ.. "
        },
        {
            index: 9,
            type: "description",
            description: "나는 클리피쉬 교정으로 380정도 든거같어 근데 유지장치도 2년정도 해야된다더라......괜찮아.. 겉에는 안보이니까 웃을때 이제 활짝 웃을 수 있어서 너뮤 조앙 ㅎㅎㅎ "
        }
    ],
    comments: [
        {
            commentId: 1,
            user: {
                profile_image: "http://imgmmw.mbn.co.kr/storage/news/2019/08/13/3274f4fbbaa2020ff9d1fb706be99787.jpg",
                nickname: "메렁메렁"
            },
            comment: "잘 되셨네요ㅜㅜㅜㅜ 얼마에 하셨나요? 쪽지 부탁드려요.",
            createdAt: "2020-10-21",
            replys: [

            ]
        },
        {
            commentId: 2,
            user: {
                profile_image: "http://imgmmw.mbn.co.kr/storage/news/2019/08/13/3274f4fbbaa2020ff9d1fb706be99787.jpg",
                nickname: "메렁메렁"
            },
            comment: "잘 되셨네요ㅜㅜㅜㅜ 얼마에 하셨나요? 쪽지 부탁드려요.",
            createdAt: "2020-10-21",
            replys: [

            ]
        }
    ]
}

interface Props {
    navigation: any,
    route: any,
}

const ReviewDetailScreen = ({navigation, route}: Props) => {

   const moveToFullImages = (imageUri:string) => {

    console.log("TEST_REVIEW_DETAIL_DATA.mediaFiles", TEST_REVIEW_DETAIL_DATA.mediaFiles);
    var index = TEST_REVIEW_DETAIL_DATA.mediaFiles.findIndex((image) => image.image_uri === imageUri);

    var imageUri_arr = TEST_REVIEW_DETAIL_DATA.mediaFiles.map((image) => {
      return image.image_uri
    })

    console.log("선택한 사진의 mediaFiles index", index);

    navigation.navigate("FullImagesScreen", {
      imagesUrl_arr : imageUri_arr,
      imageIndex: index,
    })
}

const goBack = () => {
    navigation.goBack()
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
                <HeaderRightContainer>
                    <HeaderMoreIcon
                    source={require('~/Assets/Images/HeaderBar/ic_more.png')}/>
                </HeaderRightContainer>
            </HeaderBar>
            <ReviewInformation
                user={TEST_REVIEW_DETAIL_DATA.user}
                createdAt={TEST_REVIEW_DETAIL_DATA.createdAt}
                tagOne={TEST_REVIEW_DETAIL_DATA.tagOne}
                tagTwo={TEST_REVIEW_DETAIL_DATA.tagTwo}
                rating={TEST_REVIEW_DETAIL_DATA.rating}
                location={TEST_REVIEW_DETAIL_DATA.location}
                treat_date={TEST_REVIEW_DETAIL_DATA.treat_date}/>
            <BodyContainer
            showsVerticalScrollIndicator={false}>
                <ReviewContent
                moveToFullImages={moveToFullImages}
                paragraphData={TEST_REVIEW_DETAIL_DATA.paragraph}/>
                <ReviewCommentList
                commentList={TEST_REVIEW_DETAIL_DATA.comments}/>

            </BodyContainer>
        </Container>
    )
}

export default ReviewDetailScreen;


