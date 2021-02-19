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
    console.log(config)
    return new Promise(function(resolve, reject) {

        axios.put(uri, config, {
            headers: {
              'Authorization': jwtToken,
              Accept: "*/*"
            },

        })
        .then(function(response) {
            console.log(response)
            resolve(response.data);
            
        })
        .catch(function(error) {
            console.log('PUTUserNotifications error: ',error)
            reject(error.response);
        })

    })
}

export default PUTUserNotifications;