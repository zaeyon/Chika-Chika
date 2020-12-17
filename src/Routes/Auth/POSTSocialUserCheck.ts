import axios from 'axios';
import serverConfig from '../server.config';

const POSTSocialUserCheck = (provider: string, email: string) => {

    const uri = serverConfig.baseUri + "/socialUserCheck";

    console.log("POSTSocialUserCheck provider", provider);
    console.log("POSTSocialUserCheck email", email);

    const bodyParam = `{
        "provider": "${provider}",
        "email": "${email}"
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

export default POSTSocialUserCheck;