import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    category: string,
}

const GETSearchRecord = ({jwtToken, category}: Params) => {

    console.log("GETSearchRecord category", category)

    const uri = serverConfig.baseUri + `/search/recent?category=${category}`

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