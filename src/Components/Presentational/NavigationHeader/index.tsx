import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('14.1%') + getStatusBarHeight()}px;
  margin-top: ${-getStatusBarHeight()}
  padding-top: ${getStatusBarHeight()}
 flex-direction: row;
 justify-content: space-between;
 border-bottom-width: 0.5px;
 border-color: #E2E6ED;
 background-color: #ffffff;
`;

const HeaderText = Styled.Text<{disabled: boolean; color: string}>`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 30px;
color: ${(props) => (props.disabled ? '#9AA2A9' : '#00D1FF')};
`;

const HeaderLeftContainer = Styled.View`
min-width: 44px;
height: 100%;
padding: 12px 16px 17px 16px;
align-items: center;
flex-direction: row;
`;

const HeaderLeftText = Styled.Text`
font-family: NanumSquare;
color: #131F3C;
font-size: 18px;
font-weight: 700;
`;

const HeaderTitleContainer = Styled.View`
width: 100%;
position: absolute;
height: 100%;
padding: 12px 16px 16px 16px;
align-items: center;
z-index: -1;
`;

const HeaderTitleText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
font-size: 16px; 
line-height: 30px;
`;

const HeaderCenterContainer = Styled.View`
flex-direction: row;
flex: 1;
`;

const HeaderSearchInput = Styled.TextInput`
flex: 1;
background-color: #ffffff;
font-family: NanumSquare;
padding-bottom: 3px;
font-weight: 400;
font-size: 16px;
color: #131F3C;
`;

const HeaderRightContainer = Styled.View`
min-width: 44px;
height: 100%;
padding: 12px 16px 17px 16px;
 align-items: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderIconView = Styled.View`
flex-direction: row;
align-items: center;
`;

const HeaderIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

interface HeaderProps {
  onPress: any;
  text?: string;
  type: string;
  onChangeText?: (test: string) => void;
  onEndEditing?: () => void;
}

interface Props {
  headerLeftProps?: HeaderProps;
  headerRightProps?: HeaderProps;
  headerCenterProps?: HeaderProps;
  headerLeftDisabled?: boolean;
  headerRightDisabled?: boolean;
  headerLeftActiveColor?: string;
  headerRightActiveColor?: string;
  headerTitle: string;
}
const NavigationHeader = ({
  headerLeftProps,
  headerRightProps,
  headerCenterProps,
  headerLeftDisabled = false,
  headerRightDisabled = false,
  headerLeftActiveColor = '#000000',
  headerRightActiveColor = '#000000',
  headerTitle,
}: Props) => {
  return (
    <HeaderBar>
      <TouchableWithoutFeedback
        disabled={headerLeftDisabled}
        onPress={() => {
          headerLeftProps?.onPress();
        }}>
        {headerLeftProps ? (
          <HeaderLeftContainer>
            {headerLeftProps.type === 'arrow' ? (
              <HeaderIconView>
                <HeaderIcon
                  style={[
                    {resizeMode: 'contain'},
                    headerCenterProps?.type === 'search' && {
                      tintColor: '#9AA2A9',
                    },
                  ]}
                  source={require('~/Assets/Images/HeaderBar/ic_back.png')}
                />
              </HeaderIconView>
            ) : (
              <HeaderText
                disabled={headerLeftDisabled}
                color={headerLeftActiveColor}>
                {headerLeftProps?.text}
              </HeaderText>
            )}
          </HeaderLeftContainer>
        ) : null}
      </TouchableWithoutFeedback>
      {headerTitle && (
        <HeaderTitleContainer>
          <HeaderTitleText>{headerTitle}</HeaderTitleText>
        </HeaderTitleContainer>
      )}
      {headerCenterProps?.type === 'search' && (
        <HeaderCenterContainer>
          <HeaderSearchInput
            placeholder={'동명(읍, 면)으로 검색(ex. 이의동)'}
            placeholderTextColor={'#9AA2A9'}
            clearButtonMode={'while-editing'}
            onChangeText={headerCenterProps?.onChangeText}
            onEndEditing={headerCenterProps?.onEndEditing}
            returnKeyType={'search'}
          />
        </HeaderCenterContainer>
      )}
      <TouchableWithoutFeedback
        disabled={headerRightDisabled}
        onPress={() => {
          headerRightProps?.onPress();
        }}>
        <HeaderRightContainer>
          {headerRightProps?.type === 'arrow' ? (
            <HeaderIconView>
              <HeaderIcon
                source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
              />
            </HeaderIconView>
          ) : headerRightProps?.type === 'viewMore' ? (
            <HeaderIconView>
              <HeaderIcon
                source={require('~/Assets/Images/HeaderBar/ic_viewMore.png')}
              />
            </HeaderIconView>
          ) : headerRightProps?.type === 'search' ? (
            <HeaderIconView>
              <HeaderIcon
                source={require('~/Assets/Images/HeaderBar/ic_search.png')}
              />
            </HeaderIconView>
          ) : headerRightProps?.type === 'empty' ? (
            <HeaderEmptyContainer />
          ) : (
            <HeaderText
              disabled={headerRightDisabled}
              color={headerRightActiveColor}>
              {headerRightProps?.text}
            </HeaderText>
          )}
        </HeaderRightContainer>
      </TouchableWithoutFeedback>
    </HeaderBar>
  );
};

export default React.memo(NavigationHeader);
