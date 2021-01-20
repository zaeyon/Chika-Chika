import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    dentalId: string,
}

const POSTDentalScrap = ({jwtToken, dentalId}: Props) => {

    console.log("POSTDentalScrap jwtToken", jwtToken);
    console.log("POSTDentalScrap dentalId", dentalId);

    const uri = serverConfig.baseUri + `/scrap/clinic?clinicId=${dentalId}`;

    const formData = new FormData();

    return new Promise((resolve, reject) => {
        
        axios
        .post(uri, formData, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response)
        })
    })
}

export default POSTDentalScrap;