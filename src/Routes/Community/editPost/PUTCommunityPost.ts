import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri

interface postData {
    [key: string] : any;
    description: string;
    wantDentistHelp: boolean;
    type: string;
    images: any;
}

const PUTCommunityPost = (jwtToken: string, postData: postData, postId: string) => {

    const uri = baseUri + "/api/v1/communities?postId=" + postId;
    let formData = new FormData();
    
    for (let key in postData) {
        if(key === 'images'){
            console.log(postData[key]);
            formData.append(key, JSON.stringify(postData[key]));
        }
        else{
            formData.append(key, postData[key]);
            console.log(postData[key]);
        }
    }
    
    console.log(formData)

    return new Promise(function(resolve, reject) {

        axios.put(uri, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
              'Authorization': jwtToken,
              Accept: "*/*"
            },

        })
        .then(function(response) {
        
            resolve(response.data);
            
        })
        .catch(function(error) {
            console.log('PUTCommunityPost error: ',error)
            reject(error.response);
        })

    })
}

export default PUTCommunityPost;