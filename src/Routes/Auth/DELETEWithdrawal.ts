import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
}

const DELETEWithdrawal = ({jwtToken}: Params) => {

    console.log("DELETEWithdrawal jwtToken", jwtToken);
    
    const uri = serverConfig.baseUri + '/withdrawal';

    return new Promise((resolve, reject) => {
        axios
        .delete(uri, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response)
        })
    })
}

export default DELETEWithdrawal;