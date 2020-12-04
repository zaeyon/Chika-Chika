import axios from 'axios';
import serverConfig from '../server.config';

const baseUri = serverConfig.baseUri

const POSTSendTokenToPhone = (phoneNumber: string) => {

    const uri = baseUri + "/sendTokenToPhoneNumber";
    const jsonStr = `{userPhoneNumber: ${phoneNumber}}`

    console.log("jsonStr", jsonStr);

    var formData = new FormData();
    formData.append("PhoneNumber", phoneNumber);

    return new Promise(function(resolve, reject) {

        axios
        .post(uri, jsonStr, {
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

export default POSTSendTokenToPhone;