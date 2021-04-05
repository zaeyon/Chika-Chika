import React, {useCallback} from 'react'
import Styled from 'styled-components/native'
import {TouchableWithoutFeedback, LayoutAnimation} from 'react-native'
//
import HomeContentContainerView from '~/Components/Presentational/HomeScreen/HomeContentContainerView';


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
padding: 12px 0px;
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

interface Props {
    clinics: any
}

const HomeElderClinicContent = ({clinics}: Props) => {

    const renderLocalClinicItem = useCallback(() => {
        return clinics.map((item: any) => (
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
                        {`우리동네좋은치과`}
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
        <HomeContentContainerView
            title="개업한지 10년이상 된 우리동네 치과"
            renderContentItem={renderLocalClinicItem}
        >
        </HomeContentContainerView>
    )
}

export default HomeElderClinicContent