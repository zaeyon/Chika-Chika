import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Component
import PostCardItem from '~/Components/Presentational/PostCardItem';
import PostItem from '~/Components/Presentational/PostItem';


const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('11.7%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;


const HeaderLeftContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderHamburgerIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
 
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const BodyContainer = Styled.ScrollView`
`;

const PostCardListContainer = Styled.View`
padding-top: 24px;
padding-bottom: 24px;
`;

const PostCardListHeaderText = Styled.Text`
padding-left: 16px;
padding-right: 16px;
font-weight: bold;
font-size: 16px;
color: #000000;
`;

const PostCardItemContainer = Styled.View`
margin-right: 8px;
`;

const PostListContainer = Styled.View`
padding-top: 5px;
padding-bottom: 24px;
`;

const PostItemContainer = Styled.View`
`;

const PostListHeaderText = Styled.Text`
padding-left: 16px;
padding-right: 16px;
font-weight: bold;
font-size: 16px;
color: #000000;
`;



const TEST_POST_DATA = [
{
    user: {
        profileImageUri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg",
        nickname: "테스트1"
    },
    category: "교정질문",
    createdAt: "2020-10-29",
    tagList: ["교정붓기", "교정고무줄", "교정"],
    description: "교정 고무줄을 삼켜버렸어요... 어떻게 하면 좋을까요?",
    likeCount: 12,
    commentCount: 9,
},
{
    user: {
        profileImageUri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg",
        nickname: "테스트1"
    },
    category: "교정질문",
    createdAt: "2020-10-29",
    tagList: ["교정붓기", "교정고무줄", "교정"],
    description: "교정 고무줄을 삼켜버렸어요... 어떻게 하면 좋을까요?",
    likeCount: 12,
    commentCount: 9,
},
{
    user: {
        profileImageUri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg",
        nickname: "테스트1"
    },
    category: "교정질문",
    createdAt: "2020-10-29",
    tagList: ["교정붓기", "교정고무줄", "교정"],
    description: "교정 고무줄을 삼켜버렸어요... 어떻게 하면 좋을까요?",
    likeCount: 12,
    commentCount: 9,
},
{
    user: {
        profileImageUri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg",
        nickname: "테스트1"
    },
    category: "교정질문",
    createdAt: "2020-10-29",
    tagList: ["교정붓기", "교정고무줄", "충치치료"],
    description: "교정 고무줄을 삼켜버렸어요... 어떻게 하면 좋을까요?",
    likeCount: 12,
    commentCount: 9,
}
]

interface Props {
    navigation: any,
    route: any,
}

const CommunityScreen = ({navigation, route}: Props) => {

    const renderPostCardItem = ({item, index}: any) => {
        return (
          <PostCardItemContainer style={index == 0 ? {marginLeft: 16} : (index == TEST_POST_DATA.length-1 ? {marginRight: 16} : {marginRight: 8})}>
            <PostCardItem
            profileImageUri={item.user.profileImageUri}
            nickname={item.user.nickname}
            category={item.category}
            createdAt={item.createdAt}
            tagList={item.tagList}
            description={item.description}
            likeCount={item.likeCount}
            commentCount={item.commentCount}
            />
          </PostCardItemContainer>
        )
    }

    const renderPostItem = ({item, index}: any) => {
        return (
            <PostItemContainer>
                <PostItem
                profileImageUri={item.user.profileImageUri}
                nickname={item.user.nickname}
                category={item.category}
                createdAt={item.createdAt}
                tagList={item.tagList}
                description={item.description}
                likeCount={item.likeCount}
                commentCount={item.commentCount}
                />
            </PostItemContainer>


        )
    }

    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                </HeaderLeftContainer>
                <HeaderTitleText>수다방</HeaderTitleText>
                <HeaderRightContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer
            showsVerticalScrollIndicator={false}>
            <PostCardListContainer>
                <PostCardListHeaderText>실시간 인기글</PostCardListHeaderText>
                <FlatList
                style={{marginTop: 16}}
                horizontal={true}
                data={TEST_POST_DATA}
                renderItem={renderPostCardItem}
                showsHorizontalScrollIndicator={false}/>
            </PostCardListContainer>
            <PostListContainer>
                <PostListHeaderText>전체 게시글</PostListHeaderText>
                <FlatList
                style={{marginTop: 16}}
                data={TEST_POST_DATA}
                renderItem={renderPostItem}
                showsVerticalScrollIndicator={false}/>
            </PostListContainer>
            </BodyContainer>
        </Container>
    )
}

export default CommunityScreen;


