import React from 'react';
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

interface States {
  scrollY: Animated.Value;
  keyboardHeight: Animated.Value;
  comments: any;
  formattedDescription: string;
}

export default class CommunityDetailScreen extends React.Component<
  Props,
  States
> {
  scrollView: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      keyboardHeight: new Animated.Value(0),
      comments: [],
      formattedDescription: '',
    };

    this.toggleKeyboardAnimation = this.toggleKeyboardAnimation.bind(this);
    this.uploadComment = this.uploadComment.bind(this);
    this.fetchPostComments = this.fetchPostComments.bind(this);
    this.onPressEditPost = this.onPressEditPost.bind(this);
    this.onPressDeletePost = this.onPressDeletePost.bind(this);
  }

  toggleKeyboardAnimation = (height: Number) => {
    this.scrollView &&
      this.scrollView.scrollTo({
        y: (this.state.scrollY as any)._value + height,
      });
  };

  uploadComment(comment: string) {
    POSTCommunityPostComment(this.props.route.params.data.id, comment).then(
      (response: any) => {
        console.log(response);
        if (response.body.statusText === 'Created') {
          console.log('Created!');
          this.fetchPostComments(this.props.route.params.data.id);
        }
      },
    );
  }

  fetchPostComments(postId: string) {
    GETCommunityPostComments(postId).then((response: any) => {
      this.setState({
        comments: response,
      });
    });
  }

  onPressEditPost = () => {
    this.props.navigation.navigate('CommunityPostUploadStackScreen', {
      data: {
        ...this.props.route.params.data,
        description: this.deorderDescription(
          this.props.route.params.data.description,
        ),
        type: this.deorderType(this.props.route.params.data.type),
      },
    });
  };
  onPressDeletePost = () => {
    DELETECommunityPost(this.props.route.params.data.id).then((response) => {
      console.log(response);
      this.props.navigation.goBack();
      Alert.alert('게시글 삭제가 완료되었습니다.');
    });
  };

  deorderDescription = (oldDescription: string) => {
    const newDescription = oldDescription
      .replace(/{{/gi, '#')
      .replace(/}}/gi, '');
    return newDescription;
  };

  deorderType = (oldCategory: string) => {
    if (oldCategory === 'Question') {
      return '질문';
    } else if (oldCategory === 'FreeTalk') {
      return '자유';
    }
  };
  componentDidMount() {
    this.fetchPostComments(this.props.route.params.data.id);
  }
  render() {
    return (
      <ContainerView>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <BodyContainerScrollView
            scrollIndicatorInsets={{
              bottom: getBottomSpace() ? 0 : 11,
            }}
            ref={(ref) => (this.scrollView = ref)}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: this.state.scrollY,
                    },
                  },
                },
              ],
              {useNativeDriver: false},
            )}>
            <PostInformation
              navigation={this.props.navigation}
              onPressEditPost={this.onPressEditPost}
              onPressDeletePost={this.onPressDeletePost}
            />
            <PostItem
              mode={'Detail'}
              navigation={this.props.navigation}
              data={this.props.route.params.data}
            />
            <DentistComment />

            <PostCommentList commentList={this.state.comments} />
          </BodyContainerScrollView>
        </KeyboardAvoidingView>
        <PostBottomBar
          toggleKeyboardAnimation={this.toggleKeyboardAnimation}
          uploadComment={this.uploadComment}
          postLikeNum={this.props.route.params.data.postLikeNum}
          viewerLikeCommunityPost={
            this.props.route.params.data.viewerLikeCommunityPost
          }
        />
      </ContainerView>
    );
  }
}
