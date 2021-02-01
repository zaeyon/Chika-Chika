import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    searchId?: any,
    category?: string,
}

const DELETESearchRecord = ({jwtToken, searchId, category}: Params) => {
    
    const uri = serverConfig.baseUri + `/search/recent?category=${category}&searchId=${searchId}`

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
            reject(error.data);
        })
    })
}

export default DELETESearchRecord;