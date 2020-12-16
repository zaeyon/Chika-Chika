import axios from 'axios';
import serverConfig from '../server.config';

const baseUri = serverConfig.baseUri

const GETAllTagSearch = (query: string) => {

    const uri = baseUri + "/search/allTagItems";
    const formattedQuery = '?q='+query+'&limit=20&offset=0'

    return new Promise(function(resolve, reject) {

        axios.get(uri+formattedQuery, {
            headers: {
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3OWIxNWEwLTMzYzAtMTFlYi1hOGExLTdkNjI2M2EzNWJkMSIsImlhdCI6MTYwNjgxODYyMiwiZXhwIjoxNjM4Mzc2MjIyfQ.BjtdqfJHGqrBrhgY8DDi7e-swFSy75scuBA51anlRAE'
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