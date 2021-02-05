import React, {useState, createRef} from 'react';
import Styled from 'styled-components/native';
import {
    TouchableWithoutFeedback,
    StyleSheet,
    ScrollView,
    FlatList,
    Picker,
    ActivityIndicator,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import ActionSheet from 'react-native-actionsheet';

// Local Component
import DentalListItem from '~/Components/Presentational/DentalListItem';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';


const Container = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const BodyContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

const FilterListContainer = Styled.View`
width: ${wp('100%')}px;
height: ${hp('6.6%')}px;
flex-direction: row;
align-items: center;
background-color: #ffffff;
`;

const FilterItemContainer = Styled.View`
padding: 9px 11px 9px 11px;
border-radius: 100px;
background-color: #ffffff;
flex-direction: row;
align-items: center;
border-width: 1px;
border-color: #c4c4c4;
`;

const FilterItemText = Styled.Text`
color: #000000;
font-size: 14px;
`;

const DetailFilterModalContainer = Styled.View`
width: ${wp('100%')}px;
background-color: #ffffff;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
position: absolute;
bottom: 0;
`;

const DetailFilterListContainer = Styled.View`
padding-top: 12px;
padding-bottom: 27px;
padding-left: 16px;
padding-right: 16px;
flex-direction: column;
flex: 1;
`;

const DetailFilterHeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
border-bottom-width: 1px;
border-color: #ececec;
`;

const DetailFilterHeaderLeftContainer = Styled.View`
padding-top: ${hp('3.2%')}px;
padding-bottom: ${hp('3.2%')}px;
padding-left: ${wp('6.4%')}px;
padding-right: ${wp('6.4%')}px;
align-items: center;
justify-content: center;
`;

const DetailFilterHeaderRightContainer = Styled.View`
padding-top: ${hp('3.2%')}px;
padding-bottom: ${hp('3.2%')}px;
padding-left: ${wp('6.4%')}px;
padding-right: ${wp('6.4%')}px;
align-items: center;
justify-content: center;
`;

const DetailFilterTitleText = Styled.Text`
font-weight: bold;
font-size: 16px;
color: #000000;
`;

const DetailFilterCancelText = Styled.Text`
font-weight: 400;
font-size: 16px;
color: #000000;
`;

const DetailFilterRegisterText = Styled.Text`
font-weight: 400;
font-size: 16px;
color: #000000;
`;

const TimeFilterModalContainer = Styled.View`
`;

const TimePickerContainer = Styled.View`
align-items: center;
justify-content: center;
flex-direction: row;
`;

const DetailFilterItemContainer = Styled.View`
width: ${wp('16.2%')}px;
height: ${wp('9%')}px;
align-items: center;
justify-content: center;
border-radius: 100px;
background-color: #ffffff;
border-width: 1px;
border-color: #c4c4c4;
`;

const TimePickerLabelText = Styled.Text`
font-size: 20px;
color: #000000;
`;

const FooterIndicatorContainer = Styled.View`
height: ${hp('9%')}px;
background-color: #ffffff;
align-items: center;
justify-content: center;
`;

const NoSearchedDentalContainer = Styled.View`
flex: 1;
flex-direction: row;
align-items: center;
justify-content: center;
background-color: #ffffff;
`;

const NoSearchedDentalText = Styled.Text`
`;

const SearchResultContainer = Styled.View`
flex: 1;
`;

const AutoCompletedKeywordContainer = Styled.View`
flex: 1;
`;

const AutoCompletedKeywordItemContainer = Styled.View`
padding: 25px;
flex-direction: row;
align-items: center;
border-bottom-width: 1px;
border-color: #c3c3c3;
`;

const AutoCompletedKeywordText = Styled.Text`
`;

const ViewDentalMapButton = Styled.View`
padding: 13px;
background-color: #eeeeee;
`;

const ViewDentalMapText = Styled.Text`
font-size: 16px;
`;

const ClearTextButtonContainer = Styled.View`
position: absolute;
right: 0px;
justify-content: center;
height: ${hp('7%')}px;
padding-left: 16px;
padding-right: 16px;
`;

const ClearTextIcon = Styled.Image`
width: ${wp('5.3%')}px;
height: ${wp('5.3%')}px;
`;

interface Props {
  navigation: any,
  route: any,
  dayFilter: any,
  selectedDayList: any,
  timeFilter: any,
  holidayFilter: any,
  parkingFilter: any,
  searchedDentalArray: any,
  loadingGetDental: boolean,
  dayList: any,
}

let offset = 0;
let limit = 20;
let sort = 'accuracy';

let isNearDentalList = true;
let noMoreDentalData = false;
let inputedKeyword = '';
let inputingText = '';

const DentalSearchResultList = ({navigation, route, dayFilter, selectedDayList, timeFilter, holidayFilter, parkingFilter, searchedDentalArray, loadingGetDental, dayList}: Props) => {
  const [visibleTimeFilterModal, setVisibleTimeFilterModal] = useState<boolean>(
    false,
  );
  const [visibleDayFilterModal, setVisibleDayFilterModal] = useState<boolean>(
    false,
  );
  const [bottomPadding, setBottomPadding] = useState<number>(40);
  const [hourPickerValue, setHourPickerValue] = useState<number>(1);
  const [minutePickerValue, setMinutePickerValue] = useState<string>('00');
  const [timeSlotPickerValue, setTimeSlotPickerValue] = useState<string>(
    '오전',
  );

  const [loadingMoreDental, setLoadingMoreDental] = useState<boolean>(false);
  const [refreshingDentalFlat, setRefreshingDentalFlat] = useState<boolean>(
    false,
  );
  const [changeDentalList, setChangeDentalList] = useState<boolean>(false);
  const [isFocusedSearchInput, setIsFocusedSearchInput] = useState<boolean>(
    route.params?.requestType === 'search' ? true : false,
  );

  const [query, setQuery] = useState<string>("");

  const timeFilterActionSheet = createRef<any>();
  const todayIndex = new Date().getDay();

  const long = route.params?.currentLocation.longitude;
  const lat = route.params?.currentLocation.latitude;

  const clickDayFilter = () => {
    setVisibleDayFilterModal(true);
  };

  const selectDayFilterItem = (day: object, index: number) => {
    dispatch(allActions.dentalFilterActions.selectDayItem(index));
  };

  const clickTimeFilter = () => {
    if (timeFilter === '') {
      setVisibleTimeFilterModal(true);
    } else {
      timeFilterActionSheet.current.show();
    }
  };

  const onPressTimeFilterActionSheet = (index: number) => {
    if (index === 1) {
      setVisibleTimeFilterModal(true);
    } else if (index === 2) {
      dispatch(allActions.dentalFilterActions.setTimeFilter(''));
      filterDental(
        searchedKeyword,
        dayFilter,
        '',
        parkingFilter,
        holidayFilter,
      );
    }
  };

  const changeHolidayFilter = () => {
    filterDental(
      searchedKeyword,
      dayFilter,
      timeFilter,
      parkingFilter,
      !holidayFilter,
    );
    dispatch(allActions.dentalFilterActions.setHolidayFilter(!holidayFilter));
  };

  const changeParkingFilter = () => {
    if (parkingFilter === 'y') {
      filterDental(searchedKeyword, dayFilter, timeFilter, 'y', holidayFilter);
      dispatch(allActions.dentalFilterActions.setParkingFilter('n'));
    } else if (parkingFilter === 'n') {
      filterDental(searchedKeyword, dayFilter, timeFilter, 'y', holidayFilter);
      dispatch(allActions.dentalFilterActions.setParkingFilter('y'));
    }
  };

  const cancelDayFilter = () => {
    console.log('cancelDayFilter selectedDayFilter', selectDayFilterItem);
    console.log('cancelDayFilter dayList', dayList);
    var tmpDayList = dayList;
    var tmpSelectedDayList = selectedDayList;

    var preDayList = tmpDayList.map(function (item: any, index: number) {
      if (tmpSelectedDayList.includes(item)) {
        console.log('item', item);
        item.selected = true;
        return item;
      } else {
        item.selected = false;
        return item;
      }
    });

    //setDayFilterList(preDayList);
    dispatch(allActions.dentalFilterActions.setDayList(preDayList));
    //setSelectedDayFilter(preDayFilterList);
    setVisibleDayFilterModal(false);
  };

  const registerDayFilter = () => {
    var tmpDayList = dayList;

    var tmpSelectedDayList = new Array();
    var tmpDayFilter = new Array();

    tmpDayList.forEach((item: any, index: number) => {
      if (item.selected) {
        tmpDayFilter.push(item.value);
        tmpSelectedDayList.push(item);
      }
    });

    if (JSON.stringify(tmpDayFilter) !== JSON.stringify(dayFilter)) {
      dispatch(allActions.dentalFilterActions.setDayFilter(tmpDayFilter));
      dispatch(
        allActions.dentalFilterActions.setSelectedDayList(tmpSelectedDayList),
      );
      offset = 0;

      filterDental(
        searchedKeyword,
        tmpDayFilter,
        timeFilter,
        parkingFilter,
        holidayFilter,
      );
    }

    setVisibleDayFilterModal(false);
  };

  const cancelTimeFilter = () => {
    setVisibleTimeFilterModal(false);
  };

  const onValueChangeHourPicker = (itemValue: any, itemIndex: number) => {
    console.log(
      'onValueChangeHourPicker itemValue, itemIndex',
      itemValue,
      itemIndex,
    );
    setHourPickerValue(itemValue);
  };

  const onValueChangeMinutePicker = (itemValue: any, itemIndex: number) => {
    console.log(
      'onValueChangeMinutePicker itemValue, itemIndex',
      itemValue,
      itemIndex,
    );
    setMinutePickerValue(itemValue);
  };

  const onValueChangeTimeSlotPicker = (itemValue: any, itemIndex: number) => {
    console.log(
      'onValueChangeTimeSlorPicker itemValue, itemIndex',
      itemValue,
      itemIndex,
    );
    setTimeSlotPickerValue(itemValue);
  };

  const registerTimeFilter = () => {
    setVisibleTimeFilterModal(false);
    if (timeSlotPickerValue === '오전') {
      const formattedHourPickerValue =
        hourPickerValue < 10 ? '0' + hourPickerValue : hourPickerValue;
      const formattedTime =
        formattedHourPickerValue + ':' + minutePickerValue + ':00';

      if (timeFilter !== formattedTime) {
        dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));
        filterDental(
          searchedKeyword,
          dayFilter,
          formattedTime,
          parkingFilter,
          holidayFilter,
        );
      }
    } else if (timeSlotPickerValue == '오후') {
      const formattedTime =
        Number(hourPickerValue) + 12 + ':' + minutePickerValue + ':00';
      dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));

      if (timeFilter !== formattedTime) {
        dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));
        filterDental(
          searchedKeyword,
          dayFilter,
          formattedTime,
          parkingFilter,
          holidayFilter,
        );
      }
    }
  };

  const moveToDentalDetail = (dentalId: number) => {
    navigation.navigate('DentalClinicStack', {
      screen: 'DentalDetailScreen',
      params: {
        dentalId: dentalId,
      },
    });
  };

  const onEndReachedDentalFlat = () => {
    if (!noMoreDentalData && !loadingMoreDental) {
      setLoadingMoreDental(true);
      offset = offset + 20;
      getMoreDentalList();
    }
  };

  const onRefreshDentalFlat = () => {
    setRefreshingDentalFlat(true);
    setRefreshingDentalFlat(false);
  };


  const renderFooterIndicator = () => {
    if (loadingMoreDental) {
      return (
        <FooterIndicatorContainer>
          <ActivityIndicator />
        </FooterIndicatorContainer>
      );
    } else {
      return <FooterIndicatorContainer style={{height: 10}} />;
    }
  };

  const renderDentalItem = ({item, index}: any) => {
    const isLunchTime = item.lunchTimeNow == 1 ? true : false;
    const isOpen = item.conclustionNow == 1 ? true : false;
    const rating = item.reviewAVGStarRate ? item.reviewAVGStarRate : '평가없음';

    let todayStartTime = '';
    let todayEndTime = '';

    if (todayIndex === 0) {
      todayStartTime = item.Sun_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Sun_Consulation_end_time?.slice(0, 5);
    } else if (todayIndex === 1) {
      todayStartTime = item.Mon_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Mon_Consulation_end_time?.slice(0, 5);
    } else if (todayIndex === 2) {
      todayStartTime = item.Tus_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Tus_Consulation_end_time?.slice(0, 5);
    } else if (todayIndex === 3) {
      todayStartTime = item.Wed_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Wed_Consulation_end_time?.slice(0, 5);
    } else if (todayIndex === 4) {
      todayStartTime = item.Thu_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Thu_Consulation_end_time?.slice(0, 5);
    } else if (todayIndex === 5) {
      todayStartTime = item.Fri_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Fri_Consulation_end_time?.slice(0, 5);
    } else if (todayIndex === 6) {
      todayStartTime = item.Sat_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Sat_Consulation_end_time?.slice(0, 5);
    }
    return (
      <DentalListItem
        dentalObj={item}
        dentalId={item.id}
        isOpen={isOpen}
        isLunchTime={isLunchTime}
        name={item.originalName}
        address={item.address}
        rating={rating}
        reviewCount={item.reviewNum}
        lunchTime={item.lunchTime}
        openTime={todayStartTime}
        closeTime={todayEndTime}
        moveToDentalDetail={moveToDentalDetail}
      />
    );
  };

  const renderDayFilterItem = ({item, index}: any) => {
    if (index < 7) {
      return (
        <TouchableWithoutFeedback
          onPress={() => selectDayFilterItem(item, index)}>
          <DetailFilterItemContainer
            style={
              item.selected
                ? {backgroundColor: '#c4c4c4'}
                : {backgroundColor: '#ffffff'}
            }>
            <FilterItemText>{item.day + '요일'}</FilterItemText>
          </DetailFilterItemContainer>
        </TouchableWithoutFeedback>
      );
    } else if (index === 7) {
      return (
        <TouchableWithoutFeedback
          onPress={() => selectDayFilterItem(item, index)}>
          <DetailFilterItemContainer
            style={
              item.selected
                ? {backgroundColor: '#c4c4c4'}
                : {backgroundColor: '#ffffff'}
            }>
            <FilterItemText>{item.day}</FilterItemText>
          </DetailFilterItemContainer>
        </TouchableWithoutFeedback>
      );
    } else if (index > 7) {
      return (
        <DetailFilterItemContainer style={{opacity: 0}}>
          <FilterItemText>{item.day}</FilterItemText>
        </DetailFilterItemContainer>
      );
    } else {
      return <DetailFilterItemContainer />;
    }
  };

  return (
    <Container>
      <BodyContainer>
        {!isFocusedSearchInput && (
          <SearchResultContainer>
            <FilterListContainer>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {selectedDayList.indexOf('전체') !== -1 && (
                  <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                    <FilterItemContainer
                      style={{marginLeft: 16, backgroundColor: '#2998FF'}}>
                      <FilterItemText style={{color: '#ffffff'}}>
                        {'전체'}
                      </FilterItemText>
                    </FilterItemContainer>
                  </TouchableWithoutFeedback>
                )}
                {selectedDayList.length === 0 && (
                  <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                    <FilterItemContainer style={{marginLeft: 16}}>
                      <FilterItemText>{'방문일'}</FilterItemText>
                    </FilterItemContainer>
                  </TouchableWithoutFeedback>
                )}
                {selectedDayList.length === 1 &&
                  selectedDayList.indexOf('전체') === -1 && (
                    <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                      <FilterItemContainer
                        style={{marginLeft: 16, backgroundColor: '#2998FF'}}>
                        <FilterItemText style={{color: '#ffffff'}}>
                          {selectedDayList[0].day + '요일'}
                        </FilterItemText>
                      </FilterItemContainer>
                    </TouchableWithoutFeedback>
                  )}
                {selectedDayList.length > 1 &&
                  selectedDayList.indexOf('전체') === -1 && (
                    <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                      <FilterItemContainer
                        style={{marginLeft: 16, backgroundColor: '#2998FF'}}>
                        {selectedDayList.map((item: any, index: number) => {
                          if (index === 0) {
                            return (
                              <FilterItemText style={{color: '#ffffff'}}>
                                {item.day + '요일'}
                              </FilterItemText>
                            );
                          } else {
                            return (
                              <FilterItemText style={{color: '#ffffff'}}>
                                {', ' + item.day + '요일'}
                              </FilterItemText>
                            );
                          }
                        })}
                      </FilterItemContainer>
                    </TouchableWithoutFeedback>
                  )}
                <TouchableWithoutFeedback onPress={() => clickTimeFilter()}>
                  <FilterItemContainer
                    style={[
                      {marginLeft: 12},
                      timeFilter !== '' && {backgroundColor: '#2998FF'},
                    ]}>
                    <FilterItemText
                      style={timeFilter !== '' && {color: '#ffffff'}}>
                      {timeFilter ? timeFilter.slice(0, 5) : '방문시간'}
                    </FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => changeHolidayFilter()}>
                  <FilterItemContainer
                    style={[
                      {marginLeft: 12},
                      holidayFilter && {backgroundColor: '#2998FF'},
                    ]}>
                    <FilterItemText style={holidayFilter && {color: '#FFFFFF'}}>
                      {'일요일･공휴일 진료'}
                    </FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => changeParkingFilter()}>
                  <FilterItemContainer
                    style={[
                      {marginLeft: 12, marginRight: 16},
                      parkingFilter === 'y' && {backgroundColor: '#2998FF'},
                    ]}>
                    <FilterItemText
                      style={parkingFilter === 'y' && {color: '#FFFFFF'}}>
                      {'주차가능'}
                    </FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
              </ScrollView>
            </FilterListContainer>
            {searchedDentalArray.length > 0 && (
              <FlatList
                refreshing={refreshingDentalFlat}
                onRefresh={onRefreshDentalFlat}
                showsVerticalScrollIndicator={false}
                data={searchedDentalArray}
                renderItem={renderDentalItem}
                onEndReached={onEndReachedDentalFlat}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooterIndicator}
              />
            )}
            {searchedDentalArray.length === 0 && (
              <NoSearchedDentalContainer>
                <NoSearchedDentalText>
                  {'검색된 병원이 없습니다 ㅠㅠ'}
                </NoSearchedDentalText>
              </NoSearchedDentalContainer>
            )}
          </SearchResultContainer>
        )}
      </BodyContainer>
      <Modal
        isVisible={visibleDayFilterModal}
        style={styles.dayFilterModalView}
        onBackdropPress={() => cancelDayFilter()}
        swipeDirection={['down']}
        onSwipeComplete={() => setVisibleDayFilterModal(false)}
        backdropOpacity={0.25}>
        <DetailFilterModalContainer>
          <DetailFilterHeaderContainer>
            <TouchableWithoutFeedback onPress={() => cancelDayFilter()}>
              <DetailFilterHeaderLeftContainer>
                <DetailFilterCancelText>{'취소'}</DetailFilterCancelText>
              </DetailFilterHeaderLeftContainer>
            </TouchableWithoutFeedback>
            <DetailFilterTitleText>{'방문일 설정'}</DetailFilterTitleText>
            <TouchableWithoutFeedback onPress={() => registerDayFilter()}>
              <DetailFilterHeaderRightContainer>
                <DetailFilterRegisterText>{'저장'}</DetailFilterRegisterText>
              </DetailFilterHeaderRightContainer>
            </TouchableWithoutFeedback>
          </DetailFilterHeaderContainer>
          <DetailFilterListContainer>
            <FlatList
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginTop: 12,
              }}
              data={dayList}
              keyExtractor={(item, index) => `${index}`}
              numColumns={5}
              renderItem={renderDayFilterItem}
            />
          </DetailFilterListContainer>
        </DetailFilterModalContainer>
      </Modal>
      <Modal
        isVisible={visibleTimeFilterModal}
        style={styles.timeFilterModalView}
        onBackdropPress={() => cancelTimeFilter()}
        backdropOpacity={0.25}>
        <DetailFilterModalContainer>
          <DetailFilterHeaderContainer>
            <TouchableWithoutFeedback onPress={() => cancelTimeFilter()}>
              <DetailFilterHeaderLeftContainer>
                <DetailFilterCancelText>{'취소'}</DetailFilterCancelText>
              </DetailFilterHeaderLeftContainer>
            </TouchableWithoutFeedback>
            <DetailFilterTitleText>{'방문시간 설정'}</DetailFilterTitleText>
            <TouchableWithoutFeedback onPress={() => registerTimeFilter()}>
              <DetailFilterHeaderRightContainer>
                <DetailFilterRegisterText>{'저장'}</DetailFilterRegisterText>
              </DetailFilterHeaderRightContainer>
            </TouchableWithoutFeedback>
          </DetailFilterHeaderContainer>
          <TimeFilterModalContainer>
            <TimePickerContainer>
              <Picker
                selectedValue={hourPickerValue}
                onValueChange={(itemValue: any, itemIndex: number) =>
                  onValueChangeHourPicker(itemValue, itemIndex)
                }
                style={{width: wp('26%'), height: hp('26%')}}>
                <Picker.Item label={'1'} value="1" />
                <Picker.Item label={'2'} value="2" />
                <Picker.Item label={'3'} value="3" />
                <Picker.Item label={'4'} value="4" />
                <Picker.Item label={'5'} value="5" />
                <Picker.Item label={'6'} value="6" />
                <Picker.Item label={'7'} value="7" />
                <Picker.Item label={'8'} value="8" />
                <Picker.Item label={'9'} value="9" />
                <Picker.Item label={'10'} value="10" />
                <Picker.Item label={'11'} value="11" />
                <Picker.Item label={'12'} value="12" />
              </Picker>
              <TimePickerLabelText>{'시'}</TimePickerLabelText>
              <Picker
                style={{width: wp('26%'), height: hp('26%')}}
                onValueChange={(itemValue: any, itemIndex: number) =>
                  onValueChangeMinutePicker(itemValue, itemIndex)
                }
                selectedValue={minutePickerValue}>
                <Picker.Item label={'00'} value="00" />
                <Picker.Item label={'15'} value="15" />
                <Picker.Item label={'30'} value="30" />
                <Picker.Item label={'45'} value="45" />
              </Picker>
              <TimePickerLabelText>{'분'}</TimePickerLabelText>
              <Picker
                style={{width: wp('26%'), height: hp('26%')}}
                onValueChange={(itemValue: any, itemIndex: number) =>
                  onValueChangeTimeSlotPicker(itemValue, itemIndex)
                }
                selectedValue={timeSlotPickerValue}>
                <Picker.Item label={'오전'} value="오전" />
                <Picker.Item label={'오후'} value="오후" />
              </Picker>
            </TimePickerContainer>
          </TimeFilterModalContainer>
        </DetailFilterModalContainer>
      </Modal>
      <ActionSheet
        ref={timeFilterActionSheet}
        options={['취소', '수정하기', '삭제하기']}
        cancelButtonIndex={0}
        destructiveButtonIndex={2}
        onPress={(index: any) => onPressTimeFilterActionSheet(index)}
      />
      {loadingGetDental && (
        <TouchBlockIndicatorCover loading={loadingGetDental} />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  dayFilterModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  timeFilterModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default DentalSearchResultList;


/*

        <TouchableWithoutFeedback onPress={() => moveToDentalMap()}>
          <ViewDentalMapButton>
            <ViewDentalMapText>{'지도'}</ViewDentalMapText>
          </ViewDentalMapButton>
        </TouchableWithoutFeedback>
*/