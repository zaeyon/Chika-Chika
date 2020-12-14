import axios from 'axios';
import serverConfig from '../server.config';

const baseUri = serverConfig.baseUri

const POSTVerifyPhoneNumber = (phoneNumber: string, token: string) => {

    const uri = baseUri + "/verifyPhoneNumber";

    const bodyParam = `{
        "token": "${token}",
        "userPhoneNumber":  "${phoneNumber}"
    }`

    console.log("bodyParam", bodyParam);

    return new Promise(function(resolve, reject) {
        
        axios
        .post(uri, bodyParam, {
            headers: {
              'Content-Type': "application/x-www-form-urlencoded",
            },
        })
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error.response);
        })
    })
}

export default POSTVerifyPhoneNumber;