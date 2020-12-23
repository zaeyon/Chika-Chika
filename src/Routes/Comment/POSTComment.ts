import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    id: number,
    type: string,
    description: string,
}

const POSTComment = ({jwtToken, id, type, description}: Props) => {

    let requestId = ""
    if(type === "review") requestId = "reviewId"
    else if(type === "community") requestId = "postId"

    const uri = serverConfig.baseUri + `/api/v1/comments?type=${type}&${requestId}=${id}`

    console.log("POSTReviewComment jwtToken", jwtToken);
    console.log("POSTReviewComment reviewId", id);
    console.log("POSTReviewComment type", type);
    console.log("POSTReviewComment description", description);

    const formData = new FormData();
    formData.append("description", description);

    return new Promise((resolve, reject) => {
        
        axios
        .post(uri, formData, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response)
        })
    })
}

export default POSTComment;