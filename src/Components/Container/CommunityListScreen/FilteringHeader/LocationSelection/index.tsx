import React, {useCallback} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

import POSTMainHometownChange from '~/Routes/User/POSTMainHometownChange';

const ContainerView = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
background: transparent;
z-index: 2;
`;

const HometownSettingFloatView = Styled.View`
background: #FFFFFF;
position: absolute;
width: 114px;
border-width: 1px;
border-color: #E2E6ED;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
border-radius: 12px;
`;

const HometownSetttingContentView = Styled.View`
padding: 12px 16px;
justify-content: center;
`;

const HometownSettingContentSelectedText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
color: #131F3C;
`;

const HometownSettingContentText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
`;

const HometownSettingNavigationText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
text-decoration-line: underline;
`;

const VerticalPartition = Styled.View`
width: 100%;
height: 1px;
background: #E2E6ED;
`;

const HometownItemContainerView = Styled.View`
`;

interface Props {
  jwtToken: string;
  hometown: any;
  selectedHometown: any;
  setSelectedHometown: (hometown: any) => void;
  setFloatVisible: any;
  moveToHomeTownSetting: any;
  manageMode: boolean;
  style: any;
}
const LocationSelection = ({
  jwtToken,
  hometown,
  selectedHometown,
  setSelectedHometown = (hometown: any) => console.log(''),
  setFloatVisible,
  moveToHomeTownSetting,
  manageMode = false,
  style,
}: Props) => {
  const dispatch = useDispatch();

  const clickHometownItem = useCallback(
    (index: number) => {
      if (hometown[index].UsersCities?.now === true) {
        return;
      } else if (hometown[index].UsersCities?.now === false) {
        dispatch(allActions.userActions.changeMainHometown(index));
        const cityId = hometown[index].id;

        POSTMainHometownChange({jwtToken, cityId})
          .then((response) => {
            console.log('POSTMainHometownChange response', response);
          })
          .catch((error) => {
            console.log('POStMainHometownChange error', error);
          });
      }
    },
    [hometown],
  );

  return (
    <TouchableWithoutFeedback onPress={() => setFloatVisible(false)}>
      <ContainerView>
        <HometownSettingFloatView style={style}>
          {hometown.map((item: any, index: number) => (
            <HometownItemContainerView key={index}>
              {index ? <VerticalPartition key={'bar' + String(index)} /> : null}
              <TouchableWithoutFeedback
                key={String(item.id)}
                onPress={() => {
                  if (manageMode) {
                    clickHometownItem(index);
                  }
                  ReactNativeHapticFeedback.trigger('selection');
                  setSelectedHometown(item);

                  setFloatVisible(false);
                }}>
                <HometownSetttingContentView key={item.emdName}>
                  {item.id === selectedHometown?.id ? (
                    <HometownSettingContentSelectedText>
                      {item.emdName}
                    </HometownSettingContentSelectedText>
                  ) : (
                    <HometownSettingContentText>
                      {item.emdName}
                    </HometownSettingContentText>
                  )}
                </HometownSetttingContentView>
              </TouchableWithoutFeedback>
            </HometownItemContainerView>
          ))}
          {manageMode ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFloatVisible(false);
                moveToHomeTownSetting();
              }}>
              <HometownSetttingContentView>
                <HometownSettingNavigationText>
                  {'동네설정'}
                </HometownSettingNavigationText>
              </HometownSetttingContentView>
            </TouchableWithoutFeedback>
          ) : null}
        </HometownSettingFloatView>
      </ContainerView>
    </TouchableWithoutFeedback>
  );
};

export default LocationSelection;
