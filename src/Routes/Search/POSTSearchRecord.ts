import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    tagCategory: string,
    query: string,
}

const POSTSearchRecord = ({jwtToken, tagCategory, query}: Params) => {

    const uri = serverConfig.baseUri + `/search/recent?tagCategory=${tagCategory}&query=${query}`;

    return new Promise((resolve, reject) => {

        axios
        .post(uri, '',{
            headers: {
                Authorization: jwtToken,
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

export default POSTSearchRecord;



