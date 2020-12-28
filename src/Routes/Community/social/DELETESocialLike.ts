import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri

const DELETESocialLike = (jwtToken: string, postId: string) => {
    const uri = baseUri + "/like/communityPost?postId=" + postId;
    
    return new Promise(function(resolve, reject) {

        axios.delete(uri, {
            headers: {
              'Authentication': jwtToken,
            },
        })
        .then(function(response) {
            resolve(response.data);
            
        })
        .catch(function(error) {
            console.log('DELETESocialLike Fail',error)
            reject(error.response);
        })

    })
}

export default DELETESocialLike;