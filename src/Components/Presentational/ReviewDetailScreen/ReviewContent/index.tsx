import React from 'react';
import Styled from 'styled-components/native';
import {
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ReviewCommentList from '~/Components/Presentational/ReviewDetailScreen/ReviewCommentList'

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
padding-top: 12px;
padding-bottom: 12px;
`;


const DescripContainer = Styled.View`
padding-top: 12px;
padding-bottom: 12px;
padding-left: 16px;
padding-right: 16px;
`;

const DescripText = Styled.Text`
font-size: 16px;
color: #000000;
`;

const ReviewImageContainer = Styled.View`
padding-top: 12px;
padding-bottom: 12px;
padding-left: 16px;
padding-right: 16px;
`;

const ReviewImage = Styled.Image`
width: ${wp('91.46%')};
height: ${wp('91.46%')};
border-radius: 8px;
margin-top: 24px;
`;

const ReviewImageDateText = Styled.Text`
font-size: 16px;
font-weight: bold;
color: #000000;
`;

interface Props {
    paragraphData: Array<Object>,
    moveToFullImages: (imageUri:string) => void,
}

const ReviewContent = ({paragraphData, commentList, moveToFullImages}: Props) => {

    const renderParagraphItem = ({item, index}: any) => {
        if(item.type === "description") {
            return (
                <DescripContainer>
                    <DescripText>
                        {item.description}
                    </DescripText>
                </DescripContainer>
            )
        } else if(item.type === "image") {
            return (
                <TouchableWithoutFeedback onPress={() => moveToFullImages(item.image_uri)}>
                <ReviewImageContainer>
                    <ReviewImageDateText>{item.date}</ReviewImageDateText>
                    <ReviewImage
                    source={{uri:item.image_uri}}/>
                </ReviewImageContainer>
                </TouchableWithoutFeedback>
            )
        } else {
            return (
                <Container/>
            )
        }
    }

    return (
        <Container>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={paragraphData}
            renderItem={renderParagraphItem}/>
        </Container>
    )
}

export default ReviewContent;
