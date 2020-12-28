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
`;


const DescripContainer = Styled.View`
padding-top: 12px;
`;

const DescripText = Styled.Text`
font-size: 16px;
color: #000000;
`;

const ImageContainer = Styled.View`
`;

const ReviewImage = Styled.Image`
margin-top: 24px;
width: ${wp('91.46%')};
height: ${wp('91.46%')};
border-radius: 8px;
`;

const ReviewImageDateText = Styled.Text`
font-size: 16px;
font-weight: bold;
color: #000000;
`;

const ParagraphContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
`;

interface Props {
    paragraphArray: Array<Object>,
    moveToFullImages: (imageUri:string) => void,
}

const ReviewContent = ({paragraphArray, moveToFullImages}: Props) => {
    console.log("paragraphArray", paragraphArray);

    const renderParagraphItem = ({item, index}: any) => {
            return (
                <ParagraphContainer>
                    {item.img_url && (
                        <TouchableWithoutFeedback onPress={() => moveToFullImages(item.img_url)}>
                        <ImageContainer>
                            <ReviewImage
                            source={{uri:item.img_url}}/>
                        </ImageContainer>
                        </TouchableWithoutFeedback>
                    )}
                    {item.description && (
                        <DescripContainer>
                            <DescripText>{item.description}</DescripText>
                        </DescripContainer>
                    )}
                </ParagraphContainer>
            )
    }

    return (
        <Container>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={paragraphArray}
            renderItem={renderParagraphItem}/>
        </Container>
    )
}

export default ReviewContent;
