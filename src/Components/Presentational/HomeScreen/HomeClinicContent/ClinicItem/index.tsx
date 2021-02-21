import React, {useEffect, useCallback, useState, useRef} from 'react';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContentContainerView = Styled.View`
width: ${wp('85%')}px;
padding: 8px 16px;
margin-left: 12px;
background: #FFFFFF;
border-radius: 12px;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;

const HorizontalPartitionView = Styled.View`
width: 100%;
height: 1px;
background: #E2E6ED;
margin: 4px 0px;
`;
const ClinicInfoView = Styled.View`
padding: 16px 0px;
`;

const ClinicInfoHeaderView = Styled.View`
flex-direction: row;
align-items: center;
margin-bottom: 8px;
`;

const ClinicInfoTitleText = Styled.Text`
font-weight: bold;
font-size: 16px;
color: #131F3C;
`;

const ReviewTitleText = Styled.Text`
font-weight: bold;
font-size: 13px;
color: #131F3C;
margin: 0px auto;
position: absolute;
top: 80px;
align-self: center;
background: #FFFFFF;
`;

const ClinicInfoText = Styled.Text`
font-weight: normal;
font-size: 14px;
line-height: 18px;
color: #9AA2A9;
`;

const RateContainerView = Styled.View`
flex-direction: row;
align-items: center;
margin-left: auto;
`;

const ClinicInfoDescriptionPartitionView = Styled.View`
width: 1px;
height: 8px;
background: #E2E6ED;
margin: 0px 4px;
`;

const RateStarImage = Styled.Image`
margin-right: 4px;
`;
const RateStarText = Styled.Text`
font-weight: bold;
font-size: 14px;
color: #00D1FF;

`;

const ClinicInfoReviewText = Styled.Text`
font-weight: normal;
font-size: 14px;
line-height: 18px;
color: #9AA2A9;

`;

const ReviewInfoView = Styled.View`
padding: 16px 0px 12px 0px;
`;

const ReviewInfoHeaderView = Styled.View`
flex-direction: row;
`;

const ReviewInfoProfileImage = Styled.Image`
width: 40px;
height: 40px;
border-width: 0.5px;
border-color: #9AA2A9;
border-radius: 100px;
margin-right: 8px;
`;

const ReviewInfoHeaderContentView = Styled.View`
flex: 1;
justify-content: center;
height: 38px;
`;

const ReviewInfoHeaderTitleView = Styled.View`
flex-direction: row;
align-items: center;
`;

const ReviewInfoHeaderDescriptionView = Styled.View`
flex-direction: row;
align-items: center;
margin-top: auto;
`;

const ReviewInfoProfileText = Styled.Text`
font-weight: 500;
font-size: 14px;
color: #131F3C;
`;

const ReviewInfoTitleText = Styled.Text`
font-weight: bold;
font-size: 13px;
line-height: 16px;
color: #131F3C;
margin-left: 4px;
margin-right: 8px;
`;
const ReviewInfoText = Styled.Text`
font-weight: normal;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
`;

const VerifiedImage = Styled.Image`
margin-right: 4px;
`;

const VerifiedText = Styled.Text`
font-weight: normal;
font-size: 11px;
line-height: 16px;
color: #00D1FF;
`;

const HashTagIconView = Styled.TouchableOpacity`
width: auto;
height: auto;
flex-direction: row;
align-items: center;
padding: 6px 10px;
margin-right: 8px;
border-radius: 4px;
background-color: #F5F7F9;
`;
const HashTagIconText = Styled.Text`
font-style: normal;
font-weight: 500;
font-size: 13px;
line-height: 16px;
text-align: center;
color: #4E525D;
`;

const HashTagText = Styled.Text`
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
margin-right: 4px;
`;

interface Props {
  clinic: any;
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const ClinicItem = ({clinic}: Props) => {
  const reviewFlatlistRef = useRef();
  const [reviewIndex, setReviewIndex] = useState(0);

  clinic.reviews.length !== 0 &&
    useInterval(() => {
      setReviewIndex((prev) => {
        if (prev === clinic.reviews.length - 1) {
          reviewFlatlistRef.current.scrollToIndex({
            index: 0,
          });
          return 0;
        } else {
          reviewFlatlistRef.current.scrollToIndex({
            index: prev + 1,
          });
          return prev + 1;
        }
      });
    }, 5000);

  const renderHashTagItem = useCallback(
    ({item}: any) => (
      <HashTagIconView>
        <HashTagText>{'#'}</HashTagText>
        <HashTagIconText>{item.name}</HashTagIconText>
      </HashTagIconView>
    ),
    [],
  );
  const renderReviewItem = useCallback(
    ({item}: any) => (
      <ReviewInfoView>
        <ReviewInfoHeaderView>
          <ReviewInfoProfileImage
            source={
              item.user
                ? {
                    uri: item.user.img_thumbNail,
                    cache: 'force-cache',
                  }
                : require('~/Assets/Images/appIcon_chika.png')
            }
          />
          <ReviewInfoHeaderContentView>
            <ReviewInfoHeaderTitleView>
              <ReviewInfoProfileText>
                {item.user.nickname}
              </ReviewInfoProfileText>
              <ReviewInfoText></ReviewInfoText>
              <RateContainerView>
                <RateStarImage
                  source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_10.png')}
                />
                <RateStarText>{item.AVGStarRate.toFixed(1)}</RateStarText>
              </RateContainerView>
            </ReviewInfoHeaderTitleView>
            <ReviewInfoHeaderDescriptionView>
              <ReviewInfoText>{'비용'}</ReviewInfoText>
              <ReviewInfoTitleText>
                {`${new Intl.NumberFormat('ko-KR', {
                  style: 'currency',
                  currency: 'KRW',
                })
                  .format(item.totalCost)
                  .slice(1)}원`}
              </ReviewInfoTitleText>
              <VerifiedImage
                source={require('~/Assets/Images/Indicator/ic_verified.png')}
              />
              <VerifiedText>{'영수증인증'}</VerifiedText>
            </ReviewInfoHeaderDescriptionView>
          </ReviewInfoHeaderContentView>
        </ReviewInfoHeaderView>
        <FlatList
          horizontal
          alwaysBounceHorizontal={false}
          contentContainerStyle={{
            paddingVertical: 12,
          }}
          data={item.TreatmentItems}
          renderItem={renderHashTagItem}
          keyExtractor={(item) => String(item.id)}
        />
      </ReviewInfoView>
    ),
    [],
  );

  return (
    <ContentContainerView>
      <ClinicInfoView>
        <ClinicInfoHeaderView>
          <ClinicInfoTitleText>{clinic.originalName}</ClinicInfoTitleText>
          <RateContainerView>
            <RateStarImage
              source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_10.png')}
            />
            <RateStarText>{clinic.reviewAVGStarRate.toFixed(1)}</RateStarText>
            <ClinicInfoDescriptionPartitionView />
            <ClinicInfoReviewText>{`리뷰 ${clinic.reviewNum}`}</ClinicInfoReviewText>
          </RateContainerView>
        </ClinicInfoHeaderView>
        <ClinicInfoText>{clinic.modifiedAddress}</ClinicInfoText>
      </ClinicInfoView>
      <HorizontalPartitionView />

      <FlatList
        ref={reviewFlatlistRef}
        scrollEnabled={false}
        style={{
          height: 112,
        }}
        data={clinic.reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => String(item.id)}
      />
    </ContentContainerView>
  );
};
export default React.memo(ClinicItem);
