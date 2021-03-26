import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableHighlight} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import NavigationHeader from '~/Components/Presentational/NavigationHeader'
const ContainerView = Styled.View`
flex: 1;
background: #FFFFFF;
`;

const BodyContainerView = Styled.View`
flex: 1;
background: #F5F7F9;
`
const SectionContainerView = Styled.View`
background: #F5F7F9;
`;

const SectionTitleText = Styled.Text`
font-style: normal;
font-weight: 800;
font-size: 16px;
line-height: 24px;
color: #131F3C;
margin: 16px 16px;
`;

const SectionContentView = Styled.View`
width: 100%;
padding: 16px 16px;
flex-direction: row;
align-items: center;
background: #FFFFFF;
`;

const SectionContentText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
`;

const SectionPartitionView = Styled.View`
width: auto;
margin: 0px 16px;
height: 0.5px;
background: #E2E6ED
`;

const SectionImage = Styled.Image`
margin-left: auto;
`;

const TermsAndPoliciesTabScreen = ({navigation, route}: any) => {
  const [sectionArrow, setSectionArrow] = useState(
    require('~/Assets/Images/MyPage/EditProfile/Section/profile_edit_section_arrow.png'),
  );
  return (
    <ContainerView as={SafeAreaView}>
        <NavigationHeader
        inSafeAreaView={true}
        headerLeftProps={{
            type: 'arrow',
            onPress: () => navigation.goBack()
        }}
        headerTitle="약관 및 정책"
        />
        <BodyContainerView>
      <SectionContainerView>
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() => navigation.navigate('TermsOfServiceScreen')}>
          <SectionContentView>
            <SectionContentText>{'서비스 이용약관'}</SectionContentText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
        <SectionPartitionView />
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
          <SectionContentView>
            <SectionContentText>{'개인정보 처리방침'}</SectionContentText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
        <SectionPartitionView />
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="black"
          onPress={() => navigation.navigate('LocationInfoTermsOfUseScreen')}>
          <SectionContentView>
            <SectionContentText>{'위치정보 이용약관'}</SectionContentText>
            <SectionImage source={sectionArrow} />
          </SectionContentView>
        </TouchableHighlight>
      </SectionContainerView>
      </BodyContainerView>
    </ContainerView>
  );
};

export default TermsAndPoliciesTabScreen;
