import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.ScrollView`
flex: 1;
background: white;
`;

const HeaderContainerView = Styled.View`
width: 100%;
height: ${hp('7.512%')}px;
padding: 0px 24px;
margin-top: 5px;
flex-direction: row;
align-items: center;
`;

const HeaderTitleTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: auto;
height: 100%;
flex-direction: row;
align-items: center;
`;

const HeaderTitleText = Styled.Text`
font-weight: bold;
font-size: 16px;
line-height: 18px;
margin-right: 4px;
font-family: NanumSquareR;
`;

const HeaderTitleButtonImage = Styled.Image`
`;

const BodyContainerView = Styled.View`
flex: 1;
background: #ECECEE;
margin-bottom: 100px;
`;

const MainContentView = Styled.View`
width: 100%;
height: auto;
padding: 24px;
background: white;
`;

const MainContentTitleView = Styled.View`
width: auto;
height: auto;
margin-top: 8px;
flex-direction: row;
align-items: center;
`;

const MainContentTitleKeyText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 23px;
margin-right: 8px;
`;

const MainContentTitleValueText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 23px;
`;

const SearchBarView = Styled.View`
width: 100%;
height: ${hp('5.911%')}px;
margin-top: 24px;

`;

const SerachBarTextInput = Styled.TextInput`
width: 100%;
height: 100%;
font-family: NanumSquareR;
padding: 0px 16px;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
border: 1px solid #F2F2F2;
border-radius: 8px;
`;

const HorizontalListView = Styled.View`
width: 100%;
height: auto;
margin-top: 24px;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const HorizontalListContentView = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: ${wp('20.53%')}px;
height: 100%;
padding-top: 8px;
align-items: center;
`;

const HorizontalLineView = Styled.View`
width: 1px;
height: 50%;
background: #E0E0E0;
`;

const HorizontalListImageView = Styled.View`
width: 41px;
height: 41px;
background: grey;
border-radius: 100px;
`;
const HorizontalListImage = Styled.Image`
width: 100%;
height: 100%;
border-radius: 100px;
`;

const HorizontalListTitleView = Styled.View`
width: 100%;
height: auto;
margin-top: 8px;
padding: 6px 8px;
align-items: center;
justify-content: center;
`;
const HorizontalListTitleText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
`;

const PopupTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 100%;
height: auto;
background: white;
border-radius: 8px;
margin-top: 24px;
padding: 22px;
`;
const PopupTitleText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 24px;
`;

const PopupText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
margin-top: 4px;
`;

const ReviewContentView = Styled.View`
width: 100%;
height: auto;
margin-top: 8px;
padding: 24px 0px 0px 0px;
background: white;
`;

const ReviewContentTitleView = Styled.View`
width: 100%;
height: auto;
padding: 0px 24px;
flex-direction: row;
`;
const ReviewContentTitleText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
margin-right: 4px;
`;

const ReviewContentText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
`;

const ReviewContentDetailButtonView = Styled.View`
width: auto;
height: 100%;
margin-left: auto;
`;

const ReviewContentDetailButtonText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
color: #C4C4C4;
`;

const ReviewContentImageContainerView = Styled.View`
margin: 16px 0px 16px 24px;
margin-right: auto;
width: 100%;
height: auto;
`;
const ReviewContentImageFlatList = Styled(FlatList as new () => FlatList)`
width: 100%;
height: auto;
`;

const ReviewContentImageView = Styled.Image<{source: any}>`
width: 130px;
height: 130px;
background-color: grey;
border-radius: 4px;
margin-right: 16px;
`;

const ReviewUploadContainer = Styled.View`
width: ${wp('100%')}px;
background-color: #ffffff;
align-items: center;
justify-content: center;
`;

const ReviewUploadButton = Styled.View`
width: ${wp('87.2%')}px;
height: ${wp('24.416%')}px;
border-radius: 8px;
border-width: 1px;
border-color: #C4C4C4;
align-items: center;
justify-content: center;
`;

const ReviewUploadText = Styled.Text`
font-weight: 700;
color: #000000;
font-size: 18px;
`;

interface Props {
  navigation: any;
  route: any;
}

const HomeMainScreen = ({navigation, route}: Props) => {
  const [userLocation, setUserLocation] = useState<string>('동패동');
  const [localClinicNum, setLocalClinicNum] = useState<number>(4);
  const [localReviewNum, setLocalReviewNum] = useState<number>(80);

  const [reviewImage, setReviewImage] = useState([
    {id: 2, img_url: '~/Assets/Images/appIcon_chika.png'},
    {id: 3, img_url: '~/Assets/Images/appIcon_chika.png'},
    {id: 4, img_url: '~/Assets/Images/appIcon_chika.png'},
    {id: 5, img_url: '~/Assets/Images/appIcon_chika.png'},
    {id: 6, img_url: '~/Assets/Images/appIcon_chika.png'},
  ]);

  const moveToReviewList = () => {
    navigation.navigate('ReviewStackScreen', {
      screen: 'ReviewListScreen',
    });
  };

  const moveToReviewUpload = () => {
    navigation.navigate('ReviewUploadStackScreen', {
      screen: 'ReceiptRegisterScreen',
    });
  };

  const renderFlatListImagesCallback = useCallback(
    ({item, index}) => (
      <TouchableWithoutFeedback
        key={'TouchableImage' + index}
        onPress={() => {}}>
        <ReviewContentImageView
          key={'image' + index}
          style={{
            resizeMode: 'contain',
          }}
          source={require('~/Assets/Images/appIcon_chika.png')}
        />
      </TouchableWithoutFeedback>
    ),
    [reviewImage],
  );

  return (
    <ContainerView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}>
      <HeaderContainerView>
        <HeaderTitleTouchableOpacity>
          <HeaderTitleText>{userLocation}</HeaderTitleText>
          <HeaderTitleButtonImage
            style={{
              resizeMode: 'contain',
            }}
            source={require('~/Assets/Images/Arrow/ic_downArrowFilled.png')}
          />
        </HeaderTitleTouchableOpacity>
      </HeaderContainerView>
      <BodyContainerView>
        <MainContentView>
          <MainContentTitleView>
            <MainContentTitleKeyText>내 주변 치과</MainContentTitleKeyText>
            <MainContentTitleValueText>{`${localClinicNum}개`}</MainContentTitleValueText>
          </MainContentTitleView>
          <MainContentTitleView>
            <MainContentTitleKeyText>리뷰</MainContentTitleKeyText>
            <MainContentTitleValueText>{`${localReviewNum}개`}</MainContentTitleValueText>
          </MainContentTitleView>
          <SearchBarView>
            <SerachBarTextInput
              placeholder="검색어를 입력하세요"
              placeholderTextColor="#BABABA"
            />
          </SearchBarView>
          <HorizontalListView>
            <HorizontalListContentView>
              <HorizontalListImageView>
                <HorizontalListImage
                  style={{
                    resizeMode: 'contain',
                  }}
                  source={require('~/Assets/Images/appIcon_chika.png')}
                />
              </HorizontalListImageView>
              <HorizontalListTitleView>
                <HorizontalListTitleText>교정･미백</HorizontalListTitleText>
              </HorizontalListTitleView>
            </HorizontalListContentView>
            <HorizontalLineView />
            <HorizontalListContentView>
              <HorizontalListImageView>
                <HorizontalListImage
                  style={{
                    resizeMode: 'contain',
                  }}
                  source={require('~/Assets/Images/appIcon_chika.png')}
                />
              </HorizontalListImageView>
              <HorizontalListTitleView>
                <HorizontalListTitleText>양치하기</HorizontalListTitleText>
              </HorizontalListTitleView>
            </HorizontalListContentView>
            <HorizontalLineView />
            <HorizontalListContentView>
              <HorizontalListImageView>
                <HorizontalListImage
                  style={{
                    resizeMode: 'contain',
                  }}
                  source={require('~/Assets/Images/appIcon_chika.png')}
                />
              </HorizontalListImageView>
              <HorizontalListTitleView>
                <HorizontalListTitleText>단골병원</HorizontalListTitleText>
              </HorizontalListTitleView>
            </HorizontalListContentView>
          </HorizontalListView>
          <PopupTouchableOpacity style={styles.PopupShadow}>
            <PopupTitleText>
              내 주변 치과, 영수증 리뷰 쓰고 커피 받아가세요!
            </PopupTitleText>
            <PopupText>바로가기</PopupText>
          </PopupTouchableOpacity>
        </MainContentView>
        <ReviewContentView>
          <ReviewContentTitleView>
            <ReviewContentTitleText>충치</ReviewContentTitleText>
            <ReviewContentText>인기리뷰</ReviewContentText>
            <TouchableWithoutFeedback onPress={() => moveToReviewList()}>
              <ReviewContentDetailButtonView>
                <ReviewContentDetailButtonText>
                  더보기
                </ReviewContentDetailButtonText>
              </ReviewContentDetailButtonView>
            </TouchableWithoutFeedback>
          </ReviewContentTitleView>
          <ReviewContentImageContainerView>
            <ReviewContentImageFlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              alwaysBounceHorizontal={false}
              data={reviewImage}
              keyExtractor={(item) => String(item.id)}
              renderItem={
                renderFlatListImagesCallback
              }></ReviewContentImageFlatList>
          </ReviewContentImageContainerView>
        </ReviewContentView>
        <ReviewUploadContainer>
          <TouchableWithoutFeedback onPress={() => moveToReviewUpload()}>
            <ReviewUploadButton style={{marginTop: 50}}>
              <ReviewUploadText>리뷰 작성하기</ReviewUploadText>
            </ReviewUploadButton>
          </TouchableWithoutFeedback>
        </ReviewUploadContainer>
      </BodyContainerView>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  PopupShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 8,
    shadowOpacity: 0.11,
  },
});

export default HomeMainScreen;
