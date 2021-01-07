import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri;

interface Props {
    type: string;
    limit: number;
    offset: number;
    order: string;
    region: string;
}

const GETCommunityPosts = (jwtToken: string, cityId: string, {type, limit, offset, order, region}: Props) => {
    const uri = baseUri + `/api/v1/communities/lists?region=${region}&cityId=${cityId}&type=${type}&limit=${limit}&offset=${offset}&order=${order}`;
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

export default GETCommunityPosts;
