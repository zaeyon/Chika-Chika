import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    order: string,
    offset: any,
    limit: any,
}

const GETReviewList = ({order, offset, limit}: params) => {

    console.log("GETReviewList order", order);
    console.log("GETReviewList offset limit", offset, limit);

    const uri = serverConfig.baseUri + `/api/v1/reviews/lists?limit=${limit}&offset=${offset}&order=${order}`

    return new Promise(function(resolve, reject) {
        axios
        .get(uri, {
            headers: {
                Authorization: serverConfig.jwtToken
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