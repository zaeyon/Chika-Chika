import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Animated, {Extrapolate, Easing} from 'react-native-reanimated';
import {TabView, TabBar} from 'react-native-tab-view';
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
margin-top: ${-getStatusBarHeight()}px;
padding: ${getStatusBarHeight()}px 16px 0px 16px;
align-items: center;
background: #FFFFFF;
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

const TabBarView = Styled(Animated.View as new () => Animated.View)`
position: absolute;
top: ${PROFILEHEIGHT}px;
left: 0;
width: 100%;
height: auto;
z-index: 1;
border-bottom-width: 1px;
border-color: #C4C4C4;
`;

const ActivityIndicatorContianerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
align-items: center;
padding: 10px 0px;
`;

const InitializingView = Styled.View`
flex: 1;
background: rgba(200, 200, 200, 0.1);
justify-content: center;
align-items: center;
`;

interface Props {
  navigation: any;
  route: any;
  isReviewInitializing: boolean;
  isCommunityInitializing: boolean;
  reviewData: any;
  isReviewRefreshing: boolean;
  onReviewRefresh: any;
  isReviewEndReached: boolean;
  onReviewEndReached: any;
  communityPostData: any;
  isCommunityRefreshing: boolean;
  onCommunityRefresh: any;
  isCommunityEndReached: boolean;
  onCommunityEndReached: any;
  currentUser: User;
  openModal: any;
  moveToCommunityDetail: any;
  moveToReservationTabScreen: any;
  moveToSavedHospitalTabScreen: any;
  moveToAnotherProfile: any;
  toggleSocialLike: any;
  toggleSocialScrap: any;
  moveToReviewDetail: any;
  moveToWriterProfile: any;
  moveToDentalDetail: any;
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
  profileImg: string;
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
        {key: 'first', title: '내가 쓴 후기'},
        {key: 'second', title: '내가 쓴 수다글'},
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

  renderPostItem = ({item, index}: any) => {
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

  renderReviewItem = ({item, index}: any) => {
    const ratingObj = {
      avgRating: Number(
        (
          (Number(item.starRate_cost) +
            Number(item.starRate_service) +
            Number(item.starRate_treatment)) /
          3
        ).toFixed(1),
      ),
      priceRating: Number(item.starRate_cost),
      serviceRating: Number(item.starRate_service),
      treatRating: Number(item.starRate_treatment),
    };

    const writer = {
      nickname: item.user.nickname,
      profileImage: item.user.profileImg,
      userId: item.userId,
    };

    let elapsedTimeText = '';
    let visibleElapsedTime = false;

    const elapsedMin = item['createdDiff(second)'] / 60;
    const elapsedHour = item['createdDiff(second)'] / 3600;
    const elapsedDay = item['createdDiff(second)'] / 86400;

    if (elapsedMin < 1) {
      elapsedTimeText = '방금 전';
      visibleElapsedTime = true;
    } else if (1 <= elapsedMin && elapsedHour < 1) {
      elapsedTimeText = `${Math.floor(elapsedMin)}분 전`;
      visibleElapsedTime = true;
    } else if (1 <= elapsedHour && elapsedDay < 1) {
      elapsedTimeText = `${Math.floor(elapsedHour)}시간 전`;
      visibleElapsedTime = true;
    } else if (elapsedDay >= 1) {
      visibleElapsedTime = false;
    }

    return (
      <ReviewItem
        reviewId={item.id}
        writer={writer}
        createdAt={item.createdAt}
        elapsedTimeText={elapsedTimeText}
        visibleElapsedTime={visibleElapsedTime}
        treatmentArray={item.TreatmentItems}
        treatmentDate={item.treatmentDate ? item.treatmentDate : ''}
        dentalObj={item.dental_clinic}
        ratingObj={ratingObj}
        viewCount={item.reviewViewNum}
        treatInfoCount={item.getInfo}
        likeCountProp={item.reviewLikeNum}
        commentCount={item.reviewCommentsNum}
        imageArray={item.review_contents}
        descriptions={item.reviewDescriptions ? item.reviewDescriptions : ''}
        isCurUserLikeProp={item.viewerLikedReview}
        isCurUserScrapProp={item.viewerScrapedReview}
        refreshingReviewList={this.props.isReviewRefreshing}
        moveToReviewDetail={this.props.moveToReviewDetail}
        moveToWriterProfile={this.props.moveToWriterProfile}
        moveToDentalDetail={this.props.moveToDentalDetail}
      />
    );
  };

  renderPostFlatList = () => {
    return this.props.isCommunityInitializing ? (
      <InitializingView>
        <ActivityIndicator />
      </InitializingView>
    ) : (
      <AnimatedFlatList
        style={{
          flex: 1,
          marginBottom: hp('9.6%'),
        }}
        scrollIndicatorInsets={{top: PROFILEHEIGHT + hp('7%')}}
        contentContainerStyle={{
          minHeight: hp('100%') - PROFILEHEIGHT + getStatusBarHeight() - 1,
          paddingTop: PROFILEHEIGHT + hp('7%'),
        }}
        ref={(ref: any) => (this.communityRef = ref)}
        scrollEventThrottle={16}
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
        onEndReached={this.props.onCommunityEndReached}
        onEndReachedThreshold={5}
        ListFooterComponent={
          this.props.isCommunityEndReached ? (
            <ActivityIndicatorContianerView>
              <ActivityIndicator size="large" />
            </ActivityIndicatorContianerView>
          ) : null
        }
        data={this.props.communityPostData}
        renderItem={this.renderPostItem}
        keyExtractor={(item: any, index: number) => String(index)}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isCommunityRefreshing}
            onRefresh={() => this.props.onCommunityRefresh()}
          />
        }
      />
    );
  };

  renderReviewFlatList = () => {
    return this.props.isReviewInitializing ? (
      <InitializingView>
        <ActivityIndicator />
      </InitializingView>
    ) : (
      <AnimatedFlatList
        style={{
          flex: 1,
          marginBottom: hp('9.6%'),
        }}
        scrollIndicatorInsets={{top: PROFILEHEIGHT + hp('7%')}}
        contentContainerStyle={{
          minHeight: hp('100%') - PROFILEHEIGHT + getStatusBarHeight() - 1,
          paddingTop: PROFILEHEIGHT + hp('7%'),
        }}
        ref={(ref: any) => (this.reviewRef = ref)}
        scrollEventThrottle={16}
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
        onEndReached={this.props.onReviewEndReached}
        onEndReachedThreshold={5}
        ListFooterComponent={
          this.props.isReviewEndReached ? (
            <ActivityIndicatorContianerView>
              <ActivityIndicator size="large" />
            </ActivityIndicatorContianerView>
          ) : null
        }
        data={this.props.reviewData}
        renderItem={this.renderReviewItem}
        keyExtractor={(item: any, index: number) => String(index)}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isReviewRefreshing}
            onRefresh={() => this.props.onReviewRefresh()}
          />
        }
      />
    );
  };

  renderScene = ({route}: any) => {
    switch (route.key) {
      case 'first':
        return this.renderReviewFlatList();
      case 'second':
        return this.renderPostFlatList();
    }
  };

  renderTabBar = (props: any) => (
    <TabBarView
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
      <TabBar
        {...props}
        style={{
          backgroundColor: 'white',
        }}
        indicatorStyle={{
          height: 3,
          backgroundColor: '#2998FF',
        }}
        activeColor="#2998FF"
        inactiveColor="#C4C4C4"
        tabStyle={{
          height: hp('7%'),
        }}
        labelStyle={{
          fontFamily: 'NanumSquare',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: 14,
          lineHeight: 16,
        }}
      />
    </TabBarView>
  );

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
                    uri: this.props.currentUser.profileImg,
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
        </FloatingView>
        <TabView
          navigationState={{index: this.state.index, routes: this.state.routes}}
          renderScene={this.renderScene}
          onIndexChange={(index) => this.setState({index})}
          renderTabBar={this.renderTabBar}
          position={this.positionX}
        />
      </ContainerView>
    );
  }
}
