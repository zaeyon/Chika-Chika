import React, {useRef} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SlidingUpPanel from '~/Components/Presentational/TeethCareScreen/SymptomSlidingUpPanel/SlidingUpPanel/SlidingUpPanel';

const Container = Styled.View`
width: ${wp('100%')};
height: ${hp('100%')};
border-top-left-radius: 25px;
border-top-right-radius: 25px;
background-color: #ffffff;
border-width: 1px;
border-color: #f0f0f0;
`;

const UpArrowIcon = Styled.Image`
width: ${wp('3.73%')};
height: ${wp('1.8%')};
`;

const PanelHeaderTitleText = Styled.Text`
padding-top: 14px;
font-weight: 400;
color: #595959;
font-size: 16px;
`;

const PanelHeaderContainer = Styled.View`
width: ${wp('100%')};
flex-direction: column;
justify-content: center;
padding-top: 12px;
`;

const SymptomSlidingUpPanel = ({}) => {
    const panelRef = useRef<any>(null)

    return (
        <SlidingUpPanel
        backdropOpacity={0.2}
        ref={panelRef}
        draggableRange={{top: wp('100%'), bottom: wp('40%')}}>
        <Container>
        </Container>
        </SlidingUpPanel>
    )
}

export default SymptomSlidingUpPanel


