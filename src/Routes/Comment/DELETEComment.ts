import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    commentId: number,
    type: string,
    reviewId: number,
}

const DELETEComment = ({jwtToken, commentId, type, reviewId}: params) => {

    const uri = serverConfig.baseUri + `/api/v1/comments?type=${type}&commentId=${commentId}&reviewId=${reviewId}`

    console.log("DELETEComment commentId", commentId);
    console.log("DELETEComment type", type);
    console.log("DELETEComment reviewId", reviewId);

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