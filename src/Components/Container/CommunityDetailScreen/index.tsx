import React, {useEffect, useRef, useState} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  KeyboardAvoidingView,
  View,
  Animated,
  Keyboard,
  LayoutAnimation,
  Easing,
  Text,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
// Local Components
import PostInformation from '~/Components/Presentational/CommunityPostDetailScreen/PostInformation';
import PostItem from '~/Components/Presentational/PostItem';
import DentistComment from '~/Components/Presentational/CommunityPostDetailScreen/DentistComment';
import PostCommentList from '~/Components/Presentational/CommunityPostDetailScreen/PostCommentList';
import PostBottomBar from '~/Components/Presentational/CommunityPostDetailScreen/PostBottomBar';
import {bindActionCreators} from 'redux';

// fetch
import GETCommunityPostComments from '~/Routes/Community/postDetail/GETCommunityPostComments';
import POSTCommunityPostComment from '~/Routes/Community/postDetail/POSTCommunityPostComment';
import DELETECommunityPost from '~/Routes/Community/deletePost/DELETECommunityPost';
import {useSelector} from 'react-redux';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: white;
`;

const BodyContainerScrollView = Styled.ScrollView`
flex: 1;
margin-bottom: ${hp('100%') * 0.08}px;

`;

interface Props {
  navigation: any;
  route: any;
  key: any;
}

const CommunityDetailScreen = ({navigation, route, key}: Props) => {
  const scrollView: any = useRef();

  const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;
  const keyboardHeight: Animated.Value = useRef(new Animated.Value(0)).current;
  const [comments, setComments] = useState([]);
  const [formattedDescription, setFormattedDescription] = useState('');
  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.user.jwtToken;

  useEffect(() => {
    fetchPostComments(route.params.data.id);
  }, []);

  const toggleKeyboardAnimation = (height: Number) => {
    scrollView &&
      scrollView.current.scrollTo({
        y: (scrollY as any)._value + height,
      });
  };

  const uploadComment = (comment: string) => {
    POSTCommunityPostComment(jwtToken, route.params.data.id, comment).then(
      (response: any) => {
        console.log(response);
        if (response.body.statusText === 'Created') {
          console.log('Created!');
          fetchPostComments(route.params.data.id);
        }
      },
    );
  };

  const fetchPostComments = (postId: string) => {
    GETCommunityPostComments(jwtToken, postId).then((response: any) => {
      setComments(response);
    });
  };

  const onPressEditPost = () => {
    navigation.navigate('CommunityPostUploadStackScreen', {
      data: {
        ...route.params.data,
        description: deorderDescription(route.params.data.description),
        type: deorderType(route.params.data.type),
      },
    });
  };
  const onPressDeletePost = () => {
    DELETECommunityPost(jwtToken, route.params.data.id).then((response) => {
      console.log(response);
      navigation.goBack();
      Alert.alert('게시글 삭제가 완료되었습니다.');
    });
  };

  const deorderDescription = (oldDescription: string) => {
    const newDescription = oldDescription
      .replace(/{{/gi, '#')
      .replace(/}}/gi, '');
    return newDescription;
  };

  const deorderType = (oldCategory: string) => {
    if (oldCategory === 'Question') {
      return '질문';
    } else if (oldCategory === 'FreeTalk') {
      return '자유';
    }
  };

  return (
    <ContainerView>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <BodyContainerScrollView
          scrollIndicatorInsets={{
            bottom: getBottomSpace() ? 0 : 11,
          }}
          ref={scrollView}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}>
          <PostInformation
            navigation={navigation}
            onPressEditPost={onPressEditPost}
            onPressDeletePost={onPressDeletePost}
          />
          <PostItem
            mode={'Detail'}
            navigation={navigation}
            data={route.params.data}
          />
          <DentistComment />

          <PostCommentList commentList={comments} />
        </BodyContainerScrollView>
      </KeyboardAvoidingView>
      <PostBottomBar
        toggleKeyboardAnimation={toggleKeyboardAnimation}
        uploadComment={uploadComment}
        postLikeNum={route.params.data.postLikeNum}
        viewerLikeCommunityPost={route.params.data.viewerLikeCommunityPost}
      />
    </ContainerView>
  );
};

export default CommunityDetailScreen;
