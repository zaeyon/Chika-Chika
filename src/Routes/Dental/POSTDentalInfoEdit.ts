import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    dentalId: number,
    images: any,
    message: any,
    reason: any,
}

const POSTDentalInfoEdit = ({jwtToken, dentalId, images, message, reason}: Params) => {

    const uri = serverConfig.baseUri + `/reports/clinics?clinicId=${dentalId}`

    const bodyParams = `{
        "images": ${JSON.stringify(images)},
        "message": "${message}",
        "reason": "${reason}"
    }`

    console.log("POSTDentalInfoEdit bodyParams", bodyParams);
    console.log("POSTDentalInfoEdit uri", uri);
    
    return new Promise((resolve, reject) => {
        
        axios
        .post(uri, bodyParams, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response);
        })
    })
}

export default POSTDentalInfoEdit;

