import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string;
    cityId: string;
}
const GETLocalClinicAndReviewCount = ({jwtToken, cityId}: Props) => {
    
    const uri = serverConfig.baseUri + `/residence/clinicsAndReviews?cityId=${cityId}`

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

export default GETLocalClinicAndReviewCount;