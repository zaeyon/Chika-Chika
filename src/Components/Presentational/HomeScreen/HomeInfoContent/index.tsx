import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {BoxShadow} from 'react-native-shadow';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styled from 'styled-components/native';
import {
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

const ContainerView = Styled.View`
flex: 1;
padding: 0px 16px;
z-index: 3;
`;

const TopTitleView = Styled.View`
padding: 0px 8px;
margin-bottom: 24px;
margin-top: 24px;
flex-direction: row;
align-items: center;
`;

const TopTitleContentView = Styled.View`
`;

const TopTitleHeaderView = Styled.View`
flex-direction: row;
align-items: center;
margin-bottom: 12px;
`

const TopTitleText = Styled.Text`
font-weight: normal;
font-size: 20px;
line-height: 24px;
margin-right: 8px;
`;

const TopTitleBoldText = Styled.Text`
font-weight: bold;
font-size: 20px;
`;

const HeaderContainerView = Styled.View`
flex-direction: row;
`;
const HeaderContentView = Styled.View`
flex: 1;
background: #FFFFFF;
border-radius: 8px;
padding: 16px;
margin-bottom: 16px;
`;

const HeaderContentText = Styled.Text`
font-weight: 500;
font-size: 14px;
line-height: 24px;
color: #9AA2A9;
`;

const HeaderTitleContainerView = Styled.View`
margin-top: 4px;
margin-bottom: 16px;
flex-direction: row;
`;
const LocationHighlightContainerView = Styled.View`
margin-bottom: auto;
`;

const LocationUnderlineView = Styled.View`
width: 100%;
height: 16px;
position: absolute;
bottom: 0px;
background: #DAECFE;
`;

const HeaderTitleText = Styled.Text`
font-weight: bold;
font-size: 24px;
`;

const HeaderContentButtonView = Styled.View`
margin-left: auto;
padding: 2px 11px;
background: #F5F7F9;
border-radius: 100px;
`;

const HeaderContentButtonText = Styled.Text`
font-weight: bold;
font-size: 13px;
line-height: 24px;
color: #4E525D;
`;

const LocalInfoContainerView = Styled.View`
elevation: 7;
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
border-radius: 8px;
padding: 16px;
flex-direction: row;
margin-bottom: 16px;
`;

const LocalInfoContentView = Styled.View`
flex: 1;
`;

const LocalInfoPartitionView = Styled.View`
background: #F5F7F9;
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
top: ${Platform.OS === 'android' ? -2 : 0}px;
right: 24px;
`;

const SlotContentText = Styled.Text`
font-weight: bold;
font-size: 24px;
color: #131F3C;
text-align: right;
height: 30px;
`;

const FloatContainerView = Styled.View`
position: absolute;
flex: 1;
z-index: 3;
top: 0px;
background: red;
`;

const LocalInfoContainerShadow = Styled.View`
background-color: #ffffff00;
position: absolute;
elevation: 3;
opacity: 0.5;
width: ${wp('91.4%')};
height: ${wp('25.58%')};
`;

interface Props {
  isMainHomeChanged: boolean;
  selectedHometown: any;
  localClinicCount: number;
  localReviewCount: number;
  moveToHomeTownSetting: () => void;
}

const HomeInfoContent = ({
  isMainHomeChanged,
  selectedHometown,
  localClinicCount,
  localReviewCount,
  moveToHomeTownSetting,
}: Props) => {
  const [initialize, setInitialize] = useState(true);
  const initialY = useRef(new Animated.Value(0)).current;
  const secondY = useRef(new Animated.Value(0)).current;
  const thirdY = useRef(new Animated.Value(0)).current;

  const reviewSlotY = useRef(new Animated.Value(0)).current;
  const clinicSlotY = useRef(new Animated.Value(0)).current;

  const imageY = useRef(new Animated.Value(0)).current;
  const hometownScale = useRef(new Animated.Value(1)).current;

  const localInfoContainerRef = useRef<any>({width: 0, height: 0})

  const localInfoContainerShadowOpt = {
    width: wp('91.4%'),
    height: wp('25.58%'),
    color: "#000000",
    border: 15,
    radius: 3,
    opacity: 0.2,
    x: 0,
    y: 3,
  }

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
        clinicSlotY.setValue(0);
        Animated.spring(clinicSlotY, {
          toValue: 1,
          friction: 12,
          tension: 68,
          useNativeDriver: true,
        }).start(() => setInitialize(false));
        reviewSlotY.setValue(0);
        Animated.spring(reviewSlotY, {
          toValue: 1,
          friction: 12,
          tension: 68,
          useNativeDriver: true,
        }).start(() => setInitialize(false));
      });
    });
  }, []);

  useEffect(() => {
    console.log('selectedHometown changed');
    if (!isMainHomeChanged) {
      Animated.spring(hometownScale, {
        toValue: 1.2,
        delay: 200,
        friction: 17,
        tension: 68,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(hometownScale, {
          toValue: 1,
          friction: 17,
          tension: 68,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isMainHomeChanged]);

  const renderSlotNumber = useCallback(
    (number: number, type: string) => {
      if (!initialize) {
        if (type === 'clinic') {
          clinicSlotY.setValue(0);
          Animated.spring(clinicSlotY, {
            toValue: 1,
            friction: 12,
            tension: 68,
            useNativeDriver: true,
          }).start();
        } else if (type === 'review') {
          reviewSlotY.setValue(0);
          Animated.spring(reviewSlotY, {
            toValue: 1,
            friction: 12,
            tension: 68,
            useNativeDriver: true,
          }).start();
        }
      }
      return (
        <SlotContainerView
          as={Animated.View}
          style={{
            opacity: (type === 'review'
              ? reviewSlotY
              : clinicSlotY
            ).interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 0.2, 1],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                translateY: (type === 'review'
                  ? reviewSlotY
                  : clinicSlotY
                ).interpolate({
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
    },
    [initialize],
  );

  const memoClinicCount = useMemo(
    () => renderSlotNumber(localClinicCount, 'clinic'),
    [localClinicCount],
  );
  
  const memoReviewCount = useMemo(
    () => renderSlotNumber(localReviewCount, 'review'),
    [localReviewCount],
  );

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
        <TopTitleContentView>

        <TopTitleHeaderView>
        <TopTitleText>{'우리동네'}</TopTitleText>
        <LocationHighlightContainerView>
              <LocationUnderlineView
                as={Animated.View}
                style={{
                  opacity: hometownScale.interpolate({
                    inputRange: [1, 1.2],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                  }),
                }}
                />
              <HeaderTitleText
                as={Animated.Text}
                style={{
                  transform: [{scale: hometownScale}],
                }}>
                {selectedHometown?.emdName}
              </HeaderTitleText>
                </LocationHighlightContainerView>
          </TopTitleHeaderView>
        <TopTitleBoldText>{'치과 정보 확인하세요'}</TopTitleBoldText>
        </TopTitleContentView>
        <TouchableWithoutFeedback onPress={() => moveToHomeTownSetting()}>
            <HeaderContentButtonView>
              <HeaderContentButtonText>{'동네설정'}</HeaderContentButtonText>
            </HeaderContentButtonView>
          </TouchableWithoutFeedback>
      </TopTitleView>
      <LocalInfoContainerView
        onLayout={(event: any) => {
          localInfoContainerRef.current.width = event.nativeEvent.layout.width;
          localInfoContainerRef.current.height = event.nativeEvent.layout.height;
        }}
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
            {memoClinicCount}
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
            {memoReviewCount}
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

export default React.memo(HomeInfoContent);
