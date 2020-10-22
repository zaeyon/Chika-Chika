import React, {Component} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel'; //Thank From distributer(s) of this lib
import styles from './SliderBox.style';

// -------------------Props---------------------
// images
// onCurrentImagePressed
// sliderBoxHeight
// parentWidth
// dotColor
// inactiveDotColor
// dotStyle
// paginationBoxVerticalPadding
// circleLoop
// autoplay
// ImageComponent
// paginationBoxStyle
// resizeMethod
// resizeMode
// ImageComponentStyle,
// imageLoadingColor = "#000000"

const width = Dimensions.get('window').width;

export class SliderBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: this.props.imageIndex,
      loading: [],
    };
    this.onCurrentImagePressedHandler = this.onCurrentImagePressedHandler.bind(
      this,
    );
    this.onSnap = this.onSnap.bind(this);
  }
  componentDidMount() {
    let a = [...Array(this.props.images.length).keys()].map((i) => false);
  }
  onCurrentImagePressedHandler() {
    if (this.props.onCurrentImagePressed) {
      this.props.onCurrentImagePressed(this.state.currentImage);
    }
  }

  onSnap(index) {
    const {currentImageEmitter} = this.props;
    this.setState({currentImage: index}, () => {
      if (currentImageEmitter) currentImageEmitter(this.state.currentImage);
    });
  }

  _renderItem({item, index}) {
    const {
      ImageComponent,
      ImageComponentStyle = {},
      sliderBoxHeight,
      disableOnPress,
      resizeMethod,
      resizeMode,
      imageLoadingColor = '#000000',
    } = this.props;
    return (
      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
        }}>
        <TouchableWithoutFeedback
          key={index}
          onPress={() =>
            !disableOnPress && this.onCurrentImagePressedHandler()
          }>
          <ImageComponent
            style={[
              {
                width: '100%',
                height: sliderBoxHeight || 200,
                alignSelf: 'center',
              },
              ImageComponentStyle,
            ]}
            source={typeof item === 'string' ? {uri: item} : item}
            resizeMethod={resizeMethod || 'resize'}
            resizeMode={resizeMode || 'cover'}
            onLoad={() => {}}
            onLoadStart={() => {}}
            onLoadEnd={() => {
              let t = this.state.loading;
              t[index] = true;
              this.setState({loading: t});
            }}
            {...this.props}
          />
        </TouchableWithoutFeedback>
        {!this.state.loading[index] && (
          <ActivityIndicator
            size="large"
            color={imageLoadingColor}
            style={{
              position: 'absolute',
              alignSelf: 'center',
            }}
          />
        )}
      </View>
    );
  }

  get pagination() {
    const {currentImage} = this.state;
    const {
      images,
      dotStyle,
      dotColor,
      inactiveDotColor,
      paginationBoxStyle,
      paginationBoxVerticalPadding,
      imageIndex,
    } = this.props;
    return (
      <Pagination
        firstItem={imageIndex}
        borderRadius={2}
        dotsLength={images.length}
        activeDotIndex={currentImage}
        dotStyle={dotStyle || styles.dotStyle}
        dotColor={dotColor || colors.dotColors}
        inactiveDotColor={inactiveDotColor || colors.white}
        inactiveDotScale={0.8}
        carouselRef={this._ref}
        inactiveDotOpacity={0.8}
        tappableDots={!!this._ref}
        containerStyle={[
          styles.paginationBoxStyle,
          paginationBoxVerticalPadding
            ? {paddingVertical: paginationBoxVerticalPadding}
            : {},
          paginationBoxStyle ? paginationBoxStyle : {},
        ]}
        {...this.props}
      />
    );
  }

  render() {
    const {
      images,
      circleLoop,
      autoplay,
      parentWidth,
      loopClonesPerSide,
      imageIndex,
    } = this.props;
    return (
      <View>
        <Carousel
          firstItem={imageIndex}
          layout={'default'}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          data={images}
          ref={(c) => (this._ref = c)}
          loop={circleLoop || false}
          enableSnap={true}
          autoplay={autoplay || false}
          itemWidth={parentWidth || width}
          sliderWidth={parentWidth || width}
          loopClonesPerSide={loopClonesPerSide || 5}
          renderItem={(item) => this._renderItem(item)}
          onSnapToItem={(index) => this.onSnap(index)}
          {...this.props}
        />
        {images.length > 1 && this.pagination}
      </View>
    );
  }
}

const colors = {
  dotColors: '#23E5D2',
  white: '#FFFFFF',
};

SliderBox.defaultProps = {
  ImageComponent: Image,
};
