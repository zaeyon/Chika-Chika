import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
}

const GETUserNotifications = ({jwtToken}: Params) => {

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




