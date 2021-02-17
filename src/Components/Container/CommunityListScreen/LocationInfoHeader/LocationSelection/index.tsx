import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
right: 16px;
top: 48px;
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
  hometown: any;
  selectedHometown: any;
  setSelectedHometown: (hometown: any) => void;
  setFloatVisible: any;
  moveToHomeTownSetting: any;
}
const LocationSelection = ({
  hometown,
  selectedHometown,
  setSelectedHometown,
  setFloatVisible,
  moveToHomeTownSetting,
}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => setFloatVisible(false)}>
      <ContainerView>
        <HometownSettingFloatView>
          {hometown.map((item: any, index: number) => (
            <HometownItemContainerView
            key={index}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setSelectedHometown(item);
                  setFloatVisible(false);
                }}>
                <HometownSetttingContentView key={item.emdName}>
                  {item.id === selectedHometown.id ? (
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
              <VerticalPartition key={'bar' + String(index)} />
            </HometownItemContainerView>
          ))}
          <TouchableWithoutFeedback onPress={() => moveToHomeTownSetting()}>
            <HometownSetttingContentView>
              <HometownSettingNavigationText>
                {'동네설정'}
              </HometownSettingNavigationText>
            </HometownSetttingContentView>
          </TouchableWithoutFeedback>
        </HometownSettingFloatView>
      </ContainerView>
    </TouchableWithoutFeedback>
  );
};

export default LocationSelection;
