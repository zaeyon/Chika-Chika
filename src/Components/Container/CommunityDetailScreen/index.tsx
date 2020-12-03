import React from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  KeyboardAvoidingView,
  View,
  Animated,
  Keyboard,
  LayoutAnimation,
  Easing,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
// Local Component
import PostInformation from '~/Components/Presentational/CommunityPostDetailScreen/PostInformation';
import PostItem from '~/Components/Presentational/PostItem';
import DentistComment from '~/Components/Presentational/CommunityPostDetailScreen/DentistComment';
import PostCommentList from '~/Components/Presentational/CommunityPostDetailScreen/PostCommentList';
import PostBottomBar from '~/Components/Presentational/CommunityPostDetailScreen/PostBottomBar';
import {bindActionCreators} from 'redux';
const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: white;
`;

const BodyContainerScrollView = Styled.ScrollView`
flex: 1;
margin-bottom: ${hp('100%') * 0.08}px;

`;

interface Props {
  navigation: any;
  route: any;
  key: any;
  data: any;
}

interface States {
  scrollY: Animated.Value;
  keyboardHeight: Animated.Value;
}

export default class CommunityDetailScreen extends React.Component<
  Props,
  States
> {
  scrollView: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      keyboardHeight: new Animated.Value(0),
    };

    this.toggleKeyboardAnimation = this.toggleKeyboardAnimation.bind(this);
  }

  toggleKeyboardAnimation = (height: Number) => {
    this.scrollView &&
      this.scrollView.scrollTo({
        y: (this.state.scrollY as any)._value + height,
      });
  };

  render() {
    return (
      <ContainerView>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <BodyContainerScrollView
            scrollIndicatorInsets={{
              bottom: getBottomSpace() ? 0 : 11,
            }}
            ref={(ref) => (this.scrollView = ref)}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.state.scrollY,
                  },
                },
              },
            ])}>
            <PostInformation navigation={this.props.navigation} />
            <PostItem
              key={'CommunityDetailScreen'}
              mode={'Detail'}
              navigation={this.props.navigation}
              data={this.props.route.params.data}
            />
            <DentistComment />

            <PostCommentList
              commentList={this.props.route.params.data.comments}
            />
          </BodyContainerScrollView>
        </KeyboardAvoidingView>
        <PostBottomBar toggleKeyboardAnimation={this.toggleKeyboardAnimation} />
      </ContainerView>
    );
  }
}
