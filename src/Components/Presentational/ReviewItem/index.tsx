import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';

// Local Component
import PreviewImages from '~/Components/Presentational/ReviewItem/PreviewImages';

const Container = Styled.View`
 padding-top: 24px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 10px;
 width: ${wp('100')}
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

const ProfileRightContainer = Styled.View`
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
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const LikeValueText = Styled.Text`
 margin-left: 4px;
 color: #56575C;
 font-size: 16px;
`;

const ScrapContainer = Styled.View`
align-items: center;
justify-content: center;
`;

const ScrapIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const CommentIcon = Styled.Image`
margin-left: 16px;
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const GetTreatInfoButton = Styled.View`
 width: ${wp('30%')};
 height: ${wp('10.33%')};
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
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

const TreatDateContainer = Styled.View`
flex-direction: row;
`;



interface UserData {
    profileImage: string,
    nickname: string,
    userId: string,
}


interface Props {
    reviewId: number,
    writer: UserData,
    createdAt: string,
    treatmentArray: Array<any>,
    treatmentDate: string,
    avgRating: number,
    descriptions: string,
    viewCount: number,
    treatInfoCount: number,
    likeCount: number,
    commentCount: number,
    imageArray: Array<any>,
    moveToReviewDetail: (reviewId: number, writer: object, createdAt: string, treatmentArray: Array<any>, avgRating: number, treatmentDate: string, imageArray: Array<object>) => void,
} 

const ReviewItem = ({reviewId, writer, createdAt, treatmentArray, treatmentDate, avgRating, descriptions, viewCount, treatInfoCount, likeCount, commentCount, imageArray, moveToReviewDetail}: Props) => {

    const [descripPreview, setDescripPreview] = useState<string>("");
    const [sortedImageArray, setSortedImageArray] = useState<Array<any>>(imageArray);
    const [changeImageArray, setChangeImageArray] = useState<boolean>(false);

    let formatedCreatedAtDate = "";
    let formatedTreatmentDate = "";

    //console.log("avgRating", avgRating);
    console.log("ReviewItem treatmentArray", treatmentArray);
    //console.log("ReviewItem imageArray", imageArray);

    
    imageArray.forEach((item, index) => {
        if(item.img_before_after === "after") {
            const tmp = item;
            imageArray.splice(index, 1);
            imageArray.unshift(tmp);
        }
    })

    const cutDescriptionsOver = (descriptions: string) => {
        if(descriptions.length > 100) {
            return descriptions.substr(0, 100) + " ...";
        } else {
            return descriptions;
        }
    }

    if(descriptions.length > 100) {
        var tmpDescripPreview = descriptions.substr(0, 100);
    }


    const formatCreatedAtDate = (date: string) => {
        const tmpDate = new Date(date);

        var year = tmpDate.getFullYear() + "",
            month = tmpDate.getMonth() + 1 + "",
            day = tmpDate.getDate() + "";
            
            month = Number(month) >= 10 ? month : '0' + month;
            day = Number(day) >= 10 ? day : '0' + day;

            const result = year + "년 " + month + "월 " + day +"일"

            formatedCreatedAtDate = result;

            return result
    }

    const formatTreatmentDate = (date: string) => {

        const dateArray = date.split("-")

        const yearArray = dateArray[0].split("");
        dateArray[1] = Number(dateArray[1]) < 10 ? ("0" + dateArray[1])  : (dateArray[1]);
        dateArray[2] = Number(dateArray[2]) < 10 ? ("0" + dateArray[1]) : (dateArray[2]);

        const result = yearArray[2] + yearArray[3] + "." + dateArray[1] + "." + dateArray[2];
        formatedTreatmentDate = result;
        return result
    } 

    const renderTreatmentItem = ({item, index}: any) => {
        return (
            <TagBackground>
                <TagText>{item.name}</TagText>
            </TagBackground>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => moveToReviewDetail(reviewId, writer, formatedCreatedAtDate, treatmentArray, avgRating, formatedTreatmentDate, imageArray)}>
        <Container>
            <ProfileContainer>
                <TouchableWithoutFeedback onPress={() => moveToAnotherProfile()}>
                <ProfileLeftContainer>
                <ProfileImage
                source={{uri:writer.profileImage ? writer.profileImage : undefined}}/>
                <NicknameCreatedAtContainer>
                    <NicknameText>{writer.nickname}</NicknameText>
                    <CreatedAtText>{formatCreatedAtDate(createdAt)}</CreatedAtText>
                </NicknameCreatedAtContainer>
                </ProfileLeftContainer>
                </TouchableWithoutFeedback>
                <ProfileRightContainer>
                    <ScrapIcon
                    source={require('~/Assets/Images/Review/ic_scrap_inline.png')}/>
                </ProfileRightContainer>
                </ProfileContainer>
                <InfoContainer>
                <ImagesPreviewContainer>
                    <PreviewImages
                    sortedImageArray={imageArray}/>
                </ImagesPreviewContainer>
                    <TagListContainer>
                        <FlatList
                        keyExtractor={(item, index) => `${index}`}
                        horizontal={true}
                        data={treatmentArray}
                        renderItem={renderTreatmentItem}/>
                    </TagListContainer>
                    <DateRatingContainer>
                        <InfoItemContainer>
                            <InfoLabelText>{"진료･치료시기"}</InfoLabelText>
                            <InfoValueText>{formatTreatmentDate(treatmentDate)}</InfoValueText>
                        </InfoItemContainer>
                        <InfoItemContainer style={{marginTop: 6}}>
                            <InfoLabelText>만족도</InfoLabelText>
                            <InfoValueText>{avgRating}</InfoValueText>
                        </InfoItemContainer>
                    </DateRatingContainer>
                    <DescripContainer>
                        <DescripText>{cutDescriptionsOver(descriptions)}</DescripText>
                    </DescripContainer>
                </InfoContainer>
                <ActionContainer>
                    <LikeScrapContainer>
                        <LikeIcon
                        source={require('~/Assets/Images/Review/ic_like_inline.png')}/>
                        <LikeValueText>{likeCount}</LikeValueText>
                        <CommentIcon
                        source={require('~/Assets/Images/Review/ic_comment_inline.png')}/>
                        <LikeValueText>{commentCount}</LikeValueText>
                    </LikeScrapContainer>
                        <GetTreatInfoButton>
                            <GetTreatInfoText>{"병원정보"}</GetTreatInfoText>
                        </GetTreatInfoButton>
                </ActionContainer>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default ReviewItem




