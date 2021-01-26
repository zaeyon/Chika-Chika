import axios from 'axios';
import serverConfig from '~/Routes/server.config';

const baseUri = serverConfig.baseUri;


const GETUserInfoById = (jwtToken: string, userId: string) => {
    const uri = baseUri + `/user/profile?userId=${userId}`;
    return new Promise(function(resolve, reject) {

        axios.get(uri, {
            headers: {
              'Authorization': jwtToken,
            },
        })
        .then(function(response) {
            console.log('GETUserInfoById SUCCESS', response.data)
            resolve(response.data);
        })
        .catch(function(error) {
            console.log('fail',error)
            reject(error.response);
        })

    })
}

export default GETUserInfoById;
