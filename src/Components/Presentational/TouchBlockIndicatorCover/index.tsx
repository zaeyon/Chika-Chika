import React from 'react';
import Styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
position: absolute;
background-color: #00000030;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
align-items: center;
justify-content: center;
z-index: 10;
`;

const EmptyContainer = Styled.View`
`;

interface Props {
  loading: boolean;
}

const TouchBlockIndicatorCover = ({loading}: Props) => {
  if (loading) {
    return (
      <Container>
        <ActivityIndicator color={'#ffffff'} />
      </Container>
    );
  } else {
    return <EmptyContainer />;
  }
};

export default TouchBlockIndicatorCover;
