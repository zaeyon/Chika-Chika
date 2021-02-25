import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    isUnifiedSearch: boolean,
}

const GETSearchRecord = (jwtToken: string, isUnifiedSearch: boolean) => {

    const uri = serverConfig.baseUri + `/search/recent?unifiedSearch=${isUnifiedSearch}`;

    return new Promise((resolve, reject) => {

        axios
        .get(uri, {
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

export default GETSearchRecord;