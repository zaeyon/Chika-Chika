import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    certifiedPhoneNumber: boolean,
    provider: string,
    fcmToken: string,
    phoneNumber: string,
    nickname: string,
    cityId: number,
}

const POSTRegister = ({certifiedPhoneNumber, provider, fcmToken, phoneNumber, nickname, cityId}: params) => {
    const uri = serverConfig.baseUri + "/register";

    console.log("POSTRegister certifiedPhoneNumber", certifiedPhoneNumber);
    console.log("POSTRegister provider", provider);
    console.log("POSTRegister fcmToken", fcmToken);
    console.log("POSTRegister phoneNumber", phoneNumber);
    console.log("POSTRegister nickname", nickname);
    console.log("POSTRegister cityId", cityId);

    const bodyParamsStr = `{
        "certifiedPhoneNumber":"${certifiedPhoneNumber}",
        "provider":"${provider}",
        "fcmToken":"${"test"}",
        "userPhoneNumber":"${phoneNumber}",
        "nickname":"${nickname}",
        "cityId":"${cityId}"
    }`

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