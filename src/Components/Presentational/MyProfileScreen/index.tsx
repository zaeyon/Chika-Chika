import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Animated,
  LayoutAnimation,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Swiper from 'react-native-swiper';
import ReAnimated from 'react-native-reanimated';
//Local Component
import PostItem from '~/Components/Presentational/PostItem';
import ReviewItem from '~/Components/Presentational/ReviewItem';

const HEADERHEIGHT = hp('8.25%');
const PROFILEHEIGHT = 88;

const AnimatedFlatList = ReAnimated.createAnimatedComponent(FlatList);

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
width: 40px;
height: 40px;
margin-left: 16px;
background: grey;
border-radius: 8px;
`;

const FloatingView = Styled(ReAnimated.View as new () => ReAnimated.View)`
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
  moveToAnotherProfile: any;
  moveToFullImages: any;
}

interface State {
  scrollX: Animated.Value;
  currentScrollY: ReAnimated.Value<number>;
  currentIndex: number;
  isModalVisible: boolean;
}

interface User {
  userId: string;
  userNickname: string;
  userProfileImg: string;
  jwtToken: string;
  phoneNumber: string;
}

export default class MyProfile extends React.Component<Props, State> {
  minusValue: ReAnimated.Value<-1>;
  headerHeightValue: ReAnimated.Value<number>;
  swiperRef: any;
  reviewRef: any;
  communityRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      scrollX: new Animated.Value(0),
      currentScrollY: new ReAnimated.Value(),
      currentIndex: 0,
      isModalVisible: false,
    };
    this.minusValue = new ReAnimated.Value(-1);
    this.headerHeightValue = new ReAnimated.Value(
      HEADERHEIGHT + getStatusBarHeight() + 1,
    );
    this.scrollToIndex = this.scrollToIndex.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  setCurrentIndex = (index: number) => {
    this.setState({
      currentIndex: index,
    });
  };

  scrollToIndex = (index: number) => {
    if (this.swiperRef) {
      this.swiperRef.scrollTo(index);
    }
  };

  closeModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  onRefresh = () => {};

  renderPost = ({item, index}: any) => (
    <PostItem
      moveToCommunityDetail={this.props.moveToCommunityDetail}
      moveToAnotherProfile={this.props.moveToAnotherProfile}
      moveToFullImages={this.props.moveToFullImages}
      data={item}
    />
  );

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

  render() {
    return (
      <ContainerView>
        <HeaderContainerView>
          <HeaderNicknameText>
            {this.props.currentUser.userNickname}
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
                translateY: ReAnimated.multiply(
                  this.minusValue,
                  ReAnimated.min(
                    this.headerHeightValue,
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
                  source={require('~/Assets/Images/appIcon_chika.png')}
                />
              </ProfileImageView>
              <ProfileReservationTouchableOpacity>
                <ProfileReservationTitleText>
                  {'예약피드'}
                </ProfileReservationTitleText>
                <ProfileReservationText>{'1개'}</ProfileReservationText>
              </ProfileReservationTouchableOpacity>
              <ProfileReservationTouchableOpacity>
                <ProfileReservationTitleText>
                  {'찜한병원'}
                </ProfileReservationTitleText>
                <ProfileReservationText>{'3개'}</ProfileReservationText>
              </ProfileReservationTouchableOpacity>
            </ProfileContentView>
          </ProfileContainerView>
          <TabBarConatiner>
            <TabBarItemTouchableOpacity onPress={() => this.scrollToIndex(0)}>
              <Animated.Text
                style={{
                  fontFamily: 'NanumSquare',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: 14,
                  lineHeight: 16,
                  color: this.state.scrollX.interpolate({
                    inputRange: [0, wp('100%')],
                    outputRange: ['#2998FF', '#C4C4C4'],
                  }),
                }}>{`내가 쓴 후기`}</Animated.Text>
            </TabBarItemTouchableOpacity>
            <TabBarItemTouchableOpacity onPress={() => this.scrollToIndex(1)}>
              <Animated.Text
                style={{
                  fontFamily: 'NanumSquare',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: 14,
                  lineHeight: 16,
                  color: this.state.scrollX.interpolate({
                    inputRange: [0, wp('100%')],
                    outputRange: ['#C4C4C4', '#2998FF'],
                  }),
                }}>{`내가 쓴 수다글`}</Animated.Text>
            </TabBarItemTouchableOpacity>
            <Animated.View
              style={{
                width: wp('50%') - 32,
                height: 3,
                position: 'absolute',
                bottom: 0,
                left: 16,
                backgroundColor: '#2998FF',
                transform: [
                  {
                    translateX: this.state.scrollX.interpolate({
                      inputRange: [0, wp('100%')],
                      outputRange: [0, wp('50%')],
                    }),
                  },
                ],
              }}
            />
          </TabBarConatiner>
        </FloatingView>
        <Swiper
          ref={(ref) => (this.swiperRef = ref)}
          loop={false}
          showsPagination={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.state.scrollX,
                  },
                },
              },
            ],
            {
              useNativeDriver: false,
            },
          )}>
          <AnimatedFlatList
            style={{
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
            onScroll={ReAnimated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: (y: number) =>
                        ReAnimated.block([
                          ReAnimated.set(this.state.currentScrollY, y),
                          ReAnimated.call([y], ([offsetY]) => {
                            if (this.state.scrollX._value === 0) {
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
          <AnimatedFlatList
            style={{
              flex: 1,
              marginBottom: hp('9.6%'),
            }}
            contentContainerStyle={{
              minHeight: hp('100%') - PROFILEHEIGHT + getStatusBarHeight() - 1,
              paddingTop: HEADERHEIGHT + getStatusBarHeight() + 1 + hp('7%'),
            }}
            ref={(ref: any) => (this.communityRef = ref)}
            scrollEventThrottle={16}
            scrollIndicatorInsets={{
              top: PROFILEHEIGHT + hp('7%'),
            }}
            onScroll={ReAnimated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: (y: number) =>
                        ReAnimated.block([
                          ReAnimated.set(this.state.currentScrollY, y),
                          ReAnimated.call([y], ([offsetY]) => {
                            if (this.state.scrollX._value === wp('100%')) {
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
            refreshControl={
              <RefreshControl
                refreshing={this.props.isRefreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
          />
        </Swiper>
      </ContainerView>
    );
  }
}

// import React, {useState, useEffect} from 'react';
// import Styled from 'styled-components/native';
// import {TouchableWithoutFeedback, TouchableOpacity, View} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// const ContainerView = Styled.SafeAreaView`
//  flex: 1;
//  background-color: #FFFFFF;
// `;

// const ProfileContainerView = Styled.View`
// width: ${wp('100%')}px;
// height: ${hp('12.8%')}px
// margin-top: 24px;
// padding: 18px 16px;
// flex-direction: row;
// `;

// const ProfileImageView = Styled.View`
// `;
// const ProfileImage = Styled.Image`
// background: grey;
// border-radius: 100px;
// `;

// const ProfileInfoView = Styled.View`
// justify-content: center;
// margin: 0px 16px;
// `;

// const ProfileNameText = Styled.Text`
// font-weight: bold;
// font-size: 16px;
// line-height: 24px;
// `;

// const ProfileLocationText = Styled.Text`
// font-size: 14px;
// line-height: 24px;
// color: #7A7A7A
// `;

// const EditProfileTouchableOpacity = Styled(
//   TouchableOpacity as new () => TouchableOpacity,
// )`
// background: #EEEEEE;
// border-radius: 100px;
// width: ${wp('14.66%')}px;
// margin: auto 0px auto auto;
// padding: 2px 16px;
// align-items: center;
// `;

// const EditProfileText = Styled.Text`
// font-size: 12px;
// line-height: 24px;
// color: #7A7A7A;
// `;

// const Line = Styled.View`
// margin: 0px 16px;
// height: 1px;
// background: #EEEEEE;
// `;

// const ContentContainerView = Styled.View`
// width: ${wp('100%')}px;
// flex: 1;

// padding: 16px 0px;
// `;

// const HorizontalListView = Styled.View`
// width: 100%
// height: ${hp('10.1%')}px;
// padding: 8px 16px;
// flex-direction: row;
// justify-content: space-around;
// `;

// const HorizontalContentItemView = Styled.View`
// width: ${wp('14.13%')}px
// height: 100%;
// align-items: center;
// `;

// const HorizontalContentImageView = Styled.View`
// width: 100%;
// padding: 0px 6px 8px 6px;
// `;

// const HorizontalContentImage = Styled.Image`
// width: 100%;
// height: 100%;
// border-color: black;
// border-width: 1px;
// border-radius: 100px;
// `;

// const HorizontalContentText = Styled.Text`
// font-weight: 200;
// font-size: 14px;
// line-height: 17px;
// `;

// const VerticalListView = Styled.View`
// width: 100%;
// padding: 20px 0px;
// `;

// const VerticalContentItemTouchableOpacity = Styled(
//   TouchableOpacity as new () => TouchableOpacity,
// )`
// width: 100%;
// height: ${hp('7.881%')}px
// flex-direction: row;
// align-items: center;
// padding: 16px;
// `;

// const VerticalContentText = Styled.Text`
// font-weight: bold;
// font-size: 16px;
// line-height: 19px;`;

// const VerticalContentBackIconView = Styled.View`
// height: 100%;
// margin-left: auto;
// justify-content: center;
// `;
// const VerticalContentBackIcon = Styled.Image`

// `;

// interface Props {
//   navigation: any;
//   route: any;
// }

// const MyProfile = ({navigation, route}: Props) => {
//   return (
//     <ContainerView>
//       <ProfileContainerView>
//         <ProfileImageView
//           style={{
//             height: '100%',
//             aspectRatio: 1,
//           }}>
//           <ProfileImage
//             source={require('~/Assets/Images/appIcon_chika.png')}
//             style={{
//               width: '100%',
//               height: '100%',
//               resizeMode: 'contain',
//             }}
//           />
//         </ProfileImageView>
//         <ProfileInfoView>
//           <ProfileNameText>익명의쿼카</ProfileNameText>
//           <ProfileLocationText>이의동</ProfileLocationText>
//         </ProfileInfoView>
//         <EditProfileTouchableOpacity
//           activeOpacity={0.5}
//           onPress={() => {
//             navigation.navigate('EditProfileTabScreen');
//           }}>
//           <EditProfileText>수정</EditProfileText>
//         </EditProfileTouchableOpacity>
//       </ProfileContainerView>
//       <HorizontalListView>
//         <TouchableWithoutFeedback
//           onPress={() => {
//             navigation.navigate('AlertSettingTabScreen');
//           }}>
//           <HorizontalContentItemView>
//             <HorizontalContentImageView
//               style={{
//                 aspectRatio: 1,
//               }}>
//               <HorizontalContentImage
//                 style={{
//                   resizeMode: 'contain',
//                 }}
//                 source={require('~/Assets/Images/Indicator/ic_like.png')}
//               />
//             </HorizontalContentImageView>
//             <HorizontalContentText>알림설정</HorizontalContentText>
//           </HorizontalContentItemView>
//         </TouchableWithoutFeedback>
//         <TouchableWithoutFeedback
//           onPress={() => {
//             navigation.navigate('ReservationTabScreen');
//           }}>
//           <HorizontalContentItemView>
//             <HorizontalContentImageView
//               style={{
//                 aspectRatio: 1,
//               }}>
//               <HorizontalContentImage
//                 style={{
//                   resizeMode: 'contain',
//                 }}
//                 source={require('~/Assets/Images/Indicator/ic_like.png')}
//               />
//             </HorizontalContentImageView>
//             <HorizontalContentText>예약피드</HorizontalContentText>
//           </HorizontalContentItemView>
//         </TouchableWithoutFeedback>
//         <TouchableWithoutFeedback
//           onPress={() => {
//             navigation.navigate('ActivityHistoryTabScreen');
//           }}>
//           <HorizontalContentItemView>
//             <HorizontalContentImageView
//               style={{
//                 aspectRatio: 1,
//               }}>
//               <HorizontalContentImage
//                 style={{
//                   resizeMode: 'contain',
//                 }}
//                 source={require('~/Assets/Images/Indicator/ic_like.png')}
//               />
//             </HorizontalContentImageView>
//             <HorizontalContentText>활동기록</HorizontalContentText>
//           </HorizontalContentItemView>
//         </TouchableWithoutFeedback>
//         <TouchableWithoutFeedback
//           onPress={() => {
//             navigation.navigate('SavedHospitalTabScreen');
//           }}>
//           <HorizontalContentItemView>
//             <HorizontalContentImageView
//               style={{
//                 aspectRatio: 1,
//               }}>
//               <HorizontalContentImage
//                 style={{
//                   resizeMode: 'contain',
//                 }}
//                 source={require('~/Assets/Images/Indicator/ic_like.png')}
//               />
//             </HorizontalContentImageView>
//             <HorizontalContentText>찜한병원</HorizontalContentText>
//           </HorizontalContentItemView>
//         </TouchableWithoutFeedback>
//       </HorizontalListView>
//       <ContentContainerView>
//         <Line />
//         <VerticalListView>
//           <VerticalContentItemTouchableOpacity>
//             <VerticalContentText>내 동네 설정</VerticalContentText>
//             <VerticalContentBackIconView>
//               <VerticalContentBackIcon
//                 style={{
//                   resizeMode: 'contain',
//                 }}
//                 source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
//               />
//             </VerticalContentBackIconView>
//           </VerticalContentItemTouchableOpacity>
//           <VerticalContentItemTouchableOpacity>
//             <VerticalContentText>이메일 상담</VerticalContentText>
//             <VerticalContentBackIconView>
//               <VerticalContentBackIcon
//                 style={{
//                   resizeMode: 'contain',
//                 }}
//                 source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
//               />
//             </VerticalContentBackIconView>
//           </VerticalContentItemTouchableOpacity>
//           <VerticalContentItemTouchableOpacity
//             onPress={() => {
//               navigation.navigate('GeneralSettingTabScreen');
//             }}>
//             <VerticalContentText>설정</VerticalContentText>
//             <VerticalContentBackIconView>
//               <VerticalContentBackIcon
//                 style={{
//                   resizeMode: 'contain',
//                 }}
//                 source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
//               />
//             </VerticalContentBackIconView>
//           </VerticalContentItemTouchableOpacity>
//         </VerticalListView>
//         <Line />
//         <VerticalListView>
//           <VerticalContentItemTouchableOpacity>
//             <VerticalContentText>버전정보</VerticalContentText>
//             <VerticalContentText
//               style={{
//                 marginLeft: 'auto',
//                 color: '#7A7A7A',
//               }}>
//               V.8.2.3
//             </VerticalContentText>
//           </VerticalContentItemTouchableOpacity>
//         </VerticalListView>
//       </ContentContainerView>
//     </ContainerView>
//   );
// };
