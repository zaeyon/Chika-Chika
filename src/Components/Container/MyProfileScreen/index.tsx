import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Platform, Linking, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
import {useSelector} from 'react-redux';
import {hasNotch} from '~/method/deviceInfo';
//Local Component
//Routes
const ContainerView = Styled.View`
flex: 1;
background: #FFFFFF;
padding-bottom: ${
  Platform.OS === 'ios' ? (hasNotch() ? hp('10.59%') : hp('7.2%')) : hp('7.2%')
}
`;

const HeaderContainerView = Styled.View`
width: ${wp('100%')}px;
flex-direction: row;
padding: 20px 16px 15px 16px;
align-items: flex-start;
background: #FFFFFF;
border-bottom-width: 0.5px;
border-color: #F5F7F9;
`;

const HeaderNicknameText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 30px;
color: #131F3C;
`;

const BodyScrollView = Styled.ScrollView`
flex: 1;
background: #FFFFFF
`;

const ProfileContainerView = Styled.View`
width: 100%;
padding: 13px 16px;
flex-direction: row;
background: #FFFFFF;
`;

const ProfileImage = Styled.Image`
width: 77px;
height: 77px;
resize-mode: contain;
border-width: 0.5px;
border-color: #A6A8AC;
border-radius: 100px;
`;

const ProfileContentView = Styled.View`
margin-left: 20px;
justify-content: center;
`;

const ProfileTitleText = Styled.Text`
font-weight: 800;
font-size: 22px;
line-height: 24px;
color: #000000;
`;

const ProfileSubTitleView = Styled.View`
flex-direction: row;
align-items: center;
margin-top: 8px;
`
const ProfileSubTitleText = Styled.Text`
font-weight: normal;
font-size: 16px;
line-height: 24px;
color: #000000;
`;

const SectionContainerView = Styled.View`
background: #FFFFFF;
`;

const SectionTitleText = Styled.Text`
font-style: normal;
font-weight: 800;
font-size: 16px;
line-height: 24px;
color: #131F3C;
margin: 16px 16px;
`;

const SectionContentView = Styled.View`
width: 100%;
padding: 16px 16px;
background: #FFFFFF;
flex-direction: row;
align-items: center;
`;

const SectionContentText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
`;

const SectionLineView = Styled.View`
width: auto;
margin: 0px 16px;
height: 0.5px;
background: #E2E6ED
`;

const SectionPartitionView = Styled.View`
width: 100%;
height: 8px;
background: #F5F7F9;
`

const SectionImage = Styled.Image`
margin-left: auto;
`;

interface Props {
  navigation: any;
  route: any;
}

const MyProfileScreen = ({navigation, route}: Props) => {
  const [sectionArrow, setSectionArrow] = useState(
    require('~/Assets/Images/MyPage/EditProfile/Section/profile_edit_section_arrow.png'),
  );
  const profile = useSelector((state: any) => state.currentUser.profile);

  const myActivitys = [
    {title: '찜한 병원', component: 'SavedHospitalTabScreen'},
    {title: '예약피드', component: 'ReservationTabScreen'},
    {title: '작성한 글', component: 'MyPostsTabScreen'},
  ];
  const myInterests = [
    {title: '스크랩한 글', component: 'ScrapedPostsTabScreen'},
    {title: '좋아요한 글', component: 'LikedPostsTabScreen'},
    {title: '댓글단 글', component: 'CommentedPostsTabScreen'},
  ];
  const generals = [
    {title: '설정', component: 'GeneralSettingTabScreen'},
    {title: '약관 및 정책', component: 'TermsAndPoliciesTabScreen'},
    {title: '이메일 문의', component: ''},
    {title: '버전정보', component: null, version: 'V.1.0.7'},
  ];

  const openEmail = useCallback(() => {
    Linking.openURL(
      `mailto:chikachikaapp@gmail.com?subject=이메일 문의&body=치카치카 앱 이용중 불편한점이나 개선할점을 작성해주세요.\n작성자 닉네임: ${profile.nickname}`,
    );
  }, []);

  const renderSection = ({sectionTitle, sectionItems}: any) => (
    <SectionContainerView>
      {sectionTitle ? (
        <SectionTitleText>{sectionTitle}</SectionTitleText>
      ) : null}
      {sectionItems.map((item: any, index: number) => (
        <>
          {index === 0 ? null : <SectionLineView />}
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor="black"
            onPress={
              item.title === '이메일 문의'
                ? () => openEmail()
                : () => navigation.navigate(item.component)
            }>
            <SectionContentView>
              <SectionContentText>{item.title}</SectionContentText>
              {item.version ? <SectionContentText style={{marginLeft: 'auto'}}>{item.version}</SectionContentText> : <SectionImage source={sectionArrow} />}
            </SectionContentView>
          </TouchableHighlight>
        </>
      ))}
    </SectionContainerView>
  );

  return (
    <ContainerView as={SafeAreaView}>
      <HeaderContainerView>
        <HeaderNicknameText>{'마이페이지'}</HeaderNicknameText>
      </HeaderContainerView>
      <BodyScrollView>
        <ProfileContainerView>
          <ProfileImage
            source={
              profile.profileImg
                ? {
                    uri: profile.img_thumbNail || profile.profileImg,
                    cache: 'force-cache',
                  }
                : require('~/Assets/Images/MyPage/default_profileImg.png')
            }
          />
          <ProfileContentView>
            <ProfileTitleText>{profile.nickname}</ProfileTitleText>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('EditProfileStackScreen')}>
            <ProfileSubTitleView>
            <ProfileSubTitleText>{'내 정보 수정'}</ProfileSubTitleText>
            <SectionImage source={sectionArrow} />
            </ProfileSubTitleView>
            </TouchableWithoutFeedback>
          </ProfileContentView>
        </ProfileContainerView>
        <SectionPartitionView/>
        {renderSection({
          sectionTitle: '나의 활동',
          sectionItems: myActivitys,
        })}
        <SectionPartitionView/>
        {renderSection({
          sectionTitle: '나의 관심 글',
          sectionItems: myInterests,
        })}
        <SectionPartitionView/>
        {renderSection({
          sectionTitle: null,
          sectionItems: generals,
        })}
      </BodyScrollView>
    </ContainerView>
  );
};

export default MyProfileScreen;
