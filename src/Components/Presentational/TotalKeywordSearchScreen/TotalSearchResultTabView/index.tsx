import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

// Local Components
import CommunityRoute from '~/Components/Presentational/TotalKeywordSearchScreen/TotalSearchResultTabView/CommunityRoute';
import ReviewRoute from '~/Components/Presentational/TotalKeywordSearchScreen/TotalSearchResultTabView/ReviewRoute';
import EventRoute from '~/Components/Presentational/TotalKeywordSearchScreen/TotalSearchResultTabView/EventRoute';
import TotalRoute from '~/Components/Presentational/TotalKeywordSearchScreen/TotalSearchResultTabView/TotalRoute';
import ClinicRoute from '~/Components/Presentational/TotalKeywordSearchScreen/TotalSearchResultTabView/ClinicRoute';

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const TabContainer = Styled.View`
flex: 1;
background-color: #F5F7F9;
`;

const TabLabelText = Styled.Text`
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #131F3C;
`;

const FilterContainer = Styled.View`
margin: 8px 0px;
background-color: #ffffff;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const OrderFilterContainer = Styled.View`
padding-top: 10px;
padding-bottom: 10px;
padding-left: 16px;
padding-right: 16px;
flex-direction: row;
align-items: center;
`;

const LocationFilterContainer = Styled.View`
flex-direction: row;
padding-top: 16px;
padding-bottom: 16px;
padding-left: 16px;
padding-right: 16px;
`;

const OrderFilterItemContainer = Styled.View`
background-color: #ffffff;
border-radius: 100px;
border-width: 1px;
border-color: #E2E6ED;
padding: 6px 16px;
`;

const OrderFilterText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 23px;
color: #131F3C;
`;

const LocationFilterText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 24px;
color: #000000;
`;

const LocationFilterDropdownIcon = Styled.Image`
margin-left: 2px;
margin-top: 2px;
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const EmptyIndicatorContainerView = Styled.View`
width: 100%;
height: 100%;
padding-top: 56px;
`;

const EmptyIndicatorView = Styled.View`
align-items: center;
justify-content: center;
`;

const EmptyIndicatorImage = Styled.Image`
margin-bottom: 12px;
`;

const EmptyIndicatorText = Styled.Text`
font-weight: normal;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
margin-bottom: 16px;
`;

const ActivityIndicatorContianerView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('70%')}px; 
justify-content: center;
align-items: center;
`;

interface RouteProps {
  result: any;
  fetchSearchResult: (
    {
      mode,
      pathType,
      communityType,
      region,
      cityId,
      order,
      offset,
      limit,
    }: FetchProps,
    callback: any,
  ) => void;
  navigation: any;
}

const initialLayout = {width: Dimensions.get('window').width};

interface FetchProps {
  mode: string;
  pathType: string;
  communityType: string;
  region: string;
  cityId: number;
  order: string;
  offset: number;
  limit: number;
}
interface Props {
  fetchSearchResult: (
    {
      mode,
      pathType,
      communityType,
      region,
      cityId,
      order,
      offset,
      limit,
    }: FetchProps,
    callback: any,
  ) => void;
  navigation: any;
}

const TotalSearchResultTabView = ({fetchSearchResult, navigation}: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [routes] = useState([
    // {key: 'total', title: '통합검색'},
    {key: 'review', title: '리뷰'},
    {key: 'community', title: '커뮤니티'},
    {key: 'dental', title: '병원'},
    // {key: 'event', title: '이벤트'},
  ]);

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        style={styles.tabBarStyle}
        scrollEnabled={true}
        renderLabel={renderLabel}
        indicatorStyle={styles.indicatorStyle}
        tabStyle={[styles.tabItemStyle]}
        pressOpacity={1}
      />
    );
  };

  const renderLabel = ({route, focused, color}: any) => (
    <TabLabelText style={focused && {color: '#00D1FF'}}>
      {route.title}
    </TabLabelText>
  );

  const renderHeaderComponent = useCallback(
    ({
      order,
      orderList,
      selectedHometown,
      onFiltering,
      floatAvailable = false,
      setFloatVisible,
      isEmpty,
      initialize,
    }) => (
      <>
        <FilterContainer>
          <OrderFilterContainer>
            <TouchableWithoutFeedback
              onPress={() => onFiltering(orderList[0].data)}>
              <OrderFilterItemContainer
                style={order === orderList[0].data && {borderColor: '#00D1FF'}}>
                <OrderFilterText
                  style={order === orderList[0].data && {color: '#00D1FF'}}>
                  {orderList[0].name}
                </OrderFilterText>
              </OrderFilterItemContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => onFiltering(orderList[1].data)}>
              <OrderFilterItemContainer
                style={[
                  {marginLeft: 6},
                  order === orderList[1].data && {borderColor: '#00D1FF'},
                ]}>
                <OrderFilterText
                  style={order === orderList[1].data && {color: '#00D1FF'}}>
                  {orderList[1].name}
                </OrderFilterText>
              </OrderFilterItemContainer>
            </TouchableWithoutFeedback>
          </OrderFilterContainer>
          {floatAvailable ? (
            <TouchableWithoutFeedback onPress={() => setFloatVisible(true)}>
              <LocationFilterContainer>
                <LocationFilterText>
                  {selectedHometown.emdName}
                </LocationFilterText>
                <LocationFilterDropdownIcon
                  source={require('~/Assets/Images/Arrow/ic_dropdown.png')}
                />
              </LocationFilterContainer>
            </TouchableWithoutFeedback>
          ) : null}
        </FilterContainer>
        {initialize ? (
          <ActivityIndicatorContianerView>
            <ActivityIndicator />
          </ActivityIndicatorContianerView>
        ) : isEmpty ? (
          <EmptyIndicatorContainerView>
            <EmptyIndicatorView>
              <EmptyIndicatorImage
                source={require('~/Assets/Images/ic_noData.png')}
              />
              <EmptyIndicatorText>{'검색결과가 없습니다.'}</EmptyIndicatorText>
            </EmptyIndicatorView>
          </EmptyIndicatorContainerView>
        ) : null}
      </>
    ),
    [],
  );

  const renderScene = ({route}: any) => {
    switch (route.key) {
      // case 'total':
      //   return (
      //     <TotalRoute
      //       result={searchResult}
      //       fetchSearchResult={fetchSearchResult}
      //       navigation={navigation}
      //     />
      //   );
      case 'community':
        return (
          <CommunityRoute
            fetchSearchResult={fetchSearchResult}
            navigation={navigation}
            renderHeaderComponent={renderHeaderComponent}
          />
        );
      case 'review':
        return (
          <ReviewRoute
            fetchSearchResult={fetchSearchResult}
            navigation={navigation}
            renderHeaderComponent={renderHeaderComponent}
          />
        );
      case 'dental':
        return (
          <ClinicRoute
            fetchSearchResult={fetchSearchResult}
            navigation={navigation}
            renderHeaderComponent={renderHeaderComponent}
          />
        );
      // case 'event':
      //   return (
      //     <EventRoute
      //       result={eventSearchResult}
      //       fetchSearchResult={fetchSearchResult}
      //       navigation={navigation}
      //     />
      //   );
    }
  };
  return (
    <Container>
      <TabView
        navigationState={{index: tabIndex, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setTabIndex}
        initialLayout={initialLayout}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    width: 0,
    height: 0,
  },
  tabItemStyle: {
    width: 'auto',
    backgroundColor: '#ffffff',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tabBarStyle: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.3,
    borderColor: '#E2E6ED',
  },
});

export default TotalSearchResultTabView;
