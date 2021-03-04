import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    tagCategory: string,
    sq: string,
    iq: string,
}

const POSTSearchRecord = ({jwtToken, tagCategory, sq, iq}: Params) => {

    const uri = serverConfig.baseUri + `/search/recent?tagCategory=${tagCategory}&iq=${iq}&sq=${sq}`;

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



