import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    commentId: number,
    type: string,
    id: number,
}

const DELETEComment = ({jwtToken, commentId, type, id}: params) => {

    
    let requestId = ""
    if(type === "review") requestId = "reviewId"
    else if(type === "community") requestId = "postId"
    const uri = serverConfig.baseUri + `/api/v1/comments?type=${type}&commentId=${commentId}&${requestId}=${id}`
    
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
            reject(error.response)
        })
    })
}

export default DELETEComment;