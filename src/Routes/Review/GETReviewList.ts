import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    order: string,
    offset: any,
    limit: any,
}

const GETReviewList = ({jwtToken, order, offset, limit}: params) => {

    console.log("GETReviewList order", order);
    console.log("GETReviewList offset limit", offset, limit);

    const uri = serverConfig.baseUri + `/api/v1/reviews/lists?limit=${limit}&offset=${offset}&order=${order}`

    return new Promise(function(resolve, reject) {
        axios
        .get(uri, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error.response);
        })
    })
}

export default GETReviewList;