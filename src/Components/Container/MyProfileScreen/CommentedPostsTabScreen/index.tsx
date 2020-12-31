import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
//Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import PersonalPostsScreen from '~/Components/Presentational/MyProfileScreen/PersonalPostsScreen';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
// Method
// Routes

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const CommentedPostsTabScreen = ({navigation, route}: Props) => {
  const headerLeftAction = () => {
    navigation.goBack();
  };
  return (
    <ContainerView>
      <NavigationHeader
        headerLeftProps={{
          onPress: headerLeftAction,
          text: 'arrow',
        }}
        headerTitle="댓글 단 글"
      />
      <PersonalPostsScreen />
    </ContainerView>
  );
};

export default CommentedPostsTabScreen;
