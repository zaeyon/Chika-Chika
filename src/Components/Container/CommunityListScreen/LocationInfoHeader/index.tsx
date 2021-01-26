import React, {useState, useRef, useEffect} from 'react';
import {Image, Animated} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContianerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
background: #FFFFFF;
padding: 0px 8px;
flex-direction: row;
border-bottom-width: 1px;
border-color: #E2E6ED;
margin-bottom: 8px;
`;

const HeaderTitleView = Styled.View`
margin-left: 16px;
align-items: center;
flex-direction: row;
`;

const HeaderTitleText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
margin-right: 8px;
`;

const LocationToggleContainerView = Styled.View`
flex-direction: row;
justify-content: center;
align-items: center;
`;

const LocationToggleTouchableOpacity = Styled.TouchableOpacity``;

const LocationToggleContentView = Styled.View`
justify-content: center;
align-items: center;
flex-direction: row;
padding: 16px 8px
`;

const LocationSelectedText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: 800;
font-size: 14px;
line-height: 24px;
display: flex;
align-items: center;
color: #131F3C;
`;

const LocationText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 24px;
display: flex;
align-items: center;
color: #9AA2A9;
`;

const LocationDividingView = Styled.View`
width: 1px;
height: 8px;
background: #E2E6ED;
`;

interface Props {
  hometown: any;
  region: string;
  setRegion: any;
  type: string;
}
const LocationInfoHeader = ({hometown, region, setRegion, type}: Props) => {
  const iconSize = useRef(new Animated.Value(1)).current;
  const [mainHometown, setMainHometown] = useState(
    hometown.find((item) => item.UsersCities.now === true),
  );

  useEffect(() => {
    setMainHometown(hometown.find((item) => item.UsersCities.now === true));
  }, [hometown]);

  return (
    <ContianerView>
      <LocationToggleContainerView>
        <LocationToggleTouchableOpacity onPress={() => setRegion('all')}>
          <LocationToggleContentView>
            {region === 'all' ? (
              <LocationSelectedText>{'전국'}</LocationSelectedText>
            ) : (
              <LocationText>{'전국'}</LocationText>
            )}
          </LocationToggleContentView>
        </LocationToggleTouchableOpacity>
        <LocationDividingView />
        <LocationToggleTouchableOpacity
          onPress={() => {
            setRegion('residence', () =>
              Animated.spring(iconSize, {
                delay: 290,
                toValue: 1.4,
                friction: 8,
                tension: 300,
                useNativeDriver: true,
              }).start(),
            );
          }}>
          {region === 'residence' ? (
            <LocationToggleContentView>
              <LocationSelectedText>
                {mainHometown.emdName}
              </LocationSelectedText>
            </LocationToggleContentView>
          ) : (
            <LocationToggleContentView>
              <LocationText>{mainHometown.emdName}</LocationText>
            </LocationToggleContentView>
          )}
        </LocationToggleTouchableOpacity>
      </LocationToggleContainerView>
    </ContianerView>
  );
};

export default LocationInfoHeader;
