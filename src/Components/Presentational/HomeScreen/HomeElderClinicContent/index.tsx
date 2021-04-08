import React, {useCallback} from 'react'
import Styled from 'styled-components/native'
import {TouchableWithoutFeedback, LayoutAnimation} from 'react-native'
//
import HomeContentContainerView from '~/Components/Presentational/HomeScreen/HomeContentContainerView';

const ContainerView = Styled.View`
padding: 0px 16px;
margin-bottom: 21px;
`;

const ContainerHeaderView = Styled.View`
flex-direction: row;
margin-bottom: 21px;
`;

const ContainerTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 24px;
color: #131F3C;
`;

const ContainerText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 24px;
color: #9AA2A9;
margin-left: auto;
`;

const LocalClinicInfoView = Styled.View`
padding: 12px 16px;
background: #FFFFFF;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
border-radius: 8px;
margin-bottom: 16px;
`;

const LocalClinicTitleText = Styled.Text`
margin: 12px 0px;
font-style: normal;
font-weight: 800;
font-size: 18px;
line-height: 24px;
color: #131F3C;
`;

const LocalClinicItemView = Styled.View`
padding: 8px 0px;
flex-direction: row;
align-items: center;
`;

const LocalClinicItemImage = Styled.Image`
width: 72px;
height: 72px;
background: #F5F7F9;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 100px;
margin-right: 12px;
`;

const LocalClinicItemImageSkeletonView = Styled.View`
width: 72px;
height: 72px;
background: #F5F7F9;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 100px;
margin-right: 12px;
`;
const LocalClinicContentView = Styled.View`
justify-content: space-around;
`;

const LocalClinicItemTitleText = Styled.Text`
font-style: normal;
font-weight: 800;
font-size: 16px;
line-height: 24px;
color: #131F3C;
`;

const LocalClinicItemTitleTextSkeletonView = Styled.View`
width: 160px;
height: 16px;
margin-bottom: 4px;
background: #F5F7F9`;

const LocalClinicItemText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 24px;
color: #9AA2A9;`;

const LocalClinicItemTextSkeletonView = Styled.View`
width: 80px;
height: 13px;
margin: 4px 0px;
background: #F5F7F9;
`;

const LocalClinicItemTagContainerView = Styled.View`
margin-top: 4px;
flex-direction: row;
`;

const LocalClinicItemTagView = Styled.View`
padding: 4px 8px;
margin-right: 4px;
align-items: center;
justify-content: center;
background: #F5F7F9;
border-radius: 4px;
`;

const LocalClinicItemTagText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
`;

const LocalClinicItemTagViewSkeletonView = Styled.View`
width: 90px;
height: 24px;
margin-top: 4px;
background: #F5F7F9;
border-radius: 4px;
`;
const PlaceHolderContainerView = Styled.View`
width: auto;
padding: 59px 65px;
background: #FFFFFF;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
border-radius: 12px;
`;

const PlaceHolderContentView = Styled.View`
align-items: center;
justify-content: center;
margin-bottom: 12px;
`;

const PlaceHolderImage = Styled.Image`
margin-bottom: 5px;
`;

const PlaceHolderText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
color: #131F3C;
text-align: center;
`;

interface Props {
    initialized: boolean;
    clinics: any;
    moveToDetailMap: any;
}

const HomeElderClinicContent = ({initialized, clinics, moveToDetailMap}: Props) => {

  const renderPlaceHolder = useCallback(() => (
    <PlaceHolderContainerView>
      <PlaceHolderContentView>
        <PlaceHolderImage source={require('~/Assets/Images/Home/메인/ic_review_empty.png')}/>
        <PlaceHolderText>
          {"우리동네에 5년이상\n된 치과가 없네요"}
        </PlaceHolderText>
        </PlaceHolderContentView>
      </PlaceHolderContainerView> 
  ), []);

    const renderLocalClinicItem = useCallback(() => {
        return clinics.slice(0, 4).map((item: any) => (
          <TouchableWithoutFeedback key={String(item.id)}>
            <LocalClinicItemView>
              <LocalClinicItemImage />
              <LocalClinicContentView>
                <LocalClinicItemTitleText>
                  {item.originalName}
                </LocalClinicItemTitleText>
                <LocalClinicItemText>
                  {item.reviewAVGStarRate
                    ? `리뷰 ${item.reviewAVGStarRate}(${item.reviewNum})`
                    : '리뷰가 아직 없어요.'}
                </LocalClinicItemText>
                <LocalClinicItemTagContainerView>
                  {item.dentalTransparent ? (
                    <LocalClinicItemTagView>
                      <LocalClinicItemTagText>
                        {`우리동네 좋은 치과`}
                      </LocalClinicItemTagText>
                    </LocalClinicItemTagView>
                  ) : null}
                  {item.surgeonNum > 0 ? (
                    <LocalClinicItemTagView>
                      <LocalClinicItemTagText>
                        {`전문의 ${item.surgeonNum}명`}
                      </LocalClinicItemTagText>
                    </LocalClinicItemTagView>
                  ) : null}
                </LocalClinicItemTagContainerView>
              </LocalClinicContentView>
            </LocalClinicItemView>
          </TouchableWithoutFeedback>
        ));
      }, [clinics]);

      return (
        <ContainerView>
          <ContainerHeaderView>
          <ContainerTitleText>
            {"개업한지 10년이상된 치과"}
          </ContainerTitleText>
          </ContainerHeaderView>
          {initialized && !clinics.length ? renderPlaceHolder() :
          <HomeContentContainerView
            renderContentItem={renderLocalClinicItem}
            onPress={() => moveToDetailMap({
              title: "개업한지 10년이상된 치과",
              clinics,
            })}
          />}
        </ContainerView>
    )
}

export default HomeElderClinicContent