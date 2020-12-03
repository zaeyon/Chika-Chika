import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width: ${wp('100%')};
 height: ${wp('26.6%')};
 background-color: #ffffff;
 flex-direction: row;
`;

const ThumbnailContainer = Styled.View`
 padding-top: 12px;
 padding-bottom: 12px;
 padding-left: 16px;
 padding-right: 12px;
`;

const ThumbnailImage = Styled.Image`
 width: ${wp('20%')};
 height: ${wp('20%')};
`;

const AlbumInfoContainer = Styled.View`
 padding-left: 12px;
 padding-right: 16px;
 flex-direction: column;
 justify-content: center;

`;

const AlbumTitleText = Styled.Text`
font-weight: 500;
font-size: 17px;
color: #333333;
`;

const AlbumCountText = Styled.Text`
margin-top: 8px;
font-size: 17px;
color: #979797;
`;

const AlbumItem = ({albumTitle, albumCount, albumThumbnail, selectAlbum}) => {
    return (
        <TouchableWithoutFeedback onPress={() => selectAlbum(albumTitle)}>
        <Container>
            <ThumbnailContainer>
                <ThumbnailImage
                source={{uri:albumThumbnail}}/>
            </ThumbnailContainer>
            <AlbumInfoContainer>
                <AlbumTitleText>
                    {albumTitle}
                </AlbumTitleText>
                <AlbumCountText>
                    {albumCount}
                </AlbumCountText>
            </AlbumInfoContainer>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default AlbumItem;
