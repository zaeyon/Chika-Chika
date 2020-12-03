import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import PostItem from '../../../Presentational/PostItem';
const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

const BodyContainerFlatList = Styled(FlatList as new () => FlatList)`
flex: 1;
`;
interface Props {
  navigation: any;
  route: any;
}

const data = {
  user: {
    profile_image:
      'https://i.pinimg.com/564x/25/cd/bf/25cdbfb4c026ab04e3754ae707a4c7eb.jpg',
    nickname: '전윤정',
  },
  createdAt: '2020-10-22',
  tagList: ['임플란트', '충치'],
  rating: 3.5,
  location: '서울시 강남구',
  treat_date: '2020.09.24',
  category: '전체',
  mediaFiles: [
    {
      image_uri: 'https://fimg4.pann.com/new/download.jsp?FileID=49691685',
    },
    {
      image_uri: 'https://fimg4.pann.com/new/download.jsp?FileID=49691687',
    },
    {
      image_uri: 'https://fimg4.pann.com/new/download.jsp?FileID=49691693',
    },
  ],

  paragraph:
    '안녕하세욤 교정 한달 경과 후기에요!                                               +) 가격은 댓글보다 쪽지 먼저 주시면 바로 답해드릴게요.',
  likes: [
    {
      commentId: 1,
      user: {
        profile_image:
          'http://imgmmw.mbn.co.kr/storage/news/2019/08/13/3274f4fbbaa2020ff9d1fb706be99787.jpg',
        nickname: '메렁메렁',
      },
      comment: '잘 되셨네요ㅜㅜㅜㅜ 얼마에 하셨나요? 쪽지 부탁드려요.',
      createdAt: '2020-10-21',
      replys: [],
    },
    {
      commentId: 2,
      user: {
        profile_image:
          'http://imgmmw.mbn.co.kr/storage/news/2019/08/13/3274f4fbbaa2020ff9d1fb706be99787.jpg',
        nickname: '메렁메렁',
      },
      comment: '잘 되셨네요ㅜㅜㅜㅜ 얼마에 하셨나요? 쪽지 부탁드려요.',
      createdAt: '2020-10-21',
      replys: [],
    },
    {
      commentId: 1,
      user: {
        profile_image:
          'http://imgmmw.mbn.co.kr/storage/news/2019/08/13/3274f4fbbaa2020ff9d1fb706be99787.jpg',
        nickname: '메렁메렁',
      },
      comment: '잘 되셨네요ㅜㅜㅜㅜ 얼마에 하셨나요? 쪽지 부탁드려요.',
      createdAt: '2020-10-21',
      replys: [],
    },
    {
      commentId: 2,
      user: {
        profile_image:
          'http://imgmmw.mbn.co.kr/storage/news/2019/08/13/3274f4fbbaa2020ff9d1fb706be99787.jpg',
        nickname: '메렁메렁',
      },
      comment: '잘 되셨네요ㅜㅜㅜㅜ 얼마에 하셨나요? 쪽지 부탁드려요.',
      createdAt: '2020-10-21',
      replys: [],
    },
  ],
  comments: [
    {
      commentId: 1,
      user: {
        profile_image:
          'http://imgmmw.mbn.co.kr/storage/news/2019/08/13/3274f4fbbaa2020ff9d1fb706be99787.jpg',
        nickname: '메렁메렁',
      },
      comment: '잘 되셨네요ㅜㅜㅜㅜ 얼마에 하셨나요? 쪽지 부탁드려요.',
      createdAt: '2020-10-21',
      replys: [],
    },
    {
      commentId: 2,
      user: {
        profile_image:
          'http://imgmmw.mbn.co.kr/storage/news/2019/08/13/3274f4fbbaa2020ff9d1fb706be99787.jpg',
        nickname: '메렁메렁',
      },
      comment: '잘 되셨네요ㅜㅜㅜㅜ 얼마에 하셨나요? 쪽지 부탁드려요.',
      createdAt: '2020-10-21',
      replys: [],
    },
  ],
};

const HomeTabScreen = ({navigation, route}: Props) => {
  return (
    <ContainerView>
      <BodyContainerFlatList
        data={[1, 2, 3, 4, 5]}
        scrollIndicatorInsets={{
          bottom: getBottomSpace() ? wp('12%') : wp('15%'),
        }}
        contentContainerStyle={{
          paddingBottom: getBottomSpace() ? wp('12%') : wp('15%'),
        }}
        renderItem={({item, index}) => (
          <PostItem
            key={index}
            mode={'Card'}
            navigation={navigation}
            data={Object.assign({}, data)}
          />
        )}></BodyContainerFlatList>
    </ContainerView>
  );
};

export default HomeTabScreen;
