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

const ItemSkeletonView = Styled.View`
width: ${wp('79%')}px;
flex: 1;
border-radius: 8px;
margin-right: 16px;
padding: 20px 16px;
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;

const ItemSkeletonTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 15px;
line-height: 16px;
color: #F5F7F9;
margin-right: auto;
background: #F5F7F9;
`;

const ItemSkeletonHashTagContainerView = Styled.View`
width: 100%;
height: auto;
padding: 12px 0px;
flex-direction: row;
`;

const ItemSkeletonHashTagIconView = Styled.TouchableOpacity`
width: auto;
height: auto;
flex-direction: row;
align-items: center;
padding: 6px 10px;
margin-right: 8px;
border-radius: 4px;
background-color: #F5F7F9;
`;
const ItemSkeletonHashTagIconText = Styled.Text`
font-style: normal;
font-weight: 500;
font-size: 13px;
line-height: 16px;
text-align: center;
color: #F5F7F9;
`;

const ItemContentView = Styled.View`
flex-direction: row;
flex: 1;
margin-top: 8px;
`;

const ItemContentDescriptionView = Styled.View`
flex: 1;
margin-right: 8px;
`;
const ItemContentText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
background: #F5F7F9;
color: #F5F7F9;
`;

const ItemContentImageView = Styled.View`
width: 72px;
height: 72px;
margin-left: auto;
border-radius: 8px;
background: #F5F7F9;
`;

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

  const renderPlaceHolder = useCallback(
    () => (
      <PlaceHolderContainerView>
        <PlaceHolderContentView>
          <PlaceHolderImage
            source={require('~/Assets/Images/Home/메인/ic_review_empty.png')}
          />
          <PlaceHolderText>{'아직은 리뷰가 없네요'}</PlaceHolderText>
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
    ),
    [],
  );

  const renderReviewThumbnail = useCallback(({item}: any) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'),
    );
    return (
      <ReviewThumbnail review={item} moveToReviewDetail={moveToReviewDetail} />
    );
  }, []);

  const renderReviewThumbnailSkeleton = useCallback(
    () => (
      <ItemSkeletonView>
        <ItemSkeletonTitleText>{'치카치카치카병원'}</ItemSkeletonTitleText>
        <ItemSkeletonHashTagContainerView>
          <ItemSkeletonHashTagIconView>
            <ItemSkeletonHashTagIconText>
              {'교정교정교정'}
            </ItemSkeletonHashTagIconText>
          </ItemSkeletonHashTagIconView>
          <ItemSkeletonHashTagIconView>
            <ItemSkeletonHashTagIconText>
              {'교정교정교정교정'}
            </ItemSkeletonHashTagIconText>
          </ItemSkeletonHashTagIconView>
        </ItemSkeletonHashTagContainerView>
        <ItemContentView>
          <ItemContentDescriptionView>
            <ItemContentText>
              {
                '치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카치카'
              }
            </ItemContentText>
          </ItemContentDescriptionView>
          <ItemContentImageView />
        </ItemContentView>
      </ItemSkeletonView>
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
      {initialized && reviewData.length === 0 ? renderPlaceHolder() : 
      <ReviewThumbnailFlatlist
        ref={flatlistRef}
        data={initialized ? reviewData : [{id: 'skeleton1'}, {id: 'skeleton2'}]}
        renderItem={
          initialized ? renderReviewThumbnail : renderReviewThumbnailSkeleton
        }
        keyExtractor={(item) => String(item.id)}
        horizontal
        snapToAlignment="start"
        snapToInterval={wp('79%') + 16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
      />}
    </ContainerView>
  );
};

export default React.memo(HomeReviewContent);
