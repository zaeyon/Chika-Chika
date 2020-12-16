import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    certifiedPhoneNumber: boolean,
    provider: string,
    fcmToken: string,
    phoneNumber: string,
    nickname: string,
}

const POSTRegister = ({certifiedPhoneNumber, provider, fcmToken, phoneNumber, nickname}: params) => {
    const uri = serverConfig.baseUri + "/register";

    console.log("POSTRegister certifiedPhoneNumber", certifiedPhoneNumber);
    console.log("POSTRegister provider", provider);
    console.log("POSTRegister fcmToken", fcmToken);
    console.log("POSTRegister phoneNumber", phoneNumber);
    console.log("POSTRegister nickname", nickname);

    const bodyParamsStr = `{"certifiedPhoneNumber":"${certifiedPhoneNumber}","provider":"${provider}","fcmToken":"${"test"}","userPhoneNumber":"${phoneNumber}","nickname":"${nickname}"}`

    return new Promise(function(resolve, reject) {
        axios
        .post(uri, bodyParamsStr)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error.response);
        })
    })
}

export default POSTRegister