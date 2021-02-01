import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  Alert,
  LayoutAnimation,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {launchCamera} from 'react-native-image-picker';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
// Local Component
import {uploadImageToS3} from '~/method/uploadImageToS3';
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import CommunityCreatePostScreen from '~/Components/Presentational/CommunityCreatePostScreen';
import AnimatedModal from '~/Components/Presentational/AnimatedModal';
// Routes
import GETAllTagSearch from '~/Routes/Search/GETAllTagSearch';
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';
import POSTCreateCommunityPost from '~/Routes/Community/createPost/POSTCreateCommunityPost';
import PUTCommunityPost from '~/Routes/Community/editPost/PUTCommunityPost';
// redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import Animated from 'react-native-reanimated';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: white;
`;

const ModalContentText = Styled.Text`

font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 20px;
color: #131F3C;
`;

interface Props {
  navigation: any;
  route: any;
}

interface Image {
  /** Only set if the `include` parameter contains `filename`. */
  filename?: string | null;
  uri: string;
  base64: string;
  /** Only set if the `include` parameter contains `imageSize`. */
  height?: number;
  /** Only set if the `include` parameter contains `imageSize`. */
  width?: number;
  /** Only set if the `include` parameter contains `fileSize`. */
  fileSize?: number | null;
  /**
   * Only set if the `include` parameter contains `playableDuration`.
   * Will be null for images.
   */
  playableDuration?: number | null;
}

interface Tag {
  id: number;
  name: string | undefined;
  category: string;
  postNum: number;
  address: string | undefined;
  sido: string | undefined;
  sigungu: string | undefined;
  emdName: string | undefined;
  fullCityName: string | undefined;
  relativeAddress: string | undefined;
}

interface CameraResponse {
  didCancel: boolean;
  errorCode: number;
  errorMessage: string;
  base64: string;
  uri: string;
  width: number;
  height: number;
  fileSize: number;
  type: string;
  fileName: string;
}

const CommunityPostUploadScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;
  const profile = currentUser.profile;
  const prevData = useSelector((state: any) => {
    if (route.params.data.routeType === 'Question') {
      console.log('Q');
      return state.communityPostList.QuestionPosts.find(
        (item: any) => item.id === route.params.data.id,
      );
    } else if (route.params.data.routeType === 'FreeTalk') {
      console.log('F');
      return state.communityPostList.FreeTalkPosts.find(
        (item: any) => item.id === route.params.data.id,
      );
    } else if (route.params.data.routeType === 'MyPosts') {
      console.log('My');
      return state.communityPostList.MyPosts.find(
        (item: any) => item.id === route.params.data.id,
      );
    } else if (route.params.data.routeType === 'Liked') {
      console.log('Liked');
      return state.communityPostList.LikedCommunityPosts.find(
        (item: any) => item.id === route.params.data.id,
      );
    } else if (route.params.data.routeType === 'Scraped') {
      console.log('Scraped');
      return state.communityPostList.ScrapedCommunityPosts.find(
        (item: any) => item.id === route.params.data.id,
      );
    } else if (route.params.data.routeType === 'Commented') {
      console.log('Commented');
      return state.communityPostList.CommentedCommunityPosts.find(
        (item: any) => item.id === route.params.data.id,
      );
    }
  });

  const prevDescription = route.params.data.description;
  const prevType = route.params.data.type;
  const mode = prevData ? 'edit' : 'create';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState(false);
  const [suggestionList, setSuggestionList] = useState<Tag[]>([]);

  const [description, setDescription] = useState<string>(prevDescription || '');
  const [wantDentistHelp, setWantDentistHelp] = useState<boolean>(
    prevData?.wantDentistHelp || false,
  );
  const [category, setCategory] = useState(prevType || '질문방');
  const [images, setImages] = useState<Image[]>(prevData?.community_imgs || []);

  const [categoryList, setCategoryList] = useState<string[]>([
    '질문방',
    '수다방',
  ]);
  const [isPopupShown, setIsPopupShown] = useState<boolean>(true);

  const [onSubmit, setOnSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyPost, setIsEmptyPost] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    //fetch here!!
    console.log(searchQuery);
    setIsLoading(true);
    fetchData();
  }, [searchQuery, searchMode]);

  useEffect(() => {
    if (description.replace(/\s/g, '').length === 0 && images.length === 0) {
      setIsEmptyPost(true);
    } else {
      setIsEmptyPost(false);
    }
  }, [description, images]);

  useEffect(() => {
    if (route.params?.selectedImages) {
      setImages(route.params.selectedImages);
    }
  }, [route]);
  const fetchData = useCallback(() => {
    const incompleteKorean = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
    if (!incompleteKorean.test(searchQuery)) {
      if (searchQuery !== '') {
        setSuggestionList([]);
        GETAllTagSearch(jwtToken, searchQuery, 'autoComplete')
          .then((response: any) => {
            setSearchQuery((prev) => {
              if (prev !== searchQuery) {
              } else {
                setIsLoading((prev) => {
                  setSuggestionList(response);
                  return false;
                });
              }
              return prev;
            });
          })
          .catch((e) => console.log(e));
      } else {
        setSuggestionList([]);
      }
    } else {
      setIsLoading((prev) => {
        setSuggestionList([]);
        return false;
      });
    }
  }, [searchQuery, jwtToken]);

  const formatImages = useCallback(async (oldImages) => {
    const result = await Promise.all(
      oldImages.map(async (item: any, index: number) => {
        if (item.img_url) {
          const imageObj = {
            index,
            location: item.img_url,
            key: item.img_filename,
            mimetype: item.img_mimetype,
            originalname: item.img_originalname,
            size: item.img_size,
            width: item.width,
            height: item.height,
          };
          return imageObj;
        } else {
          const res: any = await uploadImageToS3(item);
          console.log('res', res);
          const imageObj = {
            index,
            location: res.response.location,
            key: res.response.key,
            mimetype: res.type,
            originalname: res.originalName,
            size: res.size,
            width: res.width,
            height: res.height,
          };
          return imageObj;
        }
      }),
    );
    return result;
  }, []);

  const formatDescription = useCallback((oldDescription: string) => {
    let formattedDescription = [];
    const lines = oldDescription.split(/\r\n|\r|\n/);

    for (let line of lines) {
      let formattedLine = [];
      const words = line.split(' ');
      for (let word of words) {
        if (word.charAt(0) === '#') {
          //isTag
          const formattedWord = '{{' + word.slice(1) + '}}';
          formattedLine.push(formattedWord);
        } else {
          formattedLine.push(word);
        }
      }
      formattedDescription.push(formattedLine.join(' '));
    }

    return formattedDescription.join('\r\n');
  }, []);

  const formatCategory = useCallback((oldCategory: string) => {
    if (oldCategory === '질문방') {
      return 'Question';
    } else if (oldCategory === '수다방') {
      return 'FreeTalk';
    } else {
      return 'FreeTalk';
    }
  }, []);

  const uploadPost = useCallback(async () => {
    console.log(description, wantDentistHelp, category, images);
    if (isEmptyPost) {
      console.log('empty');
      return;
    } else {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.easeInEaseOut,
          'opacity',
        ),
      );
      setOnSubmit(true);
      const formattedImages = await formatImages(images);
      const formattedDescription = formatDescription(description);
      const formattedCategory = formatCategory(category);
      const postData = {
        description: formattedDescription,
        wantDentistHelp,
        type: formattedCategory,
        images: formattedImages,
      };
      POSTCreateCommunityPost(jwtToken, postData).then((response: any) => {
        navigation.navigate('CommunityListScreen', {
          screen: formattedCategory === 'Question' ? '질문방' : '수다방',
          params: {
            isPostCreated: true,
          },
        });
        console.log('call layout animation');
      });
    }
  }, [
    description,
    wantDentistHelp,
    category,
    images,
    prevData,
    jwtToken,
    isEmptyPost,
  ]);

  const editPost = useCallback(async () => {
    console.log(description, wantDentistHelp, category, images);
    if (isEmptyPost) {
      return;
    } else {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.easeInEaseOut,
          'opacity',
        ),
      );
      setOnSubmit(true);
      const formattedImages = await formatImages(images);
      const formattedDescription = formatDescription(description);
      const formattedCategory = formatCategory(category);
      const postData = {
        description: formattedDescription,
        wantDentistHelp,
        type: formattedCategory,
        images: formattedImages,
      };
      PUTCommunityPost(jwtToken, postData, prevData.id).then(
        (response: any) => {
          const form = {
            id: prevData.id,
            data: response.body.updateCommunityPost,
          };
          dispatch(allActions.communityActions.editPost(form));
          navigation.navigate('CommunityDetailScreen', {
            id: prevData.id,
            type: formattedCategory,
          });
        },
      );
    }
  }, [
    description,
    wantDentistHelp,
    category,
    images,
    prevData,
    allActions,
    jwtToken,
    isEmptyPost,
  ]);

  const navigateToCamera = useCallback(() => {
    launchCamera({includeBase64: true}, (response: CameraResponse) => {
      if (!response.didCancel) {
        const capturedImage = {
          filename: response.fileName,
          fileSize: response.fileSize,
          width: response.width,
          height: response.height,
          uri: response.uri,
          base64: response.base64,
          camera: true,
        };
        setImages((prev) => [...prev, capturedImage]);
      }
    });
  }, []);

  const navigateToGallery = useCallback(() => {
    navigation.navigate('ImageSelectScreen', {
      requestType: 'CommunityPostUploadScreen',
      selectedImages: images,
    });
  }, [images]);

  const unSelectImage = useCallback((image) => {
    setImages((prev) => {
      const targetIndex = prev.findIndex(
        (item) => item.filename === image.filename,
      );
      const newSelectedImages = prev.concat();
      if (targetIndex >= 0) {
        newSelectedImages.splice(targetIndex, 1);
        return newSelectedImages;
      } else {
        return prev;
      }
    });
  }, []);

  return (
    <ContainerView>
      <AnimatedModal
        visible={isModalVisible}
        buttons={[
          {
            title: '아니요',
            onPress: () => setIsModalVisible(false),
            style: {
              fontWeight: 'bold',
            },
          },
          {
            title: '예',
            onPress: () => {
              setIsModalVisible(false);
              navigation.goBack();
            },
          },
        ]}>
        <ModalContentText>{'글 작성을 취소하시겠어요?'}</ModalContentText>
      </AnimatedModal>
      <NavigationHeader
        headerLeftProps={{
          onPress: () => setIsModalVisible(true),
          type: 'arrow',
        }}
        headerRightProps={
          onSubmit
            ? {
                type: 'text',
                text: '생성중',
              }
            : mode === 'edit'
            ? {
                onPress: editPost,
                type: 'text',
                text: '완료',
              }
            : {
                onPress: uploadPost,
                type: 'text',
                text: '완료',
              }
        }
        headerRightDisabled={isEmptyPost}
        headerRightActiveColor="#00D1FF"
        headerTitle={mode === 'edit' ? '수정' : '커뮤니티 글쓰기'}
      />
      <CommunityCreatePostScreen
        navigateToCamera={navigateToCamera}
        navigateToGallery={navigateToGallery}
        categoryList={categoryList}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        suggestionList={suggestionList}
        category={category}
        setCategory={setCategory}
        selectedImages={images}
        unSelectImage={unSelectImage}
        paragraph={description}
        setParagraph={setDescription}
        wantDentistHelp={wantDentistHelp}
        setWantDentistHelp={setWantDentistHelp}
        isPopupShown={isPopupShown}
        setIsPopupShown={setIsPopupShown}
        isLoading={isLoading}
      />
    </ContainerView>
  );
};

export default CommunityPostUploadScreen;
