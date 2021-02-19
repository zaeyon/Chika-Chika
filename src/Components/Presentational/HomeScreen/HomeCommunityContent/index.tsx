import React, {useEffect, useState, useCallback} from 'react';
import Styled from 'styled-components/native';
import CarouselContent from '~/Components/Container/CommunityListScreen/CarouselContent';

const ContainerView = Styled.View`
width: 100%;
height: auto;
margin-bottom: 16px;
`;

const ContentTitleText = Styled.Text`
font-weight: bold;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;

interface Props {
  selectedHometown: string;
  postData: any;
  moveToCommunityDetail: any;
  moveToAnotherProfile: any;
}

const HomeCommunityContent = ({
  selectedHometown,
  postData,
  moveToCommunityDetail,
  moveToAnotherProfile,
}: Props) => {
  return (
    <ContainerView>
      <CarouselContent
        postData={postData}
        titleText={`💬 최근 올라온 ${selectedHometown} 소통글`}
        moveToCommunityDetail={moveToCommunityDetail}
        moveToAnotherProfile={moveToAnotherProfile}
      />
    </ContainerView>
  );
};

export default HomeCommunityContent;
