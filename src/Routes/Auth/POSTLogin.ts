import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    phoneNumber: string,
    authCode: string,
}

const POSTLogin = ({phoneNumber, authCode}: params) => {
    const uri = serverConfig.baseUri + "/login";

    console.log("POSTLogin userPhoneNumber", phoneNumber);
    console.log("POSTLogin authCode", authCode);

    const bodyParam = `{
        "userPhoneNumber": "${phoneNumber}",
        "token": "${authCode}"
    }`

    return new Promise(function(resolve, reject) {

        axios
        .post(uri, bodyParam)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error.response);
        })
    }) 
}

export default POSTLogin;