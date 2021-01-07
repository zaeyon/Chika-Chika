import React, {useState, useEffect} from 'react';
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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
// Local Component
import {uploadImageToS3} from '~/method/uploadImageToS3';
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import CommunityCreatePostScreen from '~/Components/Presentational/CommunityCreatePostScreen';
import GETAllTagSearch from '~/Routes/Search/GETAllTagSearch';
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';
import POSTCreateCommunityPost from '~/Routes/Community/createPost/POSTCreateCommunityPost';
import PUTCommunityPost from '~/Routes/Community/editPost/PUTCommunityPost';
// redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: white;
`;

const BodyContainerView = Styled.View`
flex: 1;
`;

interface Props {
  navigation: any;
  route: any;
}
interface imageItem {
  uri: string;
  filename: string;
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
  const [suggestionList, setSuggestionList] = useState([]);

  const [description, setDescription] = useState<string>(prevDescription || '');
  const [wantDentistHelp, setWantDentistHelp] = useState<boolean>(
    prevData?.wantDentistHelp || false,
  );
  const [category, setCategory] = useState(prevType || '질문');
  const [images, setImages] = useState(prevData?.community_imgs || []);

  const [categoryList, setCategoryList] = useState<string[]>(['질문', '자유']);
  const [isPopupShown, setIsPopupShown] = useState<boolean>(true);

  const [onSubmit, setOnSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //fetch here!!
    console.log(searchQuery);
    async function fetchData() {
      setIsLoading(true);
      const incompleteKorean = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
      if (!incompleteKorean.test(searchQuery)) {
        if (searchQuery !== '') {
          setSuggestionList([]);
          const response: any = await GETAllTagSearch(jwtToken, searchQuery);
          setSearchQuery((prev) => {
            if (prev !== searchQuery) {
            } else {
              setIsLoading((prev) => {
                setSuggestionList(response);
                console.log(prev);
                return false;
              });
            }
            return prev;
          });
        } else {
          setSuggestionList([]);
        }
      }
    }
    fetchData();
  }, [searchQuery, searchMode]);

  const formatImages = async (oldImages: Array<imageItem>) => {
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
          };
          return imageObj;
        } else {
          const res: any = await uploadImageToS3(item);
          const imageObj = {
            index,
            location: res.response.location,
            key: res.response.key,
            mimetype: res.type,
            originalname: res.originalName,
            size: res.size,
          };
          return imageObj;
        }
      }),
    );
    console.log(result);
    return result;
  };

  const formatDescription = (oldDescription: string) => {
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
  };

  const formatCategory = (oldCategory: string) => {
    if (oldCategory === '질문') {
      return 'Question';
    } else if (oldCategory === '자유') {
      return 'FreeTalk';
    } else {
      return 'FreeTalk';
    }
  };
  const uploadPost = async () => {
    console.log(description, wantDentistHelp, category, images);
    setOnSubmit(true);
    const formattedImages = await formatImages(images);
    const formattedDescription = formatDescription(description);
    const formattedCategory = formatCategory(category);

    if (description.length === 0 && images.length === 0) {
      console.log('emptyPost!');
    } else {
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
  };

  const editPost = async () => {
    console.log(description, wantDentistHelp, category, images);
    setOnSubmit(true);
    const formattedImages = await formatImages(images);
    const formattedDescription = formatDescription(description);
    const formattedCategory = formatCategory(category);

    if (description.length === 0 && images.length === 0) {
      console.log('emptyPost!');
    } else {
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
          navigation.navigate('CommunityStackScreen', {
            screen: 'CommunityDetailScreen',
            params: {
              id: prevData.id,
              type: formattedCategory,
            },
          });
        },
      );
    }
  };
  return (
    <ContainerView>
      <NavigationHeader
        headerLeftProps={{
          onPress: navigation.goBack,
          text: '취소',
        }}
        headerRightProps={
          onSubmit
            ? {
                text: '생성중',
              }
            : mode === 'edit'
            ? {
                onPress: editPost,
                text: '완료',
              }
            : {
                onPress: uploadPost,
                text: '완료',
              }
        }
        headerTitle={mode === 'edit' ? '수정' : '글쓰기'}
      />
      <CommunityCreatePostScreen
        navigation={navigation}
        route={route}
        categoryList={categoryList}
        selectedImages={route.params?.selectedImages}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        suggestionList={suggestionList}
        category={category}
        setCategory={setCategory}
        imageDataList={images}
        setImageDataList={setImages}
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
