import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styled from 'styled-components/native';
import {
  LayoutAnimation,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const ContainerView = Styled.View`
flex: 1;
background: #F5F7F9;
`;

const ContentView = Styled.View`
flex: 1;
border-bottom-left-radius: 32px;
border-bottom-right-radius: 32px;
background: #FFFFFF;
`;

const BannerFlatList = Styled.FlatList`
`;

const BannerContainerView = Styled.View`
width: ${wp('100%')}px;
height: ${wp('50%')}px;
padding: 16px 16px;
flex: 1;
`;

const BannerImage = Styled.Image`
flex: 1;
width: 100%;
`;

const IconCellContainerView = Styled.View`
flex-direction: row;
justify-content: space-around;
margin: 11px 0px;
padding: 22px 0px;
`;

const IconCellContentView = Styled.View`
align-items: center;
`;

const IconCellImage = Styled.Image``;

const IconCellText = Styled.Text`
margin-top: 9px;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 18px;
color: #000000;
`;

interface Props {
  moveToEventDetail: () => void,
  moveToFilteredDentalMap: (filterType: string) => void,
}


const HomeInfoContent = ({moveToEventDetail, moveToFilteredDentalMap}: Props) => {
  const [bannerList, setBannerList] = useState([
    require('~/Assets/Images/Home/banner_01.png')
  ])

  const [iconCellList, setIconCellList] = useState([
    {
      text: '교정 전문의',
      source: require('~/Assets/Images/Home/ic_dental_specialist.png'),
    },
    {
      text: '좋은 치과',
      source: require('~/Assets/Images/Home/ic_good_dentist.png')
    },
    {
      text: '야간진료',
      source: require('~/Assets/Images/Home/ic_evening.png'),
    },
  ]
  )

  const renderBannerImage = useCallback(({item, index}) => {
    return (
      <TouchableWithoutFeedback onPress={() => moveToEventDetail()}>
      <BannerContainerView>
      <BannerImage
        style={{
          resizeMode: 'contain'
        }}
      source={item}/>
      </BannerContainerView>
      </TouchableWithoutFeedback>
    )
  }, []);


  return (
    <ContainerView>
      <ContentView>
      <BannerFlatList
        data={bannerList}
        renderItem={renderBannerImage}
        keyExtractor={(item, index) => String(index)}
        horizontal
        alwaysBounceHorizontal={false}
      />
      <IconCellContainerView>
        {iconCellList.map((item, index) => (
          <TouchableOpacity style={{
            width: wp('20%'),
            justifyContent: 'flex-end',
          }}  key={String(index)} onPress={() => moveToFilteredDentalMap(item.text)}>
          <IconCellContentView>
            <IconCellImage source={item.source} style={{
              marginLeft: index === 1 ? 3: 0,
              marginRight:  index === 0 ? 5: 0, 
            }}/>
            <IconCellText>
              {item.text}
            </IconCellText>
          </IconCellContentView>
          </TouchableOpacity>
        ))}
      </IconCellContainerView>
      </ContentView>
    </ContainerView>
  )
}

export default HomeInfoContent