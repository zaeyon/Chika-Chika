import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, ScrollView, Keyboard, StyleSheet, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { FlingGestureHandler } from 'react-native-gesture-handler';

// Local Component
import ReviewItem from '~/Components/Presentational/ReviewItem';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('13.8%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const HeaderLeftContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
margin-top: 5px;
font-weight: 700;
font-size: 18px;
color: #000000;
`;

const HeaderRightContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;


const BodyContainer = Styled.View`
flex: 1;
`;

const CoverImageContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('64%')};
`;

const CoverImage = Styled.Image`
width: ${wp('100%')};
height: ${wp('64%')};
`;

const ContentContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const BasicInfoContainer = Styled.View`
padding-top: 24px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 24px;
`;

const BasicHeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const NameRatingContainer = Styled.View`
flex-direction: row;
align-items:center;
`;

const DentalNameText = Styled.Text`
font-weight: 700;
font-size: 20px;
color: #000000;
`;

const RatingStarIcon = Styled.Image`
`;

const RatingText = Styled.Text`
padding-left: 8px;
font-weight: 400;
color: #000000;
font-size: 20px;
`;

const HomePageLinkText = Styled.Text`
font-weight: 600;
color: #000000;
font-size: 14px;
`;

const BasicBodyContainer = Styled.View`
margin-top: 8px;
`;

const DentalAddressText = Styled.Text`
color: #000000;
font-size: 14px;
`;

const BasicFooterContainer = Styled.View`
margin-top: 8px;
flex-direction: row;
align-items: center;
`;

const TagListContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const TagText = Styled.Text`
color: #000000;
font-size: 14px;
`;

const DentalDetailInfoContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
`;

const DentalReviewInfoContainer = Styled.View`
`;

const IntroContainer = Styled.View`
`;

const EstablishDateContainer = Styled.View`
margin-top: 28px;
`;

const TreatTimeContainer = Styled.View`
margin-top: 28px;
`;

const WeeklyTreatTimeContainer = Styled.View`
margin-top: 16px;
width: ${wp('91.466%')};
height: ${wp('75.51%')};
background-color: #c3c3c3;
`;

const LocationInfoContainer = Styled.View`
margin-top: 28px;
`;

const LocationMapContainer = Styled.View`
width: ${wp('91.466%')};
height: ${wp('55.836%')};
`;

const LocationMapImage = Styled.Image`
width: ${wp('91.466%')};
height: ${wp('55.836%')};
background-color: #c3c3c3;
`;

const TreatUniquenessContainer = Styled.View`
margin-top: 28px;
`;

const DentistInfoContainer = Styled.View`
margin-top: 28px;
`;

const InfoLabelText = Styled.Text`
font-weight: 600;
font-size: 14px;
color: #000000;
`;

const InfoValueText = Styled.Text`
margin-top: 12px;
font-weight: 400;
font-size: 14px;
color: #000000;
`;

const FooterContainer = Styled.View`
padding-bottom: ${hp('8%')}
`;

const ManageContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-top: 24px;
padding-left: 10px;
padding-right: 10px;
`;

const ManageText = Styled.Text`
font-weight: 700;
color: #000000;
font-size: 14px;
`;

const EditInfoButton = Styled.View`
align-items: center;
justify-content: center;
width: ${wp('40.53%')};
height: ${wp('23.46%')};
border-width: 1px;
`;

const MakeDentalAccountButton = Styled.View`
align-items: center;
justify-content: center;
width: ${wp('40.53%')};
height: ${wp('23.46%')};
border-width: 1px;
`;


const ReserveByPhoneContainer = Styled.View`
margin-top: 24px;
align-items: center;
`;

const ReserveByPhoneButton = Styled.View`
width: ${wp('90.133%')};
height: ${wp('14.93%')};
border-radius: 8px;
background-color: #c4c4c4;
align-items: center;
justify-content: center;
`;

const SelectInfoTypeContainer = Styled.View`
padding-top: 20px;
padding-bottom: 20px;
flex-direction: row;
align-items: center;
justify-content: center;
`;

const SelectInfoTypeText = Styled.Text`
font-weight: 400;
color: #000000;
font-size: 14px;
`;

const AverageRatingContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
`;

const RatingItemListContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const RatingTitleText = Styled.Text`
font-weight: 400;
font-size: 12px;
color: #000000;
`;

const RatingItemContainer = Styled.View`
width: ${wp('29%')}px;
height: ${wp('29%')}px;
border-width: 1px;
border-color: #c4c4c4;
align-items: center;
justify-content: center;
`;

const RatingLabelText = Styled.Text`
font-weight: 700;
font-size: 14px;
color: #000000;
`;

const RatingValueText = Styled.Text`
font-weight: 400;
font-size: 14px;
color: #000000;
`;


const ReviewListContainer = Styled.View`
`;

interface Props {
    navigation: any,
    route: any,
}


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

const TEST_DENTAL_DETAIL_DATA = {
    coverImage: {
        uri: "http://www.dailydental.co.kr/data/photos/20180729/art_15318134467_8b8044.jpg"
    },
    name: "치카치카병원",
    address: "서울시 강남구 동동",
    tagList: ["임플란트", "소아청소년과"],
    homePage: "http://www.sadh.co.kr/",
    detailInfo: {
        introduction: "안녕하세요. 누구누구입니다. 잘 부탁드립니다.",
        establishDate: "2020.11.09",
        treatTime: "09:00 ~ 18",
        location: {
            latitude: 37.294242,
            longitude: 127.045466,
        },
        park: "불가",
        uniqueness: "특이특이특이",
        dentist: "전문의 1명"
    }
}

const DentalDetailScreen = ({navigation, route}: Props) => {
    const [dentalDetailInfo, setDentalDetailInfo] = useState<any>(TEST_DENTAL_DETAIL_DATA)
    const [locationMapBase64, setLocationMapBase64] = useState<any>(null);
    const [infoType, setInfoType] = useState<string>("detailInfo");

    const nMapClientId = "htnc7h3vi5"

    var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';

    useEffect(() => {
        getDentalLocationMap()
    }, [])

    const getDentalLocationMap = () => {
        axios
        .get(`https://naveropenapi.apigw.ntruss.com/map-static/v2/raster?w=300&h=300&center=127.1054221,37.3591614&level=16`,
        {
            headers: {
              "X-NCP-APIGW-API-KEY-ID": "htnc7h3vi5",
              "X-NCP-APIGW-API-KEY": "6uL7bf7tRgcDr9a3IS70fiufg647gVXxlTVoctIO",
            }
        })
        .then((response) => {
            console.log("getDentalLocationMap response", response)

        })
        .catch((error) => {
            console.log("getDentalLocationMap error", error)

        })
    }

    const moveToDentalInfoEdit = () => {
        navigation.navigate("DentalInfoEditRequestScreen");
    }

    const goBack = () => {
        navigation.goBack()
    }

    const clickDetailInfoType = () => {
        setInfoType("detailInfo")

    }

    const clickReviewType = () => {
        setInfoType("review")
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
                <TouchableWithoutFeedback onPress={() => goBack()}>
                <HeaderLeftContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <ScrollView
            showsVerticalScrollIndicator={false}>
            <CoverImageContainer>
                <CoverImage
                source={{uri:dentalDetailInfo.coverImage.uri}}/>
            </CoverImageContainer>
            <ContentContainer>
                <BasicInfoContainer>
                    <BasicHeaderContainer>
                        <NameRatingContainer>
                        <DentalNameText>{dentalDetailInfo.name}
                        </DentalNameText>
                        <RatingText>
                            {"★5.0"}
                        </RatingText>
                        </NameRatingContainer>
                        <HomePageLinkText>
                        {"홈페이지"}
                        </HomePageLinkText>
                    </BasicHeaderContainer>
                    <BasicBodyContainer>
                        <DentalAddressText>{dentalDetailInfo.address}</DentalAddressText>
                    </BasicBodyContainer>
                    <BasicFooterContainer>
                        <TagListContainer>
                        {dentalDetailInfo?.tagList.map((item: object, index: number) => {
                            return (
                                <TagText style={{marginRight: 6}}>{"#" + item}</TagText>
                            )
                        })}
                        </TagListContainer>
                    </BasicFooterContainer>
                </BasicInfoContainer>
                <SelectInfoTypeContainer>
                    <TouchableWithoutFeedback onPress={() => clickDetailInfoType()}>
                    <SelectInfoTypeText>{"상세정보"}</SelectInfoTypeText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => clickReviewType()}>
                    <SelectInfoTypeText style={{marginLeft: 29}}>{"리뷰"}</SelectInfoTypeText>
                    </TouchableWithoutFeedback>
                </SelectInfoTypeContainer>
                {infoType === "detailInfo" && (
                <DentalDetailInfoContainer>
                    <IntroContainer>
                        <InfoLabelText>{"병원소개"}</InfoLabelText>
                        <InfoValueText>{dentalDetailInfo.detailInfo.introduction}</InfoValueText>
                    </IntroContainer>
                    <EstablishDateContainer>
                        <InfoLabelText>{"설립일자"}</InfoLabelText>
                        <InfoValueText>{dentalDetailInfo.detailInfo.establishDate}</InfoValueText>
                    </EstablishDateContainer>
                    <TreatTimeContainer>
                        <InfoLabelText>{"진료시간"}</InfoLabelText>
                        <InfoValueText>{dentalDetailInfo.detailInfo.treatTime}</InfoValueText>
                        <WeeklyTreatTimeContainer>
                        </WeeklyTreatTimeContainer>
                    </TreatTimeContainer>
                    <LocationInfoContainer>
                        <InfoLabelText>{"위치정보"}</InfoLabelText>
                        <InfoValueText>{dentalDetailInfo.detailInfo.address}</InfoValueText>
                        <LocationMapContainer>
                            <LocationMapImage
                            source={{uri: locationMapBase64}}/>
                        </LocationMapContainer>
                    </LocationInfoContainer>
                    <TreatUniquenessContainer>
                        <InfoLabelText>{"진료 특이사항"}</InfoLabelText>
                        <InfoValueText>{dentalDetailInfo.detailInfo.uniqueness}</InfoValueText>
                    </TreatUniquenessContainer>
                    <DentistInfoContainer>
                        <InfoLabelText>{"의사정보"}</InfoLabelText>
                        <InfoValueText>{dentalDetailInfo.detailInfo.dentist}</InfoValueText>
                    </DentistInfoContainer> 
                    <ManageContainer>
                    <TouchableWithoutFeedback onPress={() => moveToDentalInfoEdit()}>
                    <EditInfoButton>
                        <ManageText>
                            {"정보수정"}
                        </ManageText>
                    </EditInfoButton>
                    </TouchableWithoutFeedback>
                    <MakeDentalAccountButton>
                        <ManageText>
                            {"무료병원계정"}
                        </ManageText>
                    </MakeDentalAccountButton>
                    </ManageContainer>
                </DentalDetailInfoContainer>
                )}
                {infoType === "review" && (
                <DentalReviewInfoContainer>
                    <AverageRatingContainer>
                        <RatingTitleText>별점</RatingTitleText>
                        <RatingItemListContainer style={{marginTop: 8}}>
                        <RatingItemContainer>
                            <RatingLabelText>{"진료"}</RatingLabelText>
                            <RatingValueText style={{marginTop: 14}}>{"★4.0 / 5.0"}</RatingValueText>
                        </RatingItemContainer>
                        <RatingItemContainer>
                            <RatingLabelText>{"가격"}</RatingLabelText>
                            <RatingValueText style={{marginTop: 14}}>{"★4.0 / 5.0"}</RatingValueText>
                        </RatingItemContainer>
                        <RatingItemContainer>
                            <RatingLabelText>{"서비스"}</RatingLabelText>
                            <RatingValueText style={{marginTop: 14}}>{"★4.0 / 5.0"}</RatingValueText>
                        </RatingItemContainer>
                        </RatingItemListContainer>
                    </AverageRatingContainer>
                    <ReviewListContainer>
                        <FlatList
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        data={TEST_REVIEW_DATA}
                        renderItem={renderReviewItem}/>
                    </ReviewListContainer>
                </DentalReviewInfoContainer>

                )}
            </ContentContainer>
            <FooterContainer>
                <ReserveByPhoneContainer>
                <ReserveByPhoneButton>
                    <ManageText>{"전화 예약하기"}</ManageText>
                </ReserveByPhoneButton>
                </ReserveByPhoneContainer>
            </FooterContainer>
            </ScrollView>
        </Container>
    )
}

export default DentalDetailScreen
