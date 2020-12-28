import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

const ContainerView = Styled.ScrollView`
flex: 1;
background: white;
`;

const TopBannerContainerView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('18%')}px;
margin-bottom: 8px;
background: #F6F6F6;
`;

const TopBannerImage = Styled.Image`
width: 100%;
height: 100%;
resizeMode: cover;
`;

const ContentContainerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
margin-top: 8px;
overflow: visible;
`;

const ContentTitleText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 32px;
margin: 16px;
`;

const TabPreviewFlatList = Styled.FlatList`
width: ${wp('100%')}px;
height: ${hp('26%')}px;
overflow: visible;
`;

const TabPreviewItemView = Styled.View`
width: ${wp('75%')}px;
height: ${hp('26%')}px;
margin-left: 16px;
border-radius: 8px;
background: white;
box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
`;

const HospitalListContainerView = Styled.View`
width: 100%;
height: auto;
flex-direction: row;
flex-wrap: wrap;

`;
const HospitalItemContainerView = Styled.View`
width: ${wp('50%')}px;
height: ${hp('23%')}px;
margin-bottom: 24px;
overflow: visible;
`;

const HospitalItemImageView = Styled.View`
width: 100%;
height: ${hp('16%')}px;
border-radius: 8px;
background: white;
box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.05);
overflow: visible;
`;

const HospitalItemCaptionView = Styled.View`
flex: 1;
margin-top: 8px;
`;

const HospitalItemLocationText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 16px;
color: #808080;
margin-bottom: 4px;
`;

const HospitalItemNameText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
`;

interface Props {}

const CommunityHomeScreen = () => {
  const hospitalList = [0, 1, 2];
  const renderTabPreviewItem = ({item, index}: any) => (
    <TabPreviewItemView></TabPreviewItemView>
  );

  const renderTabPreviewFooter = () => (
    <View
      style={{
        width: wp('25%') - 16,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>더보기</Text>
    </View>
  );

  const renderHospitalItem = (item: any, index: number) => (
    <HospitalItemContainerView
      style={{
        paddingLeft: index % 2 === 0 ? 16 : 6,
        paddingRight: index % 2 === 0 ? 6 : 16,
      }}>
      <HospitalItemImageView />
      <HospitalItemCaptionView>
        <HospitalItemLocationText>{'이의동'}</HospitalItemLocationText>
        <HospitalItemNameText>{'이가편한치과'}</HospitalItemNameText>
      </HospitalItemCaptionView>
    </HospitalItemContainerView>
  );
  return (
    <ContainerView showsVerticalScrollIndicator={false}>
      <TopBannerContainerView>
        <TopBannerImage
          source={require('~/Assets/Images/Netflix-new-logo.jpg')}
        />
      </TopBannerContainerView>
      <ContentContainerView>
        <ContentTitleText>{'질문방'}</ContentTitleText>
        <TabPreviewFlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={wp('75%') + 16}
          decelerationRate={'fast'}
          data={[0, 1, 2]}
          ListFooterComponent={renderTabPreviewFooter()}
          renderItem={renderTabPreviewItem}
        />
      </ContentContainerView>
      <ContentContainerView>
        <ContentTitleText>{'자유수다'}</ContentTitleText>
        <TabPreviewFlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={wp('75%') + 16}
          decelerationRate={'fast'}
          data={[0, 1, 2]}
          ListFooterComponent={renderTabPreviewFooter()}
          renderItem={renderTabPreviewItem}
        />
      </ContentContainerView>
      <ContentContainerView>
        <ContentTitleText>{'내 근처 병원소식'}</ContentTitleText>
        <HospitalListContainerView>
          {hospitalList.map(renderHospitalItem)}
        </HospitalListContainerView>
      </ContentContainerView>
    </ContainerView>
  );
};

export default CommunityHomeScreen;
