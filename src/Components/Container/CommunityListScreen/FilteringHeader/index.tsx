import React, {useState, useRef, useEffect} from 'react';
import {TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import LocationSelection from '~/Components/Container/CommunityListScreen/FilteringHeader/LocationSelection';

const FilterContainer = Styled.View`

margin: 8px 0px;
background-color: #ffffff;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const OrderFilterContainer = Styled.View`
padding: 10px 16px;
flex-direction: row;
align-items: center;
`;

const OrderFilterItemContainer = Styled.View`
background-color: #ffffff;
border-radius: 100px;
border-width: 1px;
border-color: #E2E6ED;
padding: 6px 16px;
`;

const OrderFilterText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 23px;
color: #131F3C;
`;
const LocationFilterContainer = Styled.View`
flex-direction: row;
padding-top: 16px;
padding-bottom: 16px;
padding-left: 16px;
padding-right: 16px;
`;

const LocationFilterText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 24px;
color: #000000;
`;

const LocationFilterDropdownIcon = Styled.Image`
margin-left: 2px;
margin-top: 2px;
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

interface Props {
  hometown: any;
  setSelectedHometown: any;
  onFiltering: any;
  selectedHometown: any;
  order: string;
  moveToHomeTownSetting: any;
}
const FilteringHeader = ({
  hometown,
  setSelectedHometown,
  onFiltering,
  selectedHometown,
  order,
  moveToHomeTownSetting,
}: Props) => {
  const [floatVisible, setFloatVisible] = useState(false);
  const [floatStartPixel, setFloatStartPixel] = useState(0);
  return (
    <>
      <FilterContainer
        onLayout={(e) => {
          setFloatStartPixel(e.nativeEvent.layout.y);
        }}>
        <OrderFilterContainer>
          <TouchableWithoutFeedback
            onPress={() => {
              ReactNativeHapticFeedback.trigger('selection');
              onFiltering('createdAt');
            }}>
            <OrderFilterItemContainer
              style={[
                {marginRight: 6},
                order === 'createdAt' && {borderColor: '#00D1FF'},
              ]}>
              <OrderFilterText
                style={order === 'createdAt' && {color: '#00D1FF'}}>
                {'최신순'}
              </OrderFilterText>
            </OrderFilterItemContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              ReactNativeHapticFeedback.trigger('selection');
              onFiltering('popular');
            }}>
            <OrderFilterItemContainer
              style={order === 'popular' && {borderColor: '#00D1FF'}}>
              <OrderFilterText
                style={order === 'popular' && {color: '#00D1FF'}}>
                {'인기순'}
              </OrderFilterText>
            </OrderFilterItemContainer>
          </TouchableWithoutFeedback>
        </OrderFilterContainer>
        <TouchableWithoutFeedback onPress={() => setFloatVisible(true)}>
          <LocationFilterContainer>
            <LocationFilterText>{selectedHometown.emdName}</LocationFilterText>
            <LocationFilterDropdownIcon
              source={require('~/Assets/Images/Arrow/ic_dropdown.png')}
            />
          </LocationFilterContainer>
        </TouchableWithoutFeedback>
      </FilterContainer>
      {floatVisible ? (
        <LocationSelection
          hometown={[{emdName: '전국', id: -1}, ...hometown]}
          selectedHometown={selectedHometown}
          setSelectedHometown={setSelectedHometown}
          setFloatVisible={setFloatVisible}
          moveToHomeTownSetting={moveToHomeTownSetting}
          style={{
            top: floatStartPixel + 54,
            right: 16,
          }}
        />
      ) : null}
    </>
  );
};

export default FilteringHeader;
