import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    type: string,
}

const GETUserNotifications = (jwtToken: string, type: string) => {

    const uri = serverConfig.baseUri + `/notifications/${type}`

    return new Promise((resolve, reject) => {

        axios
        .get(uri, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error.response)
        })
    })
}

export default GETUserNotifications;




