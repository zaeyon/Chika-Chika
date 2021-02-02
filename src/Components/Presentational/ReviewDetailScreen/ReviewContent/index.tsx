import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ReviewCommentList from '~/Components/Presentational/ReviewDetailScreen/ReviewPreviewCommentList';

const Container = Styled.View`
background-color: #ffffff;
`;

const DescripContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
`;

const DescripText = Styled.Text`
font-size: 14px;
color: #131F3C;
font-weight: 400;
`;

const ImageContainer = Styled.View`
`;

const ReviewImage = Styled.Image`
margin-top: 24px;
width: ${wp('100%')}px;
height: ${wp('100%')}px;
`;

const ReviewImageTypeText = Styled.Text`
padding-left: 16px;
padding-right: 16px;
font-size: 18px;
font-weight: 800;
color: #131F3C;
`;

const ParagraphContainer = Styled.View`
padding-top: 24px;
padding-bottom: 24px;
`;

const ParagraphDivider = Styled.View`
align-self: center;
width: ${wp('87.2%')}px;
height: 1px;
background-color: #F5F7F9;
`;

interface Props {
  paragraphArray: Array<Object>;
  moveToFullImages: (imageUri: string) => void;
}

const ReviewContent = ({paragraphArray, moveToFullImages}: Props) => {
  console.log('paragraphArray', paragraphArray);

  const renderParagraphItem = ({item, index}: any) => {
    return (
      <View>
        <ParagraphContainer>
          {item.img_url && (
            <ImageContainer>
              <ReviewImageTypeText>
                {item.img_before_after === 'before'
                  ? 'Before'
                  : item.img_before_after === 'after'
                  ? 'After'
                  : ''}
              </ReviewImageTypeText>
              <TouchableWithoutFeedback
                onPress={() => moveToFullImages(item.img_url)}>
                <ReviewImage source={{uri: item.img_url}} />
              </TouchableWithoutFeedback>
            </ImageContainer>
          )}
          {item.description && (
            <DescripContainer style={item.img_url && {marginTop: 24}}>
              <DescripText>{item.description}</DescripText>
            </DescripContainer>
          )}
        </ParagraphContainer>
        {index !== paragraphArray.length - 1 && <ParagraphDivider />}
      </View>
    );
  };

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={paragraphArray}
        renderItem={renderParagraphItem}
      />
    </Container>
  );
};

export default ReviewContent;
