import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    cityId: number,
}

const DELETEUserHometown = ({jwtToken, cityId}: Params) => {



    const uri = serverConfig.baseUri + `/residence`;

    const bodyParamsStr = `{
        "cityId": "${cityId}"
    }`

    return new Promise((resolve, reject) => {

        axios
        .delete(uri, {
            data: {
                cityId: cityId
            },
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

export default DELETEUserHometown;