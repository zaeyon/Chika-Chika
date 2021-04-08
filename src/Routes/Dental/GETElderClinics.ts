
import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string;
    limit: number;
    offset: number;
    lat: number;
    long: number;
    cityId: number;
    sort?: String;
}

const GETElderClinics = ({jwtToken, limit, offset, lat, long, cityId, sort='d'}: Props) => {

    const uri = serverConfig.baseUri + `/clinic/old?cityId=${cityId}&lat=${lat}&long=${long}&sort=${sort}&limit=${limit}&offset=${offset}`
    console.log('GETElderClinics uri: ', uri);
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

export default GETElderClinics;