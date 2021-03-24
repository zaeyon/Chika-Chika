import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
import {NavigationContainer} from '@react-navigation/native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
//import DeviceInfo from 'react-native-device-info';
import {hasNotch} from '~/method/deviceInfo'
import {useSelector} from 'react-redux';

// Local Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

// route
import GETDentalNameSearch from '~/Routes/Search/GETDentalNameSearch';

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

const SearchContainer = Styled.View`
 width: ${wp('100%')}px;
 padding: 12px 16px 12px 16px;
 background-color: #F5F7F9;
`;

const BodyContainer = Styled.View`
align-items: center;
padding-bottom: ${hasNotch() ? hp('3%') : hp('14%')}px;
`;

const SearchInputContainer = Styled.View`
border-radius: 8px;
background-color: #ffffff;
flex-direction: row;
align-items: center;
padding-left: 8px;
padding-right: 8px;
`;

const SearchIcon = Styled.Image`
width: ${wp('5.3%')}px;
height: ${wp('5.3%')}px;
`;

const SearchTextInput = Styled.TextInput`
background-color: #ffffff;
margin-left: 8px;
font-weight: 400;
font-size: 14px;
padding-top: 5px;
padding-bottom: 5px;

`;

const DentalListContainer = Styled.View`
`;

const DentalClinicItemContainer = Styled.View`
width: ${wp('100%')}
padding-left: 16px;
padding-top: 16px;
padding-right: 16px;
`;

const DentalClinicNameText = Styled.Text`
font-weight: 700;
font-size: 14px;
color: #131F3C;
line-height: 16px;
`;

const DentalClinicAddressText = Styled.Text`
margin-top: 4px;
font-weight: 400;
font-size: 12px;
color: #9AA2A9;
line-height: 16px;
`;

const HorizontalDivider = Styled.View`
margin-top: 16px;
height: 1px;
background-color: #F5F7F9;
`;


interface Props {
  navigation: any;
  route: any;
}

interface Dental {
  name: string;
  address: string;
  id: number;
}

let inputText = "";

const DentalNameSearchScreen = ({navigation, route}: Props) => {
  const [autoCompletedDentalList, setAutoCompletedDentalList] = useState<
    Array<Dental>
  >([]);
  const jwtToken = useSelector((state: any) => state.currentUser).jwtToken;

  const goBack = () => {
    navigation.goBack();
  };

  const onPressDentalClinicItem = (selectedDental: object) => {
    if (route.params?.requestPage === 'metadata') {
      navigation.navigate('ReviewMetaDataScreen', {
        dentalObj: selectedDental,
      });
    } else if (route.params?.requestPage === 'content') {
      navigation.navigate('ContentPostScreen', {
        dentalClinic: selectedDental,
      });
    }
  };

  const renderDentalClinicItem = ({item, index}: any) => {
    console.log("renderDentalClinicItem item", item);
    return (
      <TouchableWithoutFeedback onPress={() => onPressDentalClinicItem(item)}>
        <DentalClinicItemContainer>
          <DentalClinicNameText>{item.originalName}</DentalClinicNameText>
          <DentalClinicAddressText>{item.address}</DentalClinicAddressText>
          <HorizontalDivider/>
        </DentalClinicItemContainer>
      </TouchableWithoutFeedback>
    );
  };

  const onChangeDentalInput = (keyword: string) => {
    
    inputText = keyword;

    if (keyword.trim() === '') {
      setAutoCompletedDentalList([]);
    } else {
    
      GETDentalNameSearch({jwtToken, keyword})
        .then(function (response: any) {
          
          if(keyword === inputText) {
            setAutoCompletedDentalList(response);
          }
        })
        .catch(function (error: any) {
          console.log('GETDentalNameSearch error', error);
        });
    }
  };

  return (
    <Container>
      <NavigationHeader
      headerLeftProps={{type: 'arrow', onPress: goBack}}
      headerTitle={"병원 선택"}/>
      <SearchContainer
      style={styles.searchInputShadow}>
        <SearchInputContainer>
          <SearchIcon
            style={{tintColor: "#4E525D"}}
            source={require('~/Assets/Images/Search/ic_search.png')}
          />
          <SearchTextInput
            selectionColor={"#00D1FF"}
            autoCapitalize={'none'}
            autoFocus={true}
            placeholder={'병원 이름을 검색하세요.'}
            placeholderTextColor={'#9AA2A9'}
            onChangeText={(text: string) => onChangeDentalInput(text)}
          />
        </SearchInputContainer>
      </SearchContainer>
      <BodyContainer>
        <DentalListContainer>
          <FlatList
            keyboardDismissMode={"on-drag"}
            contentContainerStyle={{paddingTop: 5, paddingBottom: hp('7%')}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
            data={autoCompletedDentalList}
            renderItem={renderDentalClinicItem}
          />
        </DentalListContainer>
      </BodyContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  searchInputShadow: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 12,
    shadowOpacity: 0.1,
  }
})

export default DentalNameSearchScreen;
