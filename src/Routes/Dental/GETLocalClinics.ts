import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string;
    limit: number;
    offset: number;
}

const GETLocalClinics = ({jwtToken, limit, offset}: Props) => {

    const uri = serverConfig.baseUri + `/residence/clinics?limit=${limit}&offset=${offset}`

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

export default GETLocalClinics;