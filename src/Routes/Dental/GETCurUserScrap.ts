import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    dentalId: number
}

const GETCurUserScrap = ({jwtToken, dentalId}: Params) => {

    const uri = serverConfig.baseUri + `/clinic/detail/scrap?clinicId=${dentalId}`;

    console.log("GETCurUserScrap jwtToken", jwtToken);
    console.log("GETCurUserScrap dentalId", dentalId);

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
            reject(error.response)
        })
    })
}

export default GETCurUserScrap;