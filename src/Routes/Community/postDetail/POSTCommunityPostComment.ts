import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri

const POSTCommunityPostComment = (jwtToken: string, postId: string, comment: string) => {
    let formData = new FormData();
    const uri = baseUri + "/api/v1/comments?type=community&postId=" + postId;
    formData.append('description', comment);
    console.log(comment)
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
            console.log('fail',error)
            reject(error.response);
        })

    })
}

export default POSTCommunityPostComment;