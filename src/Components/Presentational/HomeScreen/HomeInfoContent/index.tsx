import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {Image, TouchableOpacity, Animated, LayoutAnimation} from 'react-native';

const ContainerView = Styled.View`
flex: 1;
padding: 0px 16px;
background: #FFFFFF;
`;

const TopTitleView = Styled.View`
padding: 0px 8px;
margin-bottom: 24px;
`;

const TopTitleText = Styled.Text`
font-weight: normal;
font-size: 20px;
line-height: 24px;
margin-bottom: 12px;
`;

const TopTitleBoldText = Styled.Text`
font-weight: bold;
font-size: 20px;
line-height: 24px;
`;

const LocationIndicationView = Styled.View`
background: #FFFFFF;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
border-radius: 8px;
padding: 16px;
margin-bottom: 16px;
`;

const LocationIndicationText = Styled.Text`
font-weight: 500;
font-size: 14px;
line-height: 24px;
color: #9AA2A9;
`;

const LocationContentView = Styled.View`
margin-top: 14px;
flex-direction: row;
`;
const LocationHighlightContainerView = Styled.View`
`;

const LocationUnderlineView = Styled.View`
width: 100%;
height: 16px;
position: absolute;
bottom: 0px;
background: #DAECFE;
`;

const LocationIndicationTitleText = Styled.Text`
font-weight: bold;
font-size: 18px;
line-height: 24px;
`;

const LocationSettingView = Styled.View`
padding: 6px 12px;
background: #F5F7F9;
border-radius: 100px;
`;

const LocationSettingText = Styled.Text`
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: #4E525D;
`;

const LocalInfoContainerView = Styled.View`
background: #F5F7F9;
border-radius: 8px;
padding: 16px;
flex-direction: row;
margin-bottom: 16px;
`;

const LocalInfoContentView = Styled.View`
flex: 1;
`;

const LocalInfoPartitionView = Styled.View`
background: #FFFFFF;
width: 1px;
height: 100%;
margin: 0px 23px;
`;

const LocalInfoContentTitleText = Styled.Text`
font-weight: 500;
font-size: 14px;
line-height: 24px;
color: #9AA2A9;
margin-bottom: 16px;
`;

const LocalInfoDescriptionView = Styled.View`
width: 100%;
flex-direction: row;
justify-content: flex-end;
align-items: center;
overflow: hidden;
height: 30px;
`;

const LocalInfoIconImage = Styled.Image`
margin-right: 52px;
`;

const LocalInfoContentText = Styled.Text`
font-weight: bold;
font-size: 24px;
color: #131F3C;
`;

const BannerImage = Styled.Image`
width: 100%;
margin-bottom: 16px;
`;

const SlotContainerView = Styled.View`
position: absolute;
top: 0px;
right: 21.5px;
`;

const SlotContentText = Styled.Text`
font-weight: bold;
font-size: 24px;
color: #131F3C;
text-align: right;
height: 30px;
`;

interface Props {
  scrollY: any;
  selectedHometown: string;
  localClinicCount: number;
  localReviewCount: number;
}

const HomeInfoContent = ({
  scrollY,
  selectedHometown,
  localClinicCount,
  localReviewCount,
}: Props) => {
  const initialY = useRef(new Animated.Value(0)).current;
  const secondY = useRef(new Animated.Value(0)).current;
  const thirdY = useRef(new Animated.Value(0)).current;

  const slotY = useRef(new Animated.Value(0)).current;
  const imageY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(initialY, {
      toValue: 1,
      delay: 50,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(secondY, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
      Animated.timing(thirdY, {
        toValue: 1,
        delay: 350,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(imageY, {
          toValue: 1,
          friction: 10,
          tension: 30,
          useNativeDriver: true,
        }).start();
        Animated.spring(slotY, {
          toValue: 1,
          friction: 10,
          tension: 30,
          useNativeDriver: true,
        }).start();
      });
    });
  }, []);

  const renderSlotNumber = useCallback((number: number) => {
    return (
      <SlotContainerView
        as={Animated.View}
        style={{
          transform: [
            {
              translateY: slotY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -30 * number],
              }),
            },
          ],
        }}>
        {[...Array(number + 1).keys()].map((item) => (
          <SlotContentText key={String(item)}>{item}</SlotContentText>
        ))}
      </SlotContainerView>
    );
  }, []);

  return (
    <ContainerView>
      <TopTitleView
        as={Animated.View}
        style={{
          opacity: initialY,
          transform: [
            {
              translateY: initialY.interpolate({
                inputRange: [0, 1],
                outputRange: [5, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <TopTitleText>{'우리동네'}</TopTitleText>
        <TopTitleBoldText>{'치과 정보 확인하세요'}</TopTitleBoldText>
      </TopTitleView>
      <LocationIndicationView
        as={Animated.View}
        style={{
          opacity: secondY,
          transform: [
            {
              translateY: secondY.interpolate({
                inputRange: [0, 1],
                outputRange: [5, 0],
                extrapolate: 'clamp',
              }),
            },

            {
              scale: secondY.interpolate({
                inputRange: [0, 1],
                outputRange: [0.98, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <LocationIndicationText>{'지금 내 동네'}</LocationIndicationText>
        <LocationContentView>
          <LocationHighlightContainerView>
            <LocationUnderlineView />
            <LocationIndicationTitleText>
              {selectedHometown}
            </LocationIndicationTitleText>
          </LocationHighlightContainerView>
          <TouchableOpacity
            style={{
              marginLeft: 'auto',
            }}>
            <LocationSettingView>
              <LocationSettingText>{'동네설정'}</LocationSettingText>
            </LocationSettingView>
          </TouchableOpacity>
        </LocationContentView>
      </LocationIndicationView>
      <LocalInfoContainerView
        as={Animated.View}
        style={{
          opacity: thirdY,
          transform: [
            {
              translateY: thirdY.interpolate({
                inputRange: [0, 1],
                outputRange: [5, 0],
                extrapolate: 'clamp',
              }),
            },

            {
              scale: thirdY.interpolate({
                inputRange: [0, 1],
                outputRange: [0.98, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <LocalInfoContentView>
          <LocalInfoContentTitleText>
            {'우리 동네 치과'}
          </LocalInfoContentTitleText>
          <LocalInfoDescriptionView>
            <LocalInfoIconImage
              source={require('~/Assets/Images/Home/ic_clinic.png')}
            />
            {renderSlotNumber(localClinicCount)}
            <LocalInfoContentText>{'개'}</LocalInfoContentText>
          </LocalInfoDescriptionView>
        </LocalInfoContentView>
        <LocalInfoPartitionView />
        <LocalInfoContentView>
          <LocalInfoContentTitleText>
            {'리얼 방문 후기'}
          </LocalInfoContentTitleText>
          <LocalInfoDescriptionView>
            <LocalInfoIconImage
              source={require('~/Assets/Images/Home/ic_review.png')}
            />
            {renderSlotNumber(localReviewCount)}
            <LocalInfoContentText>{'개'}</LocalInfoContentText>
          </LocalInfoDescriptionView>
        </LocalInfoContentView>
      </LocalInfoContainerView>
      <BannerImage
        as={Animated.Image}
        onLoadEnd={() => {}}
        style={{
          opacity: imageY,
          transform: [
            {
              translateY: imageY.interpolate({
                inputRange: [0, 1],
                outputRange: [5, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
          resizeMode: 'contain',
        }}
        source={require('~/Assets/Images/Home/banner_1.png')}
      />
    </ContainerView>
  );
};

export default HomeInfoContent;
