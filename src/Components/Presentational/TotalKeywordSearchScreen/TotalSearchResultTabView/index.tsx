import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {Text, Dimensions, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import ReviewList from '~/Components/Presentational/ReviewList';

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const TabContainer = Styled.ScrollView`
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
margin-top: 8px;
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
align-items: center;
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
line-height: 24px;
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
    order: string,
    changeSearchOrder: (value: string, type: string) => void,
}

interface ReviewRouteProps {
    order: string,
    changeSearchOrder: (value: string, type: string) => void,
    reviewSearchResultArray: Array<any>,
}

const TotalRoute = ({order, changeSearchOrder}: RouteProps) => {
    console.log("Total Search Result Route rendering");

    return (
        <TabContainer>
            <FilterContainer>
                <OrderFilterContainer>
                    <TouchableWithoutFeedback onPress={() => changeSearchOrder("popular" ,"total")}>
                    <OrderFilterItemContainer
                    style={order === "popular" && {borderColor: "#00D1FF"}}>
                        <OrderFilterText
                        style={order === "popular" && {color: "#00D1FF"}}>{"인기순"}</OrderFilterText>
                    </OrderFilterItemContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => changeSearchOrder("createdAt", "total")}>
                    <OrderFilterItemContainer style={[{marginLeft: 6}, order === "createdAt" && {borderColor: "#00D1FF"}]}>
                        <OrderFilterText
                        style={order === "createdAt" && {color: "#00D1FF"}}>{"최신순"}</OrderFilterText>
                    </OrderFilterItemContainer>
                    </TouchableWithoutFeedback>
                </OrderFilterContainer>
                <LocationFilterContainer>
                    <LocationFilterText>{"전국"}</LocationFilterText>
                    <LocationFilterDropdownIcon
                    source={require('~/Assets/Images/Arrow/ic_dropdown.png')}/>
                </LocationFilterContainer>
            </FilterContainer>
        </TabContainer>
    )
}

const CommunityRoute = ({order, changeSearchOrder}: RouteProps) => {
    console.log("Community Search Result Route rendering")
    return (
        <TabContainer>
            <FilterContainer>
                <OrderFilterContainer>
                    <TouchableWithoutFeedback onPress={() => changeSearchOrder("popular" ,"community")}>
                    <OrderFilterItemContainer
                    style={order === "popular" && {borderColor: "#00D1FF"}}>
                        <OrderFilterText
                        style={order === "popular" && {color: "#00D1FF"}}>{"인기순"}</OrderFilterText>
                    </OrderFilterItemContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => changeSearchOrder("createdAt", "community")}>
                    <OrderFilterItemContainer style={[{marginLeft: 6}, order === "createdAt" && {borderColor: "#00D1FF"}]}>
                        <OrderFilterText
                        style={order === "createdAt" && {color: "#00D1FF"}}>{"최신순"}</OrderFilterText>
                    </OrderFilterItemContainer>
                    </TouchableWithoutFeedback>
                </OrderFilterContainer>
                <LocationFilterContainer>
                    <LocationFilterText>{"전국"}</LocationFilterText>
                    <LocationFilterDropdownIcon
                    source={require('~/Assets/Images/Arrow/ic_dropdown.png')}/>
                </LocationFilterContainer>
            </FilterContainer>
        </TabContainer>
    )
}
const ReviewRoute = ({order, changeSearchOrder, reviewSearchResultArray}: ReviewRouteProps) => {
    console.log("Review Search Result Route rendering");

    return (
        <TabContainer>
            <FilterContainer>
                <OrderFilterContainer>
                    <TouchableWithoutFeedback onPress={() => changeSearchOrder("popular" ,"review")}>
                    <OrderFilterItemContainer
                    style={order === "popular" && {borderColor: "#00D1FF"}}>
                        <OrderFilterText
                        style={order === "popular" && {color: "#00D1FF"}}>{"인기순"}</OrderFilterText>
                    </OrderFilterItemContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => changeSearchOrder("createdAt", "review")}>
                    <OrderFilterItemContainer style={[{marginLeft: 6}, order === "createdAt" && {borderColor: "#00D1FF"}]}>
                        <OrderFilterText
                        style={order === "createdAt" && {color: "#00D1FF"}}>{"최신순"}</OrderFilterText>
                    </OrderFilterItemContainer>
                    </TouchableWithoutFeedback>
                </OrderFilterContainer>
                <LocationFilterContainer>
                    <LocationFilterText>{"전국"}</LocationFilterText>
                    <LocationFilterDropdownIcon
                    source={require('~/Assets/Images/Arrow/ic_dropdown.png')}/>
                </LocationFilterContainer>
            </FilterContainer>
            <ReviewListContainer>
                <ReviewList
                reviewList={reviewSearchResultArray}/>
            </ReviewListContainer>
        </TabContainer>
    )
}

const DentalRoute = ({order, changeSearchOrder}: RouteProps) => {
    console.log("Dental Search Result Route rendering")
    return (
        <TabContainer>
            <FilterContainer>
                <OrderFilterContainer>
                    <TouchableWithoutFeedback onPress={() => changeSearchOrder("popular" ,"dental")}>
                    <OrderFilterItemContainer
                    style={order === "popular" && {borderColor: "#00D1FF"}}>
                        <OrderFilterText
                        style={order === "popular" && {color: "#00D1FF"}}>{"인기순"}</OrderFilterText>
                    </OrderFilterItemContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => changeSearchOrder("createdAt", "dental")}>
                    <OrderFilterItemContainer style={[{marginLeft: 6}, order === "createdAt" && {borderColor: "#00D1FF"}]}>
                        <OrderFilterText
                        style={order === "createdAt" && {color: "#00D1FF"}}>{"최신순"}</OrderFilterText>
                    </OrderFilterItemContainer>
                    </TouchableWithoutFeedback>
                </OrderFilterContainer>
                <LocationFilterContainer>
                    <LocationFilterText>{"전국"}</LocationFilterText>
                    <LocationFilterDropdownIcon
                    source={require('~/Assets/Images/Arrow/ic_dropdown.png')}/>
                </LocationFilterContainer>
            </FilterContainer>
        </TabContainer>
    )
}

const EventRoute = ({order, changeSearchOrder}: RouteProps) => {
    console.log("Event Search Result Route rendering")
    return (
        <TabContainer>
            <FilterContainer>
                <OrderFilterContainer>
                    <TouchableWithoutFeedback onPress={() => changeSearchOrder("popular" ,"event")}>
                    <OrderFilterItemContainer
                    style={order === "popular" && {borderColor: "#00D1FF"}}>
                        <OrderFilterText
                        style={order === "popular" && {color: "#00D1FF"}}>{"인기순"}</OrderFilterText>
                    </OrderFilterItemContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => changeSearchOrder("createdAt", "event")}>
                    <OrderFilterItemContainer style={[{marginLeft: 6}, order === "createdAt" && {borderColor: "#00D1FF"}]}>
                        <OrderFilterText
                        style={order === "createdAt" && {color: "#00D1FF"}}>{"최신순"}</OrderFilterText>
                    </OrderFilterItemContainer>
                    </TouchableWithoutFeedback>
                </OrderFilterContainer>
                <LocationFilterContainer>
                    <LocationFilterText>{"전국"}</LocationFilterText>
                    <LocationFilterDropdownIcon
                    source={require('~/Assets/Images/Arrow/ic_dropdown.png')}/>
                </LocationFilterContainer>
            </FilterContainer>
        </TabContainer>
    )
}

function isEqual(prevItem: any, nextItem: any) {
    return (prevItem.order === nextItem.order)
}

const MemoizedTotalRoute = React.memo(TotalRoute, isEqual)
const MemoizedCommunityRoute = React.memo(CommunityRoute, isEqual)
const MemoizedReviewRoute = React.memo(ReviewRoute, isEqual)
const MemoizedDentalRoute = React.memo(DentalRoute, isEqual)
const MemoizedEventRoute = React.memo(EventRoute, isEqual)

const initialLayout = { width: Dimensions.get('window').width };

interface Props {
    searchResultArray: any;
    reviewSearchResultArray: Array<any>;
    totalSearchOrder: string;
    communitySearchOrder: string;
    reviewSearchOrder: string;
    dentalSearchOrder: string;
    eventSearchOrder: string;
    changeSearchOrder: (value: string, type: string) => void,
}

const TotalSearchResultTabView = ({searchResultArray, reviewSearchResultArray, totalSearchOrder, communitySearchOrder, reviewSearchOrder, dentalSearchOrder, eventSearchOrder, changeSearchOrder}: Props) => {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [routes] = useState([
        {key: 'total', title: '통합검색'},
        {key: 'community', title: '커뮤니티'},
        {key: 'review', title: '리뷰'},
        {key: 'dental', title: "병원"},
        {key: 'event', title: '이벤트'}
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
        )
    }

    const renderLabel = ({route, focused, color}: any) => (
        <TabLabelText style={focused && {color: "#00D1FF"}}>{route.title}</TabLabelText>

    )

    const renderScene = ({route}: any) => {
        switch (route.key) {
            case 'total':
                return (
                    <MemoizedTotalRoute
                    changeSearchOrder={changeSearchOrder}
                    order={totalSearchOrder}/>
                )
            case 'community':
                return (
                    <MemoizedCommunityRoute
                    changeSearchOrder={changeSearchOrder}
                    order={communitySearchOrder}/>
                )
            case 'review':
                return (
                    <MemoizedReviewRoute
                    changeSearchOrder={changeSearchOrder}
                    reviewSearchResultArray={reviewSearchResultArray}
                    order={reviewSearchOrder}/>
                )
            case 'dental':
                return (
                    <MemoizedDentalRoute
                    changeSearchOrder={changeSearchOrder}
                    order={dentalSearchOrder}/>
                )
            case 'event':
                return (
                    <MemoizedEventRoute
                    changeSearchOrder={changeSearchOrder}
                    order={eventSearchOrder}/>
                )
        }
    }
    return(
        <Container>
            <TabView
            navigationState={{index: tabIndex, routes}}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setTabIndex}
            initialLayout={initialLayout}/>
        </Container>
    )
}

const styles = StyleSheet.create({
    indicatorStyle: {
        width: 0,
        height: 0,
    },
    tabItemStyle: {
        width: 'auto',
        backgroundColor: "#ffffff",
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 20,
        paddingRight: 20,
    },
    tabBarStyle: {
        backgroundColor: "#ffffff",
        borderBottomWidth: 0.3,
        borderColor: "#E2E6ED",
    }
})

export default TotalSearchResultTabView;