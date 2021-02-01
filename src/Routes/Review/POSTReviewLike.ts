import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    reviewId: number,
}

const POSTReviewLike = ({jwtToken, reviewId}: Props) => {

    const uri = serverConfig.baseUri + `/like/review?reviewId=${reviewId}`

    console.log("POSTReviewLike reviewId", reviewId);

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
            reject(error.response)
        })
    })
}

export default POSTReviewLike