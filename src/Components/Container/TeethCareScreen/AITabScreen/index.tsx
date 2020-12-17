import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';

//Local Components
import AIScreen from '~/Components/Presentational/TeethCareScreen/AIScreen';
const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

interface Props {
  navigation: any;
  route: any;
}

const AITabScreen = ({navigation, route}: Props) => {
  return (
    <Container>
      <AIScreen navigation={navigation} route={route} />
    </Container>
  );
};

export default AITabScreen;
