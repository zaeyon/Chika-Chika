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
import DeviceInfo from 'react-native-device-info';
//Local Component
import PostItem from '~/Components/Presentational/PostItem';
import ReviewItem from '~/Components/Presentational/ReviewItem';
import {callDentalPhoneNumber} from '~/method/callDentalPhoneNumber';

const HEADERHEIGHT = 69 + getStatusBarHeight();
const PROFILEHEIGHT = 102;
const TABBARHEIGHT = 55;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ContainerView = Styled.View`
flex: 1;
 background-color: #FFFFFF;
`;

const HeaderContainerView = Styled.View`
width: ${wp('100%')}px;
height: ${HEADERHEIGHT}px;
flex-direction: row;
margin-top: ${-getStatusBarHeight()}px;
padding: ${getStatusBarHeight() + 24}px 16px 0px 16px;
align-items: flex-start;
background: #FFFFFF;
z-index: 2;
`;

const HeaderNicknameText = Styled.Text`
font-style: normal;
font-weight: 800;
font-size: 23px;
margin-right: 8px;
`;

const HeaderIconTouchableOpacity = Styled.TouchableOpacity`
margin-left: 16px;
`;

const HeaderIconImage = Styled.Image`
`;

const FloatingView = Styled(Animated.View as new () => Animated.View)`
width: ${wp('100%')}px;
height: 100px;
position: absolute;
top: ${HEADERHEIGHT - getStatusBarHeight()}px;
left: 0px;
zIndex: 1;

`;

const ProfileContainerView = Styled.View`
width: ${wp('100%')}px;
height: ${PROFILEHEIGHT}px;
padding: 0px 23px;
justify-content: center;
background: #FFFFFF;
`;

const ProfileContentView = Styled.View`
width: 100%;
height: auto;
align-items: center;
flex-direction: row;
`;

const ProfileImageView = Styled.View`
width: 77px;
height: 77px;
background: grey;
border-width: 0.5px;
border-color: #A6A8AC;
border-radius: 100px;
margin-right: 16px;
`;

const ProfileImage = Styled.Image`
width: 100%;
height: 100%;
border-radius: 100px;
`;
const ProfileReservationTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: auto;
height: auto;

align-items: center;
justify-content: center;
padding: 0px 16px
`;

const ProfileReservationTitleText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
`;

const ProfileReservationText = Styled.Text`
font-style: normal;
font-weight: 800;
font-size: 18px;
line-height: 24px;
`;

const TabBarView = Styled(Animated.View as new () => Animated.View)`
position: absolute;
top: ${PROFILEHEIGHT}px;
left: 0;
width: 100%;
height: auto;
z-index: 1;
border-bottom-width: 1px;
border-color: #E2E6ED;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
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

const VerticalPartitionView = Styled.View`
width: 1px;
height: 40px;
background: #E5E9F1;
margin: 0px 8px;
`;

const EmptyContainerView = Styled.View`
height: 100%;
padding-top: 118px;
align-items: center;
background: #FFFFFF;
`;

const EmptyContentImage = Styled.Image``;

const EmptyContentText = Styled.Text`
margin-top: 12px;
font-weight: normal;
font-size: 16px;
color: #9AA2A9;
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
  lastScrollY: number;
  prevScrollY: number;
  scrolling: boolean;
  isModalVisible: boolean;
  index: number;
  routes: any;
  currentScrollY: Animated.Value<0>;
  positionX: Animated.Value<0>;
  minusValue: Animated.Value<-1>;
  headerHeightValue: Animated.Value<number>;
}

interface User {
  phoneNumber: string;
  id: string;
  nickname: string;
  profileImg: string;
  img_thumbNail: string;
  provider: string;
  Residences: Array<Residence>;
  gender: string;
  birthdate: string;
  scrapClinicsNum: number;
  appointmentsNum: number;
}

interface Residence {
  emdName: string;
  sido: string;
  sigungu: string;
}

export default class MyProfile extends React.PureComponent<Props, State> {
  reviewRef: any;
  communityRef: any;

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
      currentScrollY: new Animated.Value(0),
      lastScrollY: 0,
      prevScrollY: 0,
      scrolling: false,
      positionX: new Animated.Value(0),
      minusValue: new Animated.Value(-1),
      headerHeightValue: new Animated.Value(PROFILEHEIGHT),
    };

    this.reviewRef = React.createRef();
    this.communityRef = React.createRef();

    this.scrollToIndex = this.scrollToIndex.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderPostFlatList = this.renderPostFlatList.bind(this);
    this.renderReviewFlatList = this.renderReviewFlatList.bind(this);
  }

  scrollToIndex = (index: number) => {
    console.log(index);
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
      img_thumbNail: item.user.img_thumbNail,
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
        moveToDentalDetail={this.props.moveToDentalDetail}
        moveToAnotherProfile={this.props.moveToAnotherProfile}
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
        ListHeaderComponent={() =>
          this.props.communityPostData.length === 0 ? (
            <EmptyContainerView>
              <EmptyContentImage
                source={require('~/Assets/Images/Comment/ic_noComment.png')}
              />
              <EmptyContentText>
                {'내가 쓴 수다글이 없습니다.'}
              </EmptyContentText>
            </EmptyContainerView>
          ) : null
        }
        style={{
          flex: 1,
          marginBottom: DeviceInfo.hasNotch() ? hp('10.59%') : hp('7.2%'),
        }}
        scrollIndicatorInsets={{top: PROFILEHEIGHT + TABBARHEIGHT}}
        contentContainerStyle={{
          backgroundColor: '#F5F7F9',
          minHeight:
            hp('100%') -
            HEADERHEIGHT -
            (DeviceInfo.hasNotch() ? hp('10.59%') : hp('7.2%')) +
            PROFILEHEIGHT,
          paddingTop: PROFILEHEIGHT + TABBARHEIGHT,
        }}
        ref={(ref: any) => (this.communityRef = ref)}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: this.state.currentScrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        onScrollEndDrag={(e: any) => {
          this.setState({
            lastScrollY: e.nativeEvent.contentOffset.y,
          });
        }}
        onMomentumScrollEnd={(e: any) => {
          this.setState({
            lastScrollY: e.nativeEvent.contentOffset.y,
            scrolling: false,
          });
        }}
        onMomentumScrollBegin={() => {
          this.setState({
            scrolling: true,
          });
        }}
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
        ListHeaderComponent={() =>
          this.props.reviewData.length === 0 ? (
            <EmptyContainerView>
              <EmptyContentImage
                source={require('~/Assets/Images/Comment/ic_noComment.png')}
              />
              <EmptyContentText>{'내가 쓴 후기가 없습니다.'}</EmptyContentText>
            </EmptyContainerView>
          ) : null
        }
        style={{
          flex: 1,
          marginBottom: DeviceInfo.hasNotch() ? hp('10.59%') : hp('7.2%'),
        }}
        scrollIndicatorInsets={{top: PROFILEHEIGHT + TABBARHEIGHT}}
        contentContainerStyle={{
          backgroundColor: '#F5F7F9',
          minHeight:
            hp('100%') -
            HEADERHEIGHT -
            (DeviceInfo.hasNotch() ? hp('10.59%') : hp('7.2%')) +
            PROFILEHEIGHT,
          paddingTop: PROFILEHEIGHT + TABBARHEIGHT,
        }}
        ref={(ref: any) => (this.reviewRef = ref)}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: this.state.currentScrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        onScrollEndDrag={(e: any) => {
          this.setState({
            lastScrollY: e.nativeEvent.contentOffset.y,
          });
        }}
        onMomentumScrollEnd={(e: any) => {
          this.setState({
            lastScrollY: e.nativeEvent.contentOffset.y,
            scrolling: false,
          });
        }}
        onMomentumScrollBegin={() => {
          this.setState({
            scrolling: true,
          });
        }}
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

  renderTabBar = (props: any) => {
    return (
      <TabBarView
        style={{
          transform: [
            {
              translateY: Animated.multiply(
                this.state.minusValue,
                Animated.min(
                  this.state.headerHeightValue,
                  this.state.currentScrollY,
                ),
              ),
            },
          ],
        }}>
        <TabBar
          {...props}
          onTabPress={({route, preventDefault}) => {
            if (
              this.state.prevScrollY ===
              Math.min(PROFILEHEIGHT, this.state.lastScrollY)
            ) {
              return;
            }
            if (this.state.scrolling) {
              preventDefault();
              return;
            }
            if (route.key === 'first') {
              console.log('review scrollend');
              this.reviewRef &&
                this.reviewRef.getNode &&
                this.reviewRef.getNode().scrollToOffset({
                  offset: Math.min(PROFILEHEIGHT, this.state.lastScrollY),
                  animated: false,
                });
            } else if (route.key === 'second') {
              console.log('post scrollend');
              this.communityRef &&
                this.communityRef.getNode &&
                this.communityRef.getNode().scrollToOffset({
                  offset: Math.min(PROFILEHEIGHT, this.state.lastScrollY),
                  animated: false,
                });
            }
            this.setState({
              prevScrollY: Math.min(PROFILEHEIGHT, this.state.lastScrollY),
            });
          }}
          style={{
            backgroundColor: '#FFFFFF',
          }}
          indicatorStyle={{
            height: 2,
            backgroundColor: '#00D1FF',
            borderRadius: 100,
          }}
          activeColor="#131F3C"
          inactiveColor="#9AA2A9"
          tabStyle={{
            height: 54,
          }}
          labelStyle={{
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16,
            lineHeight: 24,
          }}
        />
      </TabBarView>
    );
  };

  render() {
    return (
      <ContainerView>
        <HeaderContainerView>
          <HeaderNicknameText>
            {this.props.currentUser.nickname}
          </HeaderNicknameText>
          <HeaderIconTouchableOpacity
            style={{
              position: 'absolute',
              right: 6,
              top: getStatusBarHeight() + 14,
              padding: 10,
            }}
            onPress={() => {
              this.props.openModal();
            }}>
            <HeaderIconImage
              source={require('~/Assets/Images/MyPage/Header/Mypage/ic/setting.png')}
            />
          </HeaderIconTouchableOpacity>
        </HeaderContainerView>
        <FloatingView
          style={{
            transform: [
              {
                translateY: Animated.multiply(
                  this.state.minusValue,
                  Animated.min(
                    this.state.headerHeightValue,
                    this.state.currentScrollY,
                  ),
                ),
              },
            ],
          }}>
          <ProfileContainerView>
            <ProfileContentView>
              <ProfileImageView>
                <ProfileImage
                  source={{
                    uri: this.props.currentUser.img_thumbNail,
                    cache: 'force-cache',
                  }}
                />
              </ProfileImageView>
              <ProfileReservationTouchableOpacity
                onPress={() => this.props.moveToReservationTabScreen()}>
                <ProfileReservationText>
                  {this.props.currentUser.appointmentsNum}
                </ProfileReservationText>
                <ProfileReservationTitleText>
                  {'예약피드'}
                </ProfileReservationTitleText>
              </ProfileReservationTouchableOpacity>
              <VerticalPartitionView />
              <ProfileReservationTouchableOpacity
                onPress={() => this.props.moveToSavedHospitalTabScreen()}>
                <ProfileReservationText>
                  {this.props.currentUser.scrapClinicsNum}
                </ProfileReservationText>
                <ProfileReservationTitleText>
                  {'찜한병원'}
                </ProfileReservationTitleText>
              </ProfileReservationTouchableOpacity>
            </ProfileContentView>
          </ProfileContainerView>
        </FloatingView>
        <TabView
          onSwipeStart={() => {
            if (
              this.state.prevScrollY ===
              Math.min(PROFILEHEIGHT, this.state.lastScrollY)
            ) {
              return;
            }
            if (this.state.index === 1) {
              console.log('review swipe');
              this.reviewRef &&
                this.reviewRef.getNode &&
                this.reviewRef.getNode().scrollToOffset({
                  offset: Math.min(PROFILEHEIGHT, this.state.lastScrollY),
                  animated: false,
                });
            } else if (this.state.index === 0) {
              console.log('post swipe');
              this.communityRef &&
                this.communityRef.getNode &&
                this.communityRef.getNode().scrollToOffset({
                  offset: Math.min(PROFILEHEIGHT, this.state.lastScrollY),
                  animated: false,
                });
            }
          }}
          onSwipeEnd={() => {
            this.setState({
              prevScrollY: Math.min(PROFILEHEIGHT, this.state.lastScrollY),
            });
          }}
          navigationState={{index: this.state.index, routes: this.state.routes}}
          renderScene={this.renderScene}
          onIndexChange={(index) => this.setState({index})}
          renderTabBar={this.renderTabBar}
          position={this.state.positionX}
        />
      </ContainerView>
    );
  }
}
