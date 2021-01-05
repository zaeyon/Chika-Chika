import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    dentalId: number,
}

const GETDentalDetail = ({jwtToken, dentalId}: Props) => {

    const uri = serverConfig.baseUri + `/clinic/detail?clinicId=${dentalId}`

    return new Promise((resolve, reject) => {
        axios
        .get(uri, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error.response)
        })
    })
}

export default GETDentalDetail;