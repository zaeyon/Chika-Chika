import axios from 'axios';
import serverConfig from '../../server.config';

const baseUri = serverConfig.baseUri

interface Props {
    type: string;
    limit: number;
    offset: number;
    order: string;
}
const GETCommunityPosts = ({type, limit, offset, order}: Props) => {

    const uri = baseUri + `/api/v1/communities/lists?type=${type}&limit=${limit}&offset=${offset}&order=${order}`;

    return new Promise(function(resolve, reject) {

        axios.get(uri, {
            headers: {
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiMDYxN2IwLTMzYzAtMTFlYi05MmRlLWUzZmIzYjRlMDI2NCIsImlhdCI6MTYwNjgxODk1MCwiZXhwIjoxNjM4Mzc2NTUwfQ.3-PEUaAWAW6sjl7TuKNzSHlTlK8p7myWG8nedNZ3nFE'
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

export default GETCommunityPosts;