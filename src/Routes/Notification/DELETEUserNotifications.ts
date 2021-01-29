import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    formattedIdArray: Array<any>,
}

const DELETEUserNotifications = ({jwtToken, formattedIdArray}: Params) => {

    console.log("DELETEUserNotifications jwtToken", jwtToken);
    console.log("DELETEUserNotifications formattedIdArray", formattedIdArray);

    const uri = serverConfig.baseUri + `/notifications`;

    const bodyParams = `{
        "notifications": ${formattedIdArray}
    }`

    return new Promise((resolve, reject) => {
        
        axios
        .delete(uri, {
            data: {
                notificationIds: formattedIdArray
            },
            headers: {
                Authorization: jwtToken,
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

export default DELETEUserNotifications;