import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, ScrollView, KeyboardAvoidingView, Keyboard, View, ActivityIndicator, RefreshControl, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ReviewInformation from '~/Components/Presentational/ReviewDetailScreen/ReviewInformation';
import ReviewContent from '~/Components/Presentational/ReviewDetailScreen/ReviewContent';
import ReviewCommentList from '~/Components/Presentational/ReviewDetailScreen/ReviewCommentList';
import ReviewBottomBar from '~/Components/Presentational/ReviewDetailScreen/ReviewBottomBar';
import DentalInfomation from '~/Components/Presentational/ReviewDetailScreen/DentalInfomation';
import DetailMetaInfo from '~/Components/Presentational/ReviewDetailScreen/DetailMetaInfo';

// Route
import GETReviewDetail from '~/Routes/Review/GETReviewDetail';
import POSTComment from '~/Routes/Comment/POSTComment';
import DELETEReview from '~/Routes/Review/DELETEReview';

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

const HeaderTitleContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ProfileImage = Styled.Image`
width: ${wp('6.9%')};
height: ${wp('6.9%')};
border-radius: 100px;
background-color: #ececec
`;

const NicknameText = Styled.Text`
margin-left: 7px;
font-size: 14px;
color: #000000;
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

const BodyContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const BottomBarContainer = Styled.View`
position: absolute;
bottom: 0;
width: ${wp('100%')};
`;

const DentalInfoContainer = Styled.View`
margin-top: 11px;
width: ${wp('100%')}px;
align-items: center;
`;

const CommentListContainer = Styled.View`
margin-top: 20px;
`;

const DetailMetaInfoContainer = Styled.View`
margin-top: 8px;
width: ${wp('100%')}px;
align-items: center;
`;

const IndicatorContainer = Styled.View`
width: ${wp('100%')}px;
padding-top: ${hp('30%')}px;
background-color: #ffffff
align-items: center;
justify-content: center;
flex: 1;
`;

const TransIndicatorContainer = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
background-color: #00000040;
align-items: center;
justify-content: center;
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

interface WriterObj {
    nickname: string,
    profileImage: string,
    userId: string,
}

interface DentalObj {
    name: string,
    address: string,
    dentalId: any,
}




const ReviewDetailScreen = ({navigation, route}: Props) => {
    const [paragraphArray, setParagraphArray] = useState<Array<any>>([]);
    const [dentalInfo, setDentalInfo] = useState<DentalObj>({
        name: "",
        address: "",
        id: null,
    });

    const [reviewDetailData, setReviewDetailData] = useState<any>();
    const [reviewIndicator, setReviewIndicator] = useState<object>({
        likeCount: null,
        viewCount: null
    })

    const [commentArray, setCommentArray] = useState<Array<any>>([]);
    const [isCommentInputFocused, setIsCommentInputFocused] = useState<boolean>(false);
    const [paddingBottom, setPaddingBottom] = useState<number>(hp('8%'));

    const [loadingReviewDetail, setLoadingReviewDetail] = useState<boolean>(false);
    const [loadingCommentPost, setLoadingCommentPost] = useState<boolean>(false);
    const [refreshingReviewDetail, setRefreshingReviewDetail] = useState<boolean>(false);

    const [treatmentDate, setTreatmentDate] = useState<any>({});
    const [treatmentList, setTreatmentList] = useState<Array<object>>([]);
    const [rating, setRating] = useState<Object>({});
    const [detailPriceList, setDetailPriceList] = useState<Array<object>>([]);
    const [paragraphDisplay, setParagraphDisplay] = useState<Array<object>>([]);

    const scrollViewRef = useRef<any>();
    const reviewScrollViewRef = useRef<any>(null);
    const currentUser = useSelector((state:any) => state.currentUser)
    const jwtToken = currentUser.user.jwtToken;

    const reviewId = route.params?.reviewId;
    const writerInfo = route.params?.writer;

    const treatmentArray = route.params?.treatmentArray;
    const avgRating = route.params?.avgRating;
    const createdDate = route.params?.createdAt;
    const imageArray = route.params?.imageArray;
    const isOwnReview = (route.params?.writer.userId == currentUser.user.id);


    // 화면에 표시되는 정보
    const treatmentDateDisplay = route.params?.treatmentDate;



    console.log("route.params?.reviewId", route.params?.reviewId);
    console.log("route.params?.imageArray", route.params?.imageArray);
    console.log("route.params?.writer", route.params?.writer);
    console.log("route.params?.writer.userId", route.params?.writer.userId);
    console.log("currentUser.user.id", currentUser.user.id);

    useEffect(() => {
        setLoadingReviewDetail(true);
        getReviewDetail();

    }, [])

    
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
        Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
        }

    }, [])

    const _keyboardWillShow = (e: any) => {
        setPaddingBottom(e.endCoordinates.height + hp('5%'));
      }

    const _keyboardDidShow = (e: any) => {
        //setPaddingBottom(e.endCoordinates.height);
        reviewScrollViewRef.current.scrollToEnd({animated: true})
    }

    const _keyboardWillHide = () => {
        setPaddingBottom(hp('8%'));
        setIsCommentInputFocused(false);
        setTimeout(() => {
            reviewScrollViewRef.current.scrollToEnd({animated: true})
        }, 0)
    }

    const getReviewDetail = () => {
        GETReviewDetail(jwtToken, reviewId)
        .then((response: any) => {
            console.log("GETReviewDetail response", response)
            console.log("GETReviewDetail response.reviewBody.TreatmentItems", response.reviewBody.TreatmentItems);
            setLoadingReviewDetail(false);
            setRefreshingReviewDetail(false);


            
            // 현재 사용자의 리뷰일때 리뷰 수정용 데이터 변환 작업
            if(isOwnReview) {
                const tmpTreatmentDate = new Date(response.reviewBody.concsulationDate)
                const splitedTreatmentDate = response.reviewBody.concsulationDate.split("-");
                const tmpDisplayTreatDate = splitedTreatmentDate[0] + "년 " + splitedTreatmentDate[1] + "월 " + splitedTreatmentDate[2] + "일"
    
                const treatmentObj = {
                    displayTreatDate: tmpDisplayTreatDate,
                    treatDate: tmpTreatmentDate, 
                }

                const tmpTreatmentList = response.reviewBody.TreatmentItems.map((item: any, index: number) => {
                    let tmpTreatmentObj;
                    if(item.review_treatment_item !== null) {
                        tmpTreatmentObj = {
                            name: item.name,
                            price: item.review_treatment_item.price,
                            displayPrice: Number(item.review_treatment_item.price).toLocaleString + "원"
                        }
                    } else {
                        tmpTreatmentObj = {
                            name: item.name
                        }
                    }
                    
                    return tmpTreatmentObj;
                })

                const tmpRating = {
                    avgRating: ((response.reviewBody.starRate_cost + response.reviewBody.starRate_treatment + response.reviewBody.starRate_service)/3).toFixed(1),
                    priceRating: response.reviewBody.starRate_cost,
                    treatRating: response.reviewBody.starRate_treatment,
                    serviceRating: response.reviewBody.starRate_service
                }

                const tmpParagraphArray = response.reviewBody.review_contents.map((item: any, index: number) => {
                    let paraObj = new Object();
    
                    if(item.img_url) {
                        paraObj = {
                            id: item.id,
                            index: item.index,
                            image: {
                                uri: item.img_url,
                                name: item.img_name,
                                size: item.img_size,
                                mimeType: item.mime_type,
                            },
                            description: item.description,
                            order: item.img_before_after
                        }
    
                        return paraObj
    
                    } else {
                        paraObj = {
                            id: item.id,
                            index: item.index,
                            description: item.description,
                        }
                    }
    
                    return paraObj
                })
    

                const tmpDetailPriceList = new Array();

                response.reviewBody.TreatmentItems.forEach((item: any, index: number) => {
                    if(item.review_treatment_item.cost !== null) {
                        tmpDetailPriceList.push(item)
                    }
                })

                setTimeout(() => {
                    setParagraphArray(tmpParagraphArray);
                    setDetailPriceList(tmpDetailPriceList);
                    setTreatmentList(tmpTreatmentList);
                    setTreatmentDate(treatmentObj);
                    setRating(tmpRating);
                }, 10)
            }

            // 글 작성자 정보
            const userObj = {
                nickname: response.reviewBody.user.nickname,
                profileImage: response.reviewBody.user.profileImg,
                userId: response.reviewBody.userId,
            }

            const dentalObj = {
                name: response.reviewBody.dental_clinic.name,
                address: response.reviewBody.dental_clinic.address,
                id: response.reviewBody.dentalClinicId,
            }

            const indicatorObj = {
                likeCount: response.reviewLikeNum,
                viewCount: response.reviewViewerNum,
            }

            //setWriterInfo(tmpUserObj)
            setParagraphDisplay(response.reviewBody.review_contents)
            setDentalInfo(dentalObj);
            setCommentArray(response.reviewComments);
            setReviewIndicator(indicatorObj);
        })
        .catch((error) => {
            console.log("GETReviewDetail error", error);
            setLoadingReviewDetail(false);
        })
    }

    const moveToFullImages = (imageUri:string) => {

    var index = imageArray.findIndex((image: any) => image.img_url === imageUri);

    var imageUri_arr = imageArray.map((image: any) => {
      return image.img_url
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

    const clickCommentIcon = () => {
        setIsCommentInputFocused(true)
    }

    const postReviewComment = (description: string) => {
        setLoadingCommentPost(true);
        const type = "review";
        const id = reviewId

        POSTComment({jwtToken, id, type, description})
        .then((response) => {
            console.log("POSTReviewComment response", response)
            GETReviewDetail(jwtToken, reviewId)
            .then((response: any) => {
                console.log("GETReviewDetail response", response)
                console.log("GETReviewDetail response.reviewComments", response.reviewComments)
                setLoadingCommentPost(false);
                setCommentArray(response.reviewComments);

                setTimeout(() => {
                    reviewScrollViewRef.current.scrollToEnd({animated: true})
                }, 10)
            })
            .catch((error) => {
                console.log("GETReviewDetail error", error);
                setLoadingCommentPost(false);
            })
            })
        .catch((error) => {
            console.log("POSTReviewComment error", error);
        })
    }

    const onRefreshReviewDetail = () => {
        setRefreshingReviewDetail(true);
        getReviewDetail();   
    }

    const clickReviseReview = () => {
        console.log("dentalInfo", dentalInfo);
        const submitParagraphArray = paragraphArray;

        navigation.navigate("ReviewUploadStack", {
            screen: "ReviewContentScreen",
            params: {
                requestType: "revise",
                paragraphArray: submitParagraphArray, 
                dentalClinic: {
                    name: dentalInfo.name,
                    address: dentalInfo.address,
                    id: dentalInfo.id,
                },
                treatDate: {
                    displayTreatDate: treatmentDate.displayTreatDate,
                    treatDate: treatmentDate.treatDate
                },
                selectedTreatList: treatmentList,
                rating: {
                    avgRating: rating.avgRating,
                    priceRating: rating.priceRating,
                    serviceRating: rating.serviceRating,
                    treatRating: rating.treatRating,
                },
                detailPriceList: detailPriceList,
            }
        });

    }

    const clickDeleteReview = () => {
        Alert.alert("정말 리뷰를 삭제하실건가요?", '', [
            {
                text: "확인",
                onPress: () => deleteReview()
            },
            {
                text: '취소',
                onPress: () => 0,
                style: 'cancel',
            }
        ])
    }

    const deleteReview = () => {
        DELETEReview({jwtToken, reviewId})
        .then((response) => {
            console.log("DELTEReview response", response);

            navigation.goBack();
        })
        .catch((error) => {
            console.log("DELETEReview error", error);
        })
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
                <HeaderTitleContainer>
                    <ProfileImage
                    source={{uri: writerInfo.profileImage ? writerInfo.profileImage : undefined}}/>
                    <NicknameText>{writerInfo.nickname}</NicknameText>
                </HeaderTitleContainer>
                
                <HeaderRightContainer>
                    <HeaderEmptyView/>
                    {isOwnReview && (
                    <View style={{position: "absolute", flexDirection: "row", right: 10}}>
                    <TouchableWithoutFeedback onPress={() => clickReviseReview()}>
                    <HeaderTitleText>{"수정"}</HeaderTitleText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => clickDeleteReview()}>
                    <HeaderTitleText style={{marginLeft: 5}}>{"삭제"}</HeaderTitleText>
                    </TouchableWithoutFeedback>
                    </View>
                    )}
                </HeaderRightContainer>
            </HeaderBar>
            <ScrollView
            ref={reviewScrollViewRef}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                refreshing={refreshingReviewDetail}
                onRefresh={onRefreshReviewDetail}/>
            }>
            <ReviewInformation
                writer={writerInfo}
                createdDate={createdDate}
                treatmentArray={treatmentArray}
                avgRating={avgRating}
                location={TEST_REVIEW_DETAIL_DATA.location}
                treatmentDate={treatmentDateDisplay}/>
            {!loadingReviewDetail && (
            <BodyContainer
            style={{paddingBottom: paddingBottom}}>
                <ReviewContent
                moveToFullImages={moveToFullImages}
                paragraphArray={paragraphDisplay}/>
                <DentalInfoContainer>
                    <DentalInfomation
                    dentalInfo={dentalInfo}/>
                </DentalInfoContainer>
                <DetailMetaInfoContainer>
                    <DetailMetaInfo/>
                </DetailMetaInfoContainer>
                <CommentListContainer>
                <ReviewCommentList
                commentList={commentArray}/>
                </CommentListContainer>
            </BodyContainer>
            )}
            {loadingReviewDetail && (
            <IndicatorContainer>
                <ActivityIndicator/>
            </IndicatorContainer>
            )}
            </ScrollView>
            <KeyboardAvoidingView
            behavior={"position"}>
            <BottomBarContainer>
                <ReviewBottomBar
                postReviewComment={postReviewComment}
                isCommentInputFocused={isCommentInputFocused}
                clickCommentIcon={clickCommentIcon}
                likeCount={reviewIndicator.likeCount}/>
            </BottomBarContainer>
            </KeyboardAvoidingView>
            {loadingCommentPost && (
            <TransIndicatorContainer>
                <ActivityIndicator
                color={"#ffffff"}/>
            </TransIndicatorContainer>
            )}
        </Container>
    )
}

export default ReviewDetailScreen;


