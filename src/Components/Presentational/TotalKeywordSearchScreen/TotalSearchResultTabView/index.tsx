import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
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

const ReviewListContainer = Styled.View`
flex: 1;
margin-top: 8px;
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
  isRequestChanged: boolean;
  searchResult: any;
  reviewSearchResult: any;
  communitySearchResult: any;
  clinicSearchResult: any;
  eventSearchResult: any;
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

const TotalSearchResultTabView = ({
  isRequestChanged,
  searchResult,
  communitySearchResult,
  reviewSearchResult,
  clinicSearchResult,
  eventSearchResult,
  fetchSearchResult,
  navigation,
}: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [routes] = useState([
    {key: 'total', title: '통합검색'},
    {key: 'community', title: '커뮤니티'},
    {key: 'review', title: '리뷰'},
    {key: 'dental', title: '병원'},
    {key: 'event', title: '이벤트'},
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
    (order, selectedHometown, onFiltering, setFloatVisible) => (
      <FilterContainer>
        <OrderFilterContainer>
          <TouchableWithoutFeedback onPress={() => onFiltering('popular')}>
            <OrderFilterItemContainer
              style={order === 'popular' && {borderColor: '#00D1FF'}}>
              <OrderFilterText
                style={order === 'popular' && {color: '#00D1FF'}}>
                {'인기순'}
              </OrderFilterText>
            </OrderFilterItemContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onFiltering('createdAt')}>
            <OrderFilterItemContainer
              style={[
                {marginLeft: 6},
                order === 'createdAt' && {borderColor: '#00D1FF'},
              ]}>
              <OrderFilterText
                style={order === 'createdAt' && {color: '#00D1FF'}}>
                {'최신순'}
              </OrderFilterText>
            </OrderFilterItemContainer>
          </TouchableWithoutFeedback>
        </OrderFilterContainer>
        <TouchableOpacity onPress={() => setFloatVisible(true)}>
          <LocationFilterContainer>
            <LocationFilterText>{selectedHometown.emdName}</LocationFilterText>
            <LocationFilterDropdownIcon
              source={require('~/Assets/Images/Arrow/ic_dropdown.png')}
            />
          </LocationFilterContainer>
        </TouchableOpacity>
      </FilterContainer>
    ),
    [],
  );

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'total':
        return (
          <TotalRoute
            isRequestChanged={isRequestChanged}
            result={searchResult}
            fetchSearchResult={fetchSearchResult}
            navigation={navigation}
          />
        );
      case 'community':
        return (
          <CommunityRoute
            isRequestChanged={isRequestChanged}
            fetchSearchResult={fetchSearchResult}
            navigation={navigation}
            renderHeaderComponent={renderHeaderComponent}
          />
        );
      case 'review':
        return (
          <ReviewRoute
            isRequestChanged={isRequestChanged}
            fetchSearchResult={fetchSearchResult}
            navigation={navigation}
            renderHeaderComponent={renderHeaderComponent}
          />
        );
      case 'dental':
        return (
          <ClinicRoute
            isRequestChanged={isRequestChanged}
            result={clinicSearchResult}
            fetchSearchResult={fetchSearchResult}
            navigation={navigation}
          />
        );
      case 'event':
        return (
          <EventRoute
            isRequestChanged={isRequestChanged}
            result={eventSearchResult}
            fetchSearchResult={fetchSearchResult}
            navigation={navigation}
          />
        );
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
