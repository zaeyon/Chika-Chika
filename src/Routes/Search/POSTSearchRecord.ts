import axios from 'axios';
import serverConfig from '../server.config';

interface Params {
    jwtToken: string,
    tagCategory: string,
    targetId: string,
    sq: string,
    iq: string,
}

const POSTSearchRecord = ({jwtToken, tagCategory, targetId, sq, iq}: Params) => {

    const uri = serverConfig.baseUri + `/search/recent?tagCategory=${tagCategory}&iq=${iq}&sq=${sq}&targetId=${targetId}`;

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



