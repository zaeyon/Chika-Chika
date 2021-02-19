import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string;
    long: string;
    lat: string;
    cityId: string;
}

const GETLocalClinic = ({jwtToken, long, lat, cityId}: Props) => {
    
    const uri = serverConfig.baseUri + `/residenceClinicReviews?cityId=${cityId}&lat=${lat}&long=${long}`

    return new Promise((resolve, reject) => {

        axios
        .get(uri, {
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

export default GETLocalClinic;