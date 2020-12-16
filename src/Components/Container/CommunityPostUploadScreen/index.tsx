import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  Alert,
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
import POSTCreateCommunityPost from '~/Routes/Community/createPost/POSTCreateCommunityPost';
import PUTCommunityPost from '~/Routes/Community/editPost/PUTCommunityPost';

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
  const prevData = route.params?.data;
  const mode = prevData ? 'edit' : 'create';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);

  const [description, setDescription] = useState<string>(
    prevData?.description || '',
  );
  const [wantDentistHelp, setWantDentistHelp] = useState(
    prevData?.wantDentistHelp || false,
  );
  const [category, setCategory] = useState(prevData?.type || '질문');
  const [images, setImages] = useState(prevData?.community_imgs || []);

  const [categoryList, setCategoryList] = useState<string[]>(['질문', '자유']);
  const [isPopupShown, setIsPopupShown] = useState<boolean>(true);

  useEffect(() => {
    //fetch here!!
    console.log(searchQuery);
    async function fetchData() {
      const incompleteKorean = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
      if (!incompleteKorean.test(searchQuery)) {
        if (searchQuery !== '') {
          setSuggestionList([]);
          const response: any = await GETAllTagSearch(searchQuery);
          setSearchQuery((prev) => {
            if (prev !== searchQuery) {
            } else {
              setSuggestionList(response);
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
    }
  };
  const uploadPost = async () => {
    console.log(description, wantDentistHelp, category, images);
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
      POSTCreateCommunityPost(postData).then((response: any) => {
        console.log(response);
        navigation.navigate('CommunityListScreen');
      });
    }
  };

  const editPost = async () => {
    console.log(description, wantDentistHelp, category, images);
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
      PUTCommunityPost(postData, prevData.id).then((response: any) => {
        console.log(response);
        navigation.navigate('CommunityListScreen');
      });
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
          mode === 'edit'
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
      />
    </ContainerView>
  );
};

export default CommunityPostUploadScreen;
