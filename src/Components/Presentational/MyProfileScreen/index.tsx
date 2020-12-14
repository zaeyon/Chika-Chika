import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

const ProfileContainerView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('12.8%')}px
margin-top: 27px;
padding: 18px 16px;
flex-direction: row;
`;

const ProfileImageView = Styled.View`
`;
const ProfileImage = Styled.Image`
background: grey;
border-radius: 100px;
`;

const ProfileInfoView = Styled.View`
justify-content: center;
margin: 0px 16px;
height: 100%
`;

const ProfileNameText = Styled.Text`
font-weight: bold;
font-size: 16px;
line-height: 24px;
margin-bottom: 4px;

`;

const ProfileLocationText = Styled.Text`
font-size: 14px;
line-height: 24px;
color: #7A7A7A
`;

const EditProfileTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
background: #EEEEEE;
border-radius: 100px;
width: ${wp('14.66%')}px;
margin: auto 0px auto auto;
padding: 2px 16px;
align-items: center;
`;

const EditProfileText = Styled.Text`
font-size: 12px;
line-height: 24px;
color: #7A7A7A;
`;

const Line = Styled.View`
margin: 0px 16px;
height: 1px;
background: #EEEEEE;
`;

const ContentContainerView = Styled.View`
width: ${wp('100%')}px;
flex: 1;

padding: 16px 0px;
`;

const HorizontalListView = Styled.View`
width: 100%
height: ${hp('10.1%')}px;
padding: 8px 16px;
flex-direction: row;
justify-content: space-around;
`;

const HorizontalContentItemView = Styled.View`
width: ${wp('14.13%')}px
height: 100%;
align-items: center;
`;

const HorizontalContentImageView = Styled.View`
width: 100%;
padding: 0px 6px 8px 6px;
`;

const HorizontalContentImage = Styled.Image`
width: 100%;
height: 100%;
border-color: black;
border-width: 1px;
border-radius: 100px;
`;

const HorizontalContentText = Styled.Text`
font-weight: 200;
font-size: 14px;
line-height: 17px;
`;

const VerticalListView = Styled.View`
width: 100%;
padding: 20px 0px;
`;

const VerticalContentItemTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 100%;
height: ${hp('7.881%')}px
flex-direction: row;
align-items: center;
padding: 16px;
`;

const VerticalContentText = Styled.Text`
font-weight: bold;
font-size: 16px;
line-height: 19px;`;

const VerticalContentBackIconView = Styled.View`
height: 100%;
margin-left: auto;
justify-content: center;
`;
const VerticalContentBackIcon = Styled.Image`

`;

interface Props {
  navigation: any;
  route: any;
}

const MyProfile = ({navigation, route}: Props) => {
  return (
    <ContainerView>
      <ProfileContainerView>
        <ProfileImageView
          style={{
            height: '100%',
            aspectRatio: 1,
          }}>
          <ProfileImage
            source={require('~/Assets/Images/appIcon_chika.png')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </ProfileImageView>
        <ProfileInfoView>
          <ProfileNameText>익명의쿼카</ProfileNameText>
          <ProfileLocationText>이의동</ProfileLocationText>
        </ProfileInfoView>
        <EditProfileTouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('EditProfileTabScreen');
          }}>
          <EditProfileText>수정</EditProfileText>
        </EditProfileTouchableOpacity>
      </ProfileContainerView>
      <HorizontalListView>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('AlertSettingTabScreen');
          }}>
          <HorizontalContentItemView>
            <HorizontalContentImageView
              style={{
                aspectRatio: 1,
              }}>
              <HorizontalContentImage
                style={{
                  resizeMode: 'contain',
                }}
                source={require('~/Assets/Images/Indicator/ic_like.png')}
              />
            </HorizontalContentImageView>
            <HorizontalContentText>알림설정</HorizontalContentText>
          </HorizontalContentItemView>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('ReservationTabScreen');
          }}>
          <HorizontalContentItemView>
            <HorizontalContentImageView
              style={{
                aspectRatio: 1,
              }}>
              <HorizontalContentImage
                style={{
                  resizeMode: 'contain',
                }}
                source={require('~/Assets/Images/Indicator/ic_like.png')}
              />
            </HorizontalContentImageView>
            <HorizontalContentText>예약피드</HorizontalContentText>
          </HorizontalContentItemView>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('ActivityHistoryTabScreen');
          }}>
          <HorizontalContentItemView>
            <HorizontalContentImageView
              style={{
                aspectRatio: 1,
              }}>
              <HorizontalContentImage
                style={{
                  resizeMode: 'contain',
                }}
                source={require('~/Assets/Images/Indicator/ic_like.png')}
              />
            </HorizontalContentImageView>
            <HorizontalContentText>활동기록</HorizontalContentText>
          </HorizontalContentItemView>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('SavedHospitalTabScreen');
          }}>
          <HorizontalContentItemView>
            <HorizontalContentImageView
              style={{
                aspectRatio: 1,
              }}>
              <HorizontalContentImage
                style={{
                  resizeMode: 'contain',
                }}
                source={require('~/Assets/Images/Indicator/ic_like.png')}
              />
            </HorizontalContentImageView>
            <HorizontalContentText>찜한병원</HorizontalContentText>
          </HorizontalContentItemView>
        </TouchableWithoutFeedback>
      </HorizontalListView>
      <ContentContainerView>
        <Line />
        <VerticalListView>
          <VerticalContentItemTouchableOpacity>
            <VerticalContentText>내 동네 설정</VerticalContentText>
            <VerticalContentBackIconView>
              <VerticalContentBackIcon
                style={{
                  resizeMode: 'contain',
                }}
                source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
              />
            </VerticalContentBackIconView>
          </VerticalContentItemTouchableOpacity>
          <VerticalContentItemTouchableOpacity>
            <VerticalContentText>이메일 상담</VerticalContentText>
            <VerticalContentBackIconView>
              <VerticalContentBackIcon
                style={{
                  resizeMode: 'contain',
                }}
                source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
              />
            </VerticalContentBackIconView>
          </VerticalContentItemTouchableOpacity>
          <VerticalContentItemTouchableOpacity
            onPress={() => {
              navigation.navigate('GeneralSettingTabScreen');
            }}>
            <VerticalContentText>설정</VerticalContentText>
            <VerticalContentBackIconView>
              <VerticalContentBackIcon
                style={{
                  resizeMode: 'contain',
                }}
                source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
              />
            </VerticalContentBackIconView>
          </VerticalContentItemTouchableOpacity>
        </VerticalListView>
        <Line />
        <VerticalListView>
          <VerticalContentItemTouchableOpacity>
            <VerticalContentText>버전정보</VerticalContentText>
            <VerticalContentText
              style={{
                marginLeft: 'auto',
                color: '#7A7A7A',
              }}>
              V.8.2.3
            </VerticalContentText>
          </VerticalContentItemTouchableOpacity>
        </VerticalListView>
      </ContentContainerView>
    </ContainerView>
  );
};

export default MyProfile;
