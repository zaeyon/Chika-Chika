import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//
import HomeContentContainerView from '~/Components/Presentational/HomeScreen/HomeContentContainerView';

const ContainerView = Styled.View`
padding: 0px 16px;
margin-bottom: 21px;
`;

const ContainerHeaderView = Styled.View`
flex-direction: row;
margin-bottom: 21px;
`;

const ContainerTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 24px;
color: #131F3C;
`;

const ContainerFlatList = Styled.FlatList`
overflow: visible;
`;

const ItemContainerView = Styled.View`
width: ${wp('79%')}px;
height: ${wp('32%')}px;
flex: 1;
border-radius: 8px;
margin-left: 16px;
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
flex-direction: row;
`;

const ItemContentImage = Styled.Image`
background: #F5F7F9;
width: ${wp('32%')}px;
height: ${wp('32%')}px;
border-top-left-radius: 8px;
border-bottom-left-radius: 8px;
`;

const ItemContentDescriptionView = Styled.View`
padding: 16px 12px;
flex: 1;
`;

const ItemContentTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 15px;
line-height: 16px;
color: #131F3C;
margin-bottom: 7px;
margin-right: auto;
`;

const ItemContentText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 13px;
margin: 3px 0px;
color: #9AA2A9;
margin-right: auto;
`;

const PlaceHolderContainerView = Styled.View`
width: auto;
padding: 59px 65px;
background: #FFFFFF;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
border-radius: 12px;
`;

const PlaceHolderContentView = Styled.View`
align-items: center;
justify-content: center;
margin-bottom: 12px;
`;

const PlaceHolderImage = Styled.Image`
margin-bottom: 5px;
`;

const PlaceHolderText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
color: #131F3C;
text-align: center;
`;

const ReviewStatusView = Styled.View`
flex-direction: row;
align-items: center;
margin-bottom: -4px;
margin-top: auto;
`;

const ReviewStatusText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 24px;
color: #9AA2A9;
margin-left: 2px;
margin-right: 16px;
`;

const ViewMoreView = Styled.View`
padding: 8px 16px 8px 8px;
margin: -8px -16px -8px auto;
`;

const ViewMoreImage = Styled.Image`
`;

const ReviewStatusImage = Styled.Image``;

interface Props {
  initialized: boolean;
  clinics: any;
  moveToDentalMap: (filterType: string) => void;
  moveToDentalDetail: (dentalId: number) => void;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeOpenedClinicContent = ({
  initialized,
  clinics,
  moveToDentalMap,
  moveToDentalDetail,
}: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date(Date.now()));

  useEffect(() => {
    if (!initialized) {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'),
      );
    }
  }, [clinics]);

  const getCurrentTime = useCallback(() => {
    const currentDate = new Date(Date.now());
    const hours = currentDate.getHours();
    return hours > 12 ? `오후 ${hours - 12}시 기준` : `오전 ${hours}시 기준`;
  }, []);


  const renderPlaceHolder = useCallback(() => (
    <PlaceHolderContainerView>
      <PlaceHolderContentView>
        <PlaceHolderImage source={require('~/Assets/Images/Emoji/em_fearful.png')}/>
        <PlaceHolderText>
          {"우리동네에 지금\n진료중인 치과가 없네요"}
        </PlaceHolderText>
        </PlaceHolderContentView>
      </PlaceHolderContainerView>
    ),
    [],
  );

  const renderLocalClinicItem = useCallback(
    ({item, index}) => {
      return (
        <TouchableWithoutFeedback
          key={String(item.id)}
          onPress={() => moveToDentalDetail(item.id)}>
          <ItemContainerView
            style={
              !index && {
                marginLeft: 0,
              }
            }>
            <ItemContentImage
              source={item.dentalClinicProfileImgs.length ? {uri: item.dentalClinicProfileImgs[0]} : require('~/Assets/Images/Dental/default_clinic.png')}
            />
            <ItemContentDescriptionView>
              <ItemContentTitleText numberOfLines={1}>
                {item.originalName}
              </ItemContentTitleText>
              <ItemContentText numberOfLines={1}>
                {item.confidentConsulationTime
                  ? `평일 ${item[
                      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
                        currentDate.getDay()
                      ] + '_Consulation_start_time'
                    ].slice(0, 5)} - ${item[
                      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
                        currentDate.getDay()
                      ] + '_Consulation_end_time'
                    ].slice(0, 5)}`
                  : '평일 정보없음'}
              </ItemContentText>
              <ItemContentText numberOfLines={1}>
                {item.confidentTOL
                  ? `점심시간 ${item.weekday_TOL_start.slice(
                      0,
                      5,
                    )} - ${item.weekday_TOL_end.slice(0, 5)}`
                  : '점심시간 정보없음'}
              </ItemContentText>
              <ReviewStatusView>
                <ReviewStatusImage
                  source={require('~/Assets/Images/Review/ic_recommend_grey.png')}
                />
                <ReviewStatusText>{item.recommendNum}</ReviewStatusText>
                <ReviewStatusImage
                  source={require('~/Assets/Images/Review/ic_review_grey.png')}
                />
                <ReviewStatusText>{item.reviewNum}</ReviewStatusText>
              </ReviewStatusView>
            </ItemContentDescriptionView>
          </ItemContainerView>
        </TouchableWithoutFeedback>
      );
    },
    [clinics],
  );

  const renderLocalClinicItemSkeleton = useCallback(({item, index}) => {
    return (
      <ItemContainerView
        style={
          !index && {
            marginLeft: 0,
          }
        }>
        <ItemContentImage
          style={{
            aspectRatio: 1,
          }}
        />
        <ItemContentDescriptionView>
          <ItemContentTitleText
            numberOfLines={1}
            style={{
              backgroundColor: '#F5F7F9',
              color: '#F5F7F9',
            }}>
            {"치카치카치카치카치카"}
          </ItemContentTitleText>
          <ItemContentText
            numberOfLines={1}
            style={{
              backgroundColor: '#F5F7F9',
              color: '#F5F7F9',
            }}>
            {'치카치카치카치카'}
          </ItemContentText>
          <ItemContentText
            numberOfLines={1}
            style={{
              backgroundColor: '#F5F7F9',
              color: '#F5F7F9',
            }}>
            {'치카치카치카치카'}
          </ItemContentText>
        </ItemContentDescriptionView>
      </ItemContainerView>
    );
  }, []);

  return (
    <ContainerView>
      <ContainerHeaderView>
        <ContainerTitleText>{'지금 진료중인 치과'}</ContainerTitleText>
        <TouchableWithoutFeedback onPress={() => moveToDentalMap("진료중")}>
          <ViewMoreView>
          <ViewMoreImage source={require('~/Assets/Images/Home/ic_arrow_right.png')}/>
          </ViewMoreView>
        </TouchableWithoutFeedback>
      </ContainerHeaderView>
      {initialized && clinics.length === 0 ? renderPlaceHolder() : 
      <ContainerFlatList
        horizontal
        data={clinics.length ? clinics : [0, 1]}
        renderItem={clinics.length ? renderLocalClinicItem : renderLocalClinicItemSkeleton}
        snapToInterval={wp('79%') + 16}
        keyExtractor={(item, index) => String(index)}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
      />}
    </ContainerView>
  );
};

export default React.memo(HomeOpenedClinicContent);
