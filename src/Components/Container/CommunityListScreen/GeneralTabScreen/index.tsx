import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

interface Props {
    navigation: any,
    route: any,
}


const GeneralTabScreen = ({navigation, route}: Props) => {
   

    return (
        <ContainerView>
            
        </ContainerView>
    )
}

export default GeneralTabScreen;