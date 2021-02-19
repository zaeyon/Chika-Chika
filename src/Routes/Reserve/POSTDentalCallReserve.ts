import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    dentalId: number,
}

const POSTDentalCallReserve = ({jwtToken, dentalId}: Params) => {

    const uri = serverConfig.baseUri + `/appointment?clinicId=${dentalId}`;

    const formData = new FormData();

    return new Promise(function(resolve, reject) {

        axios
        .post(uri, formData, {
            headers: {
                Authorization: jwtToken
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

export default POSTDentalCallReserve;