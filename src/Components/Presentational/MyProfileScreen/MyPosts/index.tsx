import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ReAnimated from 'react-native-reanimated';
import Swiper from 'react-native-swiper';
import Animated from 'react-native-reanimated';

const PROFILEHEIGHT = 88;

const ContainerView = Styled.View`
 flex: 1;
 background: blue;
`;

const PostScrollView = Styled(
  Animated.ScrollView as new () => Animated.ScrollView,
)`
flex: 1;

`;

interface Props {
  navigation: any;
  route: any;
  scrollY: any;
  focusedIndex: number;
  otherY: number;
}

export default class MyPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewScrollY: new Animated.Value(0),
      communityScrollY: new Animated.Value(0),
      currentIndex: 0,
    };
  }
  render() {
    return (
      <ContainerView>
        <Swiper
          loop={false}
          onIndexChanged={(index) => {
            this.setState({
              currentIndex: index,
            });
          }}>
          <PostScrollView
            ref={(ref) => (this.reviewRef = ref)}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: (y) =>
                        Animated.block([
                          Animated.set(this.state.reviewScrollY, y),
                          Animated.call([y], ([offsetY]) => {
                            if (this.state.currentIndex === 0) {
                              console.log(this.state.currentIndex);
                              this.communityRef &&
                                this.communityRef.getNode().scrollTo({
                                  y: offsetY,
                                  animated: false,
                                });
                            }
                          }),
                        ]),
                    },
                  },
                },
              ],
              {
                useNativeDriver: true,
              },
            )}>
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
          </PostScrollView>
          <PostScrollView
            ref={(ref) => (this.communityRef = ref)}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: (y) =>
                        Animated.block([
                          Animated.set(this.state.communityScrollY, y),
                          Animated.call([y], ([offsetY]) => {
                            if (this.state.currentIndex === 1) {
                              console.log(this.state.currentIndex);
                              this.reviewRef &&
                                this.reviewRef.getNode().scrollTo({
                                  y: offsetY,
                                  animated: false,
                                });
                            }
                          }),
                        ]),
                    },
                  },
                },
              ],
              {
                useNativeDriver: true,
              },
            )}>
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
            <View style={{width: '100%', height: 100, borderWidth: 1}} />
          </PostScrollView>
        </Swiper>
      </ContainerView>
    );
  }
}
