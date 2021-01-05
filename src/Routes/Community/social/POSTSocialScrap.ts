import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri

const POSTSocialScrap = (jwtToken: string, postId: string) => {
    const uri = baseUri + `/scrap/communityPost?postId=${postId}`;
    const formData = new FormData();
    return new Promise(function(resolve, reject) {

        axios.post(uri, formData, {
            headers: {
              'Authorization': jwtToken,
            },
        })
        .then(function(response) {
            resolve(response.data);
            
        })
        .catch(function(error) {
            console.log('POSTSocialScrap Fail',error)
            reject(error.response);
        })

    })
}

export default POSTSocialScrap;