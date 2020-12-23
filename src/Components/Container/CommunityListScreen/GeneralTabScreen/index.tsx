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

//Local Component
import CommunityPostList from '~/Components/Presentational/CommunityPostList';
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

interface Props {
  navigation: any;
  route: any;
}

const GeneralTabScreen = ({navigation, route}: Props) => {
  const type = 'FreeTalk';
  const limit = 10;
  const [postData, setPostData] = useState([] as any);
  const [refreshing, setRefreshing] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isEndReached, setIsEndReached] = useState(false);
  const [order, setOrder] = useState('createdAt');
  const jwtToken = route.params.currentUser.user.jwtToken;
  const buttonY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const form = {
      type: type,
      limit: limit,
      offset: pageIndex * limit,
      order: order,
    };
    GETCommunityPosts(jwtToken, form).then((response: any) => {
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
    GETCommunityPosts(jwtToken, form).then((response: any) => {
      setPostData(response);
      setPageIndex(0);
      setRefreshing(false);
    });
  };

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
      GETCommunityPosts(jwtToken, form).then((response: any) => {
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
      <CommunityPostList
        navigation={navigation}
        route={route}
        postData={postData}
        refreshing={refreshing}
        onRefresh={onRefresh}
        isEndReached={isEndReached}
        onEndReached={onEndReached}
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
