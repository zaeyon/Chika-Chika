import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    reviewId: number,
}

const GETReviewComment = ({jwtToken, reviewId}: Props) => {

    const uri = serverConfig.baseUri + `/api/v1/comments/lists?type=${"reviews"}&reviewId=${reviewId}`

    return new Promise(function(resolve, reject) {
        
        axios
        .get(uri, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response)
        })
    })
}

export default GETReviewComment;