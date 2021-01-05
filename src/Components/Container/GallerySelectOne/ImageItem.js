import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styled from 'styled-components/native';

const ImageUnselectedButton = Styled.View`
 width: ${wp('5.5%')}px;
 height: ${wp('5.5%')}px;
 border-radius: 100;
 background-color: transparent;
 border-width: 2.5px;
 border-color: #F5F5F5;
`;

const ImageSelectedButton = Styled.View`
 position: absolute;
 width: ${wp('5.5%')}px;
 height: ${wp('5.5%')}px;
 border-radius: 100;
 background-color: #23E5D2;
 border-width: 2.5px;
 border-color: #23E5D2;
 justify-content: center;
 align-items: center;
`;

const ImageSelectedCount = Styled.Text`
 ';
 font-size: 15px;
 color: #ffffff;

`;

const ImageCheckedButton = Styled.Image`
 width: ${wp('5.5%')}px;
 height: ${wp('6.5%')}px;
 tint-color: #23E5D2;
 position: absolute;
 right: 5px;
 top: 0px;
`;

const SelectButtonContainer = Styled.View`
 width: ${wp('7%')}px;
 height: ${wp('7%')}px;
 right: 3.5px;
 top: 1px;
 position: absolute;
 background-color: transparent;
 align-items: center;
 justify-content: center;
`;

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
});

class ImageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImages_arr: [],
    };
  }
  componentWillMount() {
    let {width} = Dimensions.get('window');
    const {imageMargin, imagesPerRow, containerWidth} = this.props;

    if (typeof containerWidth !== 'undefined') {
      width = containerWidth;
    }
    this.imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
  }

  handleClick(item) {
    this.props.onClick(item);
    console.log('item @@:', item);
    console.log('this.props.requestType', this.props.requestType);

    if (this.props.requestType === 'reviewImage') {
      this.props.navigation.navigate('ContentPostScreen', {
        selectedImage: item,
        changeExistingImage: true,
      });
    } else if (this.props.requestType === 'EditProfileTabScreen') {
      this.props.navigation.navigate('EditProfileTabScreen', {
        selectedImage: item,
        changeExistingImage: true,
      });
    } else {
      this.props.navigation.navigate('TakenPictureScreen', {
        selectedImage: item,
      });
    }
  }

  render() {
    const {item, selected, selectedMarker, imageMargin} = this.props;

    const marker = selectedMarker || (
      <ImageSelectedButton>
        <ImageSelectedCount>1</ImageSelectedCount>
      </ImageSelectedButton>
    );

    const {image} = item.node;

    return (
      <View style={{marginBottom: 2, marginRight: 2}}>
        <TouchableWithoutFeedback onPress={() => this.handleClick(image)}>
          <Image
            source={{uri: image.uri}}
            style={{height: wp('33%'), width: wp('33%')}}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

ImageItem.defaultProps = {
  item: {},
  selected: false,
};

ImageItem.propTypes = {
  item: PropTypes.object,
  selected: PropTypes.bool,
  selectedMarker: PropTypes.element,
  imageMargin: PropTypes.number,
  imagesPerRow: PropTypes.number,
  onClick: PropTypes.func,
};

export default ImageItem;
