import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    cityId: number,
}

const POSTMainHometownChange = ({jwtToken, cityId}: Params) => {

    const uri = serverConfig.baseUri + '/residence/now';

    const bodyParams = `{
        "cityId": "${cityId}"
    }`


    return new Promise((resolve, reject) => {
        axios
        .post(uri, bodyParams, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error.response);
        })
    })
}

export default POSTMainHometownChange;