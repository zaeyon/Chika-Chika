import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri

const DELETECommunityPost = (jwtToken: string, postId: string) => {

    const uri = baseUri + "/api/v1/communities?postId=" + postId;

    return new Promise(function(resolve, reject) {

        axios.delete(uri, {
            headers: {
              'Authorization': jwtToken,
              Accept: "*/*"
            },

        })
        .then(function(response) {
        
            resolve(response.data);
            
        })
        .catch(function(error) {
            console.log('DELETECommunityPost error: ',error)
            reject(error.response);
        })

    })
}

export default DELETECommunityPost;