import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    reviewId: number,
}

const DELETEReviewScrap = ({jwtToken, reviewId}: Props) => {

    const uri = serverConfig.baseUri + `/scrap/review?reviewId=${reviewId}`

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
            reject(error)
        })
    })
}

export default DELETEReviewScrap;