import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

//local component
import PostItem from '~/Components/Presentational/PostItem';
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

const BodyContainerFlatList = Styled(FlatList as new () => FlatList)`
flex: 1;
`;

const ActivityIndicatorContianerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
align-items: center;
padding: 10px 0px;
`;
interface Props {
  navigation: any;
  route: any;
}

const GeneralTabScreen = ({navigation, route}: Props) => {
  const type = 'FreeTalk';
  const limit = 10;
  const [postData, setPostData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isEndReached, setIsEndReached] = useState(false);
  const [order, setOrder] = useState('createdAt');

  const buttonY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const form = {
      type: type,
      limit: limit,
      offset: pageIndex * limit,
      order: order,
    };
    GETCommunityPosts(form).then((response: any) => {
      setPostData(response);
      console.log('res', response.length);
    });
  }, []);

  const onRefresh = () => {
    const form = {
      type: type,
      limit: limit,
      offset: 0,
      order: order,
    };
    setRefreshing(true);
    GETCommunityPosts(form).then((response: any) => {
      setPostData(response);
      setPageIndex(0);
      setRefreshing(false);
    });
  };

  const renderPosts = ({item, index}: any) => (
    <PostItem
      key={index}
      mode={'Card'}
      navigation={navigation}
      data={item}
      mediaFiles={item.community_imgs}
    />
  );

  const getItemKey = (item: any) => String(item.id);

  const onEndReached = (info: any) => {
    console.log(info.distanceFromEnd);

    if (!isEndReached && postData.length > 9) {
      setIsEndReached(true);
      const newPageIndex = pageIndex + 1;

      const form = {
        type: type,
        limit: limit,
        offset: newPageIndex * limit,
        order: order,
      };
      setPageIndex((prev: any) => prev + 1);
      GETCommunityPosts(form).then((response: any) => {
        console.log(response.length);
        setPostData((prev: any) => {
          return [...prev, ...response];
        });
        setIsEndReached(false);
      });
    }
  };

  return (
    <ContainerView>
      <BodyContainerFlatList
        data={postData}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={getItemKey}
        scrollIndicatorInsets={{
          bottom: isIphoneX() ? wp('13%') : wp('15%'),
        }}
        contentContainerStyle={{
          paddingBottom: isIphoneX() ? wp('13%') : wp('15%'),
        }}
        renderItem={renderPosts}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: buttonY,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        onEndReached={onEndReached}
        onEndReachedThreshold={5}
        ListFooterComponent={
          isEndReached ? (
            <ActivityIndicatorContianerView>
              <ActivityIndicator size="large" />
            </ActivityIndicatorContianerView>
          ) : null
        }
      />
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 3,
          right: wp('50%') - 45,
          bottom: (getBottomSpace() ? wp('12%') : wp('15%')) + 23,
          backgroundColor: '#C4C4C4',
          borderRadius: 100,
          width: 90,
          height: 34,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            {
              translateY: buttonY.interpolate({
                inputRange: [
                  0,
                  (getBottomSpace() ? wp('12%') : wp('15%')) + 23,
                ],
                outputRange: [
                  0,
                  (getBottomSpace() ? wp('12%') : wp('15%')) + 23,
                ],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 9,
            borderRadius: 100,
          }}
          onPress={() => {
            navigation.navigate('CommunityPostUploadStackScreen');
          }}>
          <Text>글 작성하기</Text>
        </TouchableOpacity>
      </Animated.View>
    </ContainerView>
  );
};

export default GeneralTabScreen;
