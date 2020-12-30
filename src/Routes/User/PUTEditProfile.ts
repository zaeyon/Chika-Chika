import axios from 'axios';
import serverConfig from '~/Routes/server.config';

const baseUri = serverConfig.baseUri

interface Payload {
    [key: string] : any;
    profileImg?: string;
    birthdate?: string;
    gender?: string;
    nickname?: string;
}

const PUTEditProfile = (jwtToken: string, payload: Payload) => {
    console.log(payload)
    const uri = baseUri + "/api/v1/users";
    let formData = new FormData();
    
    for (let key in payload) {
        formData.append(key, payload[key]);
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
            console.log('PUTEditProfile error: ',error)
            reject(error.response);
        })

    })
}

export default PUTEditProfile;