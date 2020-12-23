import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    reviewId: number,
    type: string,
    description: string,
}

const POSTReviewComment = ({jwtToken, reviewId, type, description}: Props) => {

    const uri = serverConfig.baseUri + `/api/v1/comments?type=${type}&reviewId=${reviewId}`

    console.log("POSTReviewComment jwtToken", jwtToken);
    console.log("POSTReviewComment reviewId", reviewId);
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

export default POSTReviewComment;