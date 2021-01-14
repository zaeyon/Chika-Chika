import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    query: string,
}

const GETDentalKeywordAutoComplete = ({jwtToken, query}: Props) => {

    const uri = serverConfig.baseUri + `/clinic/keyword?query=${query}`

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

export default GETDentalKeywordAutoComplete