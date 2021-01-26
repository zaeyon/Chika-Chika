import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    dentalId: number,
    offset: number,
    limit: number,
}

const GETDentalReview = ({jwtToken, dentalId, offset, limit}: Params) => {

    const uri = serverConfig.baseUri + `/clinic/detail/reviews?clinicId=${dentalId}&limit=${limit}&offset=${offset}`

    console.log("GETDentalReview dentalId", dentalId);
    console.log("GETDentalReview offset", offset);
    console.log("GETDentalReview limit", limit);

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
            reject(error.response)
        })
    })
}

export default GETDentalReview;