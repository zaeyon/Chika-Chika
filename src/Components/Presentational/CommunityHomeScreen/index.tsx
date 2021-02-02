import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {View, Text, ScrollView} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

const ContainerView = Styled.ScrollView`
flex: 1;
background: white;
`;

const TopBannerContainerView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('18%')}px;
margin-bottom: 8px;
background: #F6F6F6;
`;

const TopBannerImage = Styled.Image`
width: 100%;
height: 100%;
resizeMode: cover;
`;

const ContentContainerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
margin-top: 8px;
overflow: visible;
`;

const ContentTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 32px;
margin: 16px;
`;

const TabPreviewFlatList = Styled.FlatList`
width: ${wp('100%')}px;
height: ${hp('26%')}px;
overflow: visible;
`;

const TabPreviewItemView = Styled.View`
width: ${wp('75%')}px;
height: ${hp('26%')}px;
margin-left: 16px;
border-radius: 8px;
background: white;
box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
`;

const HospitalListContainerView = Styled.View`
width: 100%;
height: auto;
flex-direction: row;
flex-wrap: wrap;

`;
const HospitalItemContainerView = Styled.View`
width: ${wp('50%')}px;
height: ${hp('23%')}px;
margin-bottom: 24px;
overflow: visible;
`;

const HospitalItemImageView = Styled.View`
width: 100%;
height: ${hp('16%')}px;
border-radius: 8px;
background: white;
box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.05);
overflow: visible;
`;

const HospitalItemCaptionView = Styled.View`
flex: 1;
margin-top: 8px;
`;

const HospitalItemLocationText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 16px;
color: #808080;
margin-bottom: 4px;
`;

const HospitalItemNameText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
`;

interface Props {}

const CommunityHomeScreen = () => {
  const hospitalList = [0, 1, 2];
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();
  const renderTabPreviewItem = ({item, index}: any) => (
    <TabPreviewItemView></TabPreviewItemView>
  );

  const renderTabPreviewFooter = () => (
    <View
      style={{
        width: wp('25%') - 16,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>더보기</Text>
    </View>
  );

  const renderHospitalItem = (item: any, index: number) => (
    <HospitalItemContainerView
      key={String(index)}
      style={{
        paddingLeft: index % 2 === 0 ? 16 : 6,
        paddingRight: index % 2 === 0 ? 6 : 16,
      }}>
      <HospitalItemImageView />
      <HospitalItemCaptionView>
        <HospitalItemLocationText>{'이의동'}</HospitalItemLocationText>
        <HospitalItemNameText>{'이가편한치과'}</HospitalItemNameText>
      </HospitalItemCaptionView>
    </HospitalItemContainerView>
  );
  return (
    <Animated.ScrollView
      ref={scrollRef}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: (y: number) =>
                  Animated.block([
                    Animated.set(scrollY, y),
                    Animated.call([y], ([offsetY]) => {
                      if (offsetY >= 300) {
                        setScrollEnabled(true);
                      }
                    }),
                  ]),
              },
            },
          },
        ],
        {useNativeDriver: true},
      )}>
      <View
        style={{
          width: '100%',
          height: 300,
          backgroundColor: 'red',
        }}></View>

      <View
        style={{
          width: '100%',
          height: 600,
          backgroundColor: 'yellow',
        }}>
        <ScrollView horizontal={true} pagingEnabled>
          <ScrollView
            scrollEventThrottle={16}
            onScroll={(e) => {
              if (e.nativeEvent.contentOffset.y < 0) {
                console.log(
                  scrollRef.current.getNode().scrollTo({
                    y: 300 + e.nativeEvent.contentOffset.y,
                    animated: false,
                  }),
                );
              }
            }}
            scrollEnabled={scrollEnabled}
            style={{
              width: wp('100%'),
              height: 600,
              backgroundColor: 'blue',
            }}>
            <View
              style={{
                width: wp('100%'),
                height: 600,
                backgroundColor: 'purple',
              }}></View>
            <View
              style={{
                width: wp('100%'),
                height: 600,
                backgroundColor: 'grey',
              }}></View>
          </ScrollView>
          <ScrollView
            style={{
              width: wp('100%'),
              backgroundColor: 'blue',
            }}>
            <View
              style={{
                width: wp('100%'),
                height: 600,
                backgroundColor: 'pink',
              }}></View>
            <View
              style={{
                width: wp('100%'),
                height: 600,
                backgroundColor: 'orange',
              }}></View>
          </ScrollView>
        </ScrollView>
      </View>
    </Animated.ScrollView>
  );
};

export default CommunityHomeScreen;
