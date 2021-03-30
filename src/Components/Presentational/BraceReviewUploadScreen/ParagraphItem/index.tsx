import React, {useRef} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ParaUnitContainer = Styled.View`
background-color: #ffffff;
border-width: 1px;
border-color: #f1f1f1;
border-radius: 8px;
padding: 16px;
`;

const EntireParaUnitContainer = Styled.View`
width: ${wp('100%')}px;
padding-bottom: 16px;
padding-left: 16px;
padding-right: 16px;
background-color: #F5F7F9;
`;

const AddImageContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const AddImageButton = Styled.View`
padding-top: 17px;
padding-bottom: 17px;
border-radius: 8px;
border-width: 1px;
border-color: #E2E6ED;
border-style: dashed;
align-items: center;
justify-content: center;
`;

const AddImageIcon = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const AddImageText = Styled.Text`
margin-left: 3px;
font-weight: 400;
font-size: 14px;
color: #9AA2A9;
`;

const ParaDescripInputContainer = Styled.View`
background-color: #ffffff;
padding-top: 14px;
`;

const ParaDescripInput = Styled.TextInput`
font-weight: 300;
font-size: 14px;
color: #2B2B2B;
`;

const ParaImage = Styled.Image`
width: ${wp('82.9%')}px;
height: ${wp('82.9%')}px;
border-radius: 8px;
`;

const ParaImageContainer = Styled.View`
`;

const SelectOrderContainer = Styled.View`
margin-top: 10px;
flex-direction: row;
align-items: center;

`;

const SelectOrderButton = Styled.View`
padding: 7px 9px 7px 9px;
background-color: #d1d1d1;
align-items: center;
justify-content: center;
border-radius: 100px;
`;

const SelectOrderText = Styled.Text`
font-size: 14px;
color: #ffffff;
font-weight: 300;
`;

const ImageActionContainer = Styled.View`
position: absolute;
top: 0px;
right: 0px;
padding-top: 16px;
padding-right: 16px;
`;

const ImageActionIcon = Styled.Image`
width: ${wp('8.53%')}px;
height: ${wp('8.53%')}px;
`;

const ImageOrderContainer = Styled.View`
position: absolute;
bottom: 0px;
left: 0px;
padding-bottom: 16px;
padding-left: 16px;
`;

const ImageOrderButton = Styled.View`
flex-direction: row;
padding: 5px 12px 5px 12px;
align-items: center;
border-radius: 100px;
background-color: #00000060;
`;

const ImageOrderText = Styled.Text`
font-weight: 400;
font-size: 16px;
line-height: 21.79px;
color: #ffffff;
`;

const ImageOrderChangeIcon = Styled.Image`
position: absolute;
right: 11;
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
tint-color: #FFFFFF;
`;

const ImageDateContainer = Styled.View`
position: absolute;
bottom: 0px;
left: 0px;
padding-bottom: 16px;
padding-left: 16px;
`;

const ImageDateButton = Styled.View`
flex-direction: row;
width: ${wp('27%')}px;
padding: 5px 12px 5px 12px;
align-items: center;
border-radius: 100px;
background-color: #00000060;
`;

const AddImageDateButton = Styled.View`
flex-direction: row;
padding: 5px 12px 5px 12px;
align-items: center;
border-radius: 100px;
background-color: #00000060;
`;

const ImageDateText = Styled.Text`
font-weight: 400;
font-size: 16px;
line-height: 21.79px;
color: #ffffff;
`;

const AddImageDateIcon = Styled.Image`
margin-left: 6px;
width: ${wp('3.466%')}px;
height: ${wp('3.466%')}px;
`;


const DeleteParaContainer = Styled.View`
position: absolute;
top: -${wp('2%')}px;
right: ${wp('2%')}px;
`;

const DeleteParaIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;


interface Props {
    item: any,
    index: number,
    clickInsertedImage: (index: number) => void,
    changeImageOrder: (order: string, index: number) => void,
    onPressAddImage: (index: number) => void,
    descripInputRef: any,
    onSubmitParaDescripInput: (
        text: string,
        index: number,
        type: string,
    ) => void,
    onChangeParaDescripInput: (text: string, index: number) => void,onFocusParaDescripInput: (index: number) => void,
    onPressImageDate: (index: number) => void,
    onLongPressPara: (index: number) => void,
}

const ParagraphItem = ({item, index, clickInsertedImage, changeImageOrder, onPressAddImage, descripInputRef, onSubmitParaDescripInput, onChangeParaDescripInput, onFocusParaDescripInput, onPressImageDate, onLongPressPara}: Props) => {

    return (
      <TouchableWithoutFeedback onLongPress={() => onLongPressPara(index)} delayLongPress={250}>
      <EntireParaUnitContainer
      onLayout={(event) => {
        console.log("event.nativeEvent", event.nativeEvent);
      }}>
        <ParaUnitContainer style={styles.paragraphUnitShadow}>
          {item.image && (
            <ParaImageContainer>
                <ParaImage
                  source={{
                    uri: item.image.uri,
                  }}
                />
                <TouchableWithoutFeedback onPress={() => clickInsertedImage(index)}>
                <ImageActionContainer>
                  <ImageActionIcon
                  source={require('~/Assets/Images/Upload/ic_imageAction.png')}/>
                </ImageActionContainer>
                </TouchableWithoutFeedback>
                <ImageDateContainer>
                  <TouchableWithoutFeedback onPress={() => {
                    onPressImageDate(index)
                  }}>
                  <View>
                      {item.imgDate === null && (
                        <AddImageDateButton>
                        <ImageDateText>{"날짜 추가"}</ImageDateText>
                        <AddImageDateIcon
                        style={{tintColor: "#FFFFFF"}}
                        source={require('~/Assets/Images/Upload/ic_addImageDate.png')}/>
                        </AddImageDateButton>
                      )}
                      {item.imgDate !== null && (
                        <ImageDateButton>
                        <ImageDateText>
                          {item.imgDate.imageDateDisplay}
                        </ImageDateText>
                        <ImageOrderChangeIcon
                        source={require('~/Assets/Images/Upload/ic_orderChange.png')}/>
                        </ImageDateButton>
                      )}
                      </View>
                    </TouchableWithoutFeedback>
                </ImageDateContainer>
            </ParaImageContainer>
          )}
          {!item.image && (
            <TouchableWithoutFeedback onPress={() => onPressAddImage(index)} onLongPress={() => onLongPressPara(index)} delayLongPress={250}>
              <AddImageButton>
                <AddImageContainer>
                  <AddImageIcon
                    source={require('~/Assets/Images/Upload/ic_addImage.png')}
                  />
                  <AddImageText>사진 추가하기(선택)</AddImageText>
                </AddImageContainer>
              </AddImageButton>
            </TouchableWithoutFeedback>
          )}
          <ParaDescripInputContainer>
          <ParaDescripInput
            ref={descripInputRef}
            value={item.description ? item.description : ''}
            multiline={true}
            placeholder={'내용을 입력해 주세요.'}
            placeholderTextColor={'#E2E6ED'}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            onSubmitEditing={(response: any) =>
              onSubmitParaDescripInput(
                response.nativeEvent.text,
                index,
                'submit',
              )
            }
            onEndEditing={(response: any) =>
              onSubmitParaDescripInput(response.nativeEvent.text, index, 'end')
            }
            onChangeText={(text: string) =>
              onChangeParaDescripInput(text, index)
            }
            onFocus={() => onFocusParaDescripInput(index)}
          />
          </ParaDescripInputContainer>
        </ParaUnitContainer>
      </EntireParaUnitContainer>
      </TouchableWithoutFeedback>
    );
};

const isEqual = (prevItem: any, nextItem: any) => {
    return prevItem.item === nextItem.item && prevItem.item.image === nextItem.item.image;
}

const MemoizedParagraphItem = React.memo(ParagraphItem, isEqual)

export default ParagraphItem;

const styles = StyleSheet.create({
  paragraphUnitShadow: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.09,
  },
});



// return (
//   <EntireParaUnitContainer
//   onLayout={(event) => {
//     console.log("event.nativeEvent", event.nativeEvent);
//   }}>
//     <ParaUnitContainer style={styles.paragraphUnitShadow}>
//       {item.image && (
//         <ParaImageContainer>
//             <ParaImage
//               source={{
//                 uri: item.image.uri,
//               }}
//             />
//             <TouchableWithoutFeedback onPress={() => clickInsertedImage(index)}>
//             <ImageActionContainer>
//               <ImageActionIcon
//               source={require('~/Assets/Images/Upload/ic_imageAction.png')}/>
//             </ImageActionContainer>
//             </TouchableWithoutFeedback>
//             <ImageOrderContainer>
//               <TouchableWithoutFeedback onPress={() => {
//                 if(item.order === 'before') {
//                   changeImageOrder('after', index);
//                 } else if(item.order === 'after') {
//                   changeImageOrder('before', index);
//                 }
//               }}>
//                 <ImageOrderButton>
//                   <ImageOrderText>{item.order === 'before' ? '전' : (item.order ==='after' ? '후' : '')}</ImageOrderText>
//                   <ImageOrderChangeIcon
//                   source={require('~/Assets/Images/Upload/ic_orderChange.png')}/>
//                 </ImageOrderButton>
//                 </TouchableWithoutFeedback>
//             </ImageOrderContainer>
//         </ParaImageContainer>
//       )}
//       {!item.image && (
//         <TouchableWithoutFeedback onPress={() => onPressAddImage(index)}>
//           <AddImageButton>
//             <AddImageContainer>
//               <AddImageIcon
//                 source={require('~/Assets/Images/Upload/ic_addImage.png')}
//               />
//               <AddImageText>사진 추가하기(선택)</AddImageText>
//             </AddImageContainer>
//           </AddImageButton>
//         </TouchableWithoutFeedback>
//       )}
//       <ParaDescripInputContainer>
//       <ParaDescripInput
//         ref={descripInputRef}
//         value={item.description ? item.description : ''}
//         multiline={true}
//         placeholder={'내용을 입력해 주세요.'}
//         placeholderTextColor={'#E2E6ED'}
//         autoCapitalize={'none'}
//         autoCompleteType={'off'}
//         onSubmitEditing={(response: any) =>
//           onSubmitParaDescripInput(
//             response.nativeEvent.text,
//             index,
//             'submit',
//           )
//         }
//         onEndEditing={(response: any) =>
//           onSubmitParaDescripInput(response.nativeEvent.text, index, 'end')
//         }
//         onChangeText={(text: string) =>
//           onChangeParaDescripInput(text, index)
//         }
//         onFocus={() => onFocusParaDescripInput(index)}
//       />
//       </ParaDescripInputContainer>
//     </ParaUnitContainer>
//   </EntireParaUnitContainer>
// );
