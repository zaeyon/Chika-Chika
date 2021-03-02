import React, {useEffect, useCallback, useState} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Routes
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';
import GETLocalClinics from '~/Routes/Dental/GETLocalClinics';
const ContainerView = Styled.View`
flex: 1;
padding: 0px 16px;
`;

const PlaceholderTitleView = Styled.View`
padding: 32px 0px;
justify-content: center;
align-items: center;
`;

const PlaceholderTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 16px;

`;

const LocalHospitalInfoView = Styled.View`
background: #FFFFFF;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
border-radius: 8px;
padding: 16px;
flex-direction: row;
align-items: center;
margin-bottom: 16px;
`;

const LocalHospitalImage = Styled.Image`
margin-right: 8px;`;

const HighlightContainerView = Styled.View`
flex-direction: row;
`;

const HighlightView = Styled.View`
width: 100%;
position: absolute;
bottom: 3px;
background: #DAECFE;
height: 12px;
z-index: -1;
`;

const LocalHospitalText = Styled.Text`
font-style: normal;
font-weight: 800;
font-size: 16px;
line-height: 24px;
`;

const LocalIndicatorView = Styled.View`
padding: 4px 16px;
background: #131F3C;
border-radius: 100px;
justify-content: center;
align-items: center;
flex-direction: row;
margin-left: auto;
`;

const LocalIndicatorImage = Styled.Image`
margin-right: 4px;
`;

const LocalIndicatorText = Styled.Text`
font-style: normal;
font-weight: 800;
font-size: 13px;
line-height: 24px;
color: #FFFFFF;
`;

const LocalCommunityInfoView = Styled.View`
padding: 12px 16px;
background: #FFFFFF;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
border-radius: 8px;
margin-bottom: 16px;
`;

const LocalCommunityTitleText = Styled.Text`
margin: 12px 0px;
font-style: normal;
font-weight: 800;
font-size: 18px;
line-height: 24px;
color: #131F3C;
`;

const LocalCommunityItemContainerView = Styled.View`
flex-direction: row;
justify-content: space-between;
`;
const LocalCommunityItemView = Styled.View`
width: ${wp('41%')}px;
height: auto;
margin: 12px 0px;
`;

const LocalCommunityItemImage = Styled.Image`
width: 100%;
height: ${wp('32%')}px;
background: #F5F7F9;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 8px;
margin-bottom: 12px;
`;

const LocalCommunityItemImageSkeletonView = Styled.View`
width: ${wp('41%')}px;
height: ${wp('32%')}px;
background: #F5F7F9;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 8px;
margin-bottom: 12px;
`;

const LocalCommunityItemText = Styled.Text`
font-style: normal;
font-weight: 800;
font-size: 14px;
line-height: 16px;
color: #131F3C;
`;

const LocalCommunityItemTextSkeletonView = Styled.View`
width: 100%;
height: 16px;
background: #F5F7F9;
`;

const NavigatoinButtonView = Styled.View`
border: 1px #E2E6ED;
border-radius: 100px;
padding: 12px 0px;
justify-content: center;
align-items: center;
flex-direction: row;
margin: 12px 0px;
`;

const NavigatoinButtonText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
`;

const NavigatoinButtonImage = Styled.Image`
`;

const LocalClinicInfoView = Styled.View`
padding: 12px 16px;
background: #FFFFFF;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
border-radius: 8px;
margin-bottom: 16px;
`;

const LocalClinicTitleText = Styled.Text`
margin: 12px 0px;
font-style: normal;
font-weight: 800;
font-size: 18px;
line-height: 24px;
color: #131F3C;
`;

const LocalClinicItemView = Styled.View`
padding: 12px 0px;
flex-direction: row;
align-items: center;
`;

const LocalClinicItemImage = Styled.Image`
width: 72px;
height: 72px;
background: #F5F7F9;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 100px;
margin-right: 12px;
`;

const LocalClinicItemImageSkeletonView = Styled.View`
width: 72px;
height: 72px;
background: #F5F7F9;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 100px;
margin-right: 12px;
`;
const LocalClinicContentView = Styled.View`

`;

const LocalClinicItemTitleText = Styled.Text`
font-style: normal;
font-weight: 800;
font-size: 16px;
line-height: 24px;
color: #131F3C;
`;

const LocalClinicItemTitleTextSkeletonView = Styled.View`
width: 160px;
height: 16px;
margin-bottom: 4px;
background: #F5F7F9`;

const LocalClinicItemText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 24px;
color: #9AA2A9;`;

const LocalClinicItemTextSkeletonView = Styled.View`
width: 80px;
height: 13px;
margin: 4px 0px;
background: #F5F7F9;
`;

const LocalClinicItemTagContainerView = Styled.View`
margin-top: 4px;
flex-direction: row;
`;

const LocalClinicItemTagView = Styled.View`
padding: 4px 8px;
align-items: center;
justify-content: center;
background: #F5F7F9;
border-radius: 4px;
`;

const LocalClinicItemTagText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
`;

const LocalClinicItemTagViewSkeletonView = Styled.View`
width: 90px;
height: 24px;
margin-top: 4px;
background: #F5F7F9;
border-radius: 4px;
`;

const BannerContainerView = Styled.View`
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
width: auto;
height: auto;
margin-bottom: 16px;
border-radius: 8px;
background: #FFFFFF;
`;

const BannerImage = Styled.Image`
width: auto;
border-radius: 8px;
`;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  navigation: any;
  title: string;
}

const PlaceholderContent = ({navigation, title}: Props) => {
  const [communityPost, setCommunityPost]: any = useState();
  const [localClinic, setLocalClinic]: any = useState();
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const profile = useSelector((state: any) => state.currentUser.profile);

  const selectedHometown = useSelector(
    (state: any) =>
      state.currentUser.hometown &&
      state.currentUser.hometown.find((item) => item.UsersCities?.now === true),
  );

  useEffect(() => {
    GETCommunityPosts(jwtToken, selectedHometown.id, {
      type: 'FreeTalk',
      limit: 2,
      offset: 0,
      order: 'createdAt',
      region: 'residence',
    }).then((response) => {
      setCommunityPost(response);
      console.log(response);
    });
    GETLocalClinics({jwtToken, limit: 2, offset: 0}).then((response) => {
      setLocalClinic(response);
    });
  }, [jwtToken, profile, selectedHometown]);

  const formatHashTag = useCallback((text: string, index: number) => {
    return (
      <LocalCommunityItemText
        style={{
          color: '#00D1FF',
        }}>
        {`#${text}`}
      </LocalCommunityItemText>
    );
  }, []);

  const formatDescription = useCallback((oldDescription: string) => {
    let formattedDescription: any[] = [];
    const lines = oldDescription.split(/\r\n|\r|\n/);
    for (let line of lines) {
      let formattedLine = [];
      const words = line.split(' ');
      for (let word of words) {
        if (
          word.charAt(0) === '{' &&
          word.charAt(1) === '{' &&
          word.charAt(word.length - 1) === '}' &&
          word.charAt(word.length - 2) === '}'
        ) {
          //isTag
          const formattedHashTag = formatHashTag(
            word.slice(2, word.length - 2),
            formattedLine.length,
          );
          formattedLine.push(formattedHashTag);
        } else {
          formattedLine.push(word);
        }
        if (words.indexOf(word) !== words.length - 1) {
          formattedLine.push(' ');
        }
      }
      if (lines.indexOf(line) !== lines.length - 1) {
        formattedDescription = formattedDescription.concat(
          formattedLine,
          '\r\n',
        );
      } else {
        formattedDescription = formattedDescription.concat(formattedLine);
      }
    }
    return formattedDescription;
    // let description = oldDescription.replace(/{{/gi, '#');
    // description = description.replace(/}}/gi, '');
    // return description;
  }, []);

  const moveToCommunity = useCallback(() => {
    navigation.goBack();
    navigation.navigate('수다방');
  }, []);

  const moveToCommunityDetail = useCallback(
    (postId: number, postType: string) => {
      navigation.goBack();
      navigation.navigate('CommunityStackScreen', {
        screen: 'CommunityDetailScreen',
        params: {id: postId, type: postType},
      });
    },
    [],
  );

  const renderLocalCommunityItem = useCallback(() => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
    );
    return communityPost.map((item: any) => (
      <TouchableWithoutFeedback
        key={String(item.id)}
        onPress={() => moveToCommunityDetail(item.id, item.type)}>
        <LocalCommunityItemView onLayout={(e) => console.log(e.nativeEvent)}>
          <LocalCommunityItemImage
            source={{
              uri: item.community_imgs[0]?.img_url,
            }}
          />
          <LocalCommunityItemText numberOfLines={1}>
            {formatDescription(item.description)}
          </LocalCommunityItemText>
        </LocalCommunityItemView>
      </TouchableWithoutFeedback>
    ));
  }, [communityPost]);

  const renderLocalCommunityItemSkeleton = useCallback(
    () => [
      <LocalCommunityItemView>
        <LocalCommunityItemImageSkeletonView />
        <LocalCommunityItemTextSkeletonView />
      </LocalCommunityItemView>,
      <LocalCommunityItemView>
        <LocalCommunityItemImageSkeletonView />
        <LocalCommunityItemTextSkeletonView />
      </LocalCommunityItemView>,
    ],
    [],
  );

  const renderLocalClinicItem = useCallback(() => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
    );
    return localClinic.map((item: any) => (
      <TouchableWithoutFeedback key={String(item.id)}>
        <LocalClinicItemView>
          <LocalClinicItemImage />
          <LocalClinicContentView>
            <LocalClinicItemTitleText>
              {item.originalName}
            </LocalClinicItemTitleText>
            <LocalClinicItemText>
              {item.reviewAVGStarRate
                ? `리뷰 ${item.reviewAVGStarRate}(${item.reviewNum})`
                : '리뷰가 아직 없어요.'}
            </LocalClinicItemText>
            <LocalClinicItemTagContainerView>
              {item.dentalTransparent ? (
                <LocalClinicItemTagView>
                  <LocalClinicItemTagText>
                    {`우리동네좋은치과`}
                  </LocalClinicItemTagText>
                </LocalClinicItemTagView>
              ) : null}
              {item.surgeonNum > 0 ? (
                <LocalClinicItemTagView>
                  <LocalClinicItemTagText>
                    {`전문의 ${item.surgeonNum}명`}
                  </LocalClinicItemTagText>
                </LocalClinicItemTagView>
              ) : null}
            </LocalClinicItemTagContainerView>
          </LocalClinicContentView>
        </LocalClinicItemView>
      </TouchableWithoutFeedback>
    ));
  }, [localClinic]);

  const renderLocalClinicItemSkeleton = useCallback(
    () => [
      <LocalClinicItemView>
        <LocalClinicItemImageSkeletonView />
        <LocalClinicContentView>
          <LocalClinicItemTitleTextSkeletonView />
          <LocalClinicItemTextSkeletonView />
          <LocalClinicItemTagViewSkeletonView />
        </LocalClinicContentView>
      </LocalClinicItemView>,
      <LocalClinicItemView>
        <LocalClinicItemImageSkeletonView />
        <LocalClinicContentView>
          <LocalClinicItemTitleTextSkeletonView />
          <LocalClinicItemTextSkeletonView />
          <LocalClinicItemTagViewSkeletonView />
        </LocalClinicContentView>
      </LocalClinicItemView>,
    ],
    [],
  );
  return (
    <ContainerView>
      <PlaceholderTitleView>
        <PlaceholderTitleText>{title}</PlaceholderTitleText>
      </PlaceholderTitleView>
      <LocalHospitalInfoView>
        <LocalHospitalImage
          source={require('~/Assets/Images/DentalClinic/common/gan/hospital.png')}
        />
        <HighlightContainerView>
          <LocalHospitalText>{`우리동네 치과`}</LocalHospitalText>
          <HighlightView />
        </HighlightContainerView>
        <LocalHospitalText>{` 확인하기`}</LocalHospitalText>
        <LocalIndicatorView>
          <LocalIndicatorImage
            source={require('~/Assets/Images/Map/pick/target_white.png')}
          />
          <LocalIndicatorText>{selectedHometown.emdName}</LocalIndicatorText>
        </LocalIndicatorView>
      </LocalHospitalInfoView>
      <LocalCommunityInfoView>
        <LocalCommunityTitleText>{'우리동네 수다글'}</LocalCommunityTitleText>
        <LocalCommunityItemContainerView>
          {communityPost
            ? renderLocalCommunityItem()
            : renderLocalCommunityItemSkeleton()}
        </LocalCommunityItemContainerView>
        <TouchableWithoutFeedback onPress={() => moveToCommunity()}>
          <NavigatoinButtonView>
            <NavigatoinButtonText>
              <NavigatoinButtonText
                style={{
                  color: '#00D1FF',
                }}>
                {'다른 글들도 '}
              </NavigatoinButtonText>
              {'궁금해요'}
            </NavigatoinButtonText>
            <NavigatoinButtonImage
              source={require('~/Assets/Images/Arrow/common/gan/button_right_arrow.png')}
            />
          </NavigatoinButtonView>
        </TouchableWithoutFeedback>
      </LocalCommunityInfoView>
      <LocalClinicInfoView>
        <LocalClinicTitleText>{'내 주변 치과'}</LocalClinicTitleText>
        {localClinic
          ? renderLocalClinicItem()
          : renderLocalClinicItemSkeleton()}
        <TouchableWithoutFeedback onPress={() => moveToCommunity()}>
          <NavigatoinButtonView>
            <NavigatoinButtonText>
              <NavigatoinButtonText
                style={{
                  color: '#00D1FF',
                }}>
                {'다른 병원도 '}
              </NavigatoinButtonText>
              {'궁금해요'}
            </NavigatoinButtonText>
            <NavigatoinButtonImage
              source={require('~/Assets/Images/Arrow/common/gan/button_right_arrow.png')}
            />
          </NavigatoinButtonView>
        </TouchableWithoutFeedback>
      </LocalClinicInfoView>
      <BannerContainerView>
        <BannerImage
          style={{
            resizeMode: 'contain',
          }}
          source={require('~/Assets/Images/Banner/banner_review_starbucks.png')}
        />
      </BannerContainerView>
    </ContainerView>
  );
};

export default PlaceholderContent;
