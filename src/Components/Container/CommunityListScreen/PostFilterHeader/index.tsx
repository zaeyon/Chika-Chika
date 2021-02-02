import React, {useState, useCallback} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContianerView = Styled.View`
width: ${wp('100%')}px;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 16px 0px;
`;

const OrderContentFocusedText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
color: #131F3C;
`;

const OrderContentView = Styled.View`
height: 100%;
padding: 0px 16px;
`;
const OrderContentUnFocusedText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
color: #9AA2A9;
`;

const OrderSplitView = Styled.View`
width: 1px;
height: 8px;
background: #E2E6ED;
`;

interface Props {
  order: string;
  setOrder: any;
}
const PostFilterHeader = ({order, setOrder}: Props) => {
  return (
    <ContianerView>
      <TouchableWithoutFeedback onPress={() => setOrder('popular')}>
        <OrderContentView>
          {order === 'popular' ? (
            <OrderContentFocusedText>{'인기순'}</OrderContentFocusedText>
          ) : (
            <OrderContentUnFocusedText>{'인기순'}</OrderContentUnFocusedText>
          )}
        </OrderContentView>
      </TouchableWithoutFeedback>
      <OrderSplitView />
      <TouchableWithoutFeedback onPress={() => setOrder('createdAt')}>
        <OrderContentView>
          {order === 'createdAt' ? (
            <OrderContentFocusedText>{'최신순'}</OrderContentFocusedText>
          ) : (
            <OrderContentUnFocusedText>{'최신순'}</OrderContentUnFocusedText>
          )}
        </OrderContentView>
      </TouchableWithoutFeedback>
    </ContianerView>
  );
};

export default PostFilterHeader;
