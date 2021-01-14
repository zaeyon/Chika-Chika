import axios from 'axios';
import serverConfig from '~/Routes/server.config';

const baseUri = serverConfig.baseUri;


const GETUserInfo = (jwtToken: string) => {
    const uri = baseUri + '/userInfo'
    console.log("GETUserInfo jwtToken", jwtToken);
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
            console.log('fail',error)
            reject(error.response);
        })

    })
}

export default GETUserInfo;
