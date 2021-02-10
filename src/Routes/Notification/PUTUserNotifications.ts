import axios from 'axios';
import serverConfig from '~/Routes/server.config';

const baseUri = serverConfig.baseUri

export interface Config {
    [key: string]: any;
    event: number;
    commnet: number;
    like: number;
}

const PUTUserNotifications = (jwtToken: string, config: Config) => {

    const uri = baseUri + "/notificationConfig";
    let formData = new FormData();
    
    for (let key in config) {
        formData.append(key, JSON.stringify(config[key]))
    }

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
            console.log('PUTUserNotifications error: ',error)
            reject(error.response);
        })

    })
}

export default PUTUserNotifications;