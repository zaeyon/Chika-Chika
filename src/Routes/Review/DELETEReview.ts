import axios from 'axios'
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    reviewId: number,
}

const DELETEReview = ({jwtToken, reviewId}: Params) => {

    const uri = serverConfig.baseUri + `/api/v1/reviews?reviewId=${reviewId}`

    console.log("DELETEReview jwtToken", jwtToken);
    console.log("DELETEReview reviewId", reviewId);

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
            reject(error.response);
        })
    })
}

export default DELETEReview

