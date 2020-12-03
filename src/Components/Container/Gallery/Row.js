import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import ImageItem from './ImageItem';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
});

class Row extends PureComponent {
  constructor(props) {
    super(props);
    this.renderImage = this.renderImage.bind(this);
  }

  renderImage(item, isSelected) {
    const {
      imageMargin,
      selectedMarker,
      imagesPerRow,
      containerWidth,
    } = this.props;

    const { uri } = item.node.image;

    var selectOrder;

    if(isSelected) {
      selectOrder = this.props.selectedImages.indexOf(item.node.image)+1;
    }

    return (
      <ImageItem
        key={uri}
        item={item}
        selected={isSelected}
        imageMargin={imageMargin}
        selectedMarker={selectedMarker}
        imagesPerRow={imagesPerRow}
        containerWidth={containerWidth}
        onClick={this.props.selectImage}
        selectOrder={selectOrder}
      />
    );
  }

  render() {
    const items = this.props.rowData.map((item, index) => {
      if (item === null) {
        return null;
      }
      return this.renderImage(item, this.props.isSelected[index]);
    });

    return (
      <View style={styles.row}>
        {items}
      </View>
    );
  }
}

Row.propTypes = {
  rowData: PropTypes.array.isRequired,
  isSelected: PropTypes.array.isRequired,
  selectImage: PropTypes.func.isRequired,
};

export default Row;
