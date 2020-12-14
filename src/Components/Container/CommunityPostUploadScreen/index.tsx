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
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import CommunityCreatePostScreen from '~/Components/Presentational/CommunityCreatePostScreen';
import GETAutocompletedHashTagList from '~/Routes/Community/createPost/GETAutocompletedHashTagList';
import POSTCreateCommunityPost from '~/Routes/Community/createPost/POSTCreateCommunityPost';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);

  const [description, setDescription] = useState<string>('');
  const [wantDentistHelp, setWantDentistHelp] = useState(false);
  const [category, setCategory] = useState('질문');
  const [images, setImages] = useState([]);

  const [categoryList, setCategoryList] = useState<string[]>(['질문', '자유']);
  const [isPopupShown, setIsPopupShown] = useState<boolean>(true);

  useEffect(() => {
    //fetch here!!
    console.log(searchQuery);
    if (searchQuery !== '') {
      setSuggestionList([]);
      GETAutocompletedHashTagList(searchQuery).then((response: any) => {
        setSuggestionList(response);
      });
    } else {
      setSuggestionList([]);
    }
  }, [searchQuery, searchMode]);

  const formatImages = (oldImages: Array<imageItem>) =>
    oldImages.map((item: imageItem) => ({
      uri: item.uri,
      name: item.filename.toLowerCase(),
      type: 'image/jpeg',
    }));

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
  const uploadPost = () => {
    console.log(description, wantDentistHelp, category, images);
    const formattedImages = formatImages(images);
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
        navigation.goBack();
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
        headerRightProps={{
          onPress: uploadPost,
          text: '완료',
        }}
        headerTitle="글쓰기"
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
