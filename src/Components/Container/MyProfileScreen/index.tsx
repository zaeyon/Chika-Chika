import React, {useState, useEffect} from 'react';

import MyProfile from '~/Components/Presentational/MyProfileScreen';
interface Props {
  navigation: any;
  route: any;
}

const MyProfileScreen = ({navigation, route}: Props) => {
  return <MyProfile navigation={navigation} route={route} />;
};

export default MyProfileScreen;
