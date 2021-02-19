import React, {useEffect, useCallback, useState, useRef} from 'react';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Component
import ClinicItem from '~/Components/Presentational/HomeScreen/HomeClinicContent/ClinicItem';
const ContainerView = Styled.View`
width: 100%;
padding: 16px 0px;
margin-bottom: 16px;
`;

const ContentTitleText = Styled.Text`
font-weight: bold;
font-size:14px;
line-height: 24px;
color: #131F3C;
margin-bottom: 16px;
margin-left: 16px;
`;

interface Props {
  moveToClinicDetail: any;
  clinics: any;
}
const HomeClinicContent = ({moveToClinicDetail, clinics}: Props) => {
  const renderClinicItem = useCallback(
    ({item}: any) => <ClinicItem clinic={item} />,
    [],
  );
  return (
    <ContainerView>
      <ContentTitleText>{'🔥 우리 동네 인기 치과'}</ContentTitleText>
      <FlatList
        style={{
          overflow: 'visible',
        }}
        contentContainerStyle={{
          paddingRight: 16,
        }}
        snapToInterval={wp('85%') + 12}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        horizontal
        data={clinics}
        renderItem={renderClinicItem}
        keyExtractor={(item) => String(item.id)}
      />
    </ContainerView>
  );
};
export default React.memo(HomeClinicContent);
