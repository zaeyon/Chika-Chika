import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CameraRoll from '@react-native-community/cameraroll';
import Styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Row from './Row';
import ImageItem from './ImageItem';
import AlbumItem from './AlbumItem';

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
 align-items: flex-start;
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('11.7%')}px;
 background-color: #FFFFFF;
 justify-content: space-between;
 align-items: center;
 flex-direction: row;
`;

const HeaderLeftContainer = Styled.View`
padding: 7px 15px 13px 16px;
align-items: center;
justify-content: center;
`;

const HeaderCancelText = Styled.Text`
 font-size: 17px;
 color: #C6C7CC;
 `;

const HeaderRightContainer = Styled.View`
 padding: 7px 15px 13px 16px;
 align-items: center;
 justify-content: center;
 `;

const HeaderAttachText = Styled.Text`
font-weight: 500;
font-size: 17px;
color: #267DFF;
`;

const DisabledHeaderAttachText = Styled.Text`
font-size: 17px;
color: #C6C7CC;
`;

const CloseButton = Styled.Image`
 width: ${wp('6.4%')}px;
 height: ${wp('4%')}px;
 tint-color: #707070;
`;

const FinishButton = Styled.Image`
 width: ${wp('5.5%')}px;
 height: ${wp('4%')}px;
 tint-color: #707070;
`;

const AlbumNameText = Styled.Text`
 font-weight: 500;
 font-size: 17px;
 color: #1D1E1F;
`;

const DropdownIcon = Styled.Image`
 margin-left: 7px;
 margin-bottom: 3px;
 width: ${wp('3.2%')}px;
 height: ${wp('3.2%')}px;
`;

const HeaderCenterContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const AlbumListContainer = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

const ImageListContainer = Styled.View`
`;

const LoadingContainer = Styled.View`
position: absolute;
top: ${wp('11.7%')}px;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
align-items: center;
justify-content: center;
background-color: #ffffff;
`;

// helper functions
const arrayObjectIndexOf = (array, property, value) =>
  array.map((o) => o[property]).indexOf(value);

const nEveryRow = (data, n) => {
  const result = [];
  let temp = [];

  for (let i = 0; i < data.length; ++i) {
    if (i > 0 && i % n === 0) {
      result.push(temp);
      temp = [];
    }
    temp.push(data[i]);
  }

  if (temp.length > 0) {
    while (temp.length !== n) {
      temp.push(null);
    }
    result.push(temp);
  }

  return result;
};

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selected: this.props.selected,
      lastCursor: null,
      initialLoading: true,
      loadingMore: false,
      noMore: false,
      data: [],
      albumArray: [{}],
      albumTitleCount: [],
      selectedAlbum: '모두 보기',
      visibleAlbumList: false,
      loadingAlbum: true,
    };

    this.renderFooterSpinner = this.renderFooterSpinner.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  _backAction = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    const params = {
      assetType: 'Photos',
    };

    var allPhotoCount = 0;

    CameraRoll.getAlbums(params).then((data) => {
      console.log('앨범 목록', data);
      var albumArray = data.map(function (obj) {
        var albumObj = {
          title: obj.title,
          count: obj.count,
        };

        CameraRoll.getPhotos({
          first: 1,
          groupTypes: 'Album',
          groupName: obj.title,
        })
          .then((r) => {
            console.log('앨범 이름', obj.title);
            console.log('앨범 썸네일', r.edges[0].node.image);
            albumObj.thumbnail = r.edges;
          })
          .catch((err) => {
            console.log('앨범 썸네일 오류', err);
          });

        return albumObj;
      });

      CameraRoll.getPhotos({
        first: 1,
        assetType: 'Photos',
      })
        .then((r) => {
          console.log('모두 보기 썸네일', r.edges);
          albumArray.unshift({title: '모두 보기', thumbnail: r.edges});

          setTimeout(() => {
            this.setState({
              albumArray: albumArray,
            });
            console.log('22 albumName', this.state.albumArray);
          }, 100);
        })
        .catch((err) => {
          console.log('모두 보기 썸네일 err', err);
        });
    });
  }

  UNSAFE_componentWillMount() {
    this.setState({
      selected: [],
    });
    this.fetch();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this._backAction,
    );
  }

  componentWillUnmount() {
    const backHandler = BackHandler.removeEventListener(
      'hardwareBackPress',
      this._backAction,
    );

    this.setState({
      selected: [],
    });
  }
  /*

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected,
    });
  }
  /*

  componentDidUpdate(prevState) {
    console.log('componentDidUpdate 실행');
    if (this.state.selectedAlbum !== prevState.selectedAlbum) {
      this.fetch();
    }
  }
  */

  changeSelectedAlbum(data) {
    this.setState({
      selectedAlbum: data,
    });

    console.log('selectedAlbum', this.state.selectedAlbum);
  }

  _toggleAlbumList() {
    this.setState({
      visibleAlbumList: !this.state.visibleAlbumList,
      selected: [],
    });
  }

  onEndReached() {
    if (!this.state.noMore) {
      this.fetch();
    }
  }

  appendImages(data) {
    const assets = data.edges;
    const newState = {
      loadingMore: false,
      initialLoading: false,
    };

    if (!data.page_info.has_next_page) {
      newState.noMore = true;
    }

    if (assets.length > 0) {
      newState.lastCursor = data.page_info.end_cursor;
      newState.images = this.state.images.concat(assets);
      newState.data = nEveryRow(newState.images, this.props.imagesPerRow);
    }

    this.setState(newState);
  }

  fetch() {
    if (!this.state.loadingMore) {
      this.setState({loadingMore: true}, () => {
        this.doFetch();
      });
    }
  }

  doFetch() {
    console.log('doFetch selectedAlbum', this.state.selectedAlbum);
    let {groupTypes, assetType} = this.props;
    let groupName;
    let fetchParams;
    if (this.state.selectedAlbum === '모두 보기') {
      console.log('사진 모두보기');
      fetchParams = {
        first: 100,
        assetType,
      };
    } else {
      console.log('선택한 앨밤', this.state.selectedAlbum);
      groupName = this.state.selectedAlbum;

      fetchParams = {
        first: 100,
        groupTypes: 'Album',
        groupName,
      };
    }
    /*
    if (Platform.OS === 'android') {
      // not supported in android
      //delete fetchParams.groupTypes;
    }
    */

    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }

    CameraRoll.getPhotos(fetchParams).then(
      (data) => {
        this.appendImages(data);
        console.log('불러온 사진', data);
        this.setState({
          loadingAlbum: false,
        });
      },
      (e) => {
        console.log(e);
        this.setState({
          loadingAlbum: false,
        });
      },
    );
  }

  selectImage(image) {
    const {maximum, imagesPerRow, callback, selectSingleItem} = this.props;
    const {selected} = this.state;

    const index = arrayObjectIndexOf(selected, 'uri', image.uri);

    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      if (selectSingleItem) {
        selected.splice(0, selected.length);
      }
      if (selected.length < maximum) {
        selected.push(image);
      }
    }

    console.log('selected: ', selected);

    this.setState({
      selected,
      data: nEveryRow(this.state.images, imagesPerRow),
    });

    callback(selected, image);
  }

  _pressFinish() {
    console.log('사진선택완료');
    console.log('사진선택 this.state.selected', this.state.selected);
    console.log(
      'this.props.route.params.requestType',
      this.props.route.params.requestType,
    );

    if (this.props.route.params?.requestType === 'review') {
      let _selectedImages = this.state.selected.slice(0);
      this.props.navigation.navigate('ContentPostScreen', {
        selectedImages: _selectedImages,
        startIndex: this.props.route.params?.startIndex,
      });
    } else if (this.props.route.params?.requestType === 'edit') {
      let _selectedImages = this.state.selected.slice(0);
      this.props.navigation.navigate('FeedEditScreen', {
        selectedImages: _selectedImages,
      });
    } else if (
      this.props.route.params?.requestType === 'CommunityPostUploadScreen'
    ) {
      let _selectedImages = this.state.selected;
      this.props.navigation.navigate('CommunityPostUploadScreen', {
        selectedImages: _selectedImages,
      });
    }

    this.setState({
      selected: [],
    });

    console.log('this.state.image pressFinish', this.state.images);
    console.log('this.state.selected', this.state.selected);
  }

  renderImage(item) {
    const {selected} = this.state;
    const {
      imageMargin,
      selectedMarker,
      imagesPerRow,
      containerWidth,
    } = this.props;

    const {uri} = item.node.image;
    const isSelected = arrayObjectIndexOf(selected, 'uri', uri) >= 0;

    console.log('선택한 이미지', this.state.selected);

    console.log('renderImage');

    return (
      <ImageItem
        key={uri}
        item={item}
        selected={isSelected}
        imageMargin={imageMargin}
        selectedMarker={selectedMarker}
        imagesPerRow={imagesPerRow}
        containerWidth={containerWidth}
        onClick={this.selectImage}
        selectedImages={selected}
      />
    );
  }

  renderRow(item) {
    // item is an array of objects
    const isSelected = item.map((imageItem) => {
      if (!imageItem) return false;
      const {uri} = imageItem.node.image;
      return arrayObjectIndexOf(this.state.selected, 'uri', uri) >= 0;
    });

    console.log('renderRow selected', this.state.selected);

    return (
      <Row
        rowData={item}
        isSelected={isSelected}
        selectImage={this.selectImage}
        imagesPerRow={this.props.imagesPerRow}
        containerWidth={this.props.containerWidth}
        imageMargin={this.props.imageMargin}
        selectedMarker={this.props.selectedMarker}
        selectedImages={this.state.selected}
      />
    );
  }

  renderFooterSpinner() {
    if (!this.state.noMore) {
      return <ActivityIndicator style={styles.spinner} />;
    }
    return null;
  }

  render() {
    const {
      initialNumToRender,
      imageMargin,
      backgroundColor,
      emptyText,
      emptyTextStyle,
      loader,
    } = this.props;

    console.log('this.state.albumName', this.state.albumName);

    if (this.state.initialLoading) {
      return (
        <View style={[styles.loader, {backgroundColor}]}>
          {loader || <ActivityIndicator />}
        </View>
      );
    }

    const flatListOrEmptyText =
      this.state.data.length > 0 ? (
        <FlatList
          style={{flex: 1}}
          ListFooterComponent={this.renderFooterSpinner}
          initialNumToRender={initialNumToRender}
          onEndReached={this.onEndReached}
          renderItem={({item}) => this.renderRow(item)}
          keyExtractor={(item) => item[0].node.image.uri}
          data={this.state.data}
          extraData={this.state.selected}
        />
      ) : (
        <Text style={[{textAlign: 'center'}, emptyTextStyle]}>{emptyText}</Text>
      );

    const selectAlbum = (title) => {
      this.setState({
        visibleAlbumList: false,
        selectedAlbum: title,
        lastCursor: null,
        images: [],
        loadingAlbum: true,
      });

      this.fetch();
    };

    const renderAlbumItem = ({item, index}) => {
      console.log('renderAlbumItem item', item.thumbnail[0].node.image);
      return (
        <AlbumItem
          albumCount={item.count}
          albumTitle={item.title}
          albumThumbnail={item.thumbnail[0].node.image.uri}
          selectAlbum={selectAlbum}
        />
      );
    };

    return (
      <Container>
        <HeaderContainer>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}>
            <HeaderLeftContainer>
              <HeaderCancelText>취소</HeaderCancelText>
            </HeaderLeftContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this._toggleAlbumList()}>
            <HeaderCenterContainer>
              <AlbumNameText>{this.state.selectedAlbum}</AlbumNameText>
              <DropdownIcon
                source={
                  this.state.visibleAlbumList
                    ? require('~/Assets/Images/HeaderBar/ic_dropdown_fold.png')
                    : require('~/Assets/Images/HeaderBar/ic_dropDown.png')
                }
              />
            </HeaderCenterContainer>
          </TouchableWithoutFeedback>
          {this.state.selected.length === 0 && (
            <HeaderRightContainer>
              <DisabledHeaderAttachText>첨부</DisabledHeaderAttachText>
            </HeaderRightContainer>
          )}
          {this.state.selected.length > 0 && (
            <TouchableWithoutFeedback onPress={() => this._pressFinish()}>
              <HeaderRightContainer>
                <HeaderAttachText>첨부</HeaderAttachText>
              </HeaderRightContainer>
            </TouchableWithoutFeedback>
          )}
        </HeaderContainer>
        {!this.state.visibleAlbumList && (
          <ImageListContainer>{flatListOrEmptyText}</ImageListContainer>
        )}
        {this.state.visibleAlbumList && (
          <AlbumListContainer>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.albumArray}
              renderItem={renderAlbumItem}
            />
          </AlbumListContainer>
        )}
        {this.state.loadingAlbum && (
          <LoadingContainer>
            <ActivityIndicator />
          </LoadingContainer>
        )}
      </Container>
    );
  }
}

Gallery.propTypes = {
  initialNumToRender: PropTypes.number,
  groupTypes: PropTypes.oneOf([
    'Album',
    'All',
    'Event',
    'Faces',
    'Library',
    'PhotoStream',
    'SavedPhotos',
  ]),
  maximum: PropTypes.number,
  assetType: PropTypes.oneOf(['Photos', 'Videos', 'All']),
  selectSingleItem: PropTypes.bool,
  imagesPerRow: PropTypes.number,
  imageMargin: PropTypes.number,
  containerWidth: PropTypes.number,
  callback: PropTypes.func,
  selected: PropTypes.array,
  selectedMarker: PropTypes.element,
  backgroundColor: PropTypes.string,
  emptyText: PropTypes.string,
  emptyTextStyle: Text.propTypes.style,
  loader: PropTypes.node,
};

Gallery.defaultProps = {
  initialNumToRender: 5,
  groupTypes: 'SavedPhotos',
  maximum: 15,
  imagesPerRow: 3,
  imageMargin: 5,
  selectSingleItem: false,
  assetType: 'Photos',
  backgroundColor: 'white',
  selected: [],
  callback(selectedImages, currentImage) {
    console.log('currentImage: ', currentImage);
    console.log('selectedImages: ', selectedImages);
  },
  emptyText: 'No photos.',
};

export default Gallery;

/*
<Dropdown
containerStyle={{width: 130, height: hp('13%'), marginTop: 20}}
data={this.state.albumName}
animationDureation={0}
rippleOpacity={0}
dropdownPosition={-5}
shadeOpacity={0}
value={'모두 보기'}
inputContainerStyle={{borderBottomWidth: 0}}
fontSize={18}
onChangeText={(value) => this.changeSelectedAlbum(value)}
/>
*/
