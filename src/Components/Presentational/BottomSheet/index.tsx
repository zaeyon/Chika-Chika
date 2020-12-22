import React, {Component} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Easing,
} from 'react-native';
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class BottomSheet extends Component {
  masterdrawer = React.createRef();
  drawer = React.createRef();
  drawerheader = React.createRef();
  scroll = React.createRef();
  slideUpRef = React.createRef();
  constructor(props) {
    super(props);
    this.SNAP_POINTS_FROM_TOP = [300, hp('100%')];

    const START = this.SNAP_POINTS_FROM_TOP[0];
    const END = this.SNAP_POINTS_FROM_TOP[this.SNAP_POINTS_FROM_TOP.length - 1];

    this.state = {
      lastSnap: START,
      disabled: false,
    };
    this.backgroundOpacity = new Animated.Value(0);
    this._lastScrollYValue = 0;
    this._lastScrollY = new Animated.Value(0);
    this._onRegisterLastScroll = Animated.event(
      [{nativeEvent: {contentOffset: {y: this._lastScrollY}}}],
      {useNativeDriver: true},
    );
    this._lastScrollY.addListener(({value}) => {
      this._lastScrollYValue = value;
    });

    this._dragY = new Animated.Value(0);
    this._onGestureEvent = Animated.event(
      [{nativeEvent: {translationY: this._dragY}}],
      {
        useNativeDriver: true,
      },
    );

    this._reverseLastScrollY = Animated.multiply(
      new Animated.Value(-1),
      this._lastScrollY,
    );

    this._translateYOffset = new Animated.Value(END);

    this._translateY = Animated.add(
      this._translateYOffset,
      Animated.add(this._dragY, this._reverseLastScrollY),
    ).interpolate({
      inputRange: [START, END],
      outputRange: [START, END],
      extrapolate: 'clamp',
    });
    this._translateY.addListener(({value}) => {
      this.backgroundOpacity.setValue(value);
    });
  }

  _setBackgroundValue = (e) => {
    console.log(e.nativeEvent.translationY);
    this.backgroundOpacity.setValue(e.nativeEvent.translationY);
  };

  _onHeaderHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.BEGAN) {
      this.setState({
        disabled: true,
      });
      this._lastScrollY.setValue(0);
    } else if (nativeEvent.state === 5) {
      this.setState({
        disabled: false,
      });
    }
    this._onHandlerStateChange({nativeEvent});
  };
  _onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let {velocityY, translationY} = nativeEvent;
      translationY -= this._lastScrollYValue;
      const dragToss = 0.05;
      const endOffsetY =
        this.state.lastSnap + translationY + dragToss * velocityY * 2;
      let destSnapPoint = this.SNAP_POINTS_FROM_TOP[0];
      for (let i = 0; i < this.SNAP_POINTS_FROM_TOP.length; i++) {
        const snapPoint = this.SNAP_POINTS_FROM_TOP[i];
        const distFromSnap = Math.abs(snapPoint - endOffsetY);
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint;
        }
      }
      this._translateYOffset.extractOffset();
      this._translateYOffset.setValue(translationY);
      this._translateYOffset.flattenOffset();
      this._dragY.setValue(0);
      Animated.spring(this._translateYOffset, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: true,
      }).start(() => {
        if (destSnapPoint === hp('100%')) {
          this.props.setIsModalVisible(false);
        }
      });
    }
  };

  componentDidUpdate(prevState) {
    if (!prevState.isModalVisible && this.props.isModalVisible) {
      Animated.spring(this._translateYOffset, {
        velocity: 0.01,
        tension: 68,
        friction: 12,
        toValue: 301,
        useNativeDriver: true,
      }).start();
    }
    if (this.props.closeModal) {
      Animated.spring(this._translateYOffset, {
        velocity: 40,
        tension: 138,
        friction: 12,
        toValue: hp('100%'),
        useNativeDriver: true,
      }).start(() => {
        // this.props.navigation.navigate(this.props.navigateName);
        this.props.setCloseModal(false);
        this.props.setIsModalVisible(false);
      });
    }
  }
  render() {
    return (
      <Modal
        visible={this.props.isModalVisible}
        transparent={true}
        style={{flex: 1}}>
        <TapGestureHandler
          onHandlerStateChange={this._onSingleTap}
          maxDurationMs={100000}
          ref={this.masterdrawer}
          maxDeltaY={this.state.lastSnap - this.SNAP_POINTS_FROM_TOP[0]}>
          <TouchableOpacity
            activeOpacity={1}
            style={{flex: 1}}
            onPress={() => {
              Animated.timing(this._translateYOffset, {
                toValue: hp('100%'),
                duration: 200,
                useNativeDriver: true,
              }).start(() => {
                this.props.setIsModalVisible(false);
              });
            }}>
            <Animated.View
              style={{
                flex: 1,
                backgroundColor: this.backgroundOpacity.interpolate({
                  inputRange: [300, hp('100%')],
                  outputRange: ['#00000099', '#00000000'],
                  extrapolate: 'clamp',
                }),
              }}
              pointerEvents="box-none">
              <TouchableWithoutFeedback>
                <Animated.View
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      transform: [{translateY: this._translateY}],
                    },
                  ]}>
                  <PanGestureHandler
                    ref={this.drawerheader}
                    shouldCancelWhenOutside={false}
                    onGestureEvent={this._onGestureEvent}
                    onHandlerStateChange={this._onHeaderHandlerStateChange}>
                    <Animated.View style={{flex: 1}}>
                      {this.props.renderContent(this.state.disabled)}
                    </Animated.View>
                  </PanGestureHandler>
                </Animated.View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </TouchableOpacity>
        </TapGestureHandler>
      </Modal>
    );
  }
}
