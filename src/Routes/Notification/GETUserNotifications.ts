import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    type?: string,
}

const GETUserNotifications = ({jwtToken, type}: Params) => {

    const uri = serverConfig.baseUri + `/notifications`;

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




