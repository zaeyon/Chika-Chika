import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri;

interface Props {
    type: string;
    limit: number;
    offset: number;
    order: string;
}

const GETUserReviewPosts = (jwtToken: string, userId: string, {type, limit, offset, order}: Props) => {
    const uri = baseUri + `/api/v1/users/${userId}/reviews?limit=${limit}&offset=${offset}&order=${order}&type=${type}`;
    console.log(type, limit, offset, order);
    return new Promise(function(resolve, reject) {

        axios.get(uri, {
            headers: {
              'Authorization': jwtToken,
            },
        })
        .then(function(response) {
            resolve(response.data);
            
        })
        .catch(function(error) {
            console.log('fail',error)
            reject(error.response);
        })

    })
}

export default GETUserReviewPosts;

