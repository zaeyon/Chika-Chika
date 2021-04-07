import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import ReviewThumbnail from '~/Components/Presentational/HomeScreen/HomeReviewContent/ReviewThumbnail';

const ContainerView = Styled.View`
width: 100%;
flex: 1;
padding: 21px 16px 8px 16px;
margin-bottom: 16px;
`;

const ContentTitleView = Styled.View`
width: auto;
flex-direction: row;
align-items: center;
margin-bottom: 21px;
`;

const ContentTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 24px;
color: #131F3C;
`;

const ContentTitleImage = Styled.Image`
margin-left: auto;
margin-right: 12px;
`;

const TagFilterContainerView = Styled.View`
flex-direction: row;
margin: 0px 16px 16px 16px;
`;

const TagFilterSelectedContentView = Styled.View`
border-width: 1px;
border-color: #131F3C;
border-radius: 100px;
padding: 4px 16px;
margin-right: 4px;
`;

const TagFilterSelectedContentText = Styled.Text`
font-weight: 500;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;

const TagFilterContentView = Styled.View`
background: #F5F7F9;
border-width: 1px;
border-color: #F5F7F9;
border-radius: 100px;
padding: 4px 16px;
margin-right: 4px;
`;

const TagFilterContentText = Styled.Text`
font-weight: 500;
font-size: 14px;
line-height: 24px;
color: #4E525D;
`;

const ReviewThumbnailFlatlist = Styled.FlatList`
width: 100%;
height: auto;
flex-direction: row;
overflow: visible;
`;

const PlaceHolderContainerView = Styled.View`
width: auto;
padding: 42px 65px;
background: #FFFFFF;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
border-radius: 12px;
`;

const PlaceHolderContentView = Styled.View`
align-items: center;
justify-content: center;
margin-bottom: 12px;
`;

const PlaceHolderImage = Styled.Image`
margin-bottom: 5px;
`;

const PlaceHolderText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
color: #131F3C;
`;

const NavigationButtonView = Styled.View`
border: 1px #E2E6ED;
border-radius: 100px;
padding: 12px 0px;
justify-content: center;
align-items: center;
flex-direction: row;
margin-top: 12px;
background: #FFFFFF;
`;

const NavigationButtonText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
`;

const NavigationButtonImage = Styled.Image``;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  initialized: boolean;
  selectedHometown: string;
  reviewData: any;
  moveToReviewDetail: any;
  moveToReviewUpload: any;
}

const HomeReviewContent = ({
  initialized,
  selectedHometown,
  reviewData,
  moveToReviewDetail,
  moveToReviewUpload,
}: Props) => {
  const flatlistRef: any = useRef();

  const renderPlaceHolder = useCallback(() => (
    <PlaceHolderContainerView>
      <PlaceHolderContentView>
        <PlaceHolderImage source={require('~/Assets/Images/Home/메인/ic_review_empty.png')}/>
        <PlaceHolderText>
          {"아직은 리뷰가 없네요"}
        </PlaceHolderText>
        </PlaceHolderContentView>
        <TouchableWithoutFeedback onPress={() => moveToReviewUpload()}>
        <NavigationButtonView>
          <NavigationButtonText>
              <NavigationButtonText
                style={{
                  color: '#00D1FF',
                }}>
                {'첫번째 리뷰 '}
              </NavigationButtonText>
              {'남기러 가기'}
            </NavigationButtonText>
            <NavigationButtonImage
              source={require('~/Assets/Images/Arrow/common/gan/button_right_arrow.png')}
            />
        </NavigationButtonView>
        </TouchableWithoutFeedback>
      </PlaceHolderContainerView> 
  ), []);
  
  const renderReviewThumbnail = useCallback(
    ({item}: any) => (
      <ReviewThumbnail review={item} moveToReviewDetail={moveToReviewDetail} />
    ),
    [],
  );

  return (
    <ContainerView>
      <TouchableWithoutFeedback>
      <ContentTitleView>
        <ContentTitleText>{`최근 올라온 치아교정 리뷰`}</ContentTitleText>
      </ContentTitleView>
      </TouchableWithoutFeedback>
      {initialized && !reviewData.length ? renderPlaceHolder():
      <ReviewThumbnailFlatlist
        ref={flatlistRef}
        data={
          reviewData
        }
        renderItem={renderReviewThumbnail}
        keyExtractor={(item: any) => String(item.id)}
        horizontal
        snapToAlignment="start"
        snapToInterval={wp('79%') + 16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        
      /> }
    </ContainerView>
  );
};

export default React.memo(HomeReviewContent);
