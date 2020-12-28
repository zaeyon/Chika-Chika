import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    reviewId: number,
}

const POSTReviewScrap = ({jwtToken, reviewId}: Props) => {

    const uri = serverConfig.baseUri + `/scrap/review?reviewId=${reviewId}`

    const formData = new FormData();

    return new Promise((resolve, reject) => {
        
        axios
        .post(uri, formData, {
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

export default POSTReviewScrap