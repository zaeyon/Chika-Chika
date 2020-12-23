import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    commentId: string,
    type: string,
}

const DELETEComment = ({jwtToken, commentId, type}: params) => {

    const uri = serverConfig.baseUri + `/api/v1/comments?type=${type}&commentId=${commentId}`

    return new Promise((resolve, reject) => {
        
        axios
        .delete(uri, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            resolve(error.response)
        })
    })
}

export default DELETEComment;