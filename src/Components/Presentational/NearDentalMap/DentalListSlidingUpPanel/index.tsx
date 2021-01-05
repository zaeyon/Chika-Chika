import React, {useRef, useState} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import {
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';

import SlidingUpPanel from '~/Components/Presentational/NearDentalMap/DentalListSlidingUpPanel/SlidingUpPanel/SlidingUpPanel';

// Local Component
import DentalListItem from '~/Components/Presentational/DentalListItem';

const Container = Styled.View`
width: ${wp('100%')}px;
height: ${hp('100%')}px;
border-top-left-radius: 25px;
border-top-right-radius: 25px;
background-color: #ffffff;
`;

const ViewDentalContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
width: ${wp('100%')}px;
padding-top: 24px;
`;

const UpArrowIcon = Styled.Image`
width: ${wp('3.73%')}px;
height: ${wp('1.8%')}
`;

const ViewDentalText = Styled.Text`
margin-left: 6px;
font-size: 14px;
`;

const DentalListContainer = Styled.View`
background-color: #ffffff;
padding-bottom: ${hp('19%')}
`;

const TEST_DENTAL_LIST = [
  {
    name: '연세자연치과의원',
    address: '종로구 세종대로',
  },
  {
    name: '연세정인치과의원',
    address: '종로구 세문안로',
  },
  {
    name: '더스퀘워치과의원',
    address: '종로구 종로',
  },
  {
    name: '연세자연치과의원',
    address: '종로구 세종대로',
  },
  {
    name: '연세정인치과의원',
    address: '종로구 세문안로',
  },
  {
    name: '더스퀘워치과의원',
    address: '종로구 종로',
  },
  {
    name: '더스퀘워치과의원',
    address: '종로구 종로',
  },
];

interface Props {
  navigation: any;
  route: any;
}

const DentalListSidingUpPanel = ({navigation, route}: any) => {
  const [openDentalListPanel, setOpenDentalListPanel] = useState<boolean>(
    false,
  );
  const [dentalList, setDentalList] = useState<Array<object>>(TEST_DENTAL_LIST);
  const [allowDraggingPanel, setAllowDraggingPanel] = useState<boolean>(true);
  const [listIndex, setListIndex] = useState<number>(0);

  const pan = useRef<any>(new Animated.ValueXY()).current;
  const panelAnimatedValue = new Animated.Value(0);
  const panelRef = useRef<any>(null);

  const panelPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        return Animated.event([null, {dx: pan.x, dy: pan.y}], {
          useNativeDriver: false,
        })(evt, gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        return Animated.event([null, {dx: pan.x, dy: pan.y}], {
          useNativeDriver: false,
        })(evt, gestureState);
      },

      onPanResponderRelease: (evt, gestureState) => {
        console.log('release evt', evt);
        console.log('release gestureState', gestureState);

        if (!openDentalListPanel) {
          if (gestureState.dy < 0) {
            console.log('병원목록 보이기');
            slidingUpPanel();
          }
        }
      },
    }),
  ).current;

  const slidingUpPanel = () => {
    setAllowDraggingPanel(false);
  };

  const slidingDownPanel = () => {
    setAllowDraggingPanel(true);
  };

  const changeListIndex = (index: number) => {
    setListIndex(index);
  };

  const dragDentalPanel = (gestureState) => {
    console.log('dragDentalPanel');
  };

  const renderDentalItem = ({item, index}: any) => {
    return (
      <DentalListItem
        name={item.name}
        address={item.address}
        navigation={navigation}
        route={route}
      />
    );
  };

  return (
    <SlidingUpPanel
      allowMomentum={false}
      allowDragging={allowDraggingPanel}
      ref={panelRef}
      draggableRange={{top: hp('90%'), bottom: hp('14%')}}
      slidingUpPanel={slidingUpPanel}
      slidingDownPanel={slidingDownPanel}
      listIndex={listIndex}
      dragDentalPanel={dragDentalPanel}>
      <Container>
        <ViewDentalContainer>
          <UpArrowIcon
            source={require('~/Assets/Images/DentalMap/ic_upArrow.png')}
          />
          <ViewDentalText>{'병원 목록 모두보기'}</ViewDentalText>
        </ViewDentalContainer>
        <DentalListContainer>
          <FlatList
            onScroll={(e) => {
              let offset = e.nativeEvent.contentOffset.y;
              let index = Math.ceil(offset / wp('50%'));
              console.log('DentalList FlatList index', index);
              setListIndex(index);
              if (index == -0 || index == 0) {
                setAllowDraggingPanel(true);
              } else {
                setAllowDraggingPanel(false);
              }
            }}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            data={dentalList}
            renderItem={renderDentalItem}
            contentContainerStyle={{paddingBottom: hp('5%')}}
          />
        </DentalListContainer>
      </Container>
    </SlidingUpPanel>
  );
};

const styles = {
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragHandler: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
};

export default DentalListSidingUpPanel;
