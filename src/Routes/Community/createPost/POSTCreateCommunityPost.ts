import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri

interface postData {
    [key: string] : any;
    description: string;
    wantDentistHelp: boolean;
    type: string;
    images?: any;
}

const POSTCreateCommunityPost = (postData: postData) => {

    const uri = baseUri + "/api/v1/communities";
    let formData = new FormData();
    for (let key in postData) {
        if(key === 'images'){
            for (let imageData of postData[key]) {
                formData.append(key, imageData);
            }
        } else {
            formData.append(key, postData[key]);
        }
    }
    
    console.log(formData)

    return new Promise(function(resolve, reject) {

        axios.post(uri, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiMDYxN2IwLTMzYzAtMTFlYi05MmRlLWUzZmIzYjRlMDI2NCIsImlhdCI6MTYwNjgxODk1MCwiZXhwIjoxNjM4Mzc2NTUwfQ.3-PEUaAWAW6sjl7TuKNzSHlTlK8p7myWG8nedNZ3nFE',
              Accept: "*/*"
            },

        })
        .then(function(response) {
        
            resolve(response.data);
            
        })
        .catch(function(error) {
            console.log('POSTCreateCommunityPost error: ',error)
            reject(error.response);
        })

    })
}

export default POSTCreateCommunityPost;