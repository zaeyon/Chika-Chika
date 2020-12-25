import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri;

const GETCommunityPostDetail = (jwtToken: string, postId: string) => {
    const uri = baseUri + `/api/v1/communities?postId=${postId}`;

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

export default GETCommunityPostDetail;