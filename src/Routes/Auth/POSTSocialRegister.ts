import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    certifiedPhoneNumber: string,
    birthdate?: string,
    profileImg?: string,
    nickname?: string,
    phoneNumber?: string,
    fcmToken: string,
    email: string,
    provider: string,
    socialId: string,
}

const POSTSocialRegister = ({certifiedPhoneNumber, birthdate, profileImg, nickname, phoneNumber, fcmToken, email, provider, socialId}: params) => {

    const uri = serverConfig.baseUri + "/social_login";

    const bodyParam = `{
        "certifiedPhoneNumber": "${certifiedPhoneNumber}",
        "birthdate": "${birthdate}",
        "profileImg": "${profileImg}",
        "nickname": "${nickname}",
        "phoneNumber": "${phoneNumber}",
        "fcmToken": "${fcmToken}",
        "email": "${email}",
        "provider": "${provider}",
        "socialId": "${socialId}"
    }`

    console.log("POSTSocialRegister bodyParam", bodyParam);

    return new Promise(function(resolve, reject) {

        axios
        .post(uri, bodyParam)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response);
        })
    })
}

export default POSTSocialRegister