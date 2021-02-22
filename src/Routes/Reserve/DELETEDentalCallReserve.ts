import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    clinicId: string,
}

const DELETEDentalCallReserve = ({jwtToken, clinicId}: Params) => {



    const uri = serverConfig.baseUri + `/appointment?clinicId=${clinicId}`;

    return new Promise((resolve, reject) => {

        axios
        .delete(uri, {
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

export default DELETEDentalCallReserve;