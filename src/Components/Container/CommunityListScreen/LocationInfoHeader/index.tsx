import React, {useState, useRef, useEffect} from 'react';
import {TouchableWithoutFeedback, Animated} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContianerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
background: #FFFFFF;
padding: 0px 16px;
flex-direction: row;
border-bottom-width: 1px;
border-color: #E2E6ED;
margin-bottom: 8px;
`;

const RegionSelectionView = Styled.View`
padding: 7.5px 12px;
margin: 12px 0px;
margin-left: auto;
background: #131F3C;
border-radius: 100px;
`;

const RegionSelectionText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 12px;
line-height: 16px;
color: #FFFFFF;
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
padding: 20px 0px

`;

const LocationSelectedText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: 800;
font-size: 16px;
line-height: 16px;
display: flex;
align-items: center;
color: #131F3C;
`;

const LocationText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 16px;
display: flex;
align-items: center;
color: #9AA2A9;
`;

const LocationDividingView = Styled.View`
width: 1px;
height: 8px;
background: #E2E6ED;
`;

const LocationSplitView = Styled.View`
width: 2px;
height: 2px;
background: #9AA2A9;
border-radius: 2px;
margin: 0px 8px;
`;

const LocationIndicatorView = Styled.View`
width: 100%;
height: 2px;
position: absolute;
bottom: 17px;
background: #131F3C;
`;

interface Props {
  selectedHometown: any;
  region: string;
  setRegion: any;
  type: string;
  setFloatVisible: any;
}
const LocationInfoHeader = ({
  selectedHometown,
  region,
  setRegion,
  setFloatVisible,
  type,
}: Props) => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  return (
    <ContianerView>
      <LocationToggleContainerView>
        <LocationToggleTouchableOpacity onPress={() => setRegion('all')}>
          <LocationToggleContentView>
            {region === 'all' ? (
              <>
                <LocationSelectedText>{'전국'}</LocationSelectedText>
                <LocationIndicatorView />
              </>
            ) : (
              <LocationText>{'전국'}</LocationText>
            )}
          </LocationToggleContentView>
        </LocationToggleTouchableOpacity>
        <LocationSplitView />
        <LocationToggleTouchableOpacity
          onPress={() => {
            setRegion('residence');
          }}>
          {region === 'residence' ? (
            <LocationToggleContentView>
              <LocationSelectedText>
                {selectedHometown?.emdName}
              </LocationSelectedText>
              <LocationIndicatorView />
            </LocationToggleContentView>
          ) : (
            <LocationToggleContentView>
              <LocationText>{selectedHometown?.emdName}</LocationText>
            </LocationToggleContentView>
          )}
        </LocationToggleTouchableOpacity>
      </LocationToggleContainerView>
      {region === 'residence' ? (
        <TouchableWithoutFeedback
          onPress={() => {
            buttonScale.setValue(0.95);
            Animated.spring(buttonScale, {
              toValue: 1,
              friction: 17,
              tension: 68,
              useNativeDriver: true,
            }).start();
            setFloatVisible((prev) => !prev);
          }}>
          <RegionSelectionView
            as={Animated.View}
            style={{transform: [{scale: buttonScale}]}}>
            <RegionSelectionText>{'지역변경'}</RegionSelectionText>
          </RegionSelectionView>
        </TouchableWithoutFeedback>
      ) : null}
    </ContianerView>
  );
};

export default LocationInfoHeader;
