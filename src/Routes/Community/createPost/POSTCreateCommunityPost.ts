import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri

interface User {
    nickname: string;
    profileImg: string;
}
interface PostData {
    [key: string] : any;
    type: string;
    description: string;
    wantDentistHelp: boolean;
    images: any;
}

const POSTCreateCommunityPost = (jwtToken: string, postData: PostData) => {
    const uri = baseUri + "/api/v1/communities";
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

        axios.post(uri, formData, {
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
            console.log('POSTCreateCommunityPost error: ',error)
            reject(error.response);
        })

    })
}

export default POSTCreateCommunityPost;