import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    searchId?: any,
    unified?: any,
}

const DELETESearchRecord = ({jwtToken, searchId, unified=false}: Params) => {
    
    const uri = serverConfig.baseUri + `/search/recent?searchId=${searchId}&unifiedSearch=${String(unified)}`

    console.log(uri)
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