import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {TouchableWithoutFeedback, FlatList, ScrollView, Keyboard, StyleSheet, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Component
import DentalCollapsibleTabView from '~/Components/Presentational/DentalDetailScreen/DentalCollapsibleTabView';
import DentalBottomBar from '~/Components/Presentational/DentalDetailScreen/DentalBottomBar';
import ReviewItem from '~/Components/Presentational/ReviewItem';
import {callPhoneNumber} from '~/method/callPhoneNumber';


const Container = Styled.View`
 flex: 1;
`;

interface Props {
    navigation: any,
    route: any,
}


const DentalDetailScreen = ({navigation, route}: Props) => {


    /*
    const getDentalLocationMap = () => {
        axios
        .get(`https://naveropenapi.apigw.ntruss.com/map-static/v2/raster?w=300&h=300&center=127.1054221,37.3591614&level=16`,
        {
            headers: {
              "X-NCP-APIGW-API-KEY-ID": "htnc7h3vi5",
              "X-NCP-APIGW-API-KEY": "6uL7bf7tRgcDr9a3IS70fiufg647gVXxlTVoctIO",
            }
        })
        .then((response) => {
            console.log("getDentalLocationMap response", response)

        })
        .catch((error) => {
            console.log("getDentalLocationMap error", error)

        })
    }
    */

    const moveToDentalInfoEdit = () => {
        navigation.navigate("DentalInfoEditRequestScreen");
    }

    const goBack = () => {
        navigation.goBack()
    }
    
    return (
        <Container>
           <DentalCollapsibleTabView
           goBack={goBack}
           />
           <DentalBottomBar/>
        </Container>
    )
}

const styles = StyleSheet.create({
    certificationIconShadow: {
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 16,
        shadowOpacity: 0.05,
        
    }
})

export default DentalDetailScreen
