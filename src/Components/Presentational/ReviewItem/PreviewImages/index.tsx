import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 `;

const OneUnitImageContainer = Styled.View`
 width: ${wp('91.46%')}px;
 height: ${wp('93.32%')}px;
 border-radius: 8px;
 `;

const ImagesRowContainer = Styled.View`
 width: ${wp('91.46%')}px;
 flex-direction: row;
 justify-content: space-between;
 `;

const ImagesColumnContainer = Styled.View`
 width: ${wp('91.46%')}px;
 height: ${wp('79.72%')}px;
 flex-direction: column;
 justify-content: space-between;
 `;

const ImageContainer = Styled.View`
 `;

const FirstImageInOneUnit = Styled.Image`
 width: ${wp('91.46%')}px;
 height: ${wp('93.32%')}px;
 border-radius: 8px;
 background-color: #f6f6f6;
 `;

const TwoUnitImageContainer = Styled.View`
 width: ${wp('91.46%')}px;
 height: ${wp('45.13%')}px;
 border-radius: 8px;
 flex-direction: row;
 align-items: center;
 `;

const FirstImageInTwoUnit = Styled.Image`
 width: ${wp('45.13%')}px;
 height: ${wp('45.13%')}px;
 border-top-left-radius: 8px;
 border-bottom-left-radius: 8px;
 `;

const SecondImageInTwoUnit = Styled.Image`
 width: ${wp('45.13%')}px;
 height: ${wp('45.13%')}px;
 border-top-right-radius: 8px;
 border-bottom-right-radius: 8px;
 `;

const ManyUnitImageContainer = Styled.View`
 width: ${wp('91.46%')}px;
 height: ${wp('79.72%')}px;
 border-radius: 8px;
 `;

const MainImageInThreeUnit = Styled.Image`
 width: ${wp('91.46%')}px;
 height: ${wp('48.52%')}px;
 border-top-left-radius: 8px;
 border-top-right-radius: 8px;
 `;

const SubImageInThreeUnit = Styled.Image`
 width: ${wp('45.13%')}px;
 height: ${wp('30%')}px;
 border-bottom-left-radius: 8px;
 `;

const ThirdImageInThreeUnit = Styled.Image`
 margin-top: 5px;
 margin-left: 5px;
 width: ${wp('45.13%')}px;
 height: ${wp('30.8%')}px;
 border-bottom-right-radius: 8px;
 `;

const OrderTypeIndicator1 = Styled.View`
 position: absolute;
 top: 0;
 left: 0;
 width: ${wp('6.5%')}px;
 height: ${wp('6.5%')}px;
 background-color: #00000070;
 align-items: center;
 justify-content: center;
 border-top-left-radius: 8px;
 border-bottom-right-radius: 8px;
 `;

const OrderTypeIndicator2 = Styled.View`
 position: absolute;
 top: 0;
 left: 0;
 width: ${wp('6.5%')}px;
 height: ${wp('6.5%')}px;
 background-color: #00000070;
 align-items: center;
 justify-content: center;
 border-bottom-right-radius: 8px;
 `;

const OrderTypeText = Styled.Text`
 font-size: 13px;
 font-weight: 400;
 line-height: 16px;
 color: #ffffff;
 `;

const MainImageInFourUnit = Styled.Image`
 width: ${wp('91.46%')}px;
 height: ${wp('48.52%')}px;
 border-top-left-radius: 8px;
 border-top-right-radius: 8px;
 `;

const SubImageInFourUnit = Styled.Image`
 width: ${wp('29.6%')}px;
 height: ${wp('30.13%')}px;
 `;

const MainImageInFiveUnit = Styled.Image`
 width: ${wp('45.13%')}px;
 height: ${wp('48.46%')}px;
 `;

const SubImageInFiveUnit = Styled.Image`
 width: ${wp('29.6%')}px;
 height: ${wp('30.13%')}px;
 `;

const MainImageInSixUnit = Styled.Image`
 width: ${wp('60.53%')}px;
 height: ${wp('61.86%')}px;
 `;

const SubImageInSixUnit = Styled.Image`
 width: ${wp('29.6%')}px;
 height: ${wp('30.13%')}px;
 `;

const SixUnitImagesColumnContainer = Styled.View`
 flex-direction: column;
 justify-content: space-between;
 `;

const RemainCountCoverContainer = Styled.View`
 position: absolute;
 width: ${wp('29.6%')}px;
 height: ${wp('30.13%')}px;
 border-bottom-right-radius: 8px;
 background-color: #00000070;
 align-items: center;
 justify-content: center;
 `;

const RemainCountText = Styled.Text`
 font-weight: 700;
 font-size: 20px;
 color: #ffffff;
 `;

const MoreUnitImageContainer = Styled.View`
 width: ${wp('91.46%')}px;
 height: ${wp('93.32%')}px;
 border-radius: 8px;
`;

const MoreImagesRowContainer = Styled.View`
width: ${wp('91.46%')}px;
flex-direction: row;
justify-content: space-between;
`;

const MoreImagesColumnContainer = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('93.32%')}px;
flex-direction: column;
justify-content: space-between;
`;

interface Props {
  sortedImageArray: Array<any>;
}

const PreviewImages = ({sortedImageArray}: Props) => {
  const [remainCount, setRemainCount] = useState<number>(
    sortedImageArray.length - 6,
  );

  return (
    <Container>
      {sortedImageArray.length === 1 && (
        <OneUnitImageContainer>
          <ImageContainer>
            <FirstImageInOneUnit
              source={{uri: sortedImageArray[0].img_thumbNail}}
            />
            <OrderTypeIndicator1>
              <OrderTypeText>
                {sortedImageArray[0].img_before_after === 'before'
                  ? '전'
                  : '후'}
              </OrderTypeText>
            </OrderTypeIndicator1>
          </ImageContainer>
        </OneUnitImageContainer>
      )}
      {sortedImageArray.length === 2 && (
        <TwoUnitImageContainer>
          <ImagesRowContainer>
            <ImageContainer>
              <FirstImageInTwoUnit
                source={{uri: sortedImageArray[0].img_thumbNail}}
              />
              <OrderTypeIndicator1>
                <OrderTypeText>
                  {sortedImageArray[0].img_before_after === 'before'
                    ? '전'
                    : '후'}
                </OrderTypeText>
              </OrderTypeIndicator1>
            </ImageContainer>
            <ImageContainer>
              <SecondImageInTwoUnit
                source={{uri: sortedImageArray[1].img_thumbNail}}
              />
              <OrderTypeIndicator2>
                <OrderTypeText>
                  {sortedImageArray[1].img_before_after === 'before'
                    ? '전'
                    : '후'}
                </OrderTypeText>
              </OrderTypeIndicator2>
            </ImageContainer>
          </ImagesRowContainer>
        </TwoUnitImageContainer>
      )}
      {sortedImageArray.length === 3 && (
        <ManyUnitImageContainer>
          <ImagesColumnContainer>
            <ImageContainer>
              <MainImageInThreeUnit
                source={{uri: sortedImageArray[0].img_thumbNail}}
              />
              <OrderTypeIndicator1>
                <OrderTypeText>
                  {sortedImageArray[0].img_before_after === 'before'
                    ? '전'
                    : '후'}
                </OrderTypeText>
              </OrderTypeIndicator1>
            </ImageContainer>
            <ImagesRowContainer>
              <ImageContainer>
                <SubImageInThreeUnit
                  source={{uri: sortedImageArray[1].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[1].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
              <ImageContainer>
                <SubImageInThreeUnit
                  style={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 8,
                  }}
                  source={{uri: sortedImageArray[2].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[2].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
            </ImagesRowContainer>
          </ImagesColumnContainer>
        </ManyUnitImageContainer>
      )}
      {sortedImageArray.length === 4 && (
        <ManyUnitImageContainer>
          <ImagesColumnContainer>
            <ImageContainer>
              <MainImageInFourUnit
                source={{uri: sortedImageArray[0].img_thumbNail}}
              />
              <OrderTypeIndicator1>
                <OrderTypeText>
                  {sortedImageArray[0].img_before_after === 'before'
                    ? '전'
                    : '후'}
                </OrderTypeText>
              </OrderTypeIndicator1>
            </ImageContainer>
            <ImagesRowContainer>
              <ImageContainer>
                <SubImageInFourUnit
                  style={{borderBottomLeftRadius: 8}}
                  source={{uri: sortedImageArray[1].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[1].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
              <ImageContainer>
                <SubImageInFourUnit
                  source={{uri: sortedImageArray[2].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[2].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
              <ImageContainer>
                <SubImageInFourUnit
                  style={{borderBottomRightRadius: 8}}
                  source={{uri: sortedImageArray[3].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[3].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
            </ImagesRowContainer>
          </ImagesColumnContainer>
        </ManyUnitImageContainer>
      )}
      {sortedImageArray.length === 5 && (
        <ManyUnitImageContainer>
          <ImagesColumnContainer>
            <ImagesRowContainer>
              <ImageContainer>
                <MainImageInFiveUnit
                  style={{borderTopLeftRadius: 8}}
                  source={{uri: sortedImageArray[0].img_thumbNail}}
                />
                <OrderTypeIndicator1>
                  <OrderTypeText>
                    {sortedImageArray[0].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator1>
              </ImageContainer>
              <ImageContainer>
                <MainImageInFiveUnit
                  style={{borderTopRightRadius: 8}}
                  source={{uri: sortedImageArray[1].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[1].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
            </ImagesRowContainer>
            <ImagesRowContainer>
              <ImageContainer>
                <SubImageInFiveUnit
                  style={{borderBottomLeftRadius: 8}}
                  source={{uri: sortedImageArray[2].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[2].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
              <ImageContainer>
                <SubImageInFiveUnit
                  source={{uri: sortedImageArray[3].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[3].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
              <ImageContainer>
                <SubImageInFiveUnit
                  style={{borderBottomRightRadius: 8}}
                  source={{uri: sortedImageArray[4].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[4].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
            </ImagesRowContainer>
          </ImagesColumnContainer>
        </ManyUnitImageContainer>
      )}
      {sortedImageArray.length === 6 && (
        <MoreUnitImageContainer>
          <MoreImagesColumnContainer>
            <MoreImagesRowContainer>
              <ImageContainer>
                <MainImageInSixUnit
                  style={{borderTopLeftRadius: 8}}
                  source={{uri: sortedImageArray[0].img_thumbNail}}
                />
                <OrderTypeIndicator1>
                  <OrderTypeText>
                    {sortedImageArray[0].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator1>
              </ImageContainer>
              <SixUnitImagesColumnContainer>
                <ImageContainer>
                  <SubImageInSixUnit
                    style={{borderTopRightRadius: 8}}
                    source={{uri: sortedImageArray[1].img_thumbNail}}
                  />
                  <OrderTypeIndicator2>
                    <OrderTypeText>
                      {sortedImageArray[1].img_before_after === 'before'
                        ? '전'
                        : '후'}
                    </OrderTypeText>
                  </OrderTypeIndicator2>
                </ImageContainer>
                <ImageContainer>
                  <SubImageInSixUnit
                    source={{uri: sortedImageArray[2].img_thumbNail}}
                  />
                  <OrderTypeIndicator2>
                    <OrderTypeText>
                      {sortedImageArray[2].img_before_after === 'before'
                        ? '전'
                        : '후'}
                    </OrderTypeText>
                  </OrderTypeIndicator2>
                </ImageContainer>
              </SixUnitImagesColumnContainer>
            </MoreImagesRowContainer>
            <ImagesRowContainer>
              <ImageContainer>
                <SubImageInSixUnit
                  style={{borderBottomLeftRadius: 8}}
                  source={{uri: sortedImageArray[3].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[3].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
              <ImageContainer>
                <SubImageInSixUnit
                  source={{uri: sortedImageArray[4].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[4].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
              <ImageContainer>
                <SubImageInSixUnit
                  style={{borderBottomRightRadius: 8}}
                  source={{uri: sortedImageArray[5].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[5].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
            </ImagesRowContainer>
          </MoreImagesColumnContainer>
        </MoreUnitImageContainer>
      )}
      {sortedImageArray.length > 6 && (
        <MoreUnitImageContainer>
          <MoreImagesColumnContainer>
            <MoreImagesRowContainer>
              <ImageContainer>
                <MainImageInSixUnit
                  style={{borderTopLeftRadius: 8}}
                  source={{uri: sortedImageArray[0].img_thumbNail}}
                />
                <OrderTypeIndicator1>
                  <OrderTypeText>
                    {sortedImageArray[0].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator1>
              </ImageContainer>
              <SixUnitImagesColumnContainer>
                <ImageContainer>
                  <SubImageInSixUnit
                    style={{borderTopRightRadius: 8}}
                    source={{uri: sortedImageArray[1].img_thumbNail}}
                  />
                  <OrderTypeIndicator2>
                    <OrderTypeText>
                      {sortedImageArray[1].img_before_after === 'before'
                        ? '전'
                        : '후'}
                    </OrderTypeText>
                  </OrderTypeIndicator2>
                </ImageContainer>
                <ImageContainer>
                  <SubImageInSixUnit
                    source={{uri: sortedImageArray[2].img_thumbNail}}
                  />
                  <OrderTypeIndicator2>
                    <OrderTypeText>
                      {sortedImageArray[2].img_before_after === 'before'
                        ? '전'
                        : '후'}
                    </OrderTypeText>
                  </OrderTypeIndicator2>
                </ImageContainer>
              </SixUnitImagesColumnContainer>
            </MoreImagesRowContainer>
            <ImagesRowContainer>
              <ImageContainer>
                <SubImageInSixUnit
                  style={{borderBottomLeftRadius: 8}}
                  source={{uri: sortedImageArray[3].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[3].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
              <ImageContainer>
                <SubImageInSixUnit
                  source={{uri: sortedImageArray[4].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[4].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
              </ImageContainer>
              <ImageContainer>
                <SubImageInSixUnit
                  style={{borderBottomRightRadius: 8}}
                  source={{uri: sortedImageArray[5].img_thumbNail}}
                />
                <OrderTypeIndicator2>
                  <OrderTypeText>
                    {sortedImageArray[5].img_before_after === 'before'
                      ? '전'
                      : '후'}
                  </OrderTypeText>
                </OrderTypeIndicator2>
                <RemainCountCoverContainer>
                  <RemainCountText>{'+' + remainCount}</RemainCountText>
                </RemainCountCoverContainer>
              </ImageContainer>
            </ImagesRowContainer>
          </MoreImagesColumnContainer>
        </MoreUnitImageContainer>
      )}
    </Container>
  );
};

export default PreviewImages;
