import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styled from 'styled-components/native';
import {
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Platform,
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

const BannerImage = Styled.Image`
flex: 1;
width: ${wp('100%')}px;
`;

const IconCellContainerView = Styled.View`
flex-direction: row;
justify-content: space-around;
margin: 21px 0px;
padding: 22px 0px;
`;

const IconCellContentView = Styled.View`
align-items: center;
`;

const IconCellImage = Styled.Image``;

const IconCellText = Styled.Text`
margin-top: 9px;
`;


const HomeInfoContent = () => {
  const [bannerList, setBannerList] = useState([
    require('~/Assets/Images/Banner/home_banner.png')
  ])

  const [iconCellList, setIconCellList] = useState([
    {
      text: '교정전문의',
      source: require('~/Assets/Images/Home/ic_dental_specialist.png'),
    },
    {
      text: '착한의사',
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
      <BannerImage
      style={{
        resizeMode: 'cover'
      }}
      source={item}/>
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
          <IconCellContentView>
            <IconCellImage source={item.source}/>
            <IconCellText>
              {item.text}
            </IconCellText>
          </IconCellContentView>
        ))}
      </IconCellContainerView>
      </ContentView>
    </ContainerView>
  )
}

export default HomeInfoContent