import axios from 'axios';
import serverConfig from '~/Routes/server.config';

const baseUri = serverConfig.baseUri;

interface Props {
    jwtToken: string
}

const GETUserSavedHospitals = ({jwtToken}: Props) => {
    const uri = baseUri + `/scrap/clinic`;
    return new Promise(function(resolve, reject) {

        axios.get(uri, {
            headers: {
              'Authorization': jwtToken,
            },
        })
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error.response);
        })

    })
}

export default GETUserSavedHospitals;
