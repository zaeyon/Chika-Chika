import axios from 'axios';
import serverConfig from '../server.config';

const baseUri = serverConfig.baseUri

const GETAllTagSearch = (jwtToken: string, query: string, purpose: string) => {

    const uri = baseUri + "/search/allTagItems";
    const formattedQuery = `/${purpose}?q=${query}&limit=20&offset=0`

    return new Promise(function(resolve, reject) {

        axios.get(uri+formattedQuery, {
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

export default GETAllTagSearch;