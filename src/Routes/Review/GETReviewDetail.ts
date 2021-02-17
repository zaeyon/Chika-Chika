import axios from 'axios';
import serverConfig from '../server.config';


const GETReviewDetail = (jwtToken: string, reviewId: number) => {

    console.log("GETReviewDetail reviewId", reviewId);
    
    const uri = serverConfig.baseUri + `/api/v1/reviews?reviewId=${reviewId}`

    return new Promise((resolve, reject) => {

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
            reject(error.response);
        })
    })
}

export default GETReviewDetail;