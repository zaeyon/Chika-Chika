
import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri

const DELETESocialScrap = (jwtToken: string, postId: string) => {
    const uri = baseUri + `/scrap/communityPost?postId=${postId}`;
    
    return new Promise(function(resolve, reject) {

        axios.delete(uri, {
            headers: {
              'Authorization': jwtToken,
            },
        })
        .then(function(response) {
            resolve(response.data);
            
        })
        .catch(function(error) {
            console.log('DELETESocialScrap Fail',error)
            reject(error.response);
        })

    })
}

export default DELETESocialScrap;