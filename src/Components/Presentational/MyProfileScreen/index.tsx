import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Animated, {Extrapolate, Easing} from 'react-native-reanimated';
import {TabView, SceneMap} from 'react-native-tab-view';
import {PanGestureHandler} from 'react-native-gesture-handler';
//Local Component
import PostItem from '~/Components/Presentational/PostItem';
import ReviewItem from '~/Components/Presentational/ReviewItem';
import {callPhoneNumber} from '~/method/callPhoneNumber';

const HEADERHEIGHT = hp('8.25%');
const PROFILEHEIGHT = 88;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ContainerView = Styled.View`
flex: 1;
 background-color: #FFFFFF;
`;

const HeaderContainerView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('8.25%') + getStatusBarHeight()}px;
flex-direction: row;
margin-top: ${-getStatusBarHeight()}
padding: ${getStatusBarHeight()}px 16px 0px 16px;
align-items: center;
background: white;
z-index: 2;
`;

const HeaderNicknameText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 32px;
margin-right: 8px;
`;

const HeaderLocationText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 32px;
color: #8C8C8C;
`;

const HeaderIconContainerView = Styled.View`
width: auto
height: auto;
flex-direction: row;
margin-left: auto;
`;

const HeaderIconTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 30px;
height: 30px;
margin-left: 16px;
background: grey;
border-radius: 15px;
`;

const FloatingView = Styled(Animated.View as new () => Animated.View)`
width: ${wp('100%')}px;
height: 100px;
position: absolute;
top: ${HEADERHEIGHT}px;
left: 0px;
zIndex: 1;

`;

const ProfileContainerView = Styled.View`
width: ${wp('100%')}px;
height: ${PROFILEHEIGHT}px;
padding: 0px 23px;
justify-content: center;
background: white;
`;

const ProfileContentView = Styled.View`
width: 100%;
height: auto;
flex-direction: row;
`;

const ProfileImageView = Styled.View`
width: 56px;
height: 56px;
background: grey;
border-radius: 16px;
margin-right: 24px;
`;

const ProfileImage = Styled.Image`
width: 100%;
height: 100%;
border-radius: 16px;
`;
const ProfileReservationTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: auto;
height: auto;
align-items: center;
justify-content: center;
margin: 0px 16px;

`;

const ProfileReservationTitleText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
margin-bottom: 10px;
`;

const ProfileReservationText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
`;

const TabBarConatiner = Styled.View`
width: 100%;
height: ${hp('7%')}
flex-direction: row;
border-bottom-width: 1px;
border-color: #C4C4C4;
background: white;
`;

const TabBarItemTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 50%;
height: 100%;
justify-content: center;
align-items: center;
`;

const TabBarItemText = Styled(Animated.Text as new () => Animated.Text)`
fontFamily: NanumSquare;
                  font-style: normal;
                  font-weight: bold;
                  font-size: 14px;
                  line-height: 16px;
`;

const TabBarIndicatorView = Styled(Animated.View as new () => Animated.View)`
width: ${wp('50%') - 32}px;
                height: 3px;
                position: absolute;
                bottom: 0px;
                left: 16px;
                background: #2998FF;
                `;

interface Props {
  navigation: any;
  route: any;
  reviewPostData: any;
  communityPostData: any;
  isRefreshing: boolean;
  onRefresh: any;
  isEndReached: boolean;
  onEndReached: any;
  currentUser: User;
  openModal: any;
  moveToCommunityDetail: any;
  moveToReviewDetail: any;
  moveToReservationTabScreen: any;
  moveToSavedHospitalTabScreen: any;
  moveToAnotherProfile: any;
  toggleSocialLike: any;
  toggleSocialScrap: any;
}

interface State {
  currentIndex: number;
  isModalVisible: boolean;
  index: number;
  routes: any;
}

interface User {
  jwtToken: string;
  phoneNumber: string;
  id: string;
  nickname: string;
  profileImage: string;
}

export default class MyProfile extends React.PureComponent<Props, State> {
  minusValue: Animated.Value<-1>;
  headerHeightValue: Animated.Value<number>;
  swiperRef: any;
  reviewRef: any;
  communityRef: any;
  currentScrollY: Animated.Value<0>;
  positionX: Animated.Value<0>;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentIndex: 0,
      isModalVisible: false,
      index: 0,
      routes: [
        {key: 'first', title: 'First'},
        {key: 'second', title: 'Second'},
      ],
    };

    this.currentScrollY = new Animated.Value(0);
    this.positionX = new Animated.Value(0);
    this.swiperRef = React.createRef();
    this.minusValue = new Animated.Value(-1);
    this.headerHeightValue = new Animated.Value(
      HEADERHEIGHT + getStatusBarHeight() + 1,
    );

    this.scrollToIndex = this.scrollToIndex.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderPostFlatList = this.renderPostFlatList.bind(this);
    this.renderReviewFlatList = this.renderReviewFlatList.bind(this);
  }

  scrollToIndex = (index: number) => {
    this.setState({
      index,
    });
  };

  closeModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  onRefresh = () => {};

  renderPost = ({item, index}: any) => {
    return (
      <PostItem
        data={item}
        moveToCommunityDetail={this.props.moveToCommunityDetail}
        moveToAnotherProfile={this.props.moveToAnotherProfile}
        toggleSocialLike={this.props.toggleSocialLike}
        toggleSocialScrap={this.props.toggleSocialScrap}
      />
    );
  };

  renderReview = ({item, index}: any) => {
    const writer = {
      nickname: item.user.nickname,
      profileImage: item.user.profileImg,
      userId: item.userId,
    };

    const avgRating =
      (item.starRate_cost + item.starRate_treatment + item.starRate_service) /
      3;
    return (
      <ReviewItem
        reviewId={item.id}
        writer={writer}
        createdAt={item.createdAt}
        treatmentArray={item.TreatmentItems}
        treatmentDate={item.treatmentDate}
        avgRating={avgRating}
        viewCount={item.reviewViewNum}
        treatInfoCount={item.getInfo}
        likeCount={item.reviewLikeNum}
        commentCount={item.reviewCommentsNum}
        imageArray={item.review_contents}
        descriptions={item.reviewDescriptions ? item.reviewDescriptions : ''}
        moveToReviewDetail={this.props.moveToReviewDetail}
      />
    );
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.communityPostData !== this.props.communityPostData) {
      console.log('profile post diff');
      this.setState(this.state);
    }
    console.log('updated');
  }

  renderPostFlatList = () => (
    <AnimatedFlatList
      style={{
        flex: 1,
        marginBottom: hp('9.6%'),
      }}
      onStartShouldSetResponder={true}
      contentContainerStyle={{
        minHeight: hp('100%') - PROFILEHEIGHT + getStatusBarHeight() - 1,
        paddingTop: HEADERHEIGHT + getStatusBarHeight() + 1 + hp('7%'),
      }}
      ref={(ref: any) => (this.communityRef = ref)}
      scrollEventThrottle={16}
      scrollIndicatorInsets={{
        top: PROFILEHEIGHT + hp('7%'),
      }}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: (y: number) =>
                  Animated.block([
                    Animated.set(this.currentScrollY, y),
                    Animated.call([y], ([offsetY]) => {
                      if (this.state.index === 1) {
                        this.reviewRef &&
                          this.reviewRef.getNode().scrollToOffset({
                            offset: Math.min(PROFILEHEIGHT, offsetY),
                            animated: false,
                          });
                      }
                    }),
                  ]),
              },
            },
          },
        ],
        {
          useNativeDriver: true,
        },
      )}
      data={this.props.communityPostData}
      renderItem={this.renderPost}
      keyExtractor={(item: any) => String(item.id)}
      refreshControl={
        <RefreshControl
          refreshing={this.props.isRefreshing}
          onRefresh={() => this.onRefresh()}
        />
      }
    />
  );

  renderReviewFlatList = () => (
    <AnimatedFlatList
      style={{
        width: wp('100%'),
        flex: 1,
        marginBottom: hp('9.6%'),
      }}
      contentContainerStyle={{
        minHeight: hp('100%') - PROFILEHEIGHT + getStatusBarHeight() - 1,
        paddingTop: HEADERHEIGHT + getStatusBarHeight() + 1 + hp('7%'),
      }}
      ref={(ref: any) => (this.reviewRef = ref)}
      scrollEventThrottle={16}
      scrollIndicatorInsets={{
        top: PROFILEHEIGHT + hp('7%'),
      }}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: (y: number) =>
                  Animated.block([
                    Animated.set(this.currentScrollY, y),
                    Animated.call([y], ([offsetY]) => {
                      if (this.state.index === 0) {
                        this.communityRef &&
                          this.communityRef.getNode().scrollToOffset({
                            offset: Math.min(PROFILEHEIGHT, offsetY),
                            animated: false,
                          });
                      }
                    }),
                  ]),
              },
            },
          },
        ],
        {
          useNativeDriver: true,
        },
      )}
      data={[]}
      renderItem={this.renderReview}
      refreshControl={
        <RefreshControl
          refreshing={this.props.isRefreshing}
          onRefresh={() => this.onRefresh()}
        />
      }
    />
  );

  renderScene = ({route}: any) => {
    switch (route.key) {
      case 'first':
        return this.renderReviewFlatList();
      case 'second':
        return this.renderPostFlatList();
    }
  };

  render() {
    return (
      <ContainerView>
        <HeaderContainerView>
          <HeaderNicknameText>
            {this.props.currentUser.nickname}
          </HeaderNicknameText>
          <HeaderLocationText>
            {/* {this.props.currentUser.location} */ '광교동'}
          </HeaderLocationText>
          <HeaderIconContainerView>
            <HeaderIconTouchableOpacity
              onPress={() => {
                this.props.openModal();
              }}
            />
            <HeaderIconTouchableOpacity />
          </HeaderIconContainerView>
        </HeaderContainerView>
        <FloatingView
          style={{
            transform: [
              {
                translateY: Animated.multiply(
                  this.minusValue,
                  Animated.min(this.headerHeightValue, this.currentScrollY),
                ),
              },
            ],
          }}>
          <ProfileContainerView>
            <ProfileContentView>
              <ProfileImageView>
                <ProfileImage
                  source={{
                    uri: this.props.currentUser.profileImage,
                    cache: 'force-cache',
                  }}
                />
              </ProfileImageView>
              <ProfileReservationTouchableOpacity
                onPress={() => this.props.moveToReservationTabScreen()}>
                <ProfileReservationTitleText>
                  {'예약피드'}
                </ProfileReservationTitleText>
                <ProfileReservationText>{'1개'}</ProfileReservationText>
              </ProfileReservationTouchableOpacity>
              <ProfileReservationTouchableOpacity
                onPress={() => this.props.moveToSavedHospitalTabScreen()}>
                <ProfileReservationTitleText>
                  {'찜한병원'}
                </ProfileReservationTitleText>
                <ProfileReservationText>{'3개'}</ProfileReservationText>
              </ProfileReservationTouchableOpacity>
            </ProfileContentView>
          </ProfileContainerView>
          <TabBarConatiner>
            <TabBarItemTouchableOpacity onPress={() => this.scrollToIndex(0)}>
              <TabBarItemText
                style={{
                  color: Animated.interpolateColors(this.positionX, {
                    inputRange: [0, 1],
                    outputColorRange: ['#2998FF', '#C4C4C4'],
                  }),
                }}>{`내가 쓴 후기`}</TabBarItemText>
            </TabBarItemTouchableOpacity>
            <TabBarItemTouchableOpacity onPress={() => this.scrollToIndex(1)}>
              <TabBarItemText
                style={{
                  color: Animated.interpolateColors(this.positionX, {
                    inputRange: [0, 1],
                    outputColorRange: ['#C4C4C4', '#2998FF'],
                  }),
                }}>{`내가 쓴 수다글`}</TabBarItemText>
            </TabBarItemTouchableOpacity>
            <TabBarIndicatorView
              style={{
                transform: [
                  {
                    translateX: Animated.interpolate(this.positionX, {
                      inputRange: [0, 1],
                      outputRange: [0, wp('50%')],
                      extrapolate: Extrapolate.CLAMP,
                    }),
                  },
                ],
              }}
            />
          </TabBarConatiner>
        </FloatingView>
        <TabView
          navigationState={{index: this.state.index, routes: this.state.routes}}
          renderScene={this.renderScene}
          onIndexChange={(index) => this.setState({index})}
          renderTabBar={() => null}
          position={this.positionX}
        />
      </ContainerView>
    );
  }
}
