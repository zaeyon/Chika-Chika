import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    reviewId: number,
}

const DELETEReviewLike = ({jwtToken, reviewId}: Props) => {

    const uri = serverConfig.baseUri + `/like/review?reviewId=${reviewId}`

    return new Promise((resolve, reject) => {
        
        axios
        .delete(uri, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error.response)
        })
    })
}

export default DELETEReviewLike;