import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    birthdate?: string,
    profileImg?: string,
    nickname?: string,
    phoneNumber?: string,
    fcmToken: string,
    email: string,
    provider: string,
    socialId: string,
}

const POSTSocialRegister = ({birthdate, profileImg, nickname, phoneNumber, fcmToken, email, provider, socialId}: params) => {

    const uri = serverConfig.baseUri + "/social_login";

    const bodyParam = `{
        "birthdate": "${birthdate}",
        "profileImg": "${profileImg}",
        "nickname": "${nickname}",
        "phoneNumber": "${phoneNumber}",
        "fcmToken": "${fcmToken}",
        "email": "${email}",
        "provider": "${provider}",
        "socialId": "${socialId}",
    }`

    return new Promise(function(resolve, reject) {

        axios
        .post(uri, bodyParam)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export default POSTSocial