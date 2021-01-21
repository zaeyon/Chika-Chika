import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    cityId: string,
}

const POSTUserHometown = ({jwtToken, cityId}: Params) => {

    const uri = serverConfig.baseUri + `/residence`;

    const bodyParamsStr = `{
        "cityId": "${cityId}"
    }`

    return new Promise((resolve, reject) => {

        axios
        .post(uri, bodyParamsStr, {
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

export default POSTUserHometown;



