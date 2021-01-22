import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    preCityId: number,
    cityId: number,
}

const PUTUserHometown = ({jwtToken, preCityId, cityId}: Params) => {

    const uri = serverConfig.baseUri + `/residence`;

    const bodyParams = `{
        "cityId": "${cityId}",
        "preCityId": "${preCityId}"
    }`

    return new Promise((resolve, reject) => {

        axios
        .put(uri, bodyParams, {
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

export default PUTUserHometown;