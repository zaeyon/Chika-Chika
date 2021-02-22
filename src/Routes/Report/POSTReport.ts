import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    targetType: string,
 targetId: string, reason: string, message: string
}

const POSTReport = ({jwtToken, targetType, targetId, reason, message}: Params) => {

    const uri = serverConfig.baseUri + `/reports?targetType=${targetType}&targetId=${targetId}`;
    const body = {
        reason,
        message
    }

    return new Promise(function(resolve, reject) {

        axios
        .post(uri, body, {
            headers: {
                Authorization: jwtToken
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

export default POSTReport;