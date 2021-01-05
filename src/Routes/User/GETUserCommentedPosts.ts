import axios from 'axios';
import serverConfig from '~/Routes/server.config';

const baseUri = serverConfig.baseUri;

interface Props {
    type: string;
    limit: number;
    offset: number;
}

const GETUserCommentedPosts = (jwtToken: string, {type, limit, offset}: Props) => {
    const uri = baseUri + `/api/v1/users/wroteCommentPosts?type=${type}&limit=${limit}&offset=${offset}`;
    return new Promise(function(resolve, reject) {

        axios.get(uri, {
            headers: {
              'Authorization': jwtToken,
            },
        })
        .then(function(response) {
            console.log('SUCCESS', response.data)
            resolve(response.data);
        })
        .catch(function(error) {
            console.log('fail',error)
            reject(error.response);
        })

    })
}

export default GETUserCommentedPosts;
