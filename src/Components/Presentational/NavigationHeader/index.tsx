import React, {useCallback} from 'react';
import {TouchableWithoutFeedback, Platform} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from '~/method/deviceInfo';

// padding-top: ${(props) => (hasNotch() ? (props.inSafeAreaView ? 0 : getStatusBarHeight()) : ((Platform.OS === 'ios') ? getStatusBarHeight() : 0))}px;

const HeaderBar = Styled.View<{borderDisable: boolean, inSafeAreaView: boolean}>`
 width: ${wp('100%')}px;
 padding-top: ${(props) => (Platform.OS === 'ios' ? (props.inSafeAreaView ? 0 : getStatusBarHeight()) : 0)}px;
 flex-direction: row;
 justify-content: space-between;
 border-bottom-width: ${(props) => (props.borderDisable ? 0 : 0.5)}px;
 border-color: #E2E6ED;
 background-color: #ffffff;
 z-index: 3;
`;

const HeaderText = Styled.Text<{disabled: boolean; color: string}>`
font-style: normal;
font-weight: ${(props) => (props.disabled ? 'normal' : '600')};
font-size: 16px;
line-height: 24px;
color: ${(props) => (props.disabled ? '#9AA2A9' : props.color)};
`;

const HeaderLeftContainer = Styled.View`
min-width: 44px;
height: 100%;
padding: 12px 16px 16.5px 16px;
flex-direction: row;
align-items: center;
`;

const HeaderLeftText = Styled.Text`
color: #131F3C;
font-size: 18px;
font-weight: 700;
`;

const HeaderTitleContainer = Styled.View`
padding: 12px 16px 16px 16px;
justify-content: center;
align-items: center;
position: absolute;
width: 100%;
z-index: -1;
bottom: 0px;
`;

const HeadeIconText = Styled.Text`
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 20px;
color: #131F3C;
`;

const HeaderTitleText = Styled.Text`
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
color: #131F3C;
`;

const HeaderCenterContainer = Styled.View`
flex-direction: row;
flex: 1;
`;

const HeaderSearchInput = Styled.TextInput`
flex: 1;
background-color: #ffffff;
padding-bottom: 3px;
font-weight: 400;
font-size: 16px;
color: #131F3C;
`;

const HeaderRightContainer = Styled.View`
min-width: 44px;
height: 100%;
padding: 12px 16px 16.5px 16px;
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
`;

interface HeaderProps {
  onPress?: any;
  text?: string;
  type?: string;
  renderSearchInput?: any;
  fontColor?: string;
}

interface Props {
  borderDisable?: boolean;
  inSafeAreaView?: boolean;
  headerLeftProps?: HeaderProps;
  headerRightProps?: HeaderProps;
  headerCenterProps?: HeaderProps;
  headerLeftDisabled?: boolean;
  headerRightDisabled?: boolean;
  headerLeftActiveColor?: string;
  headerRightActiveColor?: string;
  headerTitle?: string;
}
const NavigationHeader = ({
  borderDisable = false,
  inSafeAreaView = false,
  headerLeftProps,
  headerRightProps,
  headerCenterProps,
  headerLeftDisabled = false,
  headerRightDisabled = false,
  headerLeftActiveColor = '#131F3C',
  headerRightActiveColor = '#131F3C',
  headerTitle,
}: Props) => {
  const renderHeaderRightContent = useCallback(() => {
    if (headerRightProps) {
      switch (headerRightProps.type) {
        case 'arrow':
          return (
            <HeaderIconView>
              <HeaderIcon
                source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
              />
            </HeaderIconView>
          );
        case 'viewMore':
          return (
            <HeaderIconView>
              <HeaderIcon
                source={require('~/Assets/Images/HeaderBar/ic_viewMore.png')}
              />
            </HeaderIconView>
          );
        case 'search':
          return (
            <HeaderIconView>
              <HeaderIcon
                source={require('~/Assets/Images/HeaderBar/ic_search.png')}
              />
            </HeaderIconView>
          );
        case 'text':
          return (
            <HeaderText
              disabled={headerRightDisabled}
              color={headerRightActiveColor}>
              {headerRightProps.text}
            </HeaderText>
          );
        default:
          return <HeaderEmptyContainer />;
      }
    } else {
      return (
        null
      )
    }
  }, [headerRightProps, headerRightDisabled, headerRightActiveColor]);
  return (
    <HeaderBar
    borderDisable={borderDisable}
    inSafeAreaView={inSafeAreaView}>
      <TouchableWithoutFeedback
        disabled={headerLeftDisabled}
        onPress={() => {
          headerLeftProps?.onPress && headerLeftProps?.onPress();
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
                <HeadeIconText>{headerLeftProps.text}</HeadeIconText>
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
        <HeaderTitleContainer >
          <HeaderTitleText>{headerTitle}</HeaderTitleText>
        </HeaderTitleContainer>
      )}
      {headerCenterProps?.type === 'searchInput' && (
        <HeaderCenterContainer>
          {headerCenterProps.renderSearchInput()}
        </HeaderCenterContainer>
      )}
      <TouchableWithoutFeedback
        disabled={headerRightDisabled}
        onPress={() => {
          headerRightProps?.onPress && headerRightProps?.onPress();
        }}>
        <HeaderRightContainer>
          {renderHeaderRightContent()}
        </HeaderRightContainer>
      </TouchableWithoutFeedback>
    </HeaderBar>
  );
};

export default NavigationHeader;

// return (
//   <HeaderBar>
//     <TouchableWithoutFeedback
//       disabled={headerLeftDisabled}
//       onPress={() => {
//         headerLeftProps?.onPress();
//       }}>
//       <HeaderLeftContainer>
//         {headerLeftProps?.type === 'arrow' ? (
//           <HeaderIconView>
//             <HeaderIcon
//               style={[{resizeMode: 'contain'}, headerCenterProps?.type === "search" && {tintColor: "#9AA2A9"}]}
//               source={require('~/Assets/Images/HeaderBar/ic_back.png')}
//             />
//             {headerLeftProps?.text?.length > 0 && (
//               <HeaderLeftText>{headerLeftProps.text}</HeaderLeftText>
//             )}
//           </HeaderIconView>
//         ) : (
//           <HeaderText
//             disabled={headerLeftDisabled}
//             color={headerLeftActiveColor}>
//             {headerLeftProps?.text}
//           </HeaderText>
//         )}
//       </HeaderLeftContainer>
//     </TouchableWithoutFeedback>
//     {headerTitle && (
//     <HeaderTitleContainer>
//       <HeaderTitleText>{headerTitle}</HeaderTitleText>
//     </HeaderTitleContainer>
//     )}
//     {headerCenterProps?.type === "searchInput" && (
//       <HeaderCenterContainer>
//         {headerCenterProps.renderSearchInput()}
//       </HeaderCenterContainer>
//     )}
//     <HeaderRightContainer>
//       <TouchableWithoutFeedback
//         disabled={headerRightDisabled}
//         onPress={() => {
//           if(!headerRightDisabled) {
//             headerRightProps?.onPress();
//           } else {
//             return
//           }
//         }}>
//         {headerRightProps?.type === 'arrow' ? (
