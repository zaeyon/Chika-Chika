import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri

const DELETECommunityPost = (postId: string) => {

    const uri = baseUri + "/api/v1/communities?postId=" + postId;

    return new Promise(function(resolve, reject) {

        axios.delete(uri, {
            headers: {
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiMDYxN2IwLTMzYzAtMTFlYi05MmRlLWUzZmIzYjRlMDI2NCIsImlhdCI6MTYwNjgxODk1MCwiZXhwIjoxNjM4Mzc2NTUwfQ.3-PEUaAWAW6sjl7TuKNzSHlTlK8p7myWG8nedNZ3nFE',
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