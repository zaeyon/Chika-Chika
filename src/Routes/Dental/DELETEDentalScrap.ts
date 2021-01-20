import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    dentalId: string,
}

const DELETEDentalScrap = ({jwtToken, dentalId}: Props) => {

    console.log("DELETEDentalScrap jwtToken", jwtToken);
    console.log("DELETEDentalScrap dentalId", dentalId);

    const uri = serverConfig.baseUri + `/scrap/clinic?clinicId=${dentalId}`;

    return new Promise((resolve, reject) => {
        
        axios
        .delete(uri, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error.response)
        })
    })
}

export default DELETEDentalScrap;