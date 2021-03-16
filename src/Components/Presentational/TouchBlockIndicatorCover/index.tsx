import React from 'react';
import Styled from 'styled-components/native';
import {ActivityIndicator, Modal} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
background: #00000030;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
align-items: center;
justify-content: center;
`;

const EmptyContainer = Styled.View`
`;

interface Props {
  loading: boolean;
}

const TouchBlockIndicatorCover = ({loading}: Props) => {
    return (
      <Modal transparent={true} visible={loading}>
      <Container>
        <ActivityIndicator color={'#ffffff'} />
      </Container>
      </Modal>
    );

};

export default TouchBlockIndicatorCover;
